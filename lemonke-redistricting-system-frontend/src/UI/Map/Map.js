import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import classes from './Map.module.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map() {

	const mapContainer = useRef();
	const [lng, setLng] = useState(-72.9);
	const [lat, setLat] = useState(41.0);
	const [zoom, setZoom] = useState(9);
	let stateData = null;


	useEffect(async () => {

		let map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		

		loadJSONFile(function(response) {
			stateData = JSON.parse(response);
		 });

		map.on('load', () => {
			// map.addSource('state-data', {
			// 	type: 'geojson',
			// 	// Only the data in this project is available to the code here.
			// 	// All data therefor should be loaded into the "public" directory in this project.
			// 	// Later we will change this to be an api call.
			// 	data: './2012_Congress.geojson'
			// });

			// map.addLayer({
			// 	id: 'state-data',
			// 	type: 'fill',
			// 	source: 'state-data',
			// 	layout: {},
			// 	paint: {
			// 		'fill-color': '#088',
			// 		'fill-opacity': 0.8
			// 	}
			// });
			populatingLayers(map, stateData);
		})

		

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	// TODO:
	// Add all districts onto the map
	// Probably running thought a loop and "addLayer" for each of the distr.
	const populatingLayers = (map, stateData) => {
		let i = 0;
		for(var feature of stateData.features){
			console.log(feature);
			map.addSource(
				i.toString(),
				{type: "geojson",
				data: feature}
			);

			map.addLayer({
				id: "district" + i.toString(),
				type:'fill',
				source: i.toString(),
				paint: {
					'fill-color': addColor(),
					'fill-opacity': 0.8
				}
			})
			i++;
		}
	}

	function loadJSONFile(callback) {   

		var xmlobj = new XMLHttpRequest();
	
		xmlobj.overrideMimeType("application/json");
	
		xmlobj.open('GET', './2012_Congress.geojson', true); // Provide complete path to your json file here. Change true to false for synchronous loading.
	
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
		var color = '#'+Math.floor(Math.random()*16777215).toString(16);
		return color;
	}


	return (
		<div>
			<div className={classes.map_container} ref={mapContainer} />
		</div>
	)
}

export default Map;