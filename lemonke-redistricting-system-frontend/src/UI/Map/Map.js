import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import classes from './Map.module.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map() {

	const mapContainer = useRef();
	const [lng, setLng] = useState(-72.9);
	const [lat, setLat] = useState(41.0);
	const [zoom, setZoom] = useState(9);
	let inialized = 0;


	useEffect(async () => {

		let map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		map.on('load', () => {
			map.addSource('state-data', {
				type: 'geojson',
				// Only the data in this project is available to the code here.
				// All data therefor should be loaded into the "public" directory in this project.
				// Later we will change this to be an api call.
				data: './1.geojson'
			});

			map.addLayer({
				id: 'state-data',
				type: 'fill',
				source: 'state-data',
				layout: {},
				paint: {
					'fill-color': '#088',
					'fill-opacity': 0.8
				}
			});

		})

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	// TODO:
	// Add all districts onto the map
	// Probably running thought a loop and "addLayer" for each of the distr.
	const populatingLayers = () => {

	}

	// TODO:
	// Random color generator, but somehow making sure that colors dont repeat.
	// It might be hard to do this the right way,
	// so for now just a function that spits out significatly different colors should be good enough.
	// In the future this should probably be its own class that assigns color to a "district" Object.
	// https://www.geeksforgeeks.org/graph-coloring-applications/#:~:text=Graph%20coloring%20problem%20is%20to,are%20colored%20using%20same%20color.
	const addColor = () => {

	}


	return (
		<div>
			<div className={classes.map_container} ref={mapContainer} />
		</div>
	)
}

export default Map;