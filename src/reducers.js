import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const initialState = {
  search: '',
  isFetching: false,
  results: 'No results to display'
};

export function handleForecast(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.REQUEST_FORECAST:
      // console.log('Requesting forecast results')

      return {
        ...state,
        isFetching: true,
        search: actions.payload,
        results: 'Fetching forecast...'
      };

    case actionTypes.RECEIVE_FORECAST:
      // console.log('Receiving forecast results')

      return {
        ...state,
        isFetching: false,
        results: actions.payload
      };

    case actionTypes.FAILED_FORECAST:
      // console.log('Failed forecast results')

      return {
        ...state,
        isFetching: false,
        results: actions.payload.message
      };

    default:
      return state;
  }
}

const weatherAppReducers = combineReducers({
  forecast: handleForecast
});

export default weatherAppReducers;
