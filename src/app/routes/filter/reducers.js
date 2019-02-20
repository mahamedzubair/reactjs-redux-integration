
const INITIAL_STATE = {
  filterData: [],
  isLoaded: false,
  isError: false
};

const FilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_FILTER_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true,
        isError: false
      });
    case 'FETCH_FILTER_SUCCESS':
      // Adding derived authData to state
      console.log('Filter actions', action)
      let data = [...action.filterData];
      return Object.assign({}, state, {
        isFetching: false,
        isError: false,
        filterData: [...data]
      });
    case 'FETCH_FILTER_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
        error: action.filterError
      });
    default:
      return state;
  }
}

export default FilterReducer;