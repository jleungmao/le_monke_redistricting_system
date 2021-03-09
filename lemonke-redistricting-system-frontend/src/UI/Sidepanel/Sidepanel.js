import React, { useState } from 'react';
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';
//import Boxplot from '../../components/Boxplot';
import SetMeasures from '../../components/Tabs/SetMeasures';
import SetConstraints from '../../components/Tabs/SetConstraint';
import SelectJob from '../../components/Tabs/SelectJob';
import SelectDistricting from '../../components/Tabs/SelectDistricting';
import SelectState from '../../components/Tabs/SelectState';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route } from 'react-router-dom';

function Sidepanel(props) {


	const [activeStep, setActiveStep] = useState(0);
	const [compactness, setCompactness] = useState(0.5);
	const [totalPopulation, setTotalPopulation] = useState(0.5);
	const [votingAge, setVotingAge] = useState(0.5);
	const [citizenVotingAge, setCitizenVotingAge] = useState(0.5);
	const [vtpaAvailable, setVtpaAvailable] = useState(false)
	const [totalPopulationAvailable, setTotalPopulationAvailable] = useState(false)
	const [cvPopulation, setCvPopulation] = useState(false)

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
						<SelectState stateIndx={props.stateIndx} setState={props.setState}/>
						<h1>{props.stateIndx}</h1>
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
						totalPopulation={totalPopulation}
						setTotalPopulation={setTotalPopulation}
						votingAge={votingAge} 
						setVotingAge={setVotingAge}
						citizenVotingAge={citizenVotingAge}
						setCitizenVotingAge={setCitizenVotingAge}
						vtpaAvailable={vtpaAvailable}
						setVtpaAvailable={setVtpaAvailable}
						totalPopulationAvailable={totalPopulationAvailable}
						setTotalPopulationAvailable={setTotalPopulationAvailable}
						cvPopulation={cvPopulation}
						setCvPopulation={setCvPopulation}
						/>
						
				</Container>
			</TabPanel>
			<TabPanel value={activeStep} index={3}>
				<Container maxWidth="sm">
					<Route exact path='/' component={SetMeasures}></Route>
				</Container>
				</TabPanel>
				<TabPanel value={activeStep} index={4}>
					<Container maxWidth="sm">
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