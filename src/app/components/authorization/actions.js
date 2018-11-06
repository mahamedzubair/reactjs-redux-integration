import axios from 'axios';
export function fetchAuthorization() {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    // Dispatching REQUEST action, which tells our app, that we are started requesting autorization.
    dispatch({
      type: 'FETCH_AUTHORIZATION_REQUEST'
    });
    return axios
      .get("http://localhost:8080/data.json")
      .then(res => {
          // When everything is ok, dispatching SUCCESS action.
          console.log('res', res)
          dispatch({
            type: 'FETCH_AUTHORIZATION_SUCCESS',
            authData: res.data.claimsList
          });
      })
      .catch(error => {
          dispatch({
            type: 'FETCH_AUTHORIZATION_FAILURE',
            authError: body.error
          });
        console.log("fetchRequestFailed", error);
      });
  }
}

