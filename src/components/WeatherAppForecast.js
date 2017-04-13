import React from 'react';

export const Search = (props) => {
    let searchProps = {...props};
    delete searchProps.onSearch;

    let update = (e) => {
        const ENTER_KEYCODE = 13;
        let target = e.target;
        let search = target.value;
        let hasPressedEnter = (e.which || e.keyCode) === ENTER_KEYCODE;
        let isValid = search && target.validity.valid;

        if(hasPressedEnter && isValid) {
            props.onSearch(search);
        }
    }

    return (
        <div className="form-group">
            <input type="search" 
                className="form-control"
                placeholder="Enter a location and hit enter..."
                onKeyPress={update} 
                {...searchProps} 
            />
        </div>
    )
}

export const Results = (props) => {
    let resultsTitle = null, results;
    
    if(props.hasResults) {
        resultsTitle = <h2 className="h4 text-center">Returning results for <b>{props.search}</b></h2>;
        results = (
            <table className="table">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
            </table>
        );
    } else {
        results = <div className="well text-center"><strong>{props.children}</strong></div>;
    }
    
    return (
        <div className="weather-app__forecast">
            {resultsTitle}
            <div className="weather-app__forecast__results">
                {results}
            </div>
        </div>
    )
}

export const ResultsItem = (props) => {
    let date = new Date(props.dateTime),
        hours = date.getUTCHours(),
        formattedHours = hours < 10 ? `0${hours}`: hours,

        minutes = date.getUTCMinutes(),
        formattedMinutes = minutes === 0 ? '00' : minutes,

        time = `${formattedHours}:${formattedMinutes}`;
    
    return (
        <tr>
            <td>{time}</td>
            <td><strong>{props.temp}<sup>o</sup></strong></td>
        </tr>
    )
}