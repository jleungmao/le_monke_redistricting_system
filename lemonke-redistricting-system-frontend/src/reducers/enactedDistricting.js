const enactedDistrictingReducer = (enacted = {},action) =>{
    switch (action.type) {
        case "SET_ENACTED":
            return action.payload;
        case "RESET_ENACTED":
            return {};
        default:
            return enacted;
    }
}

export default enactedDistrictingReducer;