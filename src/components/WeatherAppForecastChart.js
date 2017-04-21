import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import formatDateTime from '../utils';

class WeatherAppForecastChart extends Component {
  constructor(props) {
    super(props);
    this.resultsChartElemId = 'WeatherAppForecastChart';
    this.resultChart = null;
  }

  componentDidMount() { this.generateChart(); }
  componentWillUnmount() { this.resultChart.destroy(); }

  generateChart() {
    const ctx = document.getElementById(this.resultsChartElemId).getContext('2d');
    const labels = [];
    const data = [];
    const results = this.props.results;

    // Generate labels and data for chart
    results.forEach((item) => {
      const date = formatDateTime(item.dateTime);
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
          backgroundColor: 'rgba(153,255,51,0.6)'
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            title: () => '',
            label(tooltipItem) {
              const mappedData = results[tooltipItem.index];
              return `${mappedData.temp}ºC`;
            },
            afterLabel(tooltipItem) { // Sets custom label for chart data item tooltip
              const mappedResult = results[tooltipItem.index];
              const date = formatDateTime(mappedResult.dateTime);
              return `${date.formattedDate} @ ${date.time}`;
            }
          }
        }
      }
    });
  }

  render() {
    return <canvas id={this.resultsChartElemId} />;
  }
}

WeatherAppForecastChart.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WeatherAppForecastChart;
