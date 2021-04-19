export const setSelectedState = (state) => {
    return {
        type: "SET_STATE",
        payload: state
    };
}

export const setSelectedJob = (job) => {
    return {
        type: "SET_JOB",
        payload: job
    };
}


export const setSelectedDistricting = (districting) => {
    return {
        type: "SET_DISTRICTING",
        payload: districting
    };
}

export const setEnactedDistricting = (enacted) => {
    return {
        type: "SET_ENACTED",
        payload: enacted
    };
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
        type: ""
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

export const setMinority = (minority) => {
    return {
        type: "SET_MINORITY",
        payload:minority
    }
}

export const setMajorityMinorityConstraint = (mm) => {
    return {
        type: "SET_MM",
        payload:mm
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