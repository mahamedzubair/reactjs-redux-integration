import React, { Component, Fragment } from "react";

import { withRouter } from "react-router";
import { translate } from "react-i18next";

@translate(["common"])
const filterToSet=[];
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.filteredData,
      filters: [],
      newfilter: [],
      headers : this.props.filteredDataHeaders
    };
  }

  componentDidMount() {
    
  }

  changeFilter(e, key, value) {
    const filtersToSet = this.state.filters;
  //   const filterSet = new Set(filtersToSet[key]);
  //   if (e.target.checked) {
  //     filterSet.add(value);
  //   } else {
  //     filterSet.delete(value);
  //   }
  //   filtersToSet[key] = filterSet;

  //   this.setState({ filters: filtersToSet });
    
  //   console.log("Filter123",this.state.filters)
  // }
  const filterSet = new Set(filtersToSet[key]);
    
     if (e.target.checked) {
       filterSet.add(value);
     } else {
       filterSet.delete(value);
     }
    filtersToSet[key] = filterSet;
     
    
    let arrayOfSkills = Array.from(filterSet);
    let temp ={
      'key': key , 'values': arrayOfSkills
    }
    for(var i=0;i<filterToSet.length;i++){
      if(filterToSet[i]['key'] === key){
        filterToSet.splice(filterToSet.findIndex(function(i){
            return i.key === key;
        }), 1);
      }
    }
    
    filterToSet.push(temp);     
    if(filterToSet[0].values.length===0){
      filterToSet.length=0;
    }

  }

  
  

  render() {
    const filterData = [];
    let filterLimitedIndex = this.props.filterLimitedIndex ? this.props.filterLimitedIndex : 3;
    for(let i=0; i<filterLimitedIndex; i++) {
      filterData.push({'name':`${this.props.filteredDataHeaders[i].name}`, 'id':`${this.props.filteredDataHeaders[i].key}`, 'data':[...new Set(this.props.filteredData.map(item => item[this.props.filteredDataHeaders[i].key]))]})
    }
    return (
        <div className="sidenav">
          {filterData.map((value, i) => (
               <div key={i}>   
              <div>{value.name}</div>  
               <ul>{value.data.map((x,ikey)=>
                    <li key={ikey}>
                    <label>
                        <input
                        type="checkbox"
                        name={x}
                        onChange={e => this.changeFilter(e, value.id, x)}
                        />{" "}
                        {x}
                    </label>
                    </li>                    
                    )}
                </ul>    
              </div>                    
              ))}
          <button onClick={() => this.props.filterChange(filterToSet)}>
            {" "}
            Apply Filters
          </button>
        </div>
    );
  }
}

export default Filter;

