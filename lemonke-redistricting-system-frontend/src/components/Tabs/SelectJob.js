import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { PinDropSharp } from '@material-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setSelectedJob} from '../../actions'

function SelectJob(props) {

    // const [selectedIndex, setSelectedIndex] = React.useState([0,"# of Districtings: 100,243. (More info about job 1)"]);
    const [selectedIndex, setSelectedIndex] = React.useState();
    const stateID = useSelector(state => state.selectedState.id)
    const [jobList, setJobList] = React.useState([]);
    const dispatch = useDispatch();

    const handleSelectedList = (event, index) => {
        setSelectedIndex(index);
        console.log(index);
    }


    
	useEffect(() => {

		async function fetchJobs() {
			let res = await axios('http://localhost:8080/lemonke/states/'+stateID+'/jobs')
			setJobList(res.data)
		}

		fetchJobs();
	}, [])
    return (
        <>
            <h2>Select Job</h2>
            <List component = "nav" aria-labe="job lists">
                {/* <ListItem button 
                selected={selectedIndex[0] === 0} 
                onClick={(event) => handleSelectedList(event, 0, "# of Districtings: 100,243. (More info about job 1)")}>
                    <ListItemText primary="Job 1" secondary="New York, 27 districtings, (Some MGGG code param)">
                    </ListItemText>
                </ListItem>
                <ListItem button
                selected={selectedIndex[0] === 1} 
                onClick={(event) => handleSelectedList(event, 1, "# of Districtings: 101,632 (More info about job 2)")}>
                    <ListItemText primary="Job 2" secondary="New York, 28 districtings, (Another MGGG code param)"></ListItemText>
                </ListItem>
                <ListItem button
                selected={selectedIndex[0] === 2} 
                onClick={(event) => handleSelectedList(event, 2, "# of Districtings: 99,874. (More info about job 3)")}>
                    <ListItemText primary="Job 3" secondary="New York, 26 districtings, (Another MGGG code param)"></ListItemText>
                </ListItem> */}
				{jobList.map((data, index) =>
					<ListItem button 
                    selected = {selectedIndex === index}
                    onClick = {(event) => {
                        setSelectedIndex(index);
                        dispatch(setSelectedJob(jobList[index]));
                        console.log(jobList);
                    }}>
                        <ListItemText primary={"Job "+jobList[index].id} secondary=""></ListItemText>
                    </ListItem>
				)}
            </List>
        </>
    )
}

export default SelectJob;