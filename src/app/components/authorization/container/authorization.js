import React, { Component } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import UITable from "../../UITable";
import { fetchAuthorization } from '../actions';
import { connect } from 'react-redux';
import * as links from '../../../constants/routes';
import * as Actions from '../actions';
import { Link } from "react-router-dom";
import Filters from "../../../routes/filter/containers/Filter";

//@translate(["common","authorization"])
class Authorization extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.fetchAuthorization());
  }

  /// @@@@@@@@ RENDERS ....................

  filterData = ( data ) => {
    this.props.dispatch(Actions.filterAuthorization(data));
  } 

  render() {
    const {t} = this.props
    const columns = [
      {
        label: "Facility Provider", //t('authorization:table.facilityprovider'),
        name: "Facility Provider",
        key: "facilityprovider",
        sort: true
      },
      {
        label: "Received Date", //t('authorization:table.receiveddate'),
        name: "Received Date",
        key: "receiveddate",
        sort: true
      },
      {
        label: "Service Type", //t('authorization:table.servicetype'),
        name: "Service Type",
        key: "servicetype",
        sort: true
      },
      {
        label: "Status", //t('authorization:table.status'),
        name: "Status",
        key: "status",
        sort: true
      }
    ];
    console.log('this.props', this.props)
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1 className="hl-large header">Authorization</h1>
          <div className="row">
            <div className="columns medium-6 large-6">
              <Link className="button naked mobile-view" to={links.HEALTHINSURANCE}>
                <span aria-hidden="true" className="icon-chevron-left" />Back
              </Link>
              <Filters
                filterLimitedIndex={this.props.filterLimitedIndex}
                filterChange={this.onFilterChange}
                filteredData={this.props.data.authData}
                filteredDataHeaders={columns}
                toggleFilters={this.toggleFilters}
                filterAriaControl={this.filterAriaControl}
                filterVisibility={true}
                filterChange={this.filterData}
                uniqueKey="id"
                />
            </div>
          </div>
          <UITable
            data={this.props.data.filteredData}
            headers={columns}
            defaultRowDisplay={10}
            name="authorization"
            sortable={true}
            pageLink={links.CLAIMSOVERVIEW}
            providerRowDisplay='facilityprovider'
            uniqueKey="id"
            showDetails={true}
            />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.AuthReducer
  };
}

export default connect(mapStateToProps)(Authorization);