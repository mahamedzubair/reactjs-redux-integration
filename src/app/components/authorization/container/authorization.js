import React, { Component } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Table from "../../../components/Table";
import { fetchAuthorization } from '../actions';
import { connect } from 'react-redux';

@translate(["common"])
class Authorization extends Component {
  
  componentDidMount()  {
    // When container was mounted, we need to start fetching todos.
    this.props.fetchAuthorization();
  }

  /// @@@@@@@@ RENDERS ....................

  render() {
    const columns = [
          {
            name: "Received Date",
            key: "receiveddate",
            sort:true
          },
          {
            name: "Facility/Provider",
            key: "facilityprovider",
            sort:true
          },
          {
            name: "Service Type",
            key: "servicetype",
            sort:true
          },
          {
            name: "Status",
            key: "status",
            sort:true
          },
          {
            name: "Show Details",
            key: "showdetails",
            sort:false
          }
    ];
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1 id="authorization">Authorizations</h1>
            <Table
              data={this.props.data.authData}
              headers={columns}
              defaultRowDisplay={10}
              id="authorization"
              sortable={true}
              filterLimitedIndex="3"
              />
        </div>
      </div>
    );
  }
}
// This function is used to convert redux global state to desired props.
function mapStateToProps(state) {
  // `state` variable contains whole redux state.
  return {
    data: state.authReducer
  };
}

// This function is used to provide callbacks to container component.
function mapDispatchToProps(dispatch) {
  return {
    // This function will be available in component as `this.props.fetchTodos`
    fetchAuthorization: function() {
      dispatch(fetchAuthorization());
    }
  };
}

// We are using `connect` function to wrap our component with special component, which will provide to container all needed data.
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);


