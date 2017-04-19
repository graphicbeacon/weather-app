import React from 'react';
import formatDateTime from '../utils';

const WeatherAppForecastResultsItem = (props) => {
    let date = formatDateTime(props.dateTime),
        icon = `http://openweathermap.org/img/w/${props.icon}.png`;

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
    )
}

export default WeatherAppForecastResultsItem;