import React from 'react';
import PropTypes from 'prop-types';

const WeatherAppForecastResults = (props) => {
  let resultsTitle = null;
  let results = props.children;
  let resultsClass = 'weather-app__forecast__results';

  if (props.hasResults) {
    resultsTitle = <h2 className="h3 text-center">Returning results for <b>{props.search}</b></h2>;
    resultsClass += ' has-results';
  } else {
    results = <div className="well text-center"><strong>{props.children}</strong></div>;
  }

  return (
    <div className="weather-app__forecast">
      {resultsTitle}
      <div className={resultsClass}>
        {results}
      </div>
    </div>
  );
};

WeatherAppForecastResults.propTypes = {
  children: PropTypes.node.isRequired,
  hasResults: PropTypes.bool.isRequired,
  search: PropTypes.string
};

WeatherAppForecastResults.defaultProps = {
  search: ''
};

export default WeatherAppForecastResults;
