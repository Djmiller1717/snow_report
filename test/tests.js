//where we write tests
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as rrd from 'react-router-dom';

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
