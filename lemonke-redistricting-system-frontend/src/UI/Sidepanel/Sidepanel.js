import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core'
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';

function Sidepanel(props) {
	const [selectedTab, setSelectedTab] = useState(0)

	function TabPanel(props) {
		const { index, value, children } = props;
		return (
			<>{value === index && (<h1>{children}</h1>)}</>
		)
	}


	return (
		<div className={classes.sidepanel}>
			<Tabs onChange={(e, val) => setSelectedTab(val)} >

				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="1" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="2" />
				<Tab className={classes.tabs} style={{ minWidth: '33%' }} label="3" />
			</Tabs>
			<TabPanel value={selectedTab} index={0}>
				<Container maxWidth="sm">
					<h5>Select State</h5>
					<Select
						labelId="demo-customized-select-label"
						id="demo-customized-select"
						value={props.stateIndx}
						onChange={(e) => props.setState(e.target.value)}
						// input={<BootstrapInput />}
					>
						<MenuItem value={0}>NewYork</MenuItem>
						<MenuItem value={1}>Florida</MenuItem>
						<MenuItem value={2}>Texas</MenuItem>
					</Select>
					<h1>{props.stateIndx}</h1>
				</Container>
			</TabPanel>
			<TabPanel value={selectedTab} index={1}>
				<Container maxWidth="sm">
					<h5>Setting the Objective function</h5>
					<Typography id="discrete-slider-small-steps" gutterBottom>
						Slider 1
      				</Typography>
					<Slider
						defaultValue={0.00000005}
						aria-labelledby="discrete-slider-small-steps"
						step={0.00000001}
						marks
						min={-0.00000005}
						max={0.0000001}
						valueLabelDisplay="auto"
					/>
					<br />
					<Typography id="discrete-slider-small-steps" gutterBottom>
						Slider 1
      				</Typography>
					<Slider
						defaultValue={0.00000005}
						aria-labelledby="discrete-slider-small-steps"
						step={0.00000001}
						marks
						min={-0.00000005}
						max={0.0000001}
						valueLabelDisplay="auto"
					/>
				</Container>
			</TabPanel>
			<TabPanel value={selectedTab} index={2}>
				<Container maxWidth="sm">
					<h5>Choose from a subset of 1000</h5>
					<Typography id="discrete-slider-small-steps" gutterBottom>
						Slider 1
      				</Typography>
					<Slider
						defaultValue={0.00000005}
						aria-labelledby="discrete-slider-small-steps"
						step={0.00000001}
						marks
						min={-0.00000005}
						max={0.0000001}
						valueLabelDisplay="auto"
					/>
					<br />
					<Typography id="discrete-slider-small-steps" gutterBottom>
						Slider 1
      				</Typography>
					<Slider
						defaultValue={0.00000005}
						aria-labelledby="discrete-slider-small-steps"
						step={0.00000001}
						marks
						min={-0.00000005}
						max={0.0000001}
						valueLabelDisplay="auto"
					/>
				</Container>
			</TabPanel>
		</div>
	)
}

export default Sidepanel;