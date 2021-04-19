import { combineReducers } from 'redux';
import selectedStateReducer from './selectedState.js';
import selectedDistrictingReducer from './selectedDistricting.js';
import selectedJobReducer from './selectedJob.js';
import constraintsReducer from './constraints.js';
import enactedDistrictingReducer from './enactedDistricting.js';
import measuresReducer from './measures.js';

const allReducers = combineReducers({
    selectedState: selectedStateReducer,
    enactedDistricting: enactedDistrictingReducer,
    selectedJob: selectedJobReducer,
    constraints: constraintsReducer,
    measures: measuresReducer,
    selectedDistricting: selectedDistrictingReducer
})

export default allReducers;