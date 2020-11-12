/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedWeather, fetchedPreviousWeather } from '../redux/weather';

class Weather extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const { resorts, fetchedWeather, fetchedPreviousWeather } = this.props;
    // console.log(this.props.match);
    // const resort = resorts.find((r) => r.resortName === this.props.match.params.resortName);
    // console.log(resort);
    fetchedWeather(42.26, -75.5);
    fetchedPreviousWeather(42.26, -75.5);
  }

  render() {
    const { weather, weatherHistory } = this.props;
    const { current, daily } = weather;
    // const today = daily[0];
    // const tomorrow = daily[1];
    // const twoDays = daily[2];
    console.log(weather);
    console.log(weatherHistory);
    if (current && daily !== undefined) {
      return (
        <div>
          {/* <h1>{resort.resortName}</h1> */}
          <h1>Resort Name</h1>
          <div className="currentWeather">
            <h3>Current Weather</h3>
            <div>
              Conditions: {current.weather[0].description}
            </div>
            <div>
              Temperature: {current.temp} degrees
            </div>
            <div>
              Feels Like: {current.feels_like} degrees
            </div>
            <div>
              Wind: {current.wind_speed}mph
            </div>
          </div>
          {/* <div className="forecast">

          </div> */}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  weather: state.weather,
  resorts: state.resorts,
  weatherHistory: state.weatherHistory,
});

const mapDispatchToProps = (dispatch) => ({
  fetchedWeather: (lat, long) => dispatch(fetchedWeather(lat, long)),
  fetchedPreviousWeather: (lat, long) => dispatch(fetchedPreviousWeather(lat, long)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
