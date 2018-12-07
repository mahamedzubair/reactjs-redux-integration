
const INITIAL_STATE = {
  authData: [],
  filters: [],
  columns: [],
  filteredData: [],
  isLoaded: false
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_AUTHORIZATION_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'FETCH_AUTHORIZATION_SUCCESS':
      // Adding derived authData to state
      let data = [...action.authData];
      data = data.map((list, index) => {
        list['claimAppealed'] = false;
        if (index === 2 || index === 3) {
          list['claimAppealed'] = true;
        }
        return list;
      });
      return Object.assign({}, state, {
        isFetching: false,
        authData: data,
        filteredData: [...data]
      });
    case 'FETCH_AUTHORIZATION_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case 'FILTER_AUTH_DATA':
      // Providing error message to state, to be able display it in UI.
      console.log('action', action)
      return Object.assign({}, state, {
        filteredData: action.payload.filteredData,
        isLoaded: true
      });
    default:
      return state;
  }
}

export default AuthReducer;