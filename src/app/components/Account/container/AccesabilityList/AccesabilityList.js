import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class AccesabilityList extends Component {
    constructor(props) {
        super(props);
    }

    renderAccessibilityMobilityTransportation = () => {
        let list = this.props.data.getIn(['memberView', 'preference', 0, 'accessibilityMobilityDisabilityandTransportation']);
        let accesibilityValues = ['Accessibility', 'Mobility', 'Disability', 'Transportation']
        let contentList = [];
        if(list) {
            for(let i = 0; i < list.size; i++) {
                list.get(i).mapKeys((key, value) => {
                if(value === 'Y') {
                    contentList.push({
                    label: accesibilityValues[i], 
                    value: key,
                    isEdit: true,
                    data: list,
                    uiModalComponent: this.renderEditAccessibility(list),
                    uiModalClass: 'accesability-modal',
                    key: `renderAccessibilityMobilityTransportation-${key}`
                    })
                }
                })
            }
        
        }
        return contentList.map((content, index) => <AccountDetailsList key={`renderAccessibilityMobilityTransportation-${index}`} showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)}  list={content}/>);
    };

  renderEditAccessibility = () => {
    //TODO component for renderEditAccessibility UI Modal
    return(
      <div>

      </div>
    )
  }

    render() {
        return (
            <Fragment>
                {this.renderAccessibilityMobilityTransportation()}
            </Fragment>
        )
    }
}

export default AccesabilityList;