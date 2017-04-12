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
        <div className="weather-app-search">
            <input type="search" 
                placeholder="Enter search and hit enter..."
                onKeyPress={update} 
                {...searchProps} 
            />
        </div>
    )
}

export const Results = (props) => (
    <div className="weather-app-forecast">
        {props.hasResults ? <p>Returning results for <b>{props.search}</b></p> : null}
        <div>
            {props.children}
        </div>
    </div>
)

export const ResultsItem = (props) => (
    <div>{new Date(props.dateTime).toString()} - {props.temp}</div>
)