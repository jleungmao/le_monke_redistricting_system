import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../actions';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        minWidth: '100px'
    },
    pos: {
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    rail: {
        height: 24,
        width: "14px !important",
        borderRadius: 24,
        opacity: 1,
    },
    districtingCount: {
        background: 'linear-gradient(45deg, #4863A0 30%,#98AFC7  90%)',
        color: 'white',
        padding: '5px',
        borderRadius: 5,
    }
}));


function SetMeasures() {

    const classes = useStyles();
    const measures = useSelector(state => state.measures);
    const dispatch = useDispatch();
    const [remainingDistrictings, setRemainingDistrictings] = useState('...');
    const constrainedSet = useSelector(state => state.constrainedSet);


    const marks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 1,
            label: '1'
        }
    ]

    useEffect(() => {
        if (constrainedSet) {
            setRemainingDistrictings(constrainedSet.length);
        }
    }, [constrainedSet])


    return (
        <div>
            <h2 className = {classes.districtingCount}>Remaining Districtings: {remainingDistrictings}</h2>
            <div className={classes.root}>
                <h2>Set Objective Function Weight</h2>
                {/* <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
            > */}
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom >Population equality</Typography>
                        <Slider
                            defaultValue={measures['popEq']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setPopulationEqualityWeight(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Split counties</Typography>
                        <Slider
                            disabled={true}
                            defaultValue={measures['splitCounty']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setSplitCountyWeight(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Deviation from average districting</Typography>
                        <Slider
                            defaultValue={measures['devFromAvg']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setDevFromAvgWeight(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Deviation from enacted area</Typography>
                        <Slider
                            defaultValue={measures['devFromEnactedArea']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setDevFromEnactedPlanArea(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Deviation from enacted population</Typography>
                        <Slider
                            defaultValue={measures['devFromEnactedPop']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setDevFromEnactedPlanPopulation(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Compactness</Typography>
                        <Slider
                            defaultValue={measures['compactness']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setCompactnessWeight(val))}
                            marks={marks}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <Typography gutterBottom>Political Fairness</Typography>
                        <Slider
                            disabled={true}
                            defaultValue={measures['polFairness']}
                            step={0.01}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            onChangeCommitted={(event, val) => dispatch(Actions.setPoliticalFairnessWeight(val))}
                            marks={marks}
                        />
                    </Grid>
                </GridList>
            </div >
            <div style={{ left: '5%', bottom: '2%', position: 'fixed', backgroundColor: 'white' }}>
                <div>
                    <Button onClick={() => dispatch(Actions.decrementStep())} >
                        Back
		  			</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // axios.post('http://localhost:8080/lemonke/setMeasures', {
                            // 	measures
                            // }).then(function (response) {
                            // 	console.log(response);
                            // });
                            dispatch(Actions.incrementStep());
                        }}>
                        Next
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
    )
}

export default SetMeasures;