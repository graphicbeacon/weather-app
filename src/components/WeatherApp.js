import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import WeatherAppSearch from './WeatherAppSearch';
import WeatherAppForecastChart from './WeatherAppForecastChart';
import WeatherAppForecastResults from './WeatherAppForecastResults';
import WeatherAppForecastResultsItem from './WeatherAppForecastResultsItem';

class WeatherApp extends Component {
    render() {
        let hasResults = Array.isArray(this.props.results) && this.props.results.length > 0,
            results = this.props.results;

        if(hasResults) { // Reassign results if any were returned
            results = <div className="weather-app__forecast__results__results-panel">
                {this.props.results.map((item, i) => {
                    return (
                        <WeatherAppForecastResultsItem {...item} />
                    )
                })}
            </div>;
        }
        
        return (
            <div className="panel panel-default">
                <div className="panel-header"><h1 className="h2 text-center">Weather App</h1></div>
                <div className="panel-body">
                    <WeatherAppSearch onSearch={this.props.onSearch} />
                    <WeatherAppForecastResults search={this.props.search} hasResults={hasResults}>
                        {hasResults ? <WeatherAppForecastChart results={this.props.results} /> : null}
                        {results}
                    </WeatherAppForecastResults>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log('mapStateToProps', state, ownProps);
    return {
        search: ownProps.search || state.forecast.search,
        isFetching: ownProps.isFetching || state.forecast.isFetching,
        results: ownProps.results || state.forecast.results
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSearch: (search) => dispatch(actions.fetchForecast(search))
})

const WeatherAppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherApp);

export default WeatherAppContainer;