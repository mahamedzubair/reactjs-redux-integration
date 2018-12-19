
const INITIAL_STATE = {
  claimOverviewData: {},
  isLoaded: false,
  isFetching: false
};

const ClaimOverviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_CLAIM_OVERVIEW_REQUEST':
      // This time, you may want to display loader in the UI.
      return Object.assign({}, state, {
        isFetching: true
      });

      case 'FETCH_CLAIM_OVERVIEW_SUCCESS':
      // Adding derived authData to state
      let data = {...action.claimOverviewData};
      return Object.assign({}, state, {
        isFetching: false,
        claimOverviewData: data
      });
    default:
      return state;
  }
}

export default ClaimOverviewReducer;