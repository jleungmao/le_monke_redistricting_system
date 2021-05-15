const coordinates = (coordinates = {
    longitude : -85.5975,
    latitude : 36.4289,
    zoom : 4.55
}, action) => {
    switch (action.type) {
        case 'SET_COORDINATES':
            return action.payload
        case 'RESET_COORDINATES':
            return {
                longitude : -85.5975,
                latitude : 36.4289,
                zoom : 4.55
            }
        default:
            return coordinates;
    }
}

export default coordinates;