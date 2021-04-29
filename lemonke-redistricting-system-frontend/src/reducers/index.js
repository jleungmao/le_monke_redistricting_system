import { combineReducers } from 'redux';
import stepperReducer from './stepper.js';
import selectedStateReducer from './selectedState.js';
import selectedDistrictingReducer from './selectedDistricting.js';
import selectedJobReducer from './selectedJob.js';
import constraintsReducer from './constraints.js';
import enactedDistrictingReducer from './enactedDistricting.js';
import measuresReducer from './measures.js';
import minorityReducer from './minority.js';

const allReducers = combineReducers({
    step : stepperReducer,
    selectedState: selectedStateReducer,
    enactedDistricting: enactedDistrictingReducer,
    selectedMinority: minorityReducer,
    selectedJobSummary: selectedJobReducer,
    constraints: constraintsReducer,
    measures: measuresReducer,
    selectedDistricting: selectedDistrictingReducer
})

export default allReducers;