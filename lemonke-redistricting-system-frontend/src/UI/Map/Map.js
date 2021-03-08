import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { BoxZoomHandler } from 'mapbox-gl';
import classes from './Map.module.css';
import axios from 'axios';
import geojsonMerge from 'geojson-merge';
import axios from 'axios';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map(props) {

	const mapContainer = useRef();
	const [lng, setLng] = useState(props.initialState.longitude);
	const [lat, setLat] = useState(props.initialState.latitude);
	const [zoom, setZoom] = useState(props.initialState.zoom);
	let map;
	let stateData;
	let initialized = 0;
	let selectedDistrictId = null;

	useEffect(() => {

		if (!initialized){
			axios.get('./2012_Congress.geojson')
				.then(res => {
					stateData = res.data;
					// preprocessing
					let i = 1;
					for (var feature of stateData.features) {
						feature.properties = {
							"demographic_data": Math.random() * 30000,
							"color": addColor(),
						};
						feature.id = i;
						i++;
					}
					console.log(stateData);
				});

			inialized = 1;
		}

		map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		map.dragRotate.disable();

		// stateData = await axios('./2012_Congress.geojson');
		loadJSONFile(function (response) {
			stateData = JSON.parse(response);
		}, './2012_Congress.geojson');

		// On load
		map.on('load', () => {
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
			populatingLayers(map, stateData, firstSymbolId);


			//highlight district
			map.on('click', 'districts', function (e) {
				if (e.features.length > 0) {
					if (selectedDistrictId
					) {
						map.setFeatureState(
							{
								source: 'new-york', id: selectedDistrictId
							},
							{ hover: false }
						);
					}
					selectedDistrictId = e.features[0].id;
					console.log(selectedDistrictId);
					map.setFeatureState(
						{
							source: 'new-york', id: selectedDistrictId
						},
						{ hover: true }
					);
				}
			});
		});

		// On move
		map.on('move', () => {
			console.log("moving")
			setLng(map.getCenter().lng.toFixed(4));
			setLat(map.getCenter().lat.toFixed(4));
			setZoom(map.getZoom().toFixed(2));
		});

		map.setCenter([props.initialState.longitude, props.initialState.latitude])
		map.setZoom(props.initialState.zoom)

		return () => map.remove();
	}, [props.initialState]); // eslint-disable-line react-hooks/exhaustive-deps


	// TODO:
	// Add all districts onto the map
	// Probably running thought a loop and "addLayer" for each of the distr.
	const populatingLayers = (map, stateData, firstSymbolId) => {
		// the id should be the state, and possibly districting number
		console.log(stateData);
		map.addSource(
			'new-york',
			{
				type: "geojson",
				data: stateData
			}
		);
		console.log(map.getSource('new-york'));
		map.addLayer({
			id: 'districts',
			type: 'fill',
			source: 'new-york',
			paint: {
				'fill-color': ['get', 'color'],
				'fill-opacity': [
					'case',
					['boolean', ['feature-state', 'hover'], false],
					1,
					0.5
				]
			},
		}, firstSymbolId);

		map.addLayer({
			'id': 'district-borders',
			'type': 'line',
			'source': 'new-york',
			'layout': {},
			'paint': {
				'line-color': 'black',
				'line-width': 2
			}
		});
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