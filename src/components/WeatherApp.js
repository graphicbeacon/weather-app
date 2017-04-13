import React, { Component } from 'react';
import * as WeatherAppForecast from './WeatherAppForecast';

class WeatherApp extends Component {
    state = {
        search: '',
        results: []
    }

    fetchData(search) {
        //
        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        url += search;
        url += '&units=metric&APPID=78a0f977834be04b948b29951fe2c5fa';
        let results = [];
        
        //
        fetch(url)
        .then((response) => response.json())
        .then(({list}) => {
            list.forEach((item, index) => {
                results.push({
                    temp: item.main.temp,
                    dateTime: item.dt_txt,
                    key: item.dt
                })
            })

            console.log(list)
            this.setState({ results, search });
        });
    }

    render() {
        let hasResults = window.Array.isArray(this.state.results) && this.state.results.length > 0,
            results = 'No results to display';

        if(hasResults) { // Reassign results if any were returned
            results = this.state.results.map((item) => {
                return (
                    <WeatherAppForecast.ResultsItem {...item} />
                )
            });
        }
        
        return (
            <div className="panel panel-default">
                <div className="panel-header"><h1 className="h3 text-center">Weather App</h1></div>
                <div className="panel-body">
                    <WeatherAppForecast.Search onSearch={this.fetchData.bind(this)} />
                    <WeatherAppForecast.Results search={this.state.search} hasResults={hasResults}>
                        {results}
                    </WeatherAppForecast.Results>
                </div>
            </div>
        )
    }
}

export default WeatherApp;