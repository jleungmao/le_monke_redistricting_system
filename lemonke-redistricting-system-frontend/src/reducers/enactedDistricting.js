const enactedDistrictingReducer = (enacted = {},action) =>{
    switch (action.type) {
        case "SET_ENACTED":
            return action.payload;
        default:
            return enacted;
    }
}

export default enactedDistrictingReducer;