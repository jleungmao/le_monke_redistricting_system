const stateListReducer = (states = [], action) => {
switch (action.type) {
    case "SET_STATE_LIST":
        return action.payload;
    case "RESET_STATE_LIST":
        return [];
    default:
        return states;
}
}

export default stateListReducer;
