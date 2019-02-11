import { Map } from 'immutable';
const INITIAL_STATE = {
  navData: {},
  isFetching: false
};

const NavigationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_NAV_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'FETCH_NAV_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        navData: {...action.navData},
      });

    case 'FETCH_NAV_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default NavigationReducer;