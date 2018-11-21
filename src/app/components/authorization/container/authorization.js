import React, { Component } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Table from "../../../components/Table";
import { fetchAuthorization } from '../actions';
import { connect } from 'react-redux';
import * as links from '../../../constants/routes';
import * as Actions from '../actions';

//@translate(["common"])
class Authorization extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.fetchAuthorization());
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
    const ariaLabelKey = ['facilityprovider', 'receiveddate']; 
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1 id="authorization">Authorizations</h1>
            <Table
              data={this.props.data.authData}
              headers={columns}
              defaultRowDisplay={10}
              name="authorization"
              sortable={true}
              pageLink = {links.CLAIMSOVERVIEW}
              providerRowDisplay='facilityprovider'
              linkAriaLabelKey={ariaLabelKey}
              filterAriaControl="sidenav authorization"
              viewMoreAriaLabel="View more about Claims"
              toolTipCol="facilityprovider"
              />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.authReducer
  };
}

export default connect(mapStateToProps)(Authorization);

