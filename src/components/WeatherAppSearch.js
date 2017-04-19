import React from 'react';

const WeatherAppSearch = (props) => {
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

export default WeatherAppSearch;