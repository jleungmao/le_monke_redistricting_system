import React from 'react';
import {Tabs, Tab, AppBar} from '@material-ui/core'
import classes from './Sidepanel.module.css';

function Sidepanel() {
	const [selectedTab, setSelectedTab] = React.useState(0)

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue)
	}

	return (
		<div id = 'sidepanel'>
			<Tabs value = {selectedTab} onChange = {handleChange} id = 'tabs'>
				<Tab label="Tab 1"/>
				<Tab label="Tab 2"/>
				<Tab label="Tab 3"/>
			</Tabs>
			<TabPanel value = {selectedTab} index = {0}>Item 1</TabPanel>
			<TabPanel value = {selectedTab} index = {1}>Item 2</TabPanel>
			<TabPanel value = {selectedTab} index = {2}>Item 3</TabPanel>
		</div>
	)
}

export default Sidepanel;

function TabPanel(props){
	const {children, value, index} = props;
	return <>
		{
			value === index && (
				<h1>{children}</h1>
			)
		}
	</>
}
