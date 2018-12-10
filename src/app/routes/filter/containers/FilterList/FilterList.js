import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import '../../../../scss/custom.scss';
import UICheckSelection from '../../../../components/UI/UICheckSelection';
import UIDropDownButton from '../../../../components/UI/modules/UIDropDownButton';

//@translate(["common"])
class FilterList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.filteredData,
      toggleList: true
    };
  }

  toggleList = () =>  {this.setState({ toggleList: !this.state.toggleList })}
  render() {
      let dataList = this.props.dataList;
      let sliceCount = this.state.toggleList ? this.props.filterMaxList : this.props.dataList.data.length;
      return (
          <div className="filter-list">
            <UICheckSelection name='list'
              choices={dataList.data.slice(0, sliceCount)}
              defaultValue={this.props.selectionFilter}
              onValidatedChange={(key, label) => this.props.changeFilter(key, label, dataList.id)}/>
            {this.props.dataList.data.length > this.props.filterMaxList && 
                <UIDropDownButton 
                buttonAction={this.toggleList}
                type="toggle"
                ddId={this.state.toggleList.toString()} 
                label= {this.state.toggleList ? 'Show More' : 'Show Less'}/>
            }
          </div>
      )
  }
}
export default FilterList;