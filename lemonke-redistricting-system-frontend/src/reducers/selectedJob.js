const selectedJobReducer = (selected = {}, action) => {
    switch (action.type) {
        case "SET_JOB":
            return action.payload;
        case "RESET_JOB":
            return {};
        default:
            return selected;
    }
}

export default selectedJobReducer;