/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchedWeather, fetchedPreviousWeather } from '../redux/weather';

class Weather extends PureComponent {
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
    fetchedWeather(resort.location[1], resort.location[0]);
    fetchedPreviousWeather(resort.location[1], resort.location[0]);
    this.setState({ selectedResort: resort });
  }

  // componentDidUpdate(prevProps) {
  //   const { resorts } = this.props;
  //   const { selectedResort } = this.state;
  //   if (this.props.match.params.resortName !== prevProps.match.params.resortName) {
  //     const resort = resorts.find((r) => r.resortName === this.props.match.params.resortName);
  //     // this.setState({ selectedResort: resort });
  //     fetchedWeather(resort.location[1], resort.location[0]);
  //     fetchedPreviousWeather(resort.location[1], resort.location[0]);
  //     console.log(this.props.weather);
  //   }
  // }

  CheckForSnow() {
    const { weatherHistory } = this.props;
    const yesterday = weatherHistory.yesterday.current.weather;
    const twoDays = weatherHistory.twoDaysAgo.current.weather;
    const snow = {
      oneDay: false,
      twoDays: false,
      fiveDays: false,
    };
    for (let i = 0; i < yesterday.length; i++) {
      if (yesterday[i].main === 'Snow') {
        snow.oneDay = true;
        snow.twoDays = true;
        snow.fiveDays = true;
        return snow;
      }
    }
    for (let i = 0; i < twoDays.length; i++) {
      if (twoDays[i].main === 'Snow') {
        snow.twoDays = true;
        snow.fiveDays = true;
        return snow;
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
    return snow;
  }

  render() {
    const { selectedResort } = this.state;
    const { weather, weatherHistory, resorts } = this.props;
    const { current, daily } = weather;
    // console.log(selectedResort);
    // console.log(resorts);
    // console.log(selectedResort);
    // console.log(weather);
    // console.log(weatherHistory);
    if (current && daily && weatherHistory.yesterday !== undefined) {
      const tomorrow = daily[0];
      const { oneDay, twoDays, fiveDays } = this.CheckForSnow();
      return (
        <div className="wholePage">
          <h1 className="title">{selectedResort.resortName}</h1>
          <div>
            <Link to="/">Return To Map</Link>
          </div>
          <div className="columns">
            <div className="column">
              <h3 className="subtitle">Current Weather</h3>
              <div>
                <span className="weatherLabel">Conditions:</span> {current.weather[0].description}
              </div>
              <div>
                <span className="weatherLabel">Temperature:</span> {current.temp} degrees
              </div>
              <div>
                <span className="weatherLabel">Feels Like:</span> {current.feels_like} degrees
              </div>
              <div>
                <span className="weatherLabel">Wind:</span> {current.wind_speed}mph
              </div>
            </div>
            <div className="column">
              <h3 className="subtitle is-bold">Tomorrow's Weather</h3>
              <div>
                <span className="weatherLabel">Conditions:</span> {tomorrow.weather[0].description}
              </div>
              <div>
                <span className="weatherLabel">Temperature:</span>
                <div><span className="weatherLabel">High:</span> {tomorrow.temp.max} degrees</div>
                <div><span className="weatherLabel">Low:</span> {tomorrow.temp.min} degrees</div>
              </div>
              <div>
                <span className="weatherLabel">Feels Like (midDay):</span> {tomorrow.feels_like.day} degrees
              </div>
              <div>
                <span className="weatherLabel">Wind:</span> {tomorrow.wind_speed}mph
              </div>
            </div>
            <div className="column">
              <h3 className="subtitle">Has it snowed?</h3>
              <div><span className="weatherLabel">In the past 24 hours?</span> {oneDay ? 'Yes' : 'No'}</div>
              <div><span className="weatherLabel">In the past 2 days?</span> {twoDays ? 'Yes' : 'No'}</div>
              <div><span className="weatherLabel">In the past 5 days?</span> {fiveDays ? 'Yes' : 'No'}</div>
            </div>
          </div>
          {/* <div>
            <h3 className="subtitle">See other resorts in this {selectedResort.state}:</h3>
            <div>
              {resorts.map((resort) => {
                if (resort.state === selectedResort.state && resort.resortName !== selectedResort.resortName) {
                  return (
                    <div key={resort.id} onClick={(e)=>this.setState({ selectedResort: resort })}><Link to={`/${resort.resortName}`}>{resort.resortName}</Link></div>
                  );
                }
              })}
            </div>
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
