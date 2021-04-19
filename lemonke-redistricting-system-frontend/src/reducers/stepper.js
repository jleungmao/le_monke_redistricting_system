const stepperReducer = (step = 0, action) =>{
    switch (action.type) {
        case "INCREMENT_STEP":
            return step + 1;
        case "DECREMENT_STEP":
            return step - 1;
        case "RESET_STEP":
            return 0;
        default:
            return step;
    }
}

export default stepperReducer;