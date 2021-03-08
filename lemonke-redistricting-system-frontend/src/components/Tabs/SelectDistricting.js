import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';



function Something(){
    let districtingSet;
    axios.get('../../data/fakeDistrictingSets.json').then(res =>{
        console.log(res.data);
        districtingSet = res.data;
    })
}

function SelectedListItem() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div>
            {/* <List component="nav" aria-label="main mailbox folders"> */}
            <List>
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary="Inbox" />
                </ListItem>
            <Divider />
                <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary="Drafts" />
                </ListItem>
            </List>
        </div>
    );
}

export default SelectedListItem;


