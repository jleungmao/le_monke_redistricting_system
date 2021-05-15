import { useState } from 'react';
import classes from './Sidepanel.module.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';
import SetMeasures from '../../components/Tabs/SetMeasures';
import SetConstraints from '../../components/Tabs/SetConstraint';
import SelectJob from '../../components/Tabs/SelectJob';
import SelectDistricting from '../../components/Tabs/SelectDistricting';
import SelectState from '../../components/Tabs/SelectState';
import ShowData from '../DataDrawer/ShowData';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../actions';

function Sidepanel(props) {


	const activeStep = useSelector(state => state.step);
	let selectedDistrictId = props.selectedDistrictId;
	let homePageCallback = props.homePageCallback;
	let selectedDistricting = "2012_Congress.geojson";

	const steps = ['Select State', 'Select Job', 'Set Constraints', 'Set Measures', 'Select Districting'];




	const setSelectedDistrictingId = (selectedDistrictingId) => {
		selectedDistricting = selectedDistrictingId;
		// console.log("saving the value for button" + selectedDistrictingId);
	}

	// Population equality.
	// Incumbent protection.
	// Majority/ minority districts.
	// Minimum number of districts where the districts have x population for minority.


	function TabPanel(props) {
		const { index, value, children, ...other } = props;

		let styles = {
			'display': 'none'
		};

		if (value === index) {
			styles.display = 'block';
		}

		return (
			<div style={styles}>{value === index && <div>{ children }</div>}</div>
		)
	}

	const [value, setValue] = useState(0);
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.sidepanel}>
			{/* Progress component is responsible for displaying the current step */}
			{/* <Tabs value={value} onChange={handleTabChange}>
				<Tab label="Controls" />
				<Tab label="Data" />
			</Tabs>
			<div>{getTab(value)}</div> */}
			{<div>{getTab(0)}</div>}
		</div>
	)

	function getTab(value) {
		if (value == 0) {
			return (
				<div className={classes.tabContent}>
					<ProgressBar activeStep={activeStep} stepsList={steps} />
					<div style={{ marginBottom: '100px' }}>
						<TabPanel value={activeStep} index={0}>
							<Container maxWidth="sm">
								<SelectState />
							</Container>
						</TabPanel>
						<TabPanel value={activeStep} index={1}>
							<Container maxWidth="sm">
								<Route exact path='/' component={SelectJob}></Route>
							</Container>
						</TabPanel>
						<TabPanel value={activeStep} index={2}>
							<Container maxWidth="sm">
								<SetConstraints />
							</Container>
						</TabPanel>
						<TabPanel value={activeStep} index={3}>
							<Container maxWidth="sm">
								<Route exact path='/' component={SetMeasures}></Route>
							</Container>
						</TabPanel>
						<TabPanel value={activeStep} index={4}>
							<Container maxWidth="sm">
								<SelectDistricting
									parentCallback={setSelectedDistrictingId}
								/>
								{/* <Route exact path='/' component={Boxplot}></Route> */}
							</Container>
						</TabPanel>
					</div>
				</div>
			)
		} else if (value == 1) {
			return (
				<div className={classes.tabContent}>
					<ShowData selectedDistrict={selectedDistrictId} homePageCallback={homePageCallback} />
				</div>
			)
		}
	}
}

export default Sidepanel;