import React, { useState } from 'react';
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';
import Plot from 'react-plotly.js';

function Sidepanel(props) {


	const [selectedTab, setSelectedTab] = useState(0)
	const [activeStep, setActiveStep] = useState(1);

	const steps = ['Select State', 'Select Job', 'Set Constraints', 'Select Districtings', 'Districting Stats'];

	function TabPanel(props) {
		const { index, value, children } = props;
		return (
			<>{value === index && (<h1>{children}</h1>)}</>
		)
	}
	var xData = ['x1', 'x2',
	'x3', 'x4',];


	function getrandom(num , mul) {
		var value = [ ];
			for ( i = 0; i <= num; i++ ) {
				var rand = Math.random() * mul;
				value.push(rand);
			}
		return value;
	}

	var yData = [
		getrandom(30 ,10),
		getrandom(30, 20),
		getrandom(30, 25),
		getrandom(30, 40),
	];

	var colors = ['rgba(93, 164, 214, 0.5)', 'rgba(255, 144, 14, 0.5)', 'rgba(44, 160, 101, 0.5)', 'rgba(255, 65, 54, 0.5)'];

	var data = [];

	for ( var i = 0; i < xData.length; i ++ ) {
		var result = {
			type: 'box',
			y: yData[i],
			name: xData[i],
			boxpoints: 'all',
			jitter: 0.5,
			whiskerwidth: 0.2,
			fillcolor: colors[i],
			marker: {
				size: 2
			},
			line: {
				width: 1
			}
		};
	data.push(result);
	};

	var layout = {
		title: 'title goes here',
		yaxis: {
			autorange: true,
			showgrid: true,
			zeroline: true,
			dtick: 5,
			gridcolor: 'rgb(255, 255, 255)',
			gridwidth: 1,
			zerolinecolor: 'rgb(255, 255, 255)',
			zerolinewidth: 2
		},
		margin: {
			l: 40,
			r: 30,
			b: 80,
			t: 100
		},
		paper_bgcolor: 'rgb(255, 255, 255)',
		plot_bgcolor: 'rgb(243, 243, 243)',
		showlegend: false
	};

	var data1 = [
		{
			y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
			boxpoints: 'all',
			jitter: 0.3,
			pointpos: -1.8,
			type: 'box'
		},
		{
			x: ['trace 0'],
			y: [18],
			name: 'special marker',
			text: 'special marker it is',
			marker: {
			size: 20
			}
		}
	];

	var marker = {x: ['x1'],
				y: [3],
				name: 'special point',
				text: 'this is special point',
				marker: {
					size: 3
				}
	}
	data.push(marker);




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
			<TabPanel value={activeStep} index={2}>
				<Container maxWidth="sm">
					<h5>Choose from a subset of 1000</h5>
					<Plot data={data1} layout= {{width: 300, height: 300, title: 'title goes here'}}></Plot>
	  			<Plot data={data} layout= {layout}></Plot>
  				<Plot data={data1} layout= {{width: 300, height: 300, title: 'another title goes here'}}></Plot>
				</Container>
			</TabPanel>
			{/* Button Next, Back and Finish  */}
			<div style={{ left: '5%', bottom: '2%', position: 'fixed'}}>
				{activeStep === steps.length ? (
					<div>
						<Typography >
							All steps completed - you&apos;re finished
						</Typography>
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