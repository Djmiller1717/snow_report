import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import resortsReducer from './resorts';

const appReducer = combineReducers({
  resorts: resortsReducer,
});

const middleware = [
  thunkMiddleware.withExtraArgument({ axios }),
];

export default createStore(
  appReducer,
  applyMiddleware(...middleware),
);
