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
				data: './1.geojson'
			});

			map.addLayer({
				id: 'state-data',
				type: 'fill',
				source: 'state-data',
				layout: {
				},
				paint: {
					'fill-color': '#088',
					'fill-opacity': 0.8
				}
			});

		})

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	return (
		<div>
			<div className={classes.map_container} ref={mapContainer} />
		</div>
	)
}

export default Map;