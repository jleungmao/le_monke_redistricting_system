import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function SelectJob() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleSelectedList = (event, index) => {
        setSelectedIndex(index);
    }


    return (
        <>
            <h5>Select Job</h5>

            <List component = "nav" aria-labe="job lists">
                <ListItem button 
                selected={selectedIndex === 0} 
                onClick={(event) => handleSelectedList(event, 0)}>
                    <ListItemText primary="Job 1" secondary="New York, 27 districtings, (Some MGGG code param)"></ListItemText>
                </ListItem>
                <ListItem button
                selected={selectedIndex === 1} 
                onClick={(event) => handleSelectedList(event, 1)}>
                    <ListItemText primary="Job 2" secondary="New York, 28 districtings, (Another MGGG code param)"></ListItemText>
                </ListItem>
                <ListItem button
                selected={selectedIndex === 2} 
                onClick={(event) => handleSelectedList(event, 2)}>
                    <ListItemText primary="Job 3" secondary="New York, 26 districtings, (Another MGGG code param)"></ListItemText>
                </ListItem>
            </List>
        </>
    )
}

export default SelectJob;