import React, { useState } from 'react';
import Sidepanel from '../../UI/Sidepanel/Sidepanel';
import Paper from '@material-ui/core/Paper'
import Map from '../../UI/Map/Map';
import DataDrawer from '../../UI/DataDrawer/DataDrawer.js';

function HomePage() {

	// TODO:
	// These are just some ideas of what I thoght I might look like.
	// The drawer "I thought" might be a cool way to keep all the settings. (however I see that there's no point for it to dissapear)
	// https://material-ui.com/components/drawers/
	// These are just other cool things I found on ther Website.
	// https://material-ui.com/components/tabs/


	return (
		<>
			<Paper style={{ width: '25%', height: '100%', overflow: 'auto', position: 'fixed' }}>
				<Sidepanel />
			</Paper>
			<Map />
			<DataDrawer />
		</>
	)
}

export default HomePage;