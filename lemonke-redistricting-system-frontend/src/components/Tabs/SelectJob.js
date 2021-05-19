import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedJob, incrementStep, decrementStep } from '../../actions';
import * as Actions from '../../actions';
import { Collapse } from '@material-ui/core';

function SelectJob(props) {

    // const [selectedIndex, setSelectedIndex] = useState([0,"# of Districtings: 100,243. (More info about job 1)"]);
    const [selectedIndex, setSelectedIndex] = useState();
    const stateID = useSelector(state => state.selectedState.stateId);
    const [jobList, setJobList] = useState([]);
    const dispatch = useDispatch();
    const [minorities, setMinorities] = useState([]);
    const selectedMinority = useSelector(state => state.selectedMinority);
    const [collapseArray, updateCollapseArray] = useState([false]);



    useEffect(() => {

        async function fetchData() {
            let res = await axios(`http://localhost:8080/lemonke/states/${stateID}/available-ethnicities`);
            setMinorities(res.data);


            let res2 = await axios(`http://localhost:8080/lemonke/states/${stateID}/job-summaries`);
            let joblist = res2.data;
            setJobList(joblist);
            updateCollapseArray(new Array(joblist.length).fill(false));

        }

        fetchData();
    }, [])


    const minorityEnumToDisplay = (minority) => {
        switch (minority) {
            case 'BLACK':
                return 'Black';
            case 'WHITE':
                return 'White';
            case 'HISPANIC':
                return 'Hispanic';
            case 'ASIAN':
                return 'Asian';
            case 'AMERICAN_INDIAN':
                return 'American Indian';
            case 'OTHER':
                return 'Other';
            default:
                break;
        }
    }


    const handleSelectJob = (event, index) => {
        setSelectedIndex(index);
        dispatch(setSelectedJob(jobList[index]));
        updateCollapseArray(collapseArray => collapseArray.map((item, idx) => idx === index ? !item : false));
        console.log(collapseArray);
    }

    return (
        <div>
            <h2>Select Minority Group</h2>
            <Select
                value={selectedMinority}
                onChange={(e) => dispatch(Actions.setMinority(e.target.value))}
            >
                {minorities.map(val => (<MenuItem value={val}>{minorityEnumToDisplay(val)}</MenuItem>))}
            </Select>
            <h2>Select Job</h2>
            <List component="nav" aria-label="job lists">
                {jobList.map((data, index) =>
                    <ListItem button
                        key={jobList[index].jobId}
                        selected={selectedIndex === index}
                        onClick={(event) => {
                            handleSelectJob(event, index)
                        }}>
                        <ListItemText
                            key={jobList[index].jobId}
                            primary={"Name: " + jobList[index].name}
                            secondary={<div>
                                <div>Number of Districtings: {jobList[index].numberDistrictings}</div>
                                <Collapse in={collapseArray[index]}>
                                    <div>Number of Rounds: {jobList[index].numberRounds}</div>
                                    <div>Cooling periods: {jobList[index].coolingPeriods}</div>
                                    <div>Number of Runs: {jobList[index].numberRuns}</div>
                                    <div>Maximum Population Difference: {jobList[index].maxPopDiffPercentage}%</div>
                                </Collapse>
                            </div>
                            }></ListItemText>
                    </ListItem>
                )}
            </List>

            <div style={{ left: '5%', bottom: '2%', position: 'fixed', backgroundColor: 'white' }}>
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

export default SelectJob;