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
import NotificationBar from "../../UI/UINotification";


//@translate(["common","authorization"])
class Authorization extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.fetchAuthorization());
  }

  /// @@@@@@@@ RENDERS ....................

  filterData = ( data ) => {
    this.props.dispatch(Actions.filterAuthorization(data));
  } 

  closeNotification = () => {
    this.props.dispatch(Actions.closeNotification())
  }

  toggleDataList = () => {
    this.props.dispatch(Actions.toggleList())
  }

  render() {
    const {t} = this.props;
    const DEFAULTROWDISPLAY = 10;
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
        label: "Your Cost", //t('authorization:table.status'),
        name: "Your Cost",
        key: "yourcost",
        sort: true
      },
      {
        label: "Status", //t('authorization:table.status'),
        name: "Status",
        key: "status"
      }
    ];
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1 className="hl-large header">Authorization</h1>
          { this.props.data.filteredData.some((list) => list.savedCost) && 
            !this.props.data.hideNotify &&
            <NotificationBar name="Cost Status" 
            title={`$ Saving Alert Next Time Save $`} 
            onClose={this.closeNotification}
            onClick={this.closeNotification}/>
          }
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
                filterMaxList={4}
                />
                 <div className="desktop-view columns medium-6 large-6 text-right">
                    Displaying { this.props.data.isLoaded || this.props.data.filteredData.length < DEFAULTROWDISPLAY ? 
                      this.props.data.filteredData.length: DEFAULTROWDISPLAY }/
                    {this.props.data.filteredData.length} Claims
                </div>
            </div>
          </div>
          <UITable
            data={this.props.data.filteredData}
            headers={columns}
            defaultRowDisplay={DEFAULTROWDISPLAY}
            name="authorization"
            sortable={true}
            pageLink={links.CLAIMSOVERVIEW}
            providerRowDisplay='facilityprovider'
            uniqueKey="id"
            showDetails={true}
            isLoaded={this.props.data.isLoaded}
            />

            {!this.props.data.isLoaded &&
              this.props.data.filteredData.length > DEFAULTROWDISPLAY && 
              (<div className="row top-1x text-center">
                  <div className="columns small-12 ">
                    <button
                      type="button"
                      className="button secondary"
                      onClick={this.toggleDataList}
                      >
                      View More
                    </button>
                  </div>
                </div>
              )}
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