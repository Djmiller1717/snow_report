import axios from 'axios';

const OpenWeatherKey = 'fa6039ecfc21f838c8dece76ac76be77';

const GET_WEATHER = 'GET_WEATHER';
const GET_WEATHERHISTORY = 'GET_WEATHERHISTORY';

const fetchWeather = (weather) => ({
  type: GET_WEATHER,
  weather,
});

const fetchPreviousWeather = (weatherHistory) => ({
  type: GET_WEATHERHISTORY,
  weatherHistory,
});

export const fetchedWeather = (lat, long) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=${OpenWeatherKey}`);
    dispatch(fetchWeather(data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchedPreviousWeather = (lat, long) => async (dispatch) => {
  try {
    const yesterday = Math.round((new Date().getTime() - 86400000) / 1000);
    const twoDays = Math.round((new Date().getTime() - 172800000) / 1000);
    const threeDays = Math.round((new Date().getTime() - 259200000) / 1000);
    const fourDays = Math.round((new Date().getTime() - 345600000) / 1000);
    const fiveDays = Math.round((new Date().getTime() - 432000000) / 1000);

    const yesterdayInfo = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=imperial&dt=${yesterday}&appid=${OpenWeatherKey}`);

    const twoDaysAgoInfo = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=imperial&dt=${twoDays}&appid=${OpenWeatherKey}`);

    const threeDaysAgoInfo = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=imperial&dt=${threeDays}&appid=${OpenWeatherKey}`);

    const fourDaysAgoInfo = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=imperial&dt=${fourDays}&appid=${OpenWeatherKey}`);

    const fiveDaysAgoInfo = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&units=imperial&dt=${fiveDays}&appid=${OpenWeatherKey}`);

    const previousFiveDates = {
      yesterday: yesterdayInfo.data,
      twoDaysAgo: twoDaysAgoInfo.data,
      threeDaysAgo: threeDaysAgoInfo.data,
      fourDaysAgo: fourDaysAgoInfo.data,
      fiveDaysAgo: fiveDaysAgoInfo.data,
    };

    dispatch(fetchPreviousWeather(previousFiveDates));
  } catch (err) {
    console.log(err);
  }
};

export function weatherReducer(state = {}, action) {
  if (action.type === GET_WEATHER) {
    state = action.weather;
  }
  return state;
}

export function previousWeatherReducer(state = {}, action) {
  if (action.type === GET_WEATHERHISTORY) {
    state = action.weatherHistory;
  }
  return state;
}
