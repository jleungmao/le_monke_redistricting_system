import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core'
import classes from './Sidepanel.module.css';

function Sidepanel(props) {
	const [selectedTab, setSelectedTab] = useState(0)


	function TabPanel(props) {
		const { index, value, children } = props;
		return (
			<>
				{
					value === index && (
						<h1>{children}</h1>
					)
				}
			</>
		)
	}

	return (
		<div className={classes.sidepanel}>
			<Tabs onChange={(e, val) => setSelectedTab(val)} >

				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="1" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="2" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="3" />
			</Tabs>
			<TabPanel value={selectedTab} index={0}>Item 1</TabPanel>
			<TabPanel value={selectedTab} index={1}>Item 2</TabPanel>
			<TabPanel value={selectedTab} index={2}>Item 3</TabPanel>
		</div>
	)
}

export default Sidepanel;