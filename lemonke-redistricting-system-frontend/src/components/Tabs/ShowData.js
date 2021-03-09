import React, { useEffect } from 'react';
import Boxplot from '../Boxplot';
import { Route } from 'react-router-dom';
import List from '@material-ui/core/List';
import axios from 'axios';
import { ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

function ShowData(props) {

    const [districtSet, setDistrictSet] = React.useState();

    useEffect(() => {
        axios.get('./fakeDistrictSets.json').then(res => {
            setDistrictSet(res.data.ofsContributer);
        });
        return () => { }
    }, [])

    const [selectedIndex, setSelectedIndex] = React.useState();
    const [collapseArray, updateCollapseArray] = React.useState(new Array(27).fill(false));
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        updateCollapseArray(collapseArray => collapseArray.map((item, idx) => idx === index ? !item : false))
    };

    function sortDistricts(districts) {
        for (let i = 0; i < districts.length; i++) {
            let indexOfMax = i;
            for (let j = i; j < districts.length; j++) {
                if (districts[j].MinorityPercentage > districts[indexOfMax]["MinorityPercentage"]) {
                    indexOfMax = j;
                }
            }
            let temp = districts[indexOfMax];
            districts[indexOfMax] = districts[i];
            districts[i] = temp;
        }
        return districts
    }


    function getList() {
        if (districtSet != undefined) {
            let listOfDistricts = sortDistricts(districtSet);
            let listItems = [];
            for (let i = 0; i < listOfDistricts.length; i++) {
                let item = <>
                    <ListItem button
                        selected={selectedIndex === i}
                        onClick={(event) => handleListItemClick(event, i)}>
                        <ListItemText
                            primary={"District " + (i + 1)}
                        />
                    </ListItem>
                    <Collapse in={collapseArray[i]}>
                        <List dense={true}>
                            {createDistrictListItems(listOfDistricts[i])}
                        </List>
                    </Collapse>
                </>

                listItems.push(item);
                if (i != listOfDistricts.length - 1) {
                    listItems.push(<Divider />);
                }
            }
            return listItems;
        }
        else {
            return;
        }
    }

    function createDistrictListItems(district) {
        let categories = Object.keys(district)
        let container = []
        for (let i = 0; i < categories.length - 1; i++) {
            if (categories[i] == "Minority Percentage") {
                continue;
            }
            container.push(<ListItem>
                <ListItemText
                    primary={categories[i] + ": " + district[categories[i]]}
                />
            </ListItem>);
        }

        return container;
    }

    return (
        <>
            {<Route exact path='/' component={Boxplot}></Route>}
            <List style={{ width: '30%', maxHeight: '50%', overflow: 'auto', position: 'fixed' }} >
                {getList()}
            </List>
        </>
    )
}

export default ShowData;

