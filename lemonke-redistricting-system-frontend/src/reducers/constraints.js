const constraintsReducer = (constraints = {
    'protectedIncumbents' : [],
    'compactnessType' : "pp",
    'compactness' : .5,
    'majorityMinority':0,
    'populationEqType' : 'TOTAL_POPULATION',
    'populationEq':.5
}, action) => {
    let newConstraints = {...constraints};
    switch (action.type) {
        case "SET_INCUMBENT_PROTECTION":
            newConstraints['protectedIncumbents'] = action.payload
            return newConstraints
        case "SET_COMPACTNESS_TYPE":
            newConstraints['compactnessType'] = action.payload
            return newConstraints
        case "SET_COMPACTNESS_CONSTRAINT":
            newConstraints['compactness'] = action.payload
            return newConstraints
        case "SET_POPULATION_CONSTRAINT_TYPE":
            newConstraints['populationEqType'] = action.payload
            return newConstraints
        case "SET_POPULATION_CONSTRAINT":
            newConstraints['populationEq'] = action.payload
            return newConstraints
        case "SET_MM":
            newConstraints['majorityMinority'] = action.payload
            return newConstraints
        case "RESET":
            return {
                'protectedIncumbents' : [],
                'compactnessType' : "pp",
                'compactness' : .5,
                'majorityMinority':0,
                'populationEqType' : 'TOTAL_POPULATION',
                'populationEq':.5,
            }
        default:
            return newConstraints
    }
}

export default constraintsReducer;