const selectedMinorityReducer = (minority = 'BLACK', action) => {
    switch (action.type) {
        case "SET_MINORITY":
            return action.payload;
        default:
            return minority;
    }
}

export default selectedMinorityReducer;