import React, { useRef, useLayoutEffect, useEffect, useState, useCallback, componentDidUpdate } from 'react';
import mapboxgl, { BoxZoomHandler } from 'mapbox-gl';
import classes from './Map.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map(props) {
	const districting = useSelector(state => state.selectedDistricting);
	const selectedState = useSelector(state => state.selectedState);
	const [lng, setLng] = useState(-89.8);
	const [lat, setLat] = useState(35.8);
	const [zoom, setZoom] = useState(4.36);
	const mapContainer = useRef();
	const [map, setMap] = useState(null);



	useEffect(() => {
		const initializeMap = ({ setMap, mapContainer }) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [lng, lat],
				zoom: zoom,
				maxBounds: [
					[-110, 23], // Southwest coordinates
					[-64.91058699000139, 47.87764500765852] // Northeast coordinates
				]
			});

			map.on("load", () => {
				console.log("onload")
				var layers = map.getStyle().layers;
				// Find the index of the first symbol layer in the map style
				var firstSymbolId;
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].type === 'symbol') {
						firstSymbolId = layers[i].id;
						break;
					}
				}

				// Setting all the highway laeyrs to visilibilty none
				for (let i = 35; i < 59; i++) {
					let level_name = layers[i].id;
					map.setLayoutProperty(level_name, 'visibility', 'none');
				}

				map.setLayoutProperty('road-label', 'visibility', 'none');
				map.setLayoutProperty('road-number-shield', 'visibility', 'none');

				// add navigation control (the +/- zoom buttons)
				map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
				// populatingLayers(map, stateData, firstSymbolId);

				map.on('click', 'districts', function (e) {
					if (e.features.length > 0) {
						props.parentCallback(e.features[0].id);
						// if (selectedDistrictId) {
						// 	map.setFeatureState(
						// 		{
						// 			source: props.initialState.stateName, id: selectedDistrictId
						// 		},
						// 		{ hover: false }
						// 	);
						// }
						// console.log(e.features);
						// props.parentCallback(e.features[0].id);
						// map.setFeatureState(
						// 	{
						// 		source: props.initialState.stateName, id: selectedDistrictId
						// 	},
						// 	{ hover: true }
						// );
						//send this to homepage homepage send to selectDistrictings
						// setSelectedDistrict(selectedDistrictId);
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
		if (!map) initializeMap({ setMap, mapContainer });

	}, [map]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		flyToMethod([selectedState.longitude, selectedState.latitude], selectedState.zoom)
	}, [selectedState])


	function flyToMethod(center, zoom) {
		if (map) {
			map.flyTo({
				center: center,
				zoom: zoom
			})
		}
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



	return (
		<div>
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