import axios from 'axios';
export function fetchAuthorization(request) {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    // Dispatching REQUEST action, which tells our app, that we are started requesting autorization.
    dispatch({
      type: 'FETCH_AUTHORIZATION_REQUEST'
    });
    return axios
      .get("http://localhost:3000/data.json")
      .then(res => {
          // When everything is ok, dispatching SUCCESS action.
          dispatch({
            type: 'FETCH_AUTHORIZATION_SUCCESS',
            authData: res.data.claimsList,
            totalCount: res.data.totalCount,
            filters: request
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

export function closeNotification() {
  return {
    type: "CLOSE_NOTIFY",
    payload : {
      hideNotify : true
    }
  }
}

export function searchAuthData(filters) {
  return {
    type: "SEARCH_AUTH_DATA",
    payload : {
      filteredData : filters
    }
  }
}

export function toggleList() {
  return {
    type: "TOGGLE_LIST",
    payload : {
      isLoaded  : true
    }
  }
}
