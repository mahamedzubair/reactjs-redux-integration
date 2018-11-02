import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from 'redux-logger'

import list from "./reducers/listReducer";
import user from "./reducers/userReducer";

export default createStore(
    combineReducers({
        list,
        user
    }),
    {},
    applyMiddleware(createLogger(), thunk, promise())
);