import React, { useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function ProgressBar(props) {

	const [activeStep, setActiveStep] = useState(1);


	function getStepContent(step) {
		switch (step) {
			case 0:
				return 'Select campaign settings...';
			case 1:
				return 'What is an ad group anyways?';
			case 2:
				return 'This is the bit I really care about!';
			default:
				return 'Unknown step';
		}
	}

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};


	return (
		<div>
			{props.stepsList &&
				<Stepper alternativeLabel activeStep={props.activeStep}>
					{props.stepsList.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			}
			{/* <div>
				{props.stepsList && activeStep === props.stepsList.length ? (
					<div>
						<Typography >
							All steps completed - you&apos;re finished
            			</Typography>
						<Button onClick={handleReset} >
							Reset
            			</Button>
					</div>
				) : (
					<div>
						<Typography >{getStepContent(activeStep)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} >
								Back
              				</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
							>
								{props.stepsList && activeStep === props.stepsList.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div> */}
		</div>
	)
}

export default ProgressBar;