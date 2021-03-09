import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import classes from './SelectDistricting.module.css';


function SelectDistricting(props) {

    const [districtingSet, setDistrictingSet] = React.useState([]);
    console.log(props.selectedDistrictId);
    useEffect(() => {
        console.log('update')
        axios.get('./fakeDistrictingSets.json').then(res => {
            // console.log(res.data);
            let districtingData = [];
            districtingData['bestDistricts'] = res.data.bestDistricts
            districtingData['closeToEnacted'] = res.data.closeToEnacted
            districtingData['majorityMinority'] = res.data.majorityMinority
            districtingData['areaPairDeviation'] = res.data.areaPairDeviation
            setDistrictingSet(districtingData);
        });
        return () => {
            // cleanup
        }
    }, [])


    //pick the set to display
    const [selectedSet, setToChangeTo] = React.useState('bestDistricts');

    const handleSetChange = (event) => {
        setToChangeTo(event.target.value);
    };


    //creates the JSX list of districtings
    function getList() {
        let listOptions;
        if (Object.keys(districtingSet).length != 0) {
            switch (selectedSet) {
                case 'bestDistricts':
                    listOptions = sortDistrictings(districtingSet['bestDistricts']);
                    break;
                case 'closeToEnacted':
                    listOptions = sortDistrictings(districtingSet['closeToEnacted']);
                    break;
                case 'majorityMinority':
                    listOptions = sortDistrictings(districtingSet['majorityMinority']);
                    break;
                case 'areaPairDeviation':
                    listOptions = sortDistrictings(districtingSet['areaPairDeviation']);
                    break;
            }
            console.log(listOptions);
            return createDistrictingList(listOptions);
        } else {
            return;
        }
    }

    function createDistrictingList(listOfDistrictings) {
        let listItems = [];
        for (let i = 0; i < listOfDistrictings.length; i++) {
            let item = <>
                <ListItem button
                    selected={selectedIndex === i}
                    onClick={(event) => handleListItemClick(event, i)}>
                    <ListItemText
                        primary={"Districting " + (i + 1)}
                        secondary={"Objective Function Score: " + listOfDistrictings[i]["OFScore"]}
                    />
                </ListItem>
                <Collapse in={collapseArray[i]}>
                    <List dense={true}>
                        {createDistrictingListItems(listOfDistrictings[i])}
                    </List>
                </Collapse>
            </>

            listItems.push(item);
            if (i != listOfDistrictings.length - 1) {
                listItems.push(<Divider />);
            }
        }
        return listItems;
    }

    function createDistrictingListItems(districting) {
        let categories = Object.keys(districting)
        let container = []
        // console.log(categories)
        for(let i = 0; i<categories.length - 1; i++){
            if(categories[i] == "OFScore"){
                continue;
            }
            container.push(<ListItem>
                <ListItemText
                        primary={categories[i] +": "+districting[categories[i]]}
                    />
            </ListItem>);
        }
        return container;
    }


    function sortDistrictings(districtings) {
        for (let i = 0; i < districtings.length; i++) {
            let indexOfMax = i;
            for (let j = i; j < districtings.length; j++) {
                if (districtings[j].OFScore > districtings[indexOfMax]["OFScore"]) {
                    indexOfMax = j;
                }
            }
            let temp = districtings[indexOfMax];
            districtings[indexOfMax] = districtings[i];
            districtings[i] = temp;
        }
        return districtings
    }

    //select an item in the list to highlight
    //handles collapsing of the array
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [collapseArray, updateCollapseArray] = React.useState(new Array(10).fill(false));
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        updateCollapseArray(collapseArray => collapseArray.map((item, idx) => idx === index ? !item : false))
    };


    return (
        <>
            <FormControl>
                <Select
                    value={selectedSet}
                    onChange={handleSetChange}
                >
                    <MenuItem value={'bestDistricts'}>Best Districtings</MenuItem>
                    <MenuItem value={'closeToEnacted'}>Close to Enacted</MenuItem>
                    <MenuItem value={'majorityMinority'}>Best Majority Minority</MenuItem>
                    <MenuItem value={'areaPairDeviation'}>Different Area Pair-Deviations</MenuItem>
                </Select>
            </FormControl>
            {/* <List component="nav" aria-label="main mailbox folders"> */}
            <List style={{ width: '27%', maxHeight: '55%', overflow: 'auto', position: 'fixed' }} >
                {getList()}
            </List>
        </>
    );
}

export default SelectDistricting;


