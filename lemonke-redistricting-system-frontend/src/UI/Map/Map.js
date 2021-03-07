import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { BoxZoomHandler } from 'mapbox-gl';
import classes from './Map.module.css';
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


	useEffect(() => {

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
		let i = 1;
		for (var feature of stateData.features) {

			//current method adds a source for every district, looking into better way to implement 
			//one idea is when loading a new districting we clear the sources
			map.addSource(
				i.toString(),
				{
					type: "geojson",
					data: feature
				}
			);

			map.addLayer({
				id: 'district' + i.toString(),
				type: 'fill',
				source: i.toString(),
				paint: {
					'fill-color': addColor(),
					'fill-opacity': 0.8
				}
			}, firstSymbolId);
			i++;
		}
	}

	function loadJSONFile(callback, url) {
		//ideally we get the url via a callback once a job is loaded in

		var xmlobj = new XMLHttpRequest();

		xmlobj.overrideMimeType("application/json");

		xmlobj.open('GET', url, true);

		xmlobj.onreadystatechange = function () {
			if (xmlobj.readyState == 4 && xmlobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
				callback(xmlobj.responseText);
			}
		};

		xmlobj.send(null);
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