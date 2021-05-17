import React, { useRef, useLayoutEffect, useEffect, useState, useCallback, componentDidUpdate } from 'react';
import mapboxgl, { BoxZoomHandler } from 'mapbox-gl';
import classes from './Map.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setEnactedDistricting, setDisplayedDistricting, setSelectedState, setSelectedDistrict, resetSelectedDistrict } from '../../actions';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map(props) {
	const displayedDistricting = useSelector(state => state.displayedDistricting);
	const selectedState = useSelector(state => state.selectedState);
	const selectedDistrict = useSelector(state => state.selectedDistrict);
	const stateList = useSelector(state => state.stateList);
	const [lng, setLng] = useState(-89.8);
	const [lat, setLat] = useState(35.8);
	const [zoom, setZoom] = useState(4.36);
	const mapContainer = useRef();
	const [map, setMap] = useState(null);
	const dispatch = useDispatch();
	const [layersToDisplay, setLayersToDisplay] = useState({
		districts: true,
		precincts: true,
		counties: false
	}) // [districts, precincts, counties]
	var featureId = 0;
	var hoveredStateId = null;
	var hoveredDistrictId = null;
	var selectedDistrictId = null;
	var fromThis = false;


	useEffect(() => {
		if (map) {
			console.log('flying to ' + [selectedState.longitude, selectedState.latitude])
			flyToMethod([selectedState.longitude, selectedState.latitude], selectedState.zoom);

			if (map.getLayer('districts')) {
				map.removeLayer('districts');
				map.removeLayer('districts outline');
			}

			if (selectedState.enacted_districting_id) {
				fetchEnacted(selectedState.enacted_districting_id);
			}
			// let visibility = map.getLayoutProperty(
			// 	selectedState.name,
			// 	'visibility'
			// );
			// console.log(visibility);
			for (let i = 0; i < stateList.length; i++) {
				map.setLayoutProperty(
					stateList[i].name,
					'visibility',
					'visible'
				);
			}
			// 	if (selectedState.name == stateList[i].name) {
			// 		map.setLayoutProperty(
			// 			selectedState.name,
			// 			'visibility',
			// 			'none'
			// 		);
			// 	}
			// }
			// if (visibility === 'visible') {
			// 	map.setLayoutProperty(
			// 		selectedState.name,
			// 		'visibility',
			// 		'none'
			// 	);
			// } else {
			// 	map.setLayoutProperty(
			// 		selectedState.name,
			// 		'visibility',
			// 		'visible'
			// 	);
			// }
		}
	}, [selectedState]);

	useEffect(() => {
		if (map) {
			displayingDistricting();
		}
	}, [layersToDisplay]);

	useEffect(() => {
		if (map) {
			if (selectedDistrict.districtId && selectedDistrict.districtId !== 'none') {
				console.log(selectedDistrict.districtId, displayedDistricting)
				for(let i = 0; i< displayedDistricting.districts.length; i++){
					map.setFeatureState(
						{ source: "districts", id: displayedDistricting.districts[i].districtId },
						{ selected: null }
					);
				}
				map.setFeatureState(
					{ source: "districts", id: selectedDistrict.districtId },
					{ selected: true }
				);
			}

		}
	}, [selectedDistrict]);

	useEffect(() => {
		if (map) {
			selectedDistrictId = null;
			dispatch(resetSelectedDistrict());
			// console.log(displayedDistricting)
			if (displayedDistricting.districts) {
				for (let i = 0; i < displayedDistricting.districts.length; i++) {
					displayedDistricting.geometry.features[i].id = displayedDistricting.districts[i].districtId;
					let color = addColor();
					// console.log(color)
					displayedDistricting.geometry.features[i].properties = {
						"color": color,
					};
				}
				displayingDistricting();
			}

		}
	}, [displayedDistricting]);

	const findDistrictById = (id) => {
		for (let district of displayedDistricting.districts) {
			if (district.districtId === id) {
				return district;
			}
		}
	}

	function displayingDistricting() {
		// console.log(layersToDisplay)
		if (layersToDisplay.districts) {
			map.getSource("districts").setData(displayedDistricting.geometry)
			if (!map.getLayer('districts')) {
				map.addLayer({
					'id': "districts",
					'type': 'fill',
					'source': "districts", // reference the data source
					'layout': {
						'visibility': 'visible'
					},
					'paint': {
						'fill-color': ['get', 'color'],
						'fill-opacity': [
							'case',
							['boolean', ['feature-state', 'selected'], ['feature-state', 'hover'], false],
							1,
							0.35
						]
					}
				});
				map.addLayer({
					'id': "districts outline",
					'type': 'line',
					'source': "districts",
					'layout': {
						'visibility': 'visible'
					},
					'paint': {
						'line-color': '#000',
						'line-width': [
							'case',
							['boolean', ['feature-state', 'selected'], ['feature-state', 'hover'], false],
							3,
							1
						]
					}
				});

				map.on('click', 'districts', function (e) {
					if (e.features.length > 0) {
						if (hoveredDistrictId !== null) {
							dispatch(setSelectedDistrict(findDistrictById(hoveredDistrictId)));
						}
					}
				})

				map.on('mousemove', "districts", function (e) {
					if (e.features.length > 0) {
						if (hoveredDistrictId !== null) {
							map.setFeatureState(
								{ source: "districts", id: hoveredDistrictId },
								{ hover: false }
							);
						}
						hoveredDistrictId = e.features[0].id;
						map.setFeatureState(
							{ source: "districts", id: hoveredDistrictId },
							{ hover: true }
						);
					}
				});

				map.on('mouseleave', "districts", function () {
					if (hoveredDistrictId !== null) {
						map.setFeatureState(
							{ source: "districts", id: hoveredDistrictId },
							{ hover: false }
						);
					}
					hoveredDistrictId = null;
				});
			}
			map.setLayoutProperty(selectedState.name, 'visibility', 'none');
			map.setLayoutProperty("districts", 'visibility', 'visible');
			map.setLayoutProperty("districts outline", 'visibility', 'visible');
		} else {
			map.setLayoutProperty(selectedState.name, 'visibility', 'visible');
			map.setLayoutProperty("districts", 'visibility', 'none');
			map.setLayoutProperty("districts outline", 'visibility', 'none');
		}
	}

	useEffect(() => {
		function initializeMap(setMap, mapContainer) {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [lng, lat],
				zoom: zoom,
				maxBounds: [
					[-125, 20], // Southwest coordinates
					[-65, 55] // Northeast coordinates
				]

			});

			map.on("load", () => {
				console.log("onload")
				var layers = map.getStyle().layers;
				// Find the index of the first symbol layer in the map style
				let firstSymbolId;
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].type === 'symbol') {
						firstSymbolId = layers[i].id;
						break;
					}
				}
				// Setting all the highway layer to visilibilty none
				for (let i = 35; i < 59; i++) {
					let level_name = layers[i].id;
					map.setLayoutProperty(level_name, 'visibility', 'none');
				}
				map.setLayoutProperty('road-label', 'visibility', 'none');
				map.setLayoutProperty('road-number-shield', 'visibility', 'none');

				//OUTLINE THE STATES
				if (stateList && stateList != []) {
					// for (let i = 0; i < stateList.length; i++) {
					// 	axios.get(`http://localhost:8080/lemonke/states/${stateList[i].stateId}/geometry-union`).then(res => {
					// 		let geometry = res.data;
					// 		geometry.id = getNewFeatureId();
					// 		outlineStates(map, stateList[i].name, geometry, stateList);
					// 	});
					// }
					axios.get(`./unionOfNV.json`).then(res => {
						let geometry = res.data;
						geometry.id = getNewFeatureId();
						outlineStates(map, 'Nevada', geometry, stateList);
					});
					axios.get(`./unionOfNY.json`).then(res => {
						let geometry = res.data;
						geometry.id = getNewFeatureId();
						outlineStates(map, 'New York', geometry, stateList);
					});
					axios.get(`./unionOfFL.json`).then(res => {
						let geometry = res.data;
						geometry.id = getNewFeatureId();
						outlineStates(map, 'Florida', geometry, stateList);
					});
				}

				//create districts source to be edited later
				map.addSource("districts", {
					type: 'geojson',
					data: {
						"type": "FeatureCollection",
						"features": []
					}
				});

				// add navigation control (the +/- zoom buttons)
				map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

				setMap(map);
				map.resize();
			});
			map.dragRotate.disable();


			// On move
			map.on('move', () => {
				setLng(map.getCenter().lng.toFixed(4));
				setLat(map.getCenter().lat.toFixed(4));
				setZoom(map.getZoom().toFixed(2));
			});
		}
		if (!map) {
			initializeMap(setMap, mapContainer);
			console.log(stateList);
		}
	}, [stateList, map])


	function flyToMethod(center, zoom) {
		map.flyTo({
			center: center,
			zoom: zoom
		})
	}

	async function fetchEnacted(id) {
		let res = await axios(`http://localhost:8080/lemonke/districtings/${id}`)
		let districting = res.data;
		let res2 = await axios(`http://localhost:8080/lemonke/districtings/${id}/geometry`)
		districting.geometry = res2.data;
		dispatch(setEnactedDistricting(districting));
		dispatch(setDisplayedDistricting(districting));
	}


	function outlineStates(map, stateName, geometry) {
		map.addSource(stateName, {
			'type': 'geojson',
			'data': geometry,
		});
		map.addLayer({
			'id': stateName,
			'type': 'fill',
			'source': stateName, // reference the data source
			'layout': {
				'visibility': 'visible'
			},
			'paint': {
				'fill-color': addColor(),
				'fill-opacity': [
					'case',
					['boolean', ['feature-state', 'hover'], false],
					1,
					0.5
				]
			}
		});

		map.addLayer({
			'id': stateName + 'outline',
			'type': 'line',
			'source': stateName,
			'layout': {},
			'paint': {
				'line-color': '#000',
				'line-width': 4
			}
		});

		// When the mouse leaves the state-fill layer, update the feature state of the
		// previously hovered feature.
		map.on('click', stateName, function (e) {
			if (hoveredStateId !== null) {
				console.log('clicked ' + stateName);
				for (let i = 0; i < stateList.length; i++) {
					if (stateList[i].name == stateName) {
						dispatch(setSelectedState(stateList[i]));
						break;
					}
				}
			}
		});

		//if hovering a feature, set its hover to true
		map.on('mousemove', stateName, function (e) {
			if (e.features.length > 0) {
				if (hoveredStateId !== null) {
					map.setFeatureState(
						{ source: stateName, id: hoveredStateId },
						{ hover: false }
					);
				}
				// console.log(e.features[0]);
				hoveredStateId = e.features[0].id;
				map.setFeatureState(
					{ source: stateName, id: hoveredStateId },
					{ hover: true }
				);
			}
		});
		// When the mouse leaves the state-fill layer, update the feature state of the
		// previously hovered feature.
		map.on('mouseleave', stateName, function () {
			if (hoveredStateId !== null) {
				map.setFeatureState(
					{ source: stateName, id: hoveredStateId },
					{ hover: false }
				);
			}
			hoveredStateId = null;
		});

	}

	const getNewFeatureId = () => {
		featureId += 1;
		return featureId - 1;
	}


	// TODO:
	// Add all districts onto the map
	// Probably running thought a loop and "addLayer" for each of the distr.
	const populatingLayers = (map, stateData, firstSymbolId) => {
		// the id should be the state, and possibly districting number
		console.log(stateData);
		map.addSource(
			props.initialState.stateName,
			{
				type: "geojson",
				data: stateData
			}
		);

		map.addLayer({
			id: 'districts',
			type: 'fill',
			source: props.initialState.stateName,
			paint: {
				'fill-color': ['get', 'color'],
				'fill-opacity': [
					'case',
					['boolean', ['feature-state', 'hover'], false],
					1,
					0.3
				]
			},
		}, firstSymbolId);

		map.addLayer({
			'id': 'district-borders',
			'type': 'line',
			'source': props.initialState.stateName,
			'layout': {},
			'paint': {
				'line-color': 'black',
				'line-width': [
					'case',
					['boolean', ['feature-state', 'hover'], false],
					2,
					0.5
				]
			}
		});
		//highlight selected one
		// map.setFeatureState(
		// 	{
		// 		source: props.initialState.stateName, id: selectedDistrictId
		// 	},
		// 	{ hover: true }
		// );
	}

	// TODO:
	// Random color generator, but somehow making sure that colors dont repeat.
	// It might be hard to do this the right way,
	// so for now just a function that spits out significatly different colors should be good enough.
	// In the future this should probably be its own class that assigns color to a "district" Object.
	// https://www.geeksforgeeks.org/graph-coloring-applications/#:~:text=Graph%20coloring%20problem%20is%20to,are%20colored%20using%20same%20color.
	const addColor = () => {
		//very quick one-liner, doesn't necesarilly spit nice colors
		// let color = Math.floor(0x1000000 * Math.random()).toString(16);
		// return '#' + ('000000' + color).slice(-6);
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	const selectDisplayLayer = (event) => {
		let newDisplay = layersToDisplay;
		switch (event.target.name) {
			case 'districts':
				newDisplay[0] = !newDisplay[0]
				break;
			case 'precincts':
				newDisplay[1] = !newDisplay[1]
				break;
			case 'counties':
				newDisplay[2] = !newDisplay[2]
				break;
			default:
				break;
		}
		setLayersToDisplay(newDisplay);
	};

	const handleChange = (event) => {
		setLayersToDisplay({ ...layersToDisplay, [event.target.name]: event.target.checked });
	};

	return (
		<div>
			<div className={classes.filter}>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox key={0} checked={layersToDisplay.districts} onChange={handleChange} name="districts" />}
						label="Districts"
					/>
					<FormControlLabel
						control={<Checkbox key={1} onChange={handleChange} name="precincts" disabled={true} />}
						label="Precincts"
					/>
					<FormControlLabel
						control={<Checkbox key={2} onChange={handleChange} name="counties" disabled={true} />}
						label="Counties"
					/>
				</FormGroup>
			</div>
			<div className={classes.sidebar}>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div className='map-container'>
				<div id='map' className={classes.map_container} ref={mapContainer} />
			</div>
		</div>
	)
}

export default Map;