import React, { useState } from 'react';
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';
//import Boxplot from '../../components/Boxplot';
import SetMeasures from '../../components/Tabs/SetMeasures';
import SetConstraints from '../../components/Tabs/SetConstraint';
import SelectJob from '../../components/Tabs/SelectJob';
import SelectDistricting from '../../components/Tabs/SelectDistricting';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route } from 'react-router-dom';

function Sidepanel(props) {


	const [selectedTab, setSelectedTab] = useState(0);
	const [activeStep, setActiveStep] = useState(0);
	const [compactness, setCompactness] = useState(0.5);
	const [votingAge, setVotingAge] = useState(0.5);
	const [citizenVotingAge, setCitizenVotingAge] = useState(0.5);

	const steps = ['Select State', 'Select Job', 'Set Constraints', 'Set Measures', 'Select Districting'];
	// Population equality.
	// Inccumbent protenction.
	// Magority/ minority districts.
	// Minimum number of districts where the districts have x population for minority.


	function TabPanel(props) {
		const { index, value, children, ...other } = props;
		return (
			<div>{value === index && <>{children}</>}</div>
		)
	}

	const [value, setValue] = React.useState(0);
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.sidepanel}>
			{/* Progress component is responsible for displaying the current step */}
			<Tabs value={value} onChange={handleTabChange}>
				<Tab label="Controls" />
				<Tab label="Data" />
			</Tabs>
			<div>{getTab(value)}</div>
		</div>
	)
  
	function getTab(value) {
		if (value == 0) {
			return <div className = {classes.tabContent}>
				<ProgressBar activeStep={activeStep} stepsList={steps} />

				<TabPanel value={activeStep} index={0}>
					<Container maxWidth="sm">
						<h5>Select State</h5>
						<Select
							labelId="demo-customized-select-label"
							id="demo-customized-select"
							value={props.stateIndx}
							onChange={(e) => props.setState(e.target.value)}
						>
							<MenuItem value={0}>NewYork</MenuItem>
							<MenuItem value={1}>Florida</MenuItem>
							<MenuItem value={2}>Texas</MenuItem>
						</Select>
						<ProgressBar></ProgressBar>
					</Container>
				</TabPanel>
				<TabPanel value={activeStep} index={1}>
					<Container maxWidth="sm">
						<Route exact path='/' component={SelectJob}></Route>
					</Container>
				</TabPanel>
				<TabPanel value={activeStep} index={2}>
					<Container maxWidth="sm">
					<SetConstraints 
						compactness={compactness} 
						setCompactness={setCompactness}
						votingAge={votingAge} 
						setVotingAge={setVotingAge}
						citizenVotingAge={citizenVotingAge}
						setCitizenVotingAge={setCitizenVotingAge}
						title={'View Filtered Districts, using the objective function.'} />
				</Container>
			</TabPanel>
			<TabPanel value={activeStep} index={3}>
				<Container maxWidth="sm">
					<Route exact path='/' component={SetMeasures}></Route>
				</Container>
				</TabPanel>
				<TabPanel value={activeStep} index={3}>
					<Container maxWidth="sm">
						<Route exact path='/' component={SetMeasures}></Route>
					</Container>
				</TabPanel>
				<TabPanel value={activeStep} index={4}>
					<Container maxWidth="sm">
						<h5>Districting Stats</h5>
						<SelectDistricting />
						{/* <Route exact path='/' component={Boxplot}></Route> */}
					</Container>
				</TabPanel>
				{/* Button Next, Back and Finish  */}
				<div style={{ left: '5%', bottom: '2%', position: 'fixed' }}>
					{activeStep === steps.length ? (
						<div>
							<Typography> All steps completed - you&apos;re finished</Typography>
							<Button onClick={() => setActiveStep(0)} >
								Reset
									</Button>
						</div>
					) : (
						<div>
							<Button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)} >
								Back
		  							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setActiveStep(activeStep + 1)}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					)}
				</div>
			</div>
		} else if (value == 1) {
			return <div className = {classes.tabContent}>
				
			</div>
		}
	}
}

export default Sidepanel;