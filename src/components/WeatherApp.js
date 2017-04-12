import React, { Component } from 'react';

class WeatherApp extends Component {
    state = {
        search: '',
        results: []
    }

    update(e) {
        const ENTER_KEYCODE = 13;
        let target = e.target;
        let search = target.value;
        let hasPressedEnter = (e.which || e.keyCode) === ENTER_KEYCODE;
        let isValid = search && target.validity.valid;

        if(hasPressedEnter && isValid) {
            this.fetchData(search);
        }
    }

    fetchData(search) {
        //
        let url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        url+= search + '&units=metric&APPID=78a0f977834be04b948b29951fe2c5fa';
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

            console.log(results)
            this.setState({ results, search });
        });
    }

    render() {
        let hasResults = window.Array.isArray(this.state.results) && this.state.results.length > 0,
        results,
        resultsText = hasResults ? <p>Returning results for <b>{this.state.search}</b></p> : null;

        if(hasResults) {
            results = this.state.results.map((item) => (
                <div key={item.key}>{new Date(item.dateTime).toString()} - {item.temp}</div>
            ))
        } else {
            results = 'No items to display';
        }
        
        return (
            <div>
                <input 
                    type="search" 
                    placeholder="Enter search and hit enter..."
                    onKeyPress={this.update.bind(this)} 
                />
                
                { resultsText }

                <div className="search-results">
                    { results }
                </div>
            </div>
        )
    }
}

export default WeatherApp;