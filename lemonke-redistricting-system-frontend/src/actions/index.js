
//STATES
export const setStateList = (stateList) => {
    return {
        type: "SET_STATE_LIST",
        payload: stateList
    };
}

export const resetStateList = () => {
    return {
        type: "RESET_STATE_LIST"
    }
}

export const setSelectedState = (state) => {
    return {
        type: "SET_STATE",
        payload: state
    };
}

export const resetSelectedState = () => {
    return {
        type: "RESET_STATE"
    }
}

//JOBS
export const setMinority = (minority) => {
    return {
        type: "SET_MINORITY",
        payload:minority
    }
}
export const resetMinority = () => {
    return {
        type: "RESET_MINORITY"
    }
}

//JOBS
export const setSelectedJob = (job) => {
    return {
        type: "SET_JOB",
        payload: job
    };
}
export const resetSelectedJob = () => {
    return {
        type: "RESET_JOB"
    }
}

//DISTRICTINGS  
export const setDisplayedDistricting = (districting) => {
    return {
        type: "SET_DISPLAYED_DISTRICTING",
        payload: districting
    }
}
export const resetDisplayedDistricting = () => {
    return {
        type: "RESET_DISPLAYED_DISTRICTING"
    }
}
export const setSelectedDistricting = (districting) => {
    return {
        type: "SET_DISTRICTING",
        payload: districting
    };
}
export const resetSelectedDistricting = () => {
    return {
        type: "RESET_DISTRICTING"
    };
}
export const setSelectedDistrict = (district) => {
    return {
        type: "SET_DISTRICT",
        payload: district
    };
}
export const resetSelectedDistrict = () => {
    return {
        type: "RESET_DISTRICT"
    };
}

export const setEnactedDistricting = (enacted) => {
    return {
        type: "SET_ENACTED",
        payload: enacted
    };
}
export const resetEnactedDistricting = () => {
    return {
        type: "RESET_ENACTED"
    };
}

//MAP
export const setCoordinates = (coordinates) => {
    return {
        type: "SET_COORDINATES",
        payload: coordinates
    }
}
export const resetCoordinates = () => {
    return {
        type: "RESET_COORDINATES"
    }
}


//STEPPING
export const incrementStep = () => {
    return {
        type: "INCREMENT_STEP"
    }
}
export const decrementStep = () => {
    return {
        type: "DECREMENT_STEP"
    }
}
export const resetStep = () => {
    return {
        type: "RESET_STEP"
    }
}


//SET CONSTRAINTS ACTIONS

//TODO INCUMBENTS
export const setIncumbentProtectionConstraint = (incumbentArray) => {
    return {
        type: "SET_INCUMBENT_PROTECTION",
        payload: incumbentArray
    };
}

export const setCompactnessType = (compactnessType) => {
    return {
        type: "SET_COMPACTNESS_TYPE",
        payload: compactnessType
    };
}

export const setCompactnessConstraint = (compactness) => {
    return {
        type: "SET_COMPACTNESS_CONSTRAINT",
        payload: compactness
    };
}

export const setPopulationConstraintType = (populationConstraintType) => {
    return {
        type: "SET_POPULATION_CONSTRAINT_TYPE",
        payload: populationConstraintType
    };
}

export const setPopulationConstraint = (populationEquality) => {
    return {
        type: "SET_POPULATION_CONSTRAINT",
        payload: populationEquality
    };
}


export const setMajorityMinorityConstraint = (mm) => {
    return {
        type: "SET_MM",
        payload:mm
    }
}

export const setPopulationThreshold = (populationThreshold) => {
    return {
        type: "SET_POPULATION_THRESHOLD",
        payload:populationThreshold
    }
}


export const resetConstraints = () => {
    return {
        type: "RESET_CONSTRAINTS"
    }
}
export const setConstrainedSet = (constrainedSet) => {
    return {
        type: "SET_CONSTRAINED_SET",
        payload: constrainedSet
    }
}
export const resetConstrainedSet = () => {
    return {
        type: "RESET_CONSTRAINED_SET"
    }
}


//SET MEASURES ACTIONS

export const setPopulationEqualityWeight = (weight) => {
    return {
        type: "SET_POPULATION_EQ_WEIGHT",
        payload: weight
    }
}

export const setSplitCountyWeight = (weight) => {
    return {
        type: "SET_SPLIT_COUNTY_WEIGHT",
        payload: weight
    }
}

export const setDevFromAvgWeight = (weight) => {
    return {
        type: "SET_DEV_FROM_AVG_WEIGHT",
        payload: weight
    }
}

export const setDevFromEnactedPlanArea = (weight) => {
    return {
        type: "SET_DEV_FROM_ENACTED_AREA_WEIGHT",
        payload: weight
    }
}

export const setDevFromEnactedPlanPopulation = (weight) => {
    return {
        type: "SET_DEV_FROM_ENACTED_POPULATION_WEIGHT",
        payload: weight
    }
}


export const setCompactnessWeight = (weight) => {
    return {
        type: "SET_COMPACTNESS_WEIGHT",
        payload: weight
    }
}

export const setPoliticalFairnessWeight = (weight) => {
    return {
        type: "SET_POL_FAIR_WEIGHT",
        payload: weight
    }
}

export const resetMeasures = () => {
    return {
        type: "RESET_MEASURES"
    }
}