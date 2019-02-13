import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import '../../../scss/custom.scss';
import UICheckSelection from '../../../components/UI/UICheckSelection';
import UIAccordion from '../../../components/UI/UIAccordion';
import FilterList from './FilterList/FilterList';
import { connect } from 'react-redux';
import * as Actions from '../actions';


//@translate(["common"])
class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFilters: {},
      filters: {},
      isFilters: false
    };
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchFilters());
  }

  filterListInit = (type = 'init') => {
    let filters = { ... this.state.filters };
    for(let key in this.props.data.filterData[0]) {
      if (!filters[key] || type === 'clear') {
        filters[key] = [];
      }
    }
    return filters;
  }

  clearSelection = () => {
    this.setState({ filters: this.filterListInit('clear') });

  }

  changeFilter = (name, value, key) => {
    let filters = JSON.parse(JSON.stringify(this.state.filters));
    if (!filters[key]) {
      filters[key] = [];
    }
    let uniquArray = Object.keys(filters).map(function(k){return filters[k]}).reduce(function(prev, curr) {
      return prev.concat(curr);
    });
    
    if (filters[key].indexOf(value[value.length - 1]) === -1 && value.length && 
        uniquArray.indexOf(value[value.length - 1]) === -1  ) { 
        filters[key].push(value[value.length - 1])
    }
    filters[key].forEach((list, index) => {
      if (value.indexOf(list) === -1) {
        filters[key].splice(index, 1)
      }
    });
    this.setState({ lastFilters: this.state.filters, filters: filters});
  };

  onFilterChange = () => {
    let filters = { ... this.state.filters, range: [0, 9] }
    if (filters) {
      this.props.filterChange(filters);
      this.setState({ filters: {... this.state.filters}, lastFilters: {... this.state.filters}})
    }
  };

  toggleFilters = () => {
    this.setState({ isFilters: !this.state.isFilters });
  };

  resetFilters = () => {
    this.setState({ filters: {... this.state.lastFilters}})
  }

  listContent = (data, selectionFilter) => {
    return (<FilterList dataList={data} selectionFilter={selectionFilter} 
            filterMaxCount={this.props.filterMaxCount}
            showMoreKey={this.props.showMoreKey}
            changeFilter={this.changeFilter}/>)
  }

  render() {
    let filters = this.filterListInit();
    let selectionFilter = [];
    for (let key in filters) {
      filters[key].forEach((list, i) => {
        if (selectionFilter.indexOf(list) === -1) {
          selectionFilter.push(list)
        }
      });
    }
    const { t } = this.props;
    let filterData = [];
    if(this.props.data.filterData[0]) {
      this.props.filterOptions.forEach((list) => {
        filterData.push({
          'label': `${list.label}`, 'header': `${list.label}`, 'id': `${list.key}`, 'key': `${list.key}`,
          'data': this.props.data.filterData[0][list.key].map((item, index) => {
            return { value: item, label: item, key: list.key }
          })
        })
      })
    }
    
    filterData.forEach((list, i) => {
      list['body'] = this.listContent(list, selectionFilter)
    });
    return (
      <Fragment>
        <button
          className="button primary filter-btn"
          onClick={this.toggleFilters}>
          <span aria-hidden="true" className="icon-filter" />
        </button>
        <div className={this.state.isFilters ? 'active filter-list-content' : 'in-active filter-list-content'}>
          {this.state.isFilters &&
            <div id="sidenav" >
              <div id="closebtn">
                <span className="hl-medium" onClick={this.clearSelection}>Clear Section</span>
                <span aria-hidden="true" aria-expanded={this.state.isFilters}
                  onClick={() => {
                    this.toggleFilters();
                    this.resetFilters();
                  }}
                  className="icon icon-remove">close</span>
              </div>
              <div className="sidenav-content">
                <UIAccordion className="accordion-sample"
                  openNextPanel={true} allowManyPanelsToBeOpen={true} icon={false} openFirstPanelOnDefault={true}>
                  {filterData}
                </UIAccordion>
              </div>
              <button onClick={() => {
                this.onFilterChange();
                this.toggleFilters();
              } }>
                Apply Filters
                </button>
              <button onClick={() => this.props.saveFilters()}>
                Save Filters
                </button>
            </div>

          }
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.FilterReducer
  };
}

export default connect(mapStateToProps)(Filters);



// import React, { Component, Fragment } from "react";
// import { withRouter } from "react-router";
// import { translate } from "react-i18next";

// import '../scss/custom.scss';

// const filterToSet=[];

// @translate(['common', 'table'])
// class Filters extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filterData: this.props.filteredData,
//       filters: [],
//       newfilter: [],
//       headers : this.props.filteredDataHeaders
//     };
//   }


//   changeFilter(e, key, value) {
//     const filtersToSet = this.state.filters;
//     const filterSet = new Set(filtersToSet[key]);

//      if (e.target.checked) {
//        filterSet.add(value);
//       }else{
//        filterSet.delete(value);
//      }
//     filtersToSet[key] = filterSet;

//     let arrayOfSkills = Array.from(filterSet);
//     let temp ={
//       'key': key , 'values': arrayOfSkills
//     }

//     for(var i=0;i<filterToSet.length;i++){
//       if(filterToSet[i]['key'] === key){
//         filterToSet.splice(filterToSet.findIndex(function(i){
//             return i.key === key;
//         }), 1);
//       }
//     }

//     filterToSet.push(temp);     
//     if(filterToSet[0].values.length===0){
//       filterToSet.length=0;
//     }

//   }

//   render () {
//     const { t } = this.props;
//     const filterData = [];
//     let filterLimitedIndex = this.props.filterLimitedIndex ? this.props.filterLimitedIndex : 3;
//     for(let i=0; i<filterLimitedIndex; i++) {
//       filterData.push({'label':`${this.props.filteredDataHeaders[i].label}`, 'id':`${this.props.filteredDataHeaders[i].key}`, 'data':[...new Set(this.props.filteredData.map(item => item[this.props.filteredDataHeaders[i].key]))]})
//     }

//     let visibility ="hide";
//       if (this.props.filterVisibility){
//         visibility ="show";
//       }

//     return (
//       <div className="row">
//         <div className="small-12 medium-12 large-6 columns">
//         <div id="sidenav" className={visibility}>
//           <div id="closebtn"  onClick={this.props.toggleFilters}>  
//             <span className="hl-medium">Clear Section</span> 
//             <span aria-hidden="true" aria-expanded={this.props.toggleFilters} className="icon icon-remove"></span>
//           </div>


//           {filterData.map((value, i) => (
//                <div key={i}>   
//               <h1 className="hl-medium scrollable">{value.label}</h1>  
//                <ul>{value.data.map((x,ikey)=>
//                     <li key={ikey}>
//                     <label>
//                         <input
//                         type="checkbox"
//                         label={x}
//                         onChange={e => this.changeFilter(e, value.id, x)}
//                         />{" "}
//                         {x}
//                     </label>
//                     </li>                    
//                     )}
//                 </ul>    
//               </div>                    
//               ))}
//             <hr/>
//           <div className="columns small-12 text-center fixed-button">
//           <button onClick={() => this.props.filterChange(filterToSet)}>
//             {" "}
//             {t('table:filter.applyfilter')}
//           </button>
//           </div>
//         </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Filters;



