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
import RadvizD3 from '../../D3/RadvizD3';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../actions';

function ShowData(props) {

    const displayedDistricting = useSelector(state => state.displayedDistricting)
    const selectedDistrict = useSelector(state => state.selectedDistrict);
    const [selectedIndex, setSelectedIndex] = useState();
    const [collapseArray, updateCollapseArray] = useState(new Array(27).fill(false));
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const radvizData = useSelector(state => state.constrainedSet)


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
            dispatch(Actions.setSelectedDistrict(findDistrictById(event.target.value)));
        }
    }

    const findDistrictById = (id) => {
        for (let district of displayedDistricting.districts) {
            if (district.districtId === id) {
                return district;
            }
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
                        value={selectedDistrict.districtId}
                        onChange={selectDistrict}
                    >
                        <MenuItem value={'none'}>None</MenuItem>
                        {getMenuItems()}
                    </Select>
                </FormControl>
                {useMemo(() => (<RadvizD3 labels={labelsMappings} content={radvizData} handleMouseClick={handleClick} zoom={true} colorAccessor={null} textLabel={null} />), [radvizData])}
                <div>{(radvizData != null) && radvizData.length}</div>
                {getDistricts()}
            </Grid>
        </div>
    )
}

export default ShowData;

