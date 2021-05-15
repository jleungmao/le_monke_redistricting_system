import { useEffect, useState } from 'react';
import Boxplot from '../../components/Boxplot';
import { Route } from 'react-router-dom';
import List from '@material-ui/core/List';
import axios from 'axios';
import { Dialog, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import RadvizD3 from '../../D3/RadvizD3';
import { useSelector } from 'react-redux';

function ShowData(props) {

    const [selectedDistrict, setSelectedDistrict] = useState('none')
    const selectedDistricting = useSelector(state => state.selectedDistricting)
    const [selectedIndex, setSelectedIndex] = useState();
    const [collapseArray, updateCollapseArray] = useState(new Array(27).fill(false));
    const [open, setOpen] = useState(false);




    useEffect(() => {
        if (selectedDistricting.districts) {
            updateCollapseArray(new Array(selectedDistricting.districts.length).fill(false));
        }

        return () => {
            //cleanup
        }
    }, [selectedDistricting])

    const handleSetChange = (event) => {
        console.log(event);
        setSelectedDistrict(event.target.value);
    }

    function getDistricts() {
        // if (selectedDistricting.districts) {
        //     console.log(selectedDistricting.districts);
        //     let districtObject = selectedDistricting.districts;
        //     return createDistrictListItems(districtObject);
        // }
    }

    function createDistrictListItems(district) {
        let categories = Object.keys(district)
        let container = [];
        for (let i = 0; i < categories.length - 1; i++) {
            container.push(
                <TableRow>
                    <TableCell align="left">
                        {categories[i]}
                    </TableCell>
                    <TableCell align="left">
                        {district[categories[i]]}
                    </TableCell>
                </TableRow>
            );
        }

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data Names</TableCell>
                            <TableCell>Values</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {container}
                    </TableBody>
                </Table>
            </TableContainer>
        );

    }


    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    function DialogContainer() {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {/* {<Route exact path='/' component={<Boxplot />}></Route>} */}
                        <Boxplot x={[1, 2, 3, 4, 5, 6, 7]} y={[[1, 2, 3, 3, 424], [334, 5, 4, 3, 5, 46, 45]]} />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            <Grid item xs={12} style={{ padding: '10px' }}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Display Box & whisker Plot.
                </Button>
            </Grid>
            <Grid item xs={12} style={{ padding: '10px' }}>
                <DialogContainer />
                <FormControl>
                    <Select
                        value={selectedDistrict}
                        onChange={handleSetChange}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        <MenuItem value={'district1'}>District 1</MenuItem>
                    </Select>
                </FormControl>
                <RadvizD3 labels={null} content={null} colorAccessor={null} textLabel={null} zoom={true} />
                {getDistricts()}
            </Grid>
        </div>
    )
}

export default ShowData;

