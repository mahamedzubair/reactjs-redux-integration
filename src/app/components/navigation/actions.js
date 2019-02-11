import axios from 'axios';
export function getNav() {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    dispatch({
      type: 'FETCH_NAV_REQUEST'
    });
    return axios
      .get("http://localhost:3000/data/side-nav.json")
      .then(res => {
          // When everything is ok, dispatching SUCCESS action.
          console.log('resgetNav', res);
          dispatch({
            type: 'FETCH_NAV_SUCCESS',
            navData: res.data.data
          });
      })
      .catch(error => {
          dispatch({
            type: 'FETCH_NAV_FAILURE',
            authError: body.error
          });
        console.log("fetchRequestFailed", error);
      });
  }
}
