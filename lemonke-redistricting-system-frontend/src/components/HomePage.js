import React from 'react';
import Button from '@material-ui/core/Button';
import Header from '../UI/Header/Header';
import Map from '.././UI/Map/Map';

function HomePage() {

	// TODO:
	// These are just some ideas of what I thoght I might look like.
	// The drawer "I thought" might be a cool way to keep all the settings. (however I see that there's no point for it to dissapear)
	// https://material-ui.com/components/drawers/
	// These are just other cool things I found on ther Website.
	// https://material-ui.com/components/tabs/

	
	let stateLocations = [
		{
			stateName: 'NewYork',
			longitude: -75.4326,
			latitude: 42.8315,
			zoom: 6.17
		},
		{
			stateName: 'Florida',
			longitude: -82.3791,
			latitude: 28.1770,
			zoom: 6.13
		},
		{
			stateName: 'NewYork',
			longitude: -99.5540,
			latitude: 31.5156,
			zoom: 5.20
		}
	]



	return (
		<>
			<Header />
			<Map initialState={stateLocations[2]}/>
		</>
	)
}

export default HomePage;