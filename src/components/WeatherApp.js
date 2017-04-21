import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchForecast } from '../actions';
import WeatherAppSearch from './WeatherAppSearch';
import WeatherAppForecastChart from './WeatherAppForecastChart';
import WeatherAppForecastResults from './WeatherAppForecastResults';
import WeatherAppForecastResultsItem from './WeatherAppForecastResultsItem';

const WeatherApp = (props) => {
  const hasResults = Array.isArray(props.results) && props.results.length > 0;
  let results = props.results;

  if (hasResults) { // Reassign results if any were returned
    results = (<div className="weather-app__forecast__results__results-panel">
      {props.results.map(item => (
        <WeatherAppForecastResultsItem {...item} />
      ))}
    </div>);
  }

  return (
    <div className="panel panel-default">
      <div className="panel-header"><h1 className="h2 text-center">Weather App</h1></div>
      <div className="panel-body">
        <WeatherAppSearch onSearch={props.onSearch} />
        <WeatherAppForecastResults search={props.search} hasResults={hasResults}>
          {hasResults ? <WeatherAppForecastChart results={props.results} /> : null}
          {results}
        </WeatherAppForecastResults>
      </div>
    </div>
  );
};

WeatherApp.propTypes = {
  search: PropTypes.string,
  results: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  onSearch: PropTypes.func.isRequired
};

WeatherApp.defaultProps = {
  search: ''
};

const mapStateToProps = (state, ownProps) => ({
  search: ownProps.search || state.forecast.search,
  isFetching: ownProps.isFetching || state.forecast.isFetching,
  results: ownProps.results || state.forecast.results
});

const mapDispatchToProps = dispatch => ({
  onSearch: search => dispatch(fetchForecast(search))
});

const WeatherAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherApp);

export default WeatherAppContainer;
