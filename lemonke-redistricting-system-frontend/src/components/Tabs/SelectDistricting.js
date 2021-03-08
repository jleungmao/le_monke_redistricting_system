import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';



function Something(){
    let districtingSet;
    axios.get('../../data/fakeDistrictingSets.json').then(res =>{
        console.log(res.data);
        districtingSet = res.data;
    })
}

function SelectedListItem() {
    const [selectedIndex, setSelectedIndex] = React.useState([0,""]);

    const handleListItemClick = (event, index, text) => {
        setSelectedIndex([index, text]);
    };

    return (
        <div>
            {/* <List component="nav" aria-label="main mailbox folders"> */}
            <List>
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, [0, ])}
                >
                    <ListItemText primary="Districting 1" />
                </ListItem>
            <Divider />
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, [1,])}
                >
                    <ListItemText primary="Districting 2" />
                </ListItem>
            </List>
            <Typography>{selectedIndex[1]}</Typography>
        </div>
    );
}

export default SelectedListItem;


