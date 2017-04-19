import React from 'react';

const WeatherAppForecastResults = (props) => {
    let resultsTitle = null, 
        results = props.children, 
        resultsClass = 'weather-app__forecast__results';
    
    if(props.hasResults) {
        resultsTitle = <h2 className="h4 text-center">Returning results for <b>{props.search}</b></h2>;
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
    )
}

export default WeatherAppForecastResults;