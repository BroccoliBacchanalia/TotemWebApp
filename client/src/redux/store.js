import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import reducer from './reducers/index.js';

const middleware = applyMiddleware(logger(), promise(), thunk);

export default createStore(reducer, middleware);
