import React from 'react';
import PropTypes from 'prop-types';
import formatDateTime from '../utils';

const WeatherAppForecastResultsItem = (props) => {
  const date = formatDateTime(props.dateTime);
  const icon = `http://openweathermap.org/img/w/${props.icon}.png`;

  return (
    <div className="panel panel-default text-center">
      <div className="panel-heading">
        {date.formattedDate}
      </div>
      <div className="panel-body">
        <img src={icon} alt={props.iconDescription} /><br />
        <strong className="h1">{props.temp}<sup>o</sup></strong><br />
        {date.time}
      </div>
    </div>
  );
};

WeatherAppForecastResultsItem.propTypes = {
  dateTime: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconDescription: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default WeatherAppForecastResultsItem;
