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
  }

  componentDidMount() {
    const { resorts, fetchedWeather, fetchedPreviousWeather } = this.props;
    // console.log(this.props.match);
    const resort = resorts.find((r) => r.resortName === this.props.match.params.resortName);
    this.setState({ selectedResort: resort });
    fetchedWeather(resort.location[1], resort.location[0]);
    fetchedPreviousWeather(resort.location[1], resort.location[0]);
  }

  render() {
    const { selectedResort } = this.state;
    const { weather, weatherHistory, resorts } = this.props;
    const { current, daily } = weather;
    // const today = daily[0];
    // const tomorrow = daily[1];
    // const twoDays = daily[2];
    console.log(selectedResort);
    // console.log(resorts);
    console.log(weather);
    console.log(weatherHistory);
    if (current && daily !== undefined) {
      return (
        <div>
          {/* <h1>{resort.resortName}</h1> */}
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
