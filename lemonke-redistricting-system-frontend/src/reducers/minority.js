const selectedMinorityReducer = (minority = 'BLACK', action) => {
    switch (action.type) {
        case "SET_MINORITY":
            return action.payload;
        case "REESET_MINORITY":
            return 'BLACK';
        default:
            return minority;
    }
}

export default selectedMinorityReducer;