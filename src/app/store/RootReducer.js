import { combineReducers } from 'redux';

import authReducer from '../components/authorization/reducers';

const rootReducer = combineReducers({
	authReducer
});

export default rootReducer;