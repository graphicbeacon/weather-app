/* Action Types */
export const actionTypes = {
    REQUEST_FORECAST: 'REQUEST_FORECAST',
    RECEIVE_FORECAST: 'RECEIVE_FORECAST',
    FAILED_FORECAST: 'FAILED_FORECAST'
}

/* Action Creators */
export function requestForecast(search) {
    return {
        type: actionTypes.REQUEST_FORECAST,
        payload: search
    }
}

export function receiveForecast(results) {
    let list = [];

    results.forEach((item) => {
        list.push({
            temp: item.main.temp,
            dateTime: item.dt_txt,
            key: item.dt
        });
    });

    return {
        type: actionTypes.RECEIVE_FORECAST,
        payload: list
    }
}

export function handleForecastException(exception) {
    return {
        type: actionTypes.FAILED_FORECAST,
        payload: exception
    }
}

/* Thunks */
export function fetchForecast(search) {
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&APPID=78a0f977834be04b948b29951fe2c5fa`;

    return function(dispatch) {
        //
        dispatch(requestForecast(search))

        setTimeout(() => { // Simulates delay so we can see fetching state
            return fetch(url)
            .then((response) => response.json())
            .then(({list}) => dispatch(receiveForecast(list)))
        }, 1000);
    }
}