const selectedStateReducer = (state = {
        longitude: -89.8,
        latitude: 35.8,
        zoom: 4.36
    }, action) => {
    switch (action.type) {
        case "SET_STATE":
            return action.payload;
        default:
            return state;
    }
}

export default selectedStateReducer;
