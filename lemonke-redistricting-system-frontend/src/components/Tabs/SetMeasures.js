import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function SetMeasures() {

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
        <>
            <h5>Set Objective Function Weight</h5>
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Population equality
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
            <br />
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Split counties
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Deviation from average districting
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Deviation from enacted plan
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Compactness
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Political Fairness
      				</Typography>
            <Slider
                defaultValue={0.5}
                aria-labelledby="discrete-slider"
                step={0.01}
                min={0}
                max={1}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </>
    )
}

export default SetMeasures;