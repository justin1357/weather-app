export default function reducer(state = {}, action) {
    if (action.type == "WEATHER_DATA") {
        state = Object.assign({}, state, {
            forecast: action.forecast
        });
    }
    console.log("State in Reducer", state);
    return state;
}
