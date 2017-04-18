import React, { Component } from 'react';
import WeatherAppContainer from './components/WeatherApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <WeatherAppContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
