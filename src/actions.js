/* Action Types */
export const actionTypes = {
  REQUEST_FORECAST: 'REQUEST_FORECAST',
  RECEIVE_FORECAST: 'RECEIVE_FORECAST',
  FAILED_FORECAST: 'FAILED_FORECAST'
};

/* Action Creators */
export function requestForecast(search) {
  return {
    type: actionTypes.REQUEST_FORECAST,
    payload: search
  };
}

export function receiveForecast(results) {
  const list = [];

  results.forEach((item) => {
    list.push({
      temp: item.main.temp,
      dateTime: item.dt_txt,
      key: item.dt,
      icon: item.weather[0].icon,
      iconDescription: item.weather[0].description
    });
  });

  return {
    type: actionTypes.RECEIVE_FORECAST,
    payload: list
  };
}

export function handleForecastException(exception) {
  return {
    type: actionTypes.FAILED_FORECAST,
    payload: exception
  };
}

/* Thunks */
export function fetchForecast(search) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(search)}&units=metric&APPID=78a0f977834be04b948b29951fe2c5fa`;

  return (dispatch) => {
    //
    dispatch(requestForecast(search));

    // Simulates delay so we can see fetching state
    // Not to be done in production
    setTimeout(() => fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(({ list }) => dispatch(receiveForecast(list)))
    .catch(error => dispatch(handleForecastException(error))), 700);
  };
}
