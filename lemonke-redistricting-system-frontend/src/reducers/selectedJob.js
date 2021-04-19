const selectedJobReducer = (selected = null, action) => {
    switch (action.type) {
        case "SET_JOB":
            return action.payload;
        default:
            return selected;
    }
}

export default selectedJobReducer;