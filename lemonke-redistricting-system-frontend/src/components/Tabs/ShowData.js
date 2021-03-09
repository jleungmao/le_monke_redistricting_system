import React, { useEffect, useState } from 'react';
import Boxplot from '../Boxplot';
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

function ShowData(props) {

    const [districtSet, setDistrictSet] = React.useState([]);

    useEffect(() => {
        axios.get('./fakeDistrictSets.json').then(res => {
            let districtsData = [];
            districtsData['district1'] = res.data.district1
            districtsData['district2'] = res.data.district2
            districtsData['district3'] = res.data.district3
            districtsData['district4'] = res.data.district4
            districtsData['district5'] = res.data.district5
            districtsData['district6'] = res.data.district6
            districtsData['district7'] = res.data.district7
            districtsData['district8'] = res.data.district8
            districtsData['district9'] = res.data.district9
            districtsData['district10'] = res.data.district10
            districtsData['district11'] = res.data.district11
            districtsData['district12'] = res.data.district12
            districtsData['district13'] = res.data.district13
            districtsData['district14'] = res.data.district14
            districtsData['district15'] = res.data.district15
            districtsData['district16'] = res.data.district16
            districtsData['district17'] = res.data.district17
            districtsData['district18'] = res.data.district18
            districtsData['district19'] = res.data.district19
            districtsData['district20'] = res.data.district20
            districtsData['district21'] = res.data.district21
            districtsData['district22'] = res.data.district22
            districtsData['district23'] = res.data.district23
            districtsData['district24'] = res.data.district24
            districtsData['district25'] = res.data.district25
            districtsData['district26'] = res.data.district26
            districtsData['district27'] = res.data.district27

            setDistrictSet(districtsData);
        });
        return () => { }
    }, [])

    const [selectedIndex, setSelectedIndex] = React.useState();
    const [collapseArray, updateCollapseArray] = React.useState(new Array(27).fill(false));

    const handleSetChange = (event) => {
        setToChangeTo(event.target.value);
    }

    const [selectedSet, setToChangeTo] = React.useState('district1');

    function getDistricts() {
        let listOptions;
        if (Object.keys(districtSet).length != 0) {
            switch (selectedSet) {
                case 'district1':
                    listOptions = districtSet['district1'];
                    break;
                case 'district2':
                    listOptions = districtSet['district2'];
                    break;
                case 'district3':
                    listOptions = districtSet['district3'];
                    break;
                case 'district4':
                    listOptions = districtSet['district4'];
                    break;
                case 'district5':
                    listOptions = districtSet['district5'];
                    break;
                case 'district6':
                    listOptions = districtSet['district6'];
                    break;
                case 'district7':
                    listOptions = districtSet['district7'];
                    break;
                case 'district8':
                    listOptions = districtSet['district8'];
                    break;
                case 'district9':
                    listOptions = districtSet['district9'];
                    break;
                case 'district10':
                    listOptions = districtSet['district10'];
                    break;
                case 'district11':
                    listOptions = districtSet['district11'];
                    break;
                case 'district12':
                    listOptions = districtSet['district12'];
                    break;
                case 'district13':
                    listOptions = districtSet['district13'];
                    break;
                case 'district14':
                    listOptions = districtSet['district14'];
                    break;
                case 'district15':
                    listOptions = districtSet['district15'];
                    break;
                case 'district16':
                    listOptions = districtSet['district16'];
                    break;
                case 'district17':
                    listOptions = districtSet['district17'];
                    break;
                case 'district18':
                    listOptions = districtSet['district18'];
                    break;
                case 'district19':
                    listOptions = districtSet['district19'];
                    break;
                case 'district20':
                    listOptions = districtSet['district20'];
                    break;
                case 'district21':
                    listOptions = districtSet['district21'];
                    break;
                case 'district22':
                    listOptions = districtSet['district22'];
                    break;
                case 'district23':
                    listOptions = districtSet['district23'];
                    break;
                case 'district24':
                    listOptions = districtSet['district24'];
                    break;
                case 'district25':
                    listOptions = districtSet['district25'];
                    break;
                case 'district26':
                    listOptions = districtSet['district26'];
                    break;
                case 'district27':
                    listOptions = districtSet['district27'];
                    break;
            }
            console.log(listOptions);
            return createDistrictListItems(listOptions);
        } else {
            return;
        }
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

    const [open, setOpen] = useState(false);

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
        <>
            <Grid item xs={12} style={{ padding: '10px' }}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Display Box & whisker Plot.
            </Button>
            </Grid>
            <Grid item xs={12} style={{ padding: '10px' }}>
                <DialogContainer />
                <FormControl>
                    <Select
                        value={selectedSet}
                        onChange={handleSetChange}
                    >
                        <MenuItem value={'district1'}>District 1</MenuItem>
                        <MenuItem value={'district2'}>District 2</MenuItem>
                        <MenuItem value={'district3'}>District 3</MenuItem>
                        <MenuItem value={'district4'}>District 4</MenuItem>
                        <MenuItem value={'district5'}>District 5</MenuItem>
                        <MenuItem value={'district6'}>District 6</MenuItem>
                        <MenuItem value={'district7'}>District 7</MenuItem>
                        <MenuItem value={'district8'}>District 8</MenuItem>
                        <MenuItem value={'district9'}>District 9</MenuItem>
                        <MenuItem value={'district10'}>District 10</MenuItem>
                        <MenuItem value={'district11'}>District 11</MenuItem>
                        <MenuItem value={'district12'}>District 12</MenuItem>
                        <MenuItem value={'district13'}>District 13</MenuItem>
                        <MenuItem value={'district14'}>District 14</MenuItem>
                        <MenuItem value={'district15'}>District 15</MenuItem>
                        <MenuItem value={'district16'}>District 16</MenuItem>
                        <MenuItem value={'district17'}>District 17</MenuItem>
                        <MenuItem value={'district18'}>District 18</MenuItem>
                        <MenuItem value={'district19'}>District 19</MenuItem>
                        <MenuItem value={'district20'}>District 20</MenuItem>
                        <MenuItem value={'district21'}>District 21</MenuItem>
                        <MenuItem value={'district22'}>District 22</MenuItem>
                        <MenuItem value={'district23'}>District 23</MenuItem>
                        <MenuItem value={'district24'}>District 24</MenuItem>
                        <MenuItem value={'district25'}>District 25</MenuItem>
                        <MenuItem value={'district26'}>District 26</MenuItem>
                        <MenuItem value={'district27'}>District 27</MenuItem>
                    </Select>
                </FormControl>
                {getDistricts()}
            </Grid>
        </>
    )
}

export default ShowData;

