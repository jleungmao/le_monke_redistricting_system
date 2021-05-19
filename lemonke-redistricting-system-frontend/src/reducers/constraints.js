const constraintsReducer = (constraints = {
    'protectedIncumbents' : [],
    'compactnessType' : "GEOMETRIC",
    'compactnessValue' : .5,
    'majorityMinority':0,
    'populationType' : 'TOTAL_POPULATION',
    'populationValue':.5,
    'populationThreshold':0,
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
            newConstraints['compactnessValue'] = action.payload
            return newConstraints
        case "SET_POPULATION_CONSTRAINT_TYPE":
            newConstraints['populationType'] = action.payload
            return newConstraints
        case "SET_POPULATION_CONSTRAINT":
            newConstraints['populationValue'] = action.payload
            return newConstraints
        case "SET_MM":
            newConstraints['majorityMinority'] = action.payload
            return newConstraints
        case "SET_POPULATION_THRESHOLD":
            newConstraints['populationThreshold'] = action.payload
            return newConstraints
        case "RESET_CONSTRAINTS":
            return {
                'protectedIncumbents' : [],
                'compactnessType' : "GEOMETRIC",
                'compactnessValue' : .5,
                'majorityMinority':0,
                'populationType' : 'TOTAL_POPULATION',
                'populationValue':.5,
                'populationThreshold':0,
            }
        default:
            return newConstraints
    }
}

export default constraintsReducer;