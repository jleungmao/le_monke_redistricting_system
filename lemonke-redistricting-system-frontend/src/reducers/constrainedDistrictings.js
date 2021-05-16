const constrainedDistrictingsReducer = (constrainedSet = [],action) =>{
    switch (action.type) {
        case "SET_CONSTRAINED_SET":
            return action.payload;
        case "RESET_CONSTRAINED_SET":
            return [];
        default:
            return constrainedSet;
    }
}

export default constrainedDistrictingsReducer;