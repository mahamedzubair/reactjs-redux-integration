import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Filters from "../routes/filter/containers/Filter";
import { Link } from "react-router-dom";
import * as links from "../constants/routes";
import MediaQuery from "react-responsive";
import "../scss/custom.scss";

//@translate(["common"])
class Table extends Component {
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
      visible: false
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

  toggleFilters = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  //SORTING FUNCTIONALITY
  onSort = (event, sortKey, isSort) => {
    const sortData = this.state.isFilterData;
    let tableSort = this.state.sort;
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
        sortData.sort((b, a) => a[sortKey].localeCompare(b[sortKey]));
      } else {
        tableSort = {
          column: sortKey,
          direction: "sorting_asc",
          sortname: "ascending"
        };
        sortData.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
      }
    }
    this.setState({ isFilterData: sortData, sort: tableSort });
  };

  onFilterChange = (val) => {
    const filters = val;
    const filteredData = [];

    if (val.length !== 0) {
      for (let i = 0; i < this.state.data.length; i++) {
        for (let j = 0; j < filters.length; j++) {
          for (let k = 0; k < filters[j].values.length; k++) {
            let uniqueIds = filteredData.map((item, index) => {
              return item[this.props.uniqueKey];
            });
            if (this.state.data[i][filters[j].key] === filters[j].values[k] && 
              uniqueIds.indexOf(this.state.data[i][this.props.uniqueKey]) === -1) {
              filteredData.push(this.state.data[i]);
            }
          }
        }
      }
      this.setState({ isFilterData: filteredData, isLoaded: true});
    } else {
      this.setState({ isFilterData: this.state.data, isLoaded: true});
    }
  };

  renderTable = t => {
    const loadSize = this.state.isLoaded
      ? this.state.isFilterData.length
      : this.props.defaultRowDisplay;

    return (
      <div className="columns large-12 medium-12">
        <div>
          <Link className="button naked back-btn" to={links.HEALTHINSURANCE}>
            <span aria-hidden="true" class="icon-chevron-left" />Back
          </Link>
          <button
            className="button naked filter-btn"
            onMouseDown={this.toggleFilters}
            aria-controls={this.props.filterAriaControl}
            aria-expanded={this.state.isFilters}
            onClick={() => {
              this.setState({ isFilters: !this.state.isFilters });
            }}
          >
            <span className="icon-filter" />
            Filters
          </button>
          <div className="table.records text-right" aria-describedby={this.props.name}>
            Displaying {loadSize}/{this.state.isFilterData.length} Claims
          </div>
          <div className="clearfix"></div>
          {this.state.isFilters && (
            <Filters
              filterLimitedIndex={this.props.filterLimitedIndex}
              filterChange={this.onFilterChange}
              filteredData={this.state.data}
              filteredDataHeaders={this.state.headers}
              toggleFilters={this.toggleFilters}
              filterVisibility={this.state.visible}
            />
          )}
        </div>
        <table
          id={this.props.name}
          className="dataTable responsiveTable"
        >
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
                      {item.name}
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
                          <tr key={index} data-item={rowData}>
                            {this.state.headers.map((obj, dataIndex, arr) => (
                              <td
                                key={dataIndex}
                                data-title={rowData[obj.key]}
                              >
                                {obj.key !== "claimAppealed"
                                  ? arr.length - 1 === dataIndex ? (
                                      <Link to={this.props.pageLink} 
                                        aria-label={this.props.linkAriaLabelKey.reduce((accumulator, currentValue, currentIndex, array) => {
                                                        return `${accumulator} ${rowData[currentValue]}`;
                                                    }, '')}>
                                        {rowData[obj.key]}
                                      </Link>
                                    ) : (
                                      rowData[obj.key]
                                    )
                                  : ""}
                                <br />
                                {obj.key === "status" && rowData.claimAppealed
                                  ? <span className="desktop-view">Claim Applealed</span>
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
                      this.state.isFilterData.map((rowData, index) => (
                        <tr
                          key={index}
                          data-item={rowData}
                          className={
                            rowData.claimAppealed ? "claim-active" : ""
                          }
                        >
                          {this.state.headers.map((obj, dataIndex) => (
                            <td
                              key={dataIndex}
                              data-title={rowData[obj.key]}
                              className="pivoted"
                            >
                              <div className="tdBefore">
                                {obj.key === this.props.providerRowDisplay ? rowData[obj.key] : obj.name}
                              </div>
                              <span className={obj.key === this.props.providerRowDisplay ? 'provider-header' : ''}>
                                {rowData[obj.key]}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  );
                }
              }}
              </MediaQuery>
        </table>
        {!this.state.isLoaded &&
          this.state.isFilterData.length >
            this.props.defaultRowDisplay && (
            <div className="columns small-12 text-center desktop-view">
              <button
                type="button"
                className="button secondary"
                onClick={() => this.setState({ isLoaded: true })}
                aria-label={this.props.viewMoreAriaLabel}
              >
                View More Cliams
              </button>
            </div>
          )}
      </div>
    );
  };

  render() {
    const { t } = this.props;
    return <Fragment>{this.renderTable(t)}</Fragment>;
  }
}

export default Table;

