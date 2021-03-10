import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { PinDropSharp } from '@material-ui/icons';

function SelectJob() {

    const [selectedIndex, setSelectedIndex] = React.useState([0,"# of Districtings: 100,243. (More info about job 1)"]);

    const handleSelectedList = (event, index, text) => {
        setSelectedIndex([index,text]);
    }


    return (
        <>
            <h2>Select Job</h2>
            <List component = "nav" aria-labe="job lists">
                <ListItem button 
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
                </ListItem>
            </List>
            <Typography>{selectedIndex[1]}</Typography>
        </>
    )
}

export default SelectJob;