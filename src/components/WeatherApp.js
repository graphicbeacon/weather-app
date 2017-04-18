import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as WeatherAppForecast from './WeatherAppForecast';
import * as actions from '../helpers/actions';

class WeatherApp extends Component {
    render() {
        let hasResults = Array.isArray(this.props.results) && this.props.results.length > 0,
            results = this.props.results;

        if(hasResults) { // Reassign results if any were returned
            results = this.props.results.map((item, i) => {
                return (
                    <WeatherAppForecast.ResultsItem {...item} />
                )
            });
        }
        
        return (
            <div className="panel panel-default">
                <div className="panel-header"><h1 className="h3 text-center">Weather App</h1></div>
                <div className="panel-body">
                    <WeatherAppForecast.Search onSearch={this.props.onSearch} />
                    <WeatherAppForecast.Results search={this.props.search} hasResults={hasResults}>
                        {results}
                    </WeatherAppForecast.Results>
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