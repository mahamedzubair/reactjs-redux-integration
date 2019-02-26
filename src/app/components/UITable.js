import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

//@translate(['common', 'table'])
class UITable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: this.props.headers,
      data: this.props.data,
      sort: {
        column: "",
        direction: "icon icon-arrow-up",
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
        isFilterData: [...newProps.data],
        isLoaded: newProps.isLoaded
      };
    }
    return null;
  }

  //SORTING FUNCTIONALITY
  onSort = (event, sortKey, isSort, itemType) => {
    const sortData = this.state.isFilterData;
    let tableSort = this.state.sort;
    
    if (isSort) {
      if (
        tableSort.column &&
        tableSort.column === sortKey &&
        tableSort.direction === "icon icon-arrow-up"
      ) {
        tableSort = {
          column: sortKey,
          direction: "icon icon-arrow-down",
          sortname: "descending"
        };
        
        this.props.sortList(sortKey, 'desc');
      } else {
        tableSort = {
          column: sortKey,
          direction: "icon icon-arrow-up",
          sortname: "ascending"
        };
        this.props.sortList(sortKey, 'asc');
      }
    }
    this.setState({ isFilterData: sortData, sort: tableSort });
  };

  render () {
    const { t } = this.props;
    const loadSize = this.props.isLoaded
      ? this.state.isFilterData.length
      : this.props.defaultRowDisplay;

    return (
              <Fragment>               
                <table id={this.props.name} className="dataTable responsiveTable bottom-1x">
                  <thead>
                    <tr>
                      {this.state.headers.map((item, index) => {
                        let classname;
                        let sortname;
                        let label = item.label;
                        if (item.sort) {
                          classname = "icon icon-sort-ascend-to-descend";
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
                          label = <button className="button naked">{label}</button>
                        }
                        return (
                          <th
                            className={classname}
                            rowSpan="1"
                            colSpan="1"
                            key={index}
                            onClick={e => this.onSort(e, item.key, item.sort, item.type)}
                            aria-sort={sortname}
                          >
                            {label}
                          </th>
                        );
                      })}
                      {this.props.showDetails &&
                        <th>
                          Show Details
                        </th>
                      }
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
                                className={obj.columnClass}
                              >
                              {obj.key === "yourCost" && rowData.savedCost
                                  ? <span className="desktop-view icon circledIconColoredSmall icon-money-fill-circle"></span>
                                  : ""}
                                {rowData[obj.key]}
                                <br/>
                                {obj.key === "status" && rowData.claimAppealed === "Y"
                                  ? 
                                  <a href="#" className="desktop-view icon">
                                    <span className="icon icon-1x icon-exclamation-circle-filled right-1x" aria-hidden="true" aria-label="warning" tabIndex="0"></span>
                                    <span>Claimed</span>
                                  </a>
                                  : ""}
                              </td>
                            ))}
                            {this.props.showDetails &&
                              <td className="text-center">
                                <a className="cursor-pointer" onClick={() => this.props.navigateToDetails(rowData)}>
                                Show Details
                                </a>
                              </td>
                            }
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
                        .slice(0, this.state.headers.length-1)
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
              }}
              </MediaQuery>
              </table>
              </Fragment>
            );
          }; 
}

 export default UITable;