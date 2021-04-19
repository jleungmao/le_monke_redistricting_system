const selectedDistrictingReducer = (selected = {}, action) => {
    switch (action.type) {
        case "SET_DISTRICTING":
            return action.payload;
        default:
            return selected;
    }
}

export default selectedDistrictingReducer;