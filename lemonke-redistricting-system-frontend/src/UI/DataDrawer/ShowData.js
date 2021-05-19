import { useEffect, useState, useMemo } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../actions';

function ShowData(props) {

    const displayedDistricting = useSelector(state => state.displayedDistricting)
    const selectedDistrict = useSelector(state => state.selectedDistrictId);
    const [selectedIndex, setSelectedIndex] = useState();
    const [collapseArray, updateCollapseArray] = useState(new Array(27).fill(false));
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (displayedDistricting.districts) {
            updateCollapseArray(new Array(displayedDistricting.districts.length).fill(false));
        }
        dispatch(Actions.resetSelectedDistrict())
        return () => {
            //cleanup
        }
    }, [displayedDistricting])

    function getDistrictingInfo() {
        let container = [];


        if (displayedDistricting) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Measure</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {container}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

    }



    const selectDistrict = (event) => {
        console.log(event);
        if (event.target.value === 'none') {
            dispatch(Actions.resetSelectedDistrict());
        } else {
            dispatch(Actions.setSelectedDistrict(event.target.value));
        }
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function BasicDemographicInfo() {
        if (selectedDistrict !== 'none') {
            let district;
            if(displayedDistricting.districts){
                for (let i = 0; i < displayedDistricting.districts.length; i++) {
                    if (displayedDistricting.districts[i].districtId === selectedDistrict) {
                        district = displayedDistricting.districts[i];
                    }
                }
            }
            if (district) {
                let populations = [0, 0, 0, 0, 0, 0, 0]
                let percentages = [0, 0, 0, 0, 0, 0]
                for (let i = 0; i < district.precincts.length; i++) {
                    populations[1] += district.precincts[i].totWhite;
                    populations[2] += district.precincts[i].totBlack;
                    populations[3] += district.precincts[i].totHisp;
                    populations[4] += district.precincts[i].totAsian;
                    populations[5] += district.precincts[i].totAIndian;
                    populations[6] += district.precincts[i].totOther;
                }
                populations[0] = populations[1] + populations[2] + populations[3] + populations[4] + populations[5] + populations[6];
                for (let i = 0; i < percentages.length; i++) {
                    percentages[i] = Math.round((populations[i + 1] / populations[0] * 100 + Number.EPSILON) * 100) / 100;
                }
                return <div>
                    <div>Total Population: {numberWithCommas(populations[0])}</div>
                    <div>White Population: {numberWithCommas(populations[1])}  ({percentages[0]}%)</div>
                    <div>Black Population: {numberWithCommas(populations[2])}  ({percentages[1]}%)</div>
                    <div>Hispanic Population: {numberWithCommas(populations[3])}  ({percentages[2]}%)</div>
                    <div>Asian Population: {numberWithCommas(populations[4])}  ({percentages[3]}%)</div>
                    <div>American Indian Population: {numberWithCommas(populations[5])}  ({percentages[4]}%)</div>
                    <div>Other Population: {numberWithCommas(populations[6])}  ({percentages[5]}%)</div>
                </div>
            } else {

                return null
            }

        } else {
            return null
        }
    }

    function getDistricts() {
        let container = [];
        for (let district in displayedDistricting.districts) {
            container.push(
                <TableRow>
                    <TableCell align="left">
                        { }
                    </TableCell>
                    <TableCell align="left">
                        { }
                    </TableCell>
                </TableRow>
            );
        }

        if (displayedDistricting.districts) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Property</TableCell>
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

    }


    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    function getMenuItems() {
        if (displayedDistricting.districts) {
            return displayedDistricting.districts.map((data, index) => <MenuItem value={data.districtId}>
                District {index + 1}
            </MenuItem>)
        }
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
                        {<Route exact path='/' component={Boxplot}></Route>}
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

            {/* <Grid item xs={12} style={{ padding: '10px' }}>
                <h1>Districting Information</h1>
                {getDistrictingInfo()}
            </Grid> */}

            <Grid item xs={12} style={{ padding: '10px' }}>
                <DialogContainer />
                <FormControl>
                    <Select
                        value={selectedDistrict}
                        onChange={selectDistrict}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        {getMenuItems()}
                    </Select>
                </FormControl>
                <BasicDemographicInfo></BasicDemographicInfo>
            </Grid>
            <Grid item xs={12} style={{ padding: '10px' }}>
                {getDistricts()}
            </Grid>
        </div>
    )
}

export default ShowData;

