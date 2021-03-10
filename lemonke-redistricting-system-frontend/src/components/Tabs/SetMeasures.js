import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

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
    }
}));


function SetMeasures() {

    const classes = useStyles();

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



    return (
        <div className={classes.root}>
            <h2>Set Objective Function Weight</h2>
            <h3>Remaining: 1000</h3>
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
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <Typography gutterBottom>Split counties</Typography>
                    <Slider
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <Typography gutterBottom>Deviation from average districting</Typography>
                    <Slider
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <Typography gutterBottom>Deviation from enacted plan</Typography>
                    <Slider
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <Typography gutterBottom>Compactness</Typography>
                    <Slider
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                    <Typography gutterBottom>Political Fairness</Typography>
                    <Slider
                        defaultValue={0.5}
                        step={0.01}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Grid>
            </GridList>
            {/* </Grid> */}
        </div >
    )
}

export default SetMeasures;