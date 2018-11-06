import { combineReducers } from 'redux'
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
//import { syncHistoryWithStore } from 'react-router-redux';
//import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './RootReducer';

// legacy 
//export const history = syncHistoryWithStore(browserHistory, store);
const logger = createLogger();
let middleware = (process.env.NODE_ENV == 'prod')? applyMiddleware(thunk, promise) : composeWithDevTools(applyMiddleware(thunk, promise, logger));
const store = createStore(rootReducer, middleware);

export default store;
