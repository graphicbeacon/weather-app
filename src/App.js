import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import WeatherAppContainer from './components/WeatherApp';
import './App.css';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <WeatherAppContainer />
      </div>
    </div>
  </div>
);

export default App;
