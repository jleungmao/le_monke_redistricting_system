const coordinates = (coordinates = {
    longitude : -85.5975,
    latitude : 36.4289,
    zoom : 4.55
}, action) => {
    switch (action.type) {
        case 'SET_COORDINATES':
            return action.payload
        default:
            return coordinates;
    }
}

export default coordinates;