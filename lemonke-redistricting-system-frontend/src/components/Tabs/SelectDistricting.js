import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import RadvizD3 from '../../D3/RadvizD3';
import * as Actions from '../../actions';


function SelectDistricting(props) {

    const dispatch = useDispatch();

    const [districtingSet, setDistrictingSet] = useState([]);
    const [selectedGeoJSON, setSelectedGEOJSON] = useState("");
    //select an item in the list to highlight
    //handles collapsing of the array
    const [selectedIndex, setSelectedIndex] = useState();
    const [collapseArray, updateCollapseArray] = useState(new Array(10).fill(false));
    //pick the set to display
    const [selectedCategory, setCategory] = useState('bestDistricts');
    const [newLoad, setNewLoad] = useState(true);
    const radvizData = useSelector(state => state.constrainedSet)



    //TODO set the districting when the item is clicked via the districting ID
    const handleListItemClick = async (index) => {
        setSelectedIndex(index);
        updateCollapseArray(collapseArray => collapseArray.map((item, idx) => idx === index ? !item : false))
        // props.selectedDistrictingId = districtingSet[index][Object.keys(districtingSet)];
        console.log(districtingSet[selectedCategory][index]["GeoJSON"]);
        props.parentCallback(districtingSet[selectedCategory][index]["GeoJSON"]);
    };

    const handleSetChange = (event) => {
        setCategory(event.target.value);
        setSelectedIndex();
        updateCollapseArray(collapseArray => collapseArray.map((item, idx) => false))
    };





    // console.log(props.selectedDistrictId);

    useEffect(() => {
        console.log('update')
        //load a new json
        if (newLoad) {
            axios.get('./fakeDistrictingSets.json').then(res => {
                // console.log(res.data);
                let districtingData = [];
                districtingData['bestDistricts'] = res.data.bestDistricts
                districtingData['closeToEnacted'] = res.data.closeToEnacted
                districtingData['majorityMinority'] = res.data.majorityMinority
                districtingData['areaPairDeviation'] = res.data.areaPairDeviation
                setDistrictingSet(districtingData);
                // console.log(districtingData);
            });
        } else {
            setNewLoad(false);
        }

        return () => {
            // cleanup
        }
    }, [])



    //creates the JSX list of districtings
    function getList() {
        let listOptions;
        if (Object.keys(districtingSet).length !== 0) {
            switch (selectedCategory) {
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
            // console.log(listOptions);
            return createDistrictingList(listOptions);
        } else {
            return;
        }
    }

    function createDistrictingList(listOfDistrictings) {
        let listItems = [];
        for (let i = 0; i < listOfDistrictings.length; i++) {
            let item = <div>
                <ListItem button
                    selected={selectedIndex === i}
                    onClick={() => {
                        handleListItemClick(i);
                    }}>
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
            </div>

            listItems.push(item);
            if (i !== listOfDistrictings.length - 1) {
                listItems.push(<Divider />);
            }
        }
        return listItems;
    }

    function createDistrictingListItems(districting) {
        let categories = Object.keys(districting)
        let container = []
        // console.log(categories)
        for (let i = 0; i < categories.length - 1; i++) {
            if (categories[i] === "OFScore") {
                continue;
            }
            container.push(<ListItem>
                <ListItemText
                    primary={categories[i] + ": " + districting[categories[i]]}
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

    let labelsMappings = {
        'geometricCompactness': 'Compactness',
        'totalPopulation': 'Total Pop Diff',
        'totalPopulationEquality': 'Total Pop Eq'
    }

    async function handleClick(i, d) {
        let original = d['data']
        console.log(original['districtingSummaryId'])
        let id = original['districtingSummaryId']
        let res = await axios(`http://localhost:8080/lemonke/districtings/${id}`)
        let districting = res.data;
        let res2 = await axios(`http://localhost:8080/lemonke/districtings/${id}/geometry`)
        districting.geometry = res2.data;
        dispatch(Actions.setSelectedDistricting(districting));
        dispatch(Actions.setDisplayedDistricting(districting));
    }
    return (
        <div style={{ overflow: 'auto'}}>
            <h2>Select Districting</h2>
            {useMemo(() => (<RadvizD3 labels={labelsMappings} content={radvizData} handleMouseClick={handleClick} zoom={true} colorAccessor={null} textLabel={null} />), [radvizData])}
            <FormControl>
                <Select
                    value={selectedCategory}
                    onChange={handleSetChange}
                >
                    <MenuItem value={'bestDistricts'}>Best Districtings</MenuItem>
                    <MenuItem value={'closeToEnacted'}>Close to Enacted</MenuItem>
                    <MenuItem value={'majorityMinority'}>Best Majority Minority</MenuItem>
                    <MenuItem value={'areaPairDeviation'}>Different Area Pair-Deviations</MenuItem>
                </Select>
            </FormControl>
            <List style = {{ overflow :'auto' , maxHeight : '50%'}} >
                {getList()}
            </List>
            <div style={{ left: '5%', bottom: '2%', position: 'fixed' }}>
                <div>
                    <Button onClick={() => dispatch(Actions.decrementStep())} >
                        Back
		  			</Button>
                    <Button
                        disabled={selectedIndex == null}
                        variant="contained"
                        color="primary"
                        onClick={() => console.log("TODO")}>
                        Display
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
    );
}

export default SelectDistricting;


