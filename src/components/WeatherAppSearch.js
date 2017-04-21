import React from 'react';
import PropTypes from 'prop-types';

const WeatherAppSearch = (props) => {
  const searchProps = { ...props };
  delete searchProps.onSearch;

  const update = (e) => {
    const ENTER_KEYCODE = 13;
    const target = e.target;
    const search = target.value;
    const hasPressedEnter = (e.which || e.keyCode) === ENTER_KEYCODE;
    const isValid = search && target.validity.valid;

    if (hasPressedEnter && isValid) {
      props.onSearch(search);
    }
  };

  return (
    <div className="form-group">
      <input
        type="search"
        className="form-control"
        placeholder="Enter a location and hit enter..."
        onKeyPress={update}
        {...searchProps}
      />
    </div>
  );
};

WeatherAppSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default WeatherAppSearch;
