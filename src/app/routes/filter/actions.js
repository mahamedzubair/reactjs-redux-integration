import axios from 'axios';
export function fetchFilters() {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    // Dispatching REQUEST action, which tells our app, that we are started requesting autorization.
    dispatch({
      type: 'FETCH_FILTER_REQUEST'
    });
    return axios
      .get("http://localhost:3000/data/filterData.json")
      .then(res => {
          // When everything is ok, dispatching SUCCESS action.
          console.log('res filter', res)
          dispatch({
            type: 'FETCH_FILTER_SUCCESS',
            filterData: res.data.data.filterData
          });
      })
      .catch(error => {
          dispatch({
            type: 'FETCH_FILTER_FAILURE',
            authError: body.error
          });
        console.log("fetchRequestFailed", error);
      });
  }
}

