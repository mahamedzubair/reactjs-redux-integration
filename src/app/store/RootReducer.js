import { combineReducers } from 'redux';

import AuthReducer from '../components/authorization/reducers';
import ClaimOverviewReducer from '../components/claims-overview/reducers';
import FilterReducer from '../routes/filter/reducers';
import AccountDetailReducer from '../components/Account/reducers'

const rootReducer = combineReducers({
	AuthReducer, ClaimOverviewReducer, FilterReducer, AccountDetailReducer
});

export default rootReducer;