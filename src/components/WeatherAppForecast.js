import React, { Component } from 'react';
import Chart from 'chart.js';
import formatDateTime from '../utils';

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

export class ResultsChart extends Component {
    // Instance props
    resultsChartElemId = 'WeatherAppResultsChart';
    resultChart = null;

    generateChart() {
        let ctx = document.getElementById(this.resultsChartElemId).getContext('2d'),
            labels = [],
            data = [],
            results = this.props.results;

            results.forEach((item) => {
                let date = formatDateTime(item.dateTime);
                labels.push(date.time);
                data.push(item.temp);
            });

            // Generate line chart
            this.resultChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        data,
                        label: 'Temperature',
                        lineTension: 0.1,
                        backgroundColor: "rgba(153,255,51,0.6)"
                    }]
                },
                options: {
                    tooltips: {
                        callbacks: {
                            title: () => '',
                            label(tooltipItem, data) {
                                let mappedResult = results[tooltipItem.index],
                                    date = formatDateTime(mappedResult.dateTime),
                                    title = `${date.formattedDate} @ ${date.time}`;

                                console.log(tooltipItem.index);
                                return title;
                            }
                        }
                    }
                }
            });
    }

    componentDidMount = () => this.generateChart()
    componentWillUnmount = () => this.resultChart.destroy()

    render() {
        return (
            <canvas id={this.resultsChartElemId}></canvas>
        )
    }
}

export const ResultsItem = (props) => {
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