
const INITIAL_STATE = {
  authData: [],
  filters: {
    range:[0, 9]
  },
  columns: [],
  filteredData: [],
  isLoaded: false,
  hideNotify: false
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
        list['savedCost'] = false;
        if (index === 2 || index === 3) {
          list['savedCost'] = true;
        }
        return list;
      });
      return Object.assign({}, state, {
        isFetching: false,
        authData: data,
        authList: action.authList,
        filteredData: [...data],
        filters: action.filters,
        totalCount: action.totalCount
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
        isLoaded: false
      });

      case 'CLOSE_NOTIFY':
      return Object.assign({}, state, {
        hideNotify: true
      });

      case 'TOGGLE_LIST':
      return Object.assign({}, state, {
        isLoaded: action.payload.isLoaded
      });

      case 'SEARCH_AUTH_DATA':
      return Object.assign({}, state, {
        filteredData: action.payload.filteredData
      });


    default:
      return state;
  }
}

export default AuthReducer;