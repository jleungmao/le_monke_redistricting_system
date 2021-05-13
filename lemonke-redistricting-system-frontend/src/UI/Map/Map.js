import React, { useRef, useLayoutEffect, useEffect, useState, useCallback, componentDidUpdate } from 'react';
import mapboxgl, { BoxZoomHandler } from 'mapbox-gl';
import classes from './Map.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setEnactedDistricting, setSelectedDistricting, setSelectedState } from '../../actions';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map(props) {
	const selectedDistricting = useSelector(state => state.selectedDistricting);
	const selectedState = useSelector(state => state.selectedState);
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
	var selectedFeatureId = null;





	useEffect(() => {
		if (map) {
			flyToMethod([selectedState.longitude, selectedState.latitude], selectedState.zoom);
			fetchEnacted(selectedState.enacted_districting_id);
			let visibility = map.getLayoutProperty(
				selectedState.name,
				'visibility'
			);
			console.log(visibility);
			// for(let i = 0; i<stateList.length; i++){
			// 	map.setLayoutProperty(
			// 		stateList[i].name,
			// 		'visibility',
			// 		'visible'
			// 	);
			// 	if(selectedState.name == stateList[i].name){
			// 		map.setLayoutProperty(
			// 			selectedState.name,
			// 			'visibility',
			// 			'none'
			// 		);
			// 	}
			// }
			if (visibility === 'visible') {
				map.setLayoutProperty(
					selectedState.name,
					'visibility',
					'none'
				);
			} else {
				map.setLayoutProperty(
					selectedState.name,
					'visibility',
					'visible'
				);
			}
		}
	}, [selectedState]);

	useEffect(() => {
		if (map) {
			console.log(layersToDisplay)
		}
	}, [selectedDistricting])

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
					axios.get('./unionOfNY.json').then(res => {
						outlineStates(map, 'New York', res.data, stateList);
					});
					axios.get('./unionOfNV.json').then(res => {
						outlineStates(map, 'Nevada', res.data, stateList);
					});
				}

				// add navigation control (the +/- zoom buttons)
				map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

				map.on('click', 'districts', function (e) {
					if (e.features.length > 0) {
						props.parentCallback(e.features[0].id);
					}
				});
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
		dispatch(setSelectedDistricting(districting));
	}
	

	function outlineStates(map, stateName, geometry) {
		map.addSource(stateName, {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'id': getNewFeatureId(),
				'geometry': geometry
			}
		});
		map.addLayer({
			'id': stateName,
			'type': 'fill',
			'source': stateName, // reference the data source
			'layout': {
				'visibility': 'visible'
			},
			'paint': {
				'fill-color': '#0080ff', // blue color fill
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
				'line-width': 1
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
		var color = Math.floor(0x1000000 * Math.random()).toString(16);
		return '#' + ('000000' + color).slice(-6);
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
		setLayersToDisplay(newDisplay, console.log(layersToDisplay));
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
						control={<Checkbox key={1} checked={layersToDisplay.precincts} onChange={handleChange} name="precincts" />}
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