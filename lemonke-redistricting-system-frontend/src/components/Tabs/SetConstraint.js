import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../actions'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		minWidth: '100px'
	},
	pos: {
		marginBottom: 12,
	},
	title: {
		fontSize: 14,
	},
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	rail: {
		height: 24,
		width: "14px !important",
		borderRadius: 24,
		opacity: 1,
	}
}));


function SetConstraints(props) {

	const constraints = useSelector(state => state.constraints);
	const dispatch = useDispatch();

	const protectedIncumbents = constraints['protectedIncumbents'];
	const [compactness, setCompactness] = useState(constraints['compactnessValue']);
	const [popEq, setPopEq] = useState(constraints['populationValue']);

	const [open, setOpen] = useState(false);
	// const [totalPopulationAvailable, setTotalPopulationAvailable] = useState(false)
	const job = useSelector(state => state.selectedJobSummary)
	const classes = useStyles();

	const selectedState = useSelector(state => state.selectedState)
	const [incumbents, setIncumbents] = useState([]);
	const [checked, setChecked] = useState([]);
	const selectedMinority = useSelector(state => state.selectedMinority);
	const [maxMMDistricts, setMaxMMDistricts] = useState([]);
	const [availPopConstraints, setAvailPopConstraints] = useState([])



	useEffect(() => {
		async function fetchIncumbents() {
			let res = await axios.get(`http://localhost:8080/lemonke/states/${selectedState.stateId}/incumbents`);
			setIncumbents(res.data);

			let res2 = await axios.get(`http://localhost:8080/lemonke/districtings/${selectedState.enacted_districting_id}/max-mm-districts/${selectedMinority}`);
			let mmOptions = []
			for (let i = 0; i <= res2.data; i++) {
				mmOptions.push(i);
			}
			setMaxMMDistricts(mmOptions);

			let res3 = await axios.get(`http://localhost:8080/lemonke/districtings/${selectedState.enacted_districting_id}/population-type-availability`);
			setAvailPopConstraints(res3.data)
		}
		fetchIncumbents();
	}, [])

	// jsut there to update on 'open'
	useEffect(() => {
		// console.log(protectedIncumbents)
	}, [open, checked])


	const marks = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 1,
			label: '1'
		}
	]

	const isChecked = (id) => {
		return protectedIncumbents.includes(id)
	}

	const getCheckedArray = () => {
		let newArray = []
		incumbents.forEach(element => {
			newArray.push(isChecked(element.incumbentId))
		});
		return newArray;
	}

	const handleClickOpen = () => {
		setOpen(true);
		setChecked(getCheckedArray)
	};

	const handleApply = () => {
		let protectedList = [];
		checked.forEach((element, index) => {
			if (element) {
				protectedList.push(incumbents[index].incumbentId)
			}
		});
		dispatch(Actions.setIncumbentProtectionConstraint(protectedList));
		setOpen(false);
	}

	const handleClose = () => {
		// console.log(protectedIncumbents);
		setOpen(false);
	};



	function MyCheckbox(inc, index) {
		const [myChecked, setMyChecked] = useState(checked[index])

		const handleChange = (event, index) => {
			let newArray = checked;
			newArray[index] = !newArray[index];
			setChecked(newArray);
			setMyChecked(newArray[index]);
			// console.log(availPopConstraints);
		};

		return <Checkbox
			key={Math.random()}
			color="primary"
			inputProps={{ 'aria-label': 'secondary checkbox' }}
			checked={myChecked}
			value={inc.incumbentId}
			onChange={(event) => {
				handleChange(event, index);
			}} />
	}

	function FormRow() {
		return (
			<React.Fragment>
				{incumbents.map((inc, index) => (
					<Grid key={index} item xl={4}>
						<Card key={index} className={classes.root}>
							<CardContent  >
								<Typography variant="h5" component="h2">
									{inc.firstName + ' ' + inc.lastName}
								</Typography>
								<Typography className={classes.pos} color="textSecondary">
									{selectedState.name}
									district {inc.district}
								</Typography>
								<Typography variant="body2" component="div">
									Keep them safe
									{MyCheckbox(inc, index)}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" onClick={()=> window.open("https://www.house.gov/representatives", '_blank', 'noopener, noreferrer')}>Learn More</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</React.Fragment >
		);
	}

	function DialogContainer() {
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth='md'
			>
				<DialogTitle id="alert-dialog-title">Select Incumbents</DialogTitle>
				<DialogContent>
					<Grid container spacing={3}>
						<FormRow />
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
          			</Button>
					<Button onClick={handleApply} color="primary" autoFocus>
						Apply
          			</Button>
				</DialogActions>
			</Dialog>
		)
	}

	

	return (
		<div className={classes.root}>
			<h2>{props.title}</h2>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="stretch"
			>
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Set Protected Incumbents</Typography>
					<Button variant="outlined" color="primary" onClick={handleClickOpen}>
						Select Incumbents
      				</Button>
					<DialogContainer />
				</Grid>
				<br />
				<br />

				<Grid item xs={12} style={{ padding: '10px' }}>
					{/* THe form to select compactness */}
					<Typography gutterBottom variant='h4'>Select Compactness</Typography>
					{/* <FormControl component="fieldset"> */}
					<RadioGroup aria-label="gender" name="gender1" value={constraints['compactnessType']}
						onChange={(e) => { dispatch(Actions.setCompactnessType(e.target.value)) }}>
						<FormControlLabel value="GEOMETRIC" control={<Radio />} label="Polsby-Popper" />
						<FormControlLabel value="GRAPH" control={<Radio disabled/>} label="Graph Compactness" />
						<FormControlLabel value="POPULATION" control={<Radio disabled/>} label="Population Fatness" />
					</RadioGroup>
					{/* </FormControl> */}
					<Slider
						value={compactness}
						onChange={(e, val) => setCompactness(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							dispatch(Actions.setCompactnessConstraint(val))
						}}
						step={0.01}
						min={0}
						max={1}
						marks={marks}
						valueLabelDisplay="auto"
					/>
				</Grid>
				<br />
				<br />
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Majority-Minority Districts</Typography>
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							value={constraints['majorityMinority']}
							onChange={(e) => dispatch(Actions.setMajorityMinorityConstraint(e.target.value))}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{/* TODO LOAD THE MM DIFFERENTLY */}
							{maxMMDistricts.map(val => (<MenuItem value={val}>{val}</MenuItem>))}
						</Select>
					</FormControl>
				</Grid>
				<br />
				<br />
				{/* Population Constraints */}
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Population Constraints</Typography>
					<RadioGroup aria-label="gender" name="gender1" value={constraints['populationType']}
						onChange={(e) => { dispatch(Actions.setPopulationConstraintType(e.target.value)) }}>
						<FormControlLabel value="TOTAL_POPULATION" control={<Radio disabled={!availPopConstraints["TOTAL_POPULATION"]} />} label="Total Population" />
						<FormControlLabel value="VOTING_AGE_POPULATION" control={<Radio disabled={!availPopConstraints["VOTING_AGE_POPULATION"]} />} label="Voting Age Population (TVAP)" />
						<FormControlLabel value="CITIZEN_VOTING_AGE_POPULATION" control={<Radio disabled={!availPopConstraints["CITIZEN_VOTING_AGE_POPULATION"]} />} label="Citizen Voting Age Population (CVAP)" />
					</RadioGroup>
					<Slider
						value={popEq}
						onChange={(e, val) => setPopEq(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							dispatch(Actions.setPopulationConstraint(val))
						}}
						step={.01}
						min={0}
						max={1}
						marks={[
							{
								value: 0,
								label: '0'
							},
							{
								value: 100,
								label: 'all'
							}
						]}
						valueLabelDisplay="auto"
					/>
				</Grid>

			</Grid>
			<div style={{ left: '5%', bottom: '2%', position: 'fixed', backgroundColor: 'white' }}>
				<div>
					<Button onClick={() => {
						dispatch(Actions.resetConstraints());
						dispatch(Actions.decrementStep());
					}} >
						Back
		  			</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							axios.get(`http://localhost:8080/lemonke/jobs/${job.jobId}/constrain-job`, {
								params : {
									compactnessType: constraints.compactnessType,
									compactnessValue:constraints.compactnessValue,
									incumbents: constraints.incumbents,
									jobId:job.jobId,
									mmDistricts:constraints.majorityMinority,
									populationType:constraints.populationType,
									populationValue:constraints.populationValue,
								}
							}).then(function (response) {
								dispatch(Actions.setConstrainedSet(response.data));
							});
							dispatch(Actions.incrementStep());
						}}>
						Next
                    </Button>
                    <Button onClick={() => {
                        dispatch(Actions.resetConstraints());
                        dispatch(Actions.resetCoordinates());
                        dispatch(Actions.resetMeasures());
                        dispatch(Actions.resetMinority());
                        dispatch(Actions.resetSelectedJob());
                        dispatch(Actions.resetSelectedState());
                        dispatch(Actions.resetStep());
                        dispatch(Actions.resetSelectedDistricting());
                        dispatch(Actions.resetDisplayedDistricting());
                        dispatch(Actions.resetSelectedDistrict());
                        dispatch(Actions.resetEnactedDistricting());
                        dispatch(Actions.resetConstrainedSet())
                    }} >
                        Reset
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SetConstraints;