import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setEnactedDistricting, setSelectedState, incrementStep , resetSelectedState} from '../../actions'
import { StarRateSharp } from '@material-ui/icons';


function SelectState(props) {

	const [stateList, setStateList] = useState([])
	const selectedState = useSelector(state => state.selectedState);
	const selectedIndex = selectedState.stateId;
	const dispatch = useDispatch();

	useEffect(() => {

		async function fetchStates() {
			let res = await axios('http://localhost:8080/lemonke/states')
			setStateList(res.data)
		}

		fetchStates();
	}, [])


	async function fetchEnacted(id) {
		let res = await axios(`http://localhost:8080/lemonke/districtings/${id}`)
		dispatch(setEnactedDistricting(res.data));
	}

	function pickState(stateToUse) {
		if (stateToUse != -1) {
			dispatch(setSelectedState(stateList[stateToUse]));
			// fetchEnacted(stateList[stateToUse].enacted_districting_id);
		}else{
			dispatch(resetSelectedState());
		}
	}

	return (
		<>
			<div>
				<br />
				<br />
				<Typography gutterBottom variant='h4'>Select State</Typography>
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					value={selectedIndex}
					onChange={(e) => pickState(e.target.value)}
				>
					<MenuItem value={-1}>
						<em>None</em>
					</MenuItem>
					{stateList.map((data, index) =>
						<MenuItem value={index} key={data['name']}>{data['name']}</MenuItem>
					)}
				</Select>
			</div>
			<div style={{ left: '5%', bottom: '2%', position: 'fixed' }}>
				<div>
					<Button disabled={true}>Back</Button>
					<Button
						disabled={selectedIndex == -1}
						variant="contained"
						color="primary"
						onClick={() => dispatch(incrementStep())}>
						Next
					</Button>
				</div>
			</div>
		</>
	)
}

export default SelectState;