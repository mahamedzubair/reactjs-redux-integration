
const INITIAL_STATE = {
  filterData: [],
  isLoaded: false,
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_FILTER_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'FETCH_FILTER_SUCCESS':
      // Adding derived authData to state
      console.log('Filter actions', action)
      let data = [...action.filterData];
      return Object.assign({}, state, {
        isFetching: false,
        filterData: [...data]
      });
    case 'FETCH_FILTER_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export default FilterReducer;