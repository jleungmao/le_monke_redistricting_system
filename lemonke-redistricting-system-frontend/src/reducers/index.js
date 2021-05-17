import { combineReducers } from 'redux';
import stepperReducer from './stepper.js';
import stateListReducer from './stateList.js';
import selectedStateReducer from './selectedState.js';
import selectedDistrictingReducer from './selectedDistricting.js';
import displayedDistrictingReducer from './displayedDistricting.js';
import selectedDistrictReducer from './selectedDistrict.js';
import selectedJobReducer from './selectedJob.js';
import constrainedDistrictingsReducer from './constrainedDistrictings.js'
import constraintsReducer from './constraints.js';
import enactedDistrictingReducer from './enactedDistricting.js';
import measuresReducer from './measures.js';
import minorityReducer from './minority.js';

const allReducers = combineReducers({
    step: stepperReducer,
    stateList: stateListReducer,
    selectedState: selectedStateReducer,
    enactedDistricting: enactedDistrictingReducer,
    displayedDistricting: displayedDistrictingReducer,
    selectedDistricting: selectedDistrictingReducer,
    selectedMinority: minorityReducer,
    selectedJobSummary: selectedJobReducer,
    constraints: constraintsReducer,
    constrainedSet: constrainedDistrictingsReducer,
    measures: measuresReducer,
    selectedDistrict: selectedDistrictReducer
})

export default allReducers;