import { combineReducers } from 'redux';

import AuthReducer from '../components/authorization/reducers';
import ClaimOverviewReducer from '../components/claims-overview/reducers';

const rootReducer = combineReducers({
	AuthReducer, ClaimOverviewReducer
});

export default rootReducer;