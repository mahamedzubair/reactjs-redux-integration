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
import Account from '../../Account/container/Account';
import SearchBar from '../../SearchBar';
import Navigation from "../../navigation/container/Navigation";
import v4 from "uuid/v4";



//@translate(["common","authorization"])
class Authorization extends Component {

  constructor(props) {
    super(props);
    this.uuid = v4();
    this.uuid2 = v4();
    this.searchBarRef = React.createRef();
  };

  componentDidMount() {
    this.props.dispatch(Actions.fetchAuthorization({range:[0, 9]}));
    console.log('searchBarRef', this.searchBarRef)
  }

  /// @@@@@@@@ RENDERS ....................

  filterData = ( request ) => {
    this.searchBarRef.inputRef.value = "";
    this.props.dispatch(Actions.fetchAuthorization(request));
  } 

  closeNotification = () => {
    this.props.dispatch(Actions.closeNotification())
  }

  toggleDataList = () => {
    let request = this.props.data.filters;
    let addNumber = `${this.props.data.totalCount-request.range[1] >= 10 ? 10 : this.props.data.totalCount-request.range[1]}`;
    request.range[1] = request.range[1] + 10;
    this.props.dispatch(Actions.fetchAuthorization(request));
  }

  sortDataList = (sortType, sortOrder) => {
    let request = Object.assign({}, this.props.data.filters, {sortType, sortOrder});
    this.props.dispatch(Actions.fetchAuthorization(request));
  }

  searchList = (value) => {
    let filteredData =  this.props.data.authData.filter(function(obj) {
      return Object.keys(obj).some(function(keys) {
        return obj[keys].toString().toLowerCase().includes(value);
      })
    });
    this.props.dispatch(Actions.searchAuthData(filteredData)) 
  }

  render() {
    const {t} = this.props;
    const DEFAULTROWDISPLAY = 10;
    const filterOptions = [
        {
          label: "Plan Year",
          key: "planYear",
        },
        {
          label: "Plan Type",
          key: "planType",
        },
        {
          label: "Providers",
          key: "providers",
        }

    ]
    const columns = [
      {
        label: "Facility Provider", //t('authorization:table.facilityprovider'),
        name: "Facility Provider",
        key: "facilityprovider",
        sort: true,
        className: 'text-left'
      },
      {
        label: "Received Date", //t('authorization:table.receiveddate'),
        name: "Received Date",
        key: "receiveddate",
        sort: true,
        type: 'date',
        className: 'text-left'
      },
      {
        label: "Service Type", //t('authorization:table.servicetype'),
        name: "Service Type",
        key: "servicetype",
        sort: true,
        className: 'text-left'
      },
      {
        label: "Your Cost", //t('authorization:table.status'),
        name: "Your Cost",
        key: "yourcost",
        sort: true,
        className: 'text-right'
      },
      {
        label: "Status", //t('authorization:table.status'),
        name: "Status",
        key: "status"
      }
    ];
    return (
      <div>
        <Navigation/>
        <div className="row">
          <div className="small-12 large-12 medium-12 columns">
            <Account></Account>
            <h1 className="hl-large header">Authorization</h1>
            { this.props.data.filteredData.some((list) => list.savedCost) && 
              !this.props.data.hideNotify &&
              <NotificationBar name="Cost Status" 
              title={`$ Saving Alert Next Time Save $`} 
              onClose={this.closeNotification}
              onClick={this.closeNotification}/>
            }
            <div className="row">
              <div className="columns medium-6 large-6" >
                <Link className="button naked mobile-view" to={links.HEALTHINSURANCE}>
                  <span aria-hidden="true" className="icon-chevron-left" />Back
                </Link>
                <Filters
                  toggleFilters={this.toggleFilters}
                  filterAriaControl={this.filterAriaControl}
                  filterChange={this.filterData}
                  filterMaxCount={4}
                  filterOptions={filterOptions}
                  showMoreKey={['providers']}
                  />
                  <div className="desktop-view columns medium-6 large-6 text-right">
                      Displaying { this.props.data.isLoaded || this.props.data.filteredData.length < DEFAULTROWDISPLAY ? 
                        this.props.data.filteredData.length: DEFAULTROWDISPLAY }/
                      {this.props.data.filteredData.length} Claims
                  </div>
              </div>
            </div>
             <SearchBar
              placeholder="Search My Content"
              ariaLabel="search claims"
              ariaControls={`${this.uuid} ${this.uuid2}`}
              onValidatedChange={this.searchList}
              ref={(searchBarRef) => { this.searchBarRef = searchBarRef }}
            />

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
              sortList={this.sortDataList}
              isLoaded={this.props.data.isLoaded}
              />
              {this.props.data.totalCount >= this.props.data.filters.range[1] && (<div className="row top-1x text-center">
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