/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedWeather, fetchedPreviousWeather } from '../redux/weather';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedResort: {},
    };
    this.CheckForSnow = this.CheckForSnow.bind(this);
  }

  componentDidMount() {
    const { resorts, fetchedWeather, fetchedPreviousWeather } = this.props;
    const resort = resorts.find((r) => r.resortName === this.props.match.params.resortName);
    this.setState({ selectedResort: resort });
    fetchedWeather(resort.location[1], resort.location[0]);
    fetchedPreviousWeather(resort.location[1], resort.location[0]);
  }

  CheckForSnow() {
    const { weatherHistory } = this.props;
    const yesterday = weatherHistory.yesterday.current.weather;
    const twoDays = weatherHistory.twoDaysAgo.current.weather;
    let snow = {
      oneDay: false,
      twoDays: false,
      fiveDays: false,
    }
    for (let i = 0; i < yesterday.length; i++){
      if (yesterday[i].main === 'Snow') {
        snow.oneDay = true
        snow.twoDays = true
        snow.fiveDays = true
        return snow
      }
    }
    for (let i = 0; i < twoDays.length; i++) {
      if (twoDays[i].main === 'Snow') {
        snow.twoDays = true
        snow.fiveDays = true
        return snow
      }
    }
    for (let key in weatherHistory) {
      const daysWeather = weatherHistory[key]
      for (let i = 0; i < daysWeather.current.weather.length ; i++){
        if (daysWeather.current.weather[i].main === 'Snow') {
          snow.fiveDays = true
          return snow
        }
      }
    }
    return snow
  }

  render() {
    const { selectedResort } = this.state;
    const { weather, weatherHistory } = this.props;
    const { current, daily } = weather;
    // console.log(selectedResort);
    // console.log(weather);
    // console.log(weatherHistory);
    if (current && daily && weatherHistory.yesterday !== undefined) {
      const tomorrow = daily[0];
      const { oneDay, twoDays, fiveDays } = this.CheckForSnow()
      return (
        <div>
          <h1>{selectedResort.resortName}</h1>
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
          <div className="forecast">
            <h3>Tomorrow's Weather</h3>
            <div>
              Conditions: {tomorrow.weather[0].description}
            </div>
            <div>
              Temperature: High => {tomorrow.temp.max} degrees Low => {tomorrow.temp.min} degrees
            </div>
            <div>
              Feels Like (midDay): {tomorrow.feels_like.day} degrees
            </div>
            <div>
              Wind: {tomorrow.wind_speed}mph
            </div>
          </div>
        <div className="snowHistory">
          <h3>Has it snowed?</h3>
          <div>Yesterday? {oneDay ? 'Yes' : 'No'}</div>
          <div>Two Days Ago? {twoDays ? 'Yes' : 'No'}</div>
          <div>Five Days Ago? {fiveDays ? 'Yes' : 'No'}</div>
        </div>
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
