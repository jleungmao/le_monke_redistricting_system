import React, { useState } from 'react';
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';
import Boxplot from '../../components/Boxplot';
import {Route} from 'react-router-dom';

function Sidepanel(props) {


	const [selectedTab, setSelectedTab] = useState(0)
	const [activeStep, setActiveStep] = useState(1);

	const steps = ['Select State', 'Select Job', 'Set Constraints', 'Select Districtings', 'Districting Stats'];
						// Population equality.
						// Inccumbent protenction.
						// Magority/ minority districts.
						// Minimum number of districts where the districts have x population for minority.

						

	function TabPanel(props) {
		const { index, value, children } = props;
		return (
			<>{value === index && (<h1>{children}</h1>)}</>
		)
	}


	return (
		<div className={classes.sidepanel}>

			{/* Progress component is responsible for displaying the current step */}
			<ProgressBar activeStep={activeStep} stepsList={steps} />

			<TabPanel value={activeStep} index={0}>
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
					<ProgressBar></ProgressBar>
				</Container>
			</TabPanel>
			<TabPanel value={activeStep} index={1}>
				<Container maxWidth="sm">
					<h5>Set Filtering Constraints</h5>
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
			<TabPanel value={activeStep} index={2}>
				<Container maxWidth="sm">
					<h5>View Filtered Districts, using the objective function.</h5>
				</Container>
			</TabPanel>
			<TabPanel value={activeStep} index={3}>
				<Container maxWidth="sm">
					<h5>Set OBJ Constant</h5>
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
			<TabPanel value={activeStep} index={4}>
				<Container maxWidth="sm">
					<h5>Districting Stats</h5>
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
					<Route exact path='/' component={Boxplot}></Route>
				</Container>
			</TabPanel>
			{/* Button Next, Back and Finish  */}
			<div style={{ left: '5%', bottom: '2%', position: 'fixed'}}>
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
							onClick={() => setActiveStep(activeStep + 1)}
						>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Sidepanel;