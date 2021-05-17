const displayedDistrictingReducer = (displayed = {}, action) => {
    switch (action.type) {
        case "SET_DISPLAYED_DISTRICTING":
            return action.payload;
        case "RESET_DISPLAYED_DISTRICTING":
            return {};
        default:
            return displayed;
    }
}

export default displayedDistrictingReducer;