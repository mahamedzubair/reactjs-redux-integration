import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Filters from "../routes/filter/containers/Filter";

@translate(["common"])
class Table extends Component{
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
      isLoaded: false
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

    if(val.length !== 0){
    for (let i = 0; i < this.state.data.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        for (let k = 0; k < filters[j].values.length; k++) 
        {
          if (this.state.data[i][filters[j].key] === filters[j].values[k])
          {
            filteredData.push(this.state.data[i]);
          }
        }
      }
    }
    this.setState({isFilterData: filteredData, isLoaded: true })
  } else{
    this.setState({isFilterData: this.state.data, isLoaded: true})
  }
}
  
  /// @@@@@@@@ RENDERS ....................

  render() {
    const loadSize = this.state.isLoaded
      ? this.state.isFilterData.length
      : this.props.defaultRowDisplay;
      
    return (
      <Fragment>
        <div className="row">
          <div className="columns small-12 large-12 medium-12">
          <div>
            <button className="button primary"
              onClick={() => {
              this.setState({isFilters: !this.state.isFilters});
            }}>
              <span className="icon-filter" />
                Filters
          </button>
          {this.state.isFilters && 
               <Filters filterLimitedIndex={this.props.filterLimitedIndex}  filterChange={this.onFilterChange} filteredData={this.state.data} filteredDataHeaders={this.state.headers} />
            }
          </div>
            <div className="table.search" />
            <div className="table.records text-right">
            Displaying {loadSize}/{this.state.isFilterData.length} Claims
          </div>
          </div>
        <table
          aria-labelledby={this.props.id}
          className="dataTable responsiveTable"
        >
          <thead>
            <tr>
              {this.state.headers.map((item, index) => {
                let classname;
                let sortname;
                if (item.sort) {
                  classname= 'sorting';
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
                    <button className="button naked" aria-controls={this.props.id}>
                      {item.name}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.isFilterData &&
              this.state.isFilterData.slice(0, loadSize).map((rowData, index) => (
                <tr key={index} data-item={rowData}
                  className={rowData.claimAppealed ? 'claim-active' : ''}>
                  {this.state.headers.map((obj, dataIndex) => (
                    <td key={dataIndex} data-title={rowData[obj.key]} className='pivoted'>
                      <div className="tdBefore">
                        {obj.name}
                      </div>
                      {obj.key !== 'claimAppealed' ? rowData[obj.key] : ''}
                      <br/>
                      {obj.key === 'status' && rowData.claimAppealed ? 'Claim Applealed' : '' }
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {!this.state.isLoaded &&
          this.state.isFilterData.length > this.props.defaultRowDisplay && (
            <div className="columns small-12 text-center">
              <button
                type="button"
                className="button secondary"
                onClick={() => this.setState({ isLoaded: true })}
              >
                View More Cliams
              </button>
            </div>
          )}
          </div>
      </Fragment>
    );
  }

}


export default Table;

