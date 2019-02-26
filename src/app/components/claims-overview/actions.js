import axios from 'axios';
export function fetchClaimOverview(params) {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    // Dispatching REQUEST action, which tells our app, that we are started requesting autorization.
    dispatch({
      type: 'FETCH_CLAIM_OVERVIEW_REQUEST'
    });
    const url = `/mlp/api/v1/mlpsvc/claims/details/${params}`;
    console.log('url', url);
    return axios
      .get("http://localhost:3000/data/clasimDetails.json")
      .then(res => {
          // When everything is ok, dispatching SUCCESS action.
          console.log('res', res.data.data)
          dispatch({
            type: 'FETCH_CLAIM_OVERVIEW_SUCCESS',
            claimOverviewData: res.data.data
          });
      })
      .catch(error => {
          dispatch({
            type: 'FETCH_CLAIM_OVERVIEW_FAILURE',
            authError: body.error
          });
        console.log("fetchRequestFailed", error);
      });
  }
}