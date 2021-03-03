import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import classes from './Map.module.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map() {

	const mapContainer = useRef();
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});
		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
	

		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	return (
		<div>
			<div className={classes.map_container} ref={mapContainer} />
		</div>
	)
}

export default Map;