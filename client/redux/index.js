import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import resortsReducer from './resorts';
import { weatherReducer, previousWeatherReducer } from './weather';

const appReducer = combineReducers({
  resorts: resortsReducer,
  weather: weatherReducer,
  weatherHistory: previousWeatherReducer,
});

const middleware = [
  thunkMiddleware.withExtraArgument({ axios }),
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware),
);
