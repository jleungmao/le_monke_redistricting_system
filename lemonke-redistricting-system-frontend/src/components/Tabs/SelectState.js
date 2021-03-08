import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';


function SelectState(props) {

	return (
		<div>
			<br />
			<br />
			<Typography gutterBottom variant='h4'>Select State</Typography>
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
		</div>
	)
}

export default SelectState;