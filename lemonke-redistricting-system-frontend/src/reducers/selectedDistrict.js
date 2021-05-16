const selectedDistrictReducer = (selected = {}, action) => {
    switch (action.type) {
        case "SET_DISTRICT":
            return action.payload;
        case "RESET_DISTRICT":
            return {};
        default:
            return selected;
    }
}

export default selectedDistrictReducer;