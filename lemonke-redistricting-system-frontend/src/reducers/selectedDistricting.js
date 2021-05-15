const selectedDistrictingReducer = (selected = {}, action) => {
    switch (action.type) {
        case "SET_DISTRICTING":
            return action.payload;
        case "RESET_DISTRICTING":
            return {};
        default:
            return selected;
    }
}

export default selectedDistrictingReducer;