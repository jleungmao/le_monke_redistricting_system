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
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';



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
}));


function SetConstraints(props) {

	const [incumbentProtection, setIncumbentProtection] = useState(props.incumbentProtection);
	const [compactness, setCompactness] = useState(props.compactness);
	const [populationEq, setPopulationEq] = useState(props.populationEq);
	const [value, setValue] = useState('pp');
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	let incumbents = [{
		name: 'Jack',
		last: 'Moron',
		state: 'NY'
	},
	{
		name: 'Ben',
		last: 'Flin',
		state: 'NY'
	},
	{
		name: 'Fin',
		last: 'Butler',
		state: 'NY'
	},
	{
		name: 'Leon',
		last: 'Kak',
		state: 'NY'
	},
	{
		name: 'Derek',
		last: 'Wein',
		state: 'NY'
	},
	{
		name: 'George',
		last: 'Ohot',
		state: 'NY'
	},
	{
		name: 'Andrey',
		last: 'Paley',
		state: 'NY'
	}]

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
									{inc.state}
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
		setValue(event.target.value);
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
					<Typography gutterBottom  variant='h4'>Select Compactness</Typography>
					{/* <FormControl component="fieldset"> */}
					<RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
						<FormControlLabel value="pp" control={<Radio />} label="Polsby-Popper" />
						<FormControlLabel value="gc" control={<Radio />} label="GraphCompactness" />
						<FormControlLabel value="fat" control={<Radio />} label="Fatness" />
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
					<Typography gutterBottom variant='h4'>Population Equality Constraint</Typography>
					<Slider
						value={typeof populationEq === 'number' ? populationEq : 0}
						onChange={(e, val) => setPopulationEq(val)}
						onChangeCommitted={(e, val) => {
							e.preventDefault();
							props.setPopulationEq(val)
						}}
						step={0.01}
						min={0}
						max={1}
						marks={marks}
						valueLabelDisplay="auto"
					/>
				</Grid>
			</Grid>
		</div>
	)
}

export default SetConstraints;