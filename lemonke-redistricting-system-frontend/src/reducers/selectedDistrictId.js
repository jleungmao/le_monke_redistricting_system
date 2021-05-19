const selectedDistrictIdReducer = (districtId = 'none', action) => {
    switch (action.type) {
        case "SET_DISTRICT":
            return action.payload;
        case "RESET_DISTRICT":
            return 'none';
        default:
            return districtId;
    }
}

export default selectedDistrictIdReducer;