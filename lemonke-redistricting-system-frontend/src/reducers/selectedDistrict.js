const selectedDistrictReducer = (selected = {districtId : 'none'}, action) => {
    switch (action.type) {
        case "SET_DISTRICT":
            return action.payload;
        case "RESET_DISTRICT":
            return {districtId : 'none'};
        default:
            return selected;
    }
}

export default selectedDistrictReducer;