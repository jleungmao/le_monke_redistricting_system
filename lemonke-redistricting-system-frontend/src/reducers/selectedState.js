const selectedStateReducer = (state = {
        stateId: -1,
        longitude: -89.8,
        latitude: 35.8,
        zoom: 4.36
    }, action) => {
    switch (action.type) {
        case "SET_STATE":
            return action.payload;
        case "RESET_STATE":
            return {
                stateId: -1,
                longitude: -89.8,
                latitude: 35.8,
                zoom: 4.36
            };
        default:
            return state;
    }
}

export default selectedStateReducer;
