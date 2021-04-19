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

	const [incumbentProtection, setIncumbentProtection] = useState(props.incumbentProtection);
	const constraints = useSelector(state => state.constraints);
	const dispatch = useDispatch();

	const [compactness, setCompactness] = useState(constraints['compactness']);
	const [popEq, setPopEq] = useState(constraints['populationEq']);

	const [open, setOpen] = useState(false);
	// const [totalPopulationAvailable, setTotalPopulationAvailable] = useState(false)
	const [vtpaAvailable, setVtpaAvailable] = useState(false)
	const [cvPopulation, setCvPopulation] = useState(false)
	const classes = useStyles();


	let incumbents = [{
		name: 'Jack',
		last: 'Moron',
		state: 'NY',
		district: 1
	},
	{
		name: 'Ben',
		last: 'Flin',
		state: 'NY',
		district: 3
	},
	{
		name: 'Fin',
		last: 'Butler',
		state: 'NY',
		district: 4
	},
	{
		name: 'Leon',
		last: 'Kak',
		state: 'NY',
		district: 9
	},
	{
		name: 'Derek',
		last: 'Wein',
		state: 'NY',
		district: 17
	},
	{
		name: 'George',
		last: 'Ohot',
		state: 'NY',
		district: 6
	},
	{
		name: 'Andrey',
		last: 'Paley',
		state: 'NY',
		district: 7
	}]

	let minMaxDisSelection = [0, 1, 2, 3, 4]
	let minorites = ['black', 'asian', 'hispanic']

	// jsut there to update on 'open'
	useEffect(() => {
	}, [open])



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



	function FormRow() {
		return (
			<React.Fragment>
				{incumbents.map(inc => (
					<Grid item xl={4}>
						<Card className={classes.root}>
							<CardContent>
								<Typography variant="h5" component="h2">
									{inc.name + ' ' + inc.last}
								</Typography>
								<Typography className={classes.pos} color="textSecondary">
									{inc.state}, district {inc.district}
								</Typography>
								<Typography variant="body2" component="p">
									Keep them safe
									<Checkbox
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Learn More</Button>
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
					<Button onClick={handleClose} color="primary" autoFocus>
						Apply
          			</Button>
				</DialogActions>
			</Dialog>
		)
	}


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
						<FormControlLabel value="pp" control={<Radio />} label="Polsby-Popper" />
						<FormControlLabel value="gc" control={<Radio />} label="Graph Compactness" />
						<FormControlLabel value="fat" control={<Radio />} label="Population Fatness" />
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
							{minMaxDisSelection.map(val => (<MenuItem value={val}>{val}</MenuItem>))}
						</Select>
					</FormControl>
				</Grid>
				<br />
				<br />
				{/* Population Constraints */}
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Population Constraints</Typography>
					{/* <Typography gutterBottom>Total Population</Typography>
					<Switch
						checked={props.totalPopulationAvailable}
						onChange={() => props.setTotalPopulationAvailable(props.totalPopulationAvailable ? false : true)}
						disabled={true}
						color="primary"
						name="checkedB"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/> */}
					<RadioGroup aria-label="gender" name="gender1" value={constraints['populationEqType']}
						onChange={(e) => { dispatch(Actions.setPopulationConstraintType(e.target.value)) }}>
						<FormControlLabel value="tpop" control={<Radio />} label="Total Population" />
						<FormControlLabel value="tvap" control={<Radio />} label="Voting Age Population (TVAP)" />
						<FormControlLabel value="cvap" control={<Radio />} label="Citizen Voting Age Population (CVAP)" />
					</RadioGroup>
					<Slider
						value={popEq}
						onChange={(e, val) => setPopEq(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							dispatch(Actions.setPopulationConstraint(val))
						}}
						step={1}
						min={0}
						max={100}
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
				<br />
				<br />
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Select Minority Group</Typography>
					<FormControl className={classes.formControl}>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							value={constraints['minority']}
							onChange={(e) => dispatch(Actions.setMinority(e.target.value))}
						>
							{/* <MenuItem value="Black">
							<em>Black</em>
						</MenuItem> */}
							{minorites.map(val => (<MenuItem value={val}>{val}</MenuItem>))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<div style={{ left: '5%', bottom: '2%', position: 'fixed' }}>
				<div>
					<Button onClick={() => dispatch(Actions.decrementStep())} >
						Back
		  			</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							axios.post('http://localhost:8080/lemonke/setConstraints', {
								constraints
							}).then(function (response) {
								console.log(response);
							});
							dispatch(Actions.incrementStep());
						}}>
						Next
                    </Button>
				</div>
			</div>
		</div>
	)
}

export default SetConstraints;