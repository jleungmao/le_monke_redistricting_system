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
	const [compactness, setCompactness] = useState(props.compactness);
	const [totalPopulation, setTotalPopulation] = useState(props.totalPopulation)
	const [votingAge, setVotingAge] = useState(props.votingAge);
	const [citizenVotingAge, setCitizenVotingAge] = useState(props.citizenVotingAge)
	const [valueCompactness, setValueCompactness] = useState('pp');
	const [open, setOpen] = useState(false);
	const [openMinMaxDis, setOpenMinMaxDis] = useState(false);
	const [minMaxDis, setMinMaxDis] = useState('');
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

	let minMaxDisSelection = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
		},
		{
			value: 100,
			label: '100'
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

	const handleChange = (event) => {
		setValueCompactness(event.target.value);
	};

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
				<br />
				<br />
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
					<RadioGroup aria-label="gender" name="gender1" value={valueCompactness} onChange={handleChange}>
						<FormControlLabel value="pp" control={<Radio />} label="Polsby-Popper" />
						<FormControlLabel value="gc" control={<Radio />} label="Graph Compactness" />
						<FormControlLabel value="fat" control={<Radio />} label="Population Fatness" />
					</RadioGroup>
					{/* </FormControl> */}
					<Slider
						value={typeof compactness === 'number' ? compactness : 0}
						onChange={(e, val) => setCompactness(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							props.setCompactness(val)
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
							open={openMinMaxDis}
							onClose={() => setOpenMinMaxDis(false)}
							onOpen={() => setOpenMinMaxDis(true)}
							value={minMaxDis}
							onChange={(e) => setMinMaxDis(e.target.value)}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{minMaxDisSelection.map(val => (<MenuItem value={val}>{val}</MenuItem>))}
						</Select>
					</FormControl>
				</Grid>
				<br />
				<br />
				{/* Population Constraints */}
				<Grid item xs={12} style={{ padding: '10px' }}>
					<Typography gutterBottom variant='h4'>Population Constraints</Typography>
					<Typography gutterBottom>Total Population</Typography>
					<Switch
						checked={props.totalPopulationAvailable}
						onChange={() => props.setTotalPopulationAvailable(props.totalPopulationAvailable ? false : true)}
						disabled={true}
						color="primary"
						name="checkedB"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<Slider
						value={totalPopulation}
						onChange={(e, val) => setTotalPopulation(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							props.setTotalPopulation(val)
						}}
						step={0.01}
						min={0}
						max={100}
						disabled={!props.totalPopulationAvailable}
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
					<Typography gutterBottom>Voting Age Population (TVAP)</Typography>
					<Switch
						checked={props.vtpaAvailable}
						onChange={() => props.setVtpaAvailable(props.vtpaAvailable ? false : true)}
						color="primary"
						name="checkedB"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<Slider
						value={typeof votingAge === 'number' ? votingAge : 0}
						onChange={(e, val) => setVotingAge(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							props.setVotingAge(val)
						}}
						disabled={!props.vtpaAvailable}
						step={0.01}
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
					<Typography gutterBottom>Citizen Voting Age Population (CVAP)</Typography>
					<Switch
						checked={props.cvPopulation}
						onChange={() => props.setCvPopulation(props.cvPopulation? false : true)}
						color="primary"
						name="checkedB"
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<Slider
						value={citizenVotingAge}
						onChange={(e, val) => setCitizenVotingAge(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							props.setCitizenVotingAge(val)
						}}
						disabled={!props.cvPopulation}
						step={0.01}
						min={0}
						max={100}
						marks={[{
							value: 0,
							label: '0'
						},
						{
							value: 100,
							label: 'all'
						}]}
						valueLabelDisplay="auto"
					/>
					{/* </RadioGroup> */}
				</Grid>
			</Grid>
		</div>
	)
}

export default SetConstraints;