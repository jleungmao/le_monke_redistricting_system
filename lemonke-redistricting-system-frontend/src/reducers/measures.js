const measuresReducer = (measures = {
    'popEq': 0.5,
    'splitCounty': 0.5,
    'devFromAvg': 0.5,
    'devFromEnactedArea': 0.5,
    'devFromEnactedPop': 0.5,
    'compactness': 0.5,
    'polFairness': 0.5
}, action) => {
    let newMeasures = { ...measures }
    switch (action.type) {
        case "SET_POPULATION_EQ_WEIGHT":
            newMeasures["popEq"] = action.payload
            return newMeasures
        case "SET_SPLIT_COUNTY_WEIGHT":
            newMeasures["splitCounty"] = action.payload
            return newMeasures
        case "SET_DEV_FROM_AVG_WEIGHT":
            newMeasures["devFromAvg"] = action.payload
            return newMeasures
        case "SET_DEV_FROM_ENACTED_AREA_WEIGHT":
            newMeasures["devFromEnactedArea"] = action.payload
            return newMeasures
        case "SET_DEV_FROM_ENACTED_POPULATION_WEIGHT":
            newMeasures["devFromEnactedPop"] = action.payload
            return newMeasures
        case "SET_COMPACTNESS_WEIGHT":
            newMeasures["compactness"] = action.payload
            return newMeasures
        case "SET_POL_FAIR_WEIGHT":
            newMeasures["polFairness"] = action.payload
            return newMeasures
        case "RESET_MEASURES":
            return {
                'popEq': 0.5,
                'splitCounty': 0.5,
                'devFromAvg': 0.5,
                'devFromEnactedArea': 0.5,
                'devFromEnactedPop': 0.5,
                'compactness': 0.5,
                'polFairness': 0.5
            };
        default:
            return newMeasures
    }
}

export default measuresReducer;