import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { PinDropSharp } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedJob, incrementStep, decrementStep } from '../../actions';
import * as Actions from '../../actions';

function SelectJob(props) {

    // const [selectedIndex, setSelectedIndex] = React.useState([0,"# of Districtings: 100,243. (More info about job 1)"]);
    const [selectedIndex, setSelectedIndex] = React.useState();
    const stateID = useSelector(state => state.selectedState.stateId);
    const [jobList, setJobList] = React.useState([]);
    const dispatch = useDispatch();
    const [minorities, setMinorities] = React.useState([]);
    const selectedMinority = useSelector(state => state.selectedMinority);



    useEffect(() => {

        async function fetchData() {
            let res = await axios(`http://localhost:8080/lemonke/states/${stateID}/available-ethnicities`);
            setMinorities(res.data);


            let res2 = await axios(`http://localhost:8080/lemonke/states/${stateID}/job-summaries`);
            setJobList(res2.data);


        }

        fetchData();
    }, [])
    return (
        <>
            <h2>Select Minority Group</h2>
            <Select
                value={selectedMinority}
                onChange={(e) => dispatch(Actions.setMinority(e.target.value))}
            >
                {minorities.map(val => (<MenuItem value={val}>{val}</MenuItem>))}
            </Select>
            <h2>Select Job</h2>
            <List component="nav" aria-label="job lists">
                {jobList.map((data, index) =>
                    <ListItem button
                        key={jobList[index].jobId}
                        selected={selectedIndex === index}
                        onClick={(event) => {
                            setSelectedIndex(index);
                            dispatch(setSelectedJob(jobList[index]));
                            console.log(jobList);
                        }}>
                        <ListItemText
                            primary={"Job " + jobList[index].jobId}
                            secondary={<div>
                                <div>Number of Districtings: {jobList[index].numberDistrictings}</div>
                                <div>Number of Rounds: {jobList[index].numberRounds}</div>
                                <div>Cooling period: {jobList[index].coolingPeriod}</div>
                            </div>
                            }></ListItemText>
                    </ListItem>
                )}
            </List>

            <div style={{ left: '5%', bottom: '2%', position: 'fixed' }}>
                <div>
                    <Button onClick={() => {
                        dispatch(decrementStep());
                    }} >
                        Back
		  			</Button>
                    <Button
                        disabled={selectedIndex == null}
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

export default SelectJob;