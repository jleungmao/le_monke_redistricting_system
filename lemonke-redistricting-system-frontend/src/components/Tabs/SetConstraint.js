import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { PROPERTY_TYPES } from '@babel/types';


function SetConstraints(props) {

	const [incumbentProtection, setIncumbentProtection] = useState(props.incumbentProtection);
	const [compactness, setCompactness] = useState(props.compactness);
	const [populationEq, setPopulationEq] = useState(props.populationEq);

	return (
		<div>
			<h5>{props.title}</h5>
			<Typography gutterBottom>Incumbent protection</Typography>
			<Slider
				value={typeof incumbentProtection === 'number' ? incumbentProtection : 0}
				onChange={(e, val) => setIncumbentProtection(val)}
				onChangeCommitted={(e, val) => {
					e.preventDefault();
					props.setIncumbentProtection(val)
				}}
				step={0.01}
				min={0}
				max={1}
				valueLabelDisplay="auto"
			/>
			<br />
			<Typography gutterBottom>Compactness</Typography>
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
				valueLabelDisplay="auto"
			/>
			<br />
			<Typography gutterBottom>Population equality</Typography>
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
				valueLabelDisplay="auto"
			/>
		</div>
	)
}

export default SetConstraints;