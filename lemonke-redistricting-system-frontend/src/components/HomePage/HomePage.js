import React, { useState } from 'react';
import Sidepanel from '../../UI/Sidepanel/Sidepanel';
import Paper from '@material-ui/core/Paper'
import Map from '../../UI/Map/Map';

function HomePage() {

	// TODO:
	// These are just some ideas of what I thoght I might look like.
	// The drawer "I thought" might be a cool way to keep all the settings. (however I see that there's no point for it to dissapear)
	// https://material-ui.com/components/drawers/
	// These are just other cool things I found on ther Website.
	// https://material-ui.com/components/tabs/

	const [state, setState] = useState(3);
	const [selectedDistrict, setSelectedDistrict] = useState(1);
	const [selectedDistricting, setSelectedDistricting] = useState("2012_Congress.geojson");


	let stateLocations = [
		{
			stateName: 'NewYork',
			longitude: -75.7240,
			latitude: 42.9109,
			zoom: 6.58
		},
		{
			stateName: 'Florida',
			longitude: -83.6942,
			latitude: 28.5269,
			zoom: 6.75
		},
		{
			stateName: 'Texas',
			longitude: -99.2290,
			latitude: 31.4927,
			zoom: 6.24
		},
		{
            stateName: 'startPos',
            longitude: -85.5975,
            latitude: 36.4289,
            zoom: 4.55
        }
	]

	const getSelectedDistrict = (selectedDistrictId) => {
		setSelectedDistrict(selectedDistrictId);
		console.log("hi" + selectedDistrict);
	}

	const setSelectedDistrictingId = (selectedDistrictingId) => {
		setSelectedDistricting(selectedDistrictingId);

		console.log("sending to map" + selectedDistrictingId);
	}

	return (
		<>
			<Paper style={{ width: '30%', height: '100%', overflow: 'auto', position: 'fixed' }}>
				<Sidepanel stateIndx={state}
					setState={setState}
					parentCallback={setSelectedDistrictingId} 
					selectedDistrictId = {selectedDistrict}
					homePageCallback = {getSelectedDistrict} />
			</Paper>
			<Map initialState={stateLocations[state]}
				parentCallback={getSelectedDistrict}
				selectedDistrictId={selectedDistrict}
				selectedDistrictingId = {selectedDistricting}
			/>
		</>
	)
}

export default HomePage;