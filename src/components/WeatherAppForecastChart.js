import React, { Component } from 'react';
import Chart from 'chart.js';
import formatDateTime from '../utils';

class WeatherAppForecastChart extends Component {
    resultsChartElemId = 'WeatherAppForecastChart';
    resultChart = null;

    generateChart() {
        let ctx = document.getElementById(this.resultsChartElemId).getContext('2d'),
            labels = [],
            data = [],
            results = this.props.results;

            // Generate labels and data for chart
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
                            label(tooltipItem, data) { // Sets custom label for chart data item tooltip
                                let mappedResult = results[tooltipItem.index],
                                    date = formatDateTime(mappedResult.dateTime);
                                    
                                return `${date.formattedDate} @ ${date.time}`;
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

export default WeatherAppForecastChart;