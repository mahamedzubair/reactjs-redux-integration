import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import * as links from "../constants/routes";
import MediaQuery from "react-responsive";
import "../scss/custom.scss";
import "../scss/_dataTable.scss";

//@translate(['common', 'table'])
class UITable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: this.props.headers,
      data: this.props.data,
      sort: {
        column: "",
        direction: "sorting_asc",
        sortname: ""
      },
      isFilterData: [...this.props.data],
      isFilters: false,
      isLoaded: false,
    };
  }

  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.data !== currentState.data) {
      return {
        data: newProps.data,
        isFilterData: [...newProps.data]
      };
    }
    return null;
  }

  //SORTING FUNCTIONALITY
  onSort = (event, sortKey, isSort) => {
    const sortData = this.state.isFilterData;
    let tableSort = this.state.sort;
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

    if (isSort) {
      if (
        tableSort.column &&
        tableSort.column === sortKey &&
        tableSort.direction === "sorting_asc"
      ) {
        tableSort = {
          column: sortKey,
          direction: "sorting_desc",
          sortname: "descending"
        };
        sortData.sort((b, a) => {
          return collator.compare(a[sortKey], b[sortKey]);
        });
      } else {
        tableSort = {
          column: sortKey,
          direction: "sorting_asc",
          sortname: "ascending"
        };
        sortData.sort((a, b) => {
          return collator.compare(a[sortKey], b[sortKey]);
        });
      }
    }
    this.setState({ isFilterData: sortData, sort: tableSort });
  };

  render() {
    const { t } = this.props;
    const loadSize = this.state.isLoaded
      ? this.state.isFilterData.length
      : this.props.defaultRowDisplay;

    return (
      <Fragment>
        <div className="desktop-view columns medium-6 large-6 text-right">
          Displaying{loadSize}/{this.state.isFilterData.length} Claims
        </div>
        <table id={this.props.name} className="dataTable responsiveTable">
          <thead>
            <tr>
              {this.state.headers.map((item, index) => {
                let classname;
                let sortname;
                if (item.sort) {
                  classname = "sorting";
                  if (
                    this.state.sort.column &&
                    this.state.sort.column === item.key
                  ) {
                    classname = this.state.sort.direction;
                  }
                  sortname = "none";
                  if (
                    this.state.sort.column &&
                    this.state.sort.column === item.key
                  ) {
                    sortname = this.state.sort.sortname;
                  }
                }
                return (
                  <th
                    className={classname}
                    rowSpan="1"
                    colSpan="1"
                    key={index}
                    onClick={e => this.onSort(e, item.key, item.sort)}
                    aria-sort={sortname}
                    >
                    <button className="button naked">
                      {item.label}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <MediaQuery minDeviceWidth={640}>
            {matches => {
              if (matches) {
                return (
                  <tbody>
                    {this.state.isFilterData &&
                      this.state.isFilterData
                        .slice(0, loadSize)
                        .map((rowData, index) => (
                          <tr key={index}
                            className={
                              rowData.claimAppealed ? "claim-active" : ""
                            }>
                            {this.state.headers.map((obj, dataIndex, arr) => (
                              <td
                                key={dataIndex}
                                data-title={rowData[obj.key]}
                                >
                                {obj.key !== "claimAppealed"
                                  ? arr.length - 1 === dataIndex ? (
                                    <Link to={this.props.pageLink}>
                                      {rowData[obj.key]}
                                    </Link>
                                  ) : (
                                      rowData[obj.key]
                                    )
                                  : ""}
                                <br />
                                {obj.key === "status" && rowData.claimAppealed
                                  ? <span className="desktop-view">Claim Applealed </span>
                                  : ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                  </tbody>
                );
              } else {
                return (
                  <tbody>
                    {this.state.isFilterData &&
                      this.state.isFilterData
                        .slice(0, loadSize)
                        .map((rowData, index) => (
                          <tr
                            key={index}
                            className={
                              rowData.claimAppealed ? "claim-active" : ""
                            }
                            >
                            {this.state.headers
                              .slice(0, this.state.headers.length - 1)
                              .map((obj, dataIndex) => (
                                <td
                                  key={dataIndex}
                                  data-title={rowData[obj.key]}
                                  className="pivoted"
                                  >
                                  <Link to={this.props.pageLink} className="details-view">
                                    <div className="tdBefore">
                                      {obj.key === this.props.providerRowDisplay ? rowData[obj.key] : obj.name}
                                    </div>
                                    <span className={obj.key === this.props.providerRowDisplay ? 'provider-header' : ''}>
                                      {rowData[obj.key]}
                                    </span>
                                  </Link>
                                </td>
                              ))}

                          </tr>
                        ))}
                  </tbody>
                );
              }
            } }
          </MediaQuery>
        </table>
        {!this.state.isLoaded &&
          this.state.isFilterData.length >
          this.props.defaultRowDisplay && (
            <div className="row top-1x text-center">
              <div className="columns small-12 ">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => this.setState({ isLoaded: true })}
                  >
                  View More
                </button>
              </div>
            </div>
          )}
      </Fragment>
    );
  };

}

export default UITable;