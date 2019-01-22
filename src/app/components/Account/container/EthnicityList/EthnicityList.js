import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class EthnicityList extends Component {
    constructor(props) {
        super(props);
    }
    renderEthnicityPreference = () => {
        let ethnicityList = ['Ethnicity', 'Race'];
        let list = this.props.data.getIn(['memberView', 'preference', 0, 'ethinicityandLanguage']);
        let ethnicityValue = '';
        let contentList = {};
        if(list) {
        for(let i = 0; i < list.size; i++) {
            if(ethnicityList.indexOf(list.getIn([i, 'type'])) > -1) {
            list.get(i).mapKeys((key, value) => {
                ethnicityValue = `${ethnicityValue}  ${list.getIn([i, 'Prefer not to provide']) === 'N' 
                && value === 'Y' && key !== 'Prefer not to provide' > -1  ? 
                `${key} ${ethnicityValue.includes('&') ? '' : '&'}` : ''}`
                contentList = {
                label: 'Ethnicity & Race', 
                value: ethnicityValue,
                isEdit: true,
                data: list,
                uiModalComponent: this.renderEditEthnicity(this.props.data.getIn(['memberView', list.key]), list),
                uiModalClass: 'ethinicity-modal',
                key: `renderEthnicityLanguagePreference-${key}`
                }
            });
            }
        }
        return <AccountDetailsList showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)}  list={contentList}/>
        }
        
    };

    renderLanguagePreference = () => {
        let languageList = [{key: 'spokenLanguagePreference', label: 'Spoken Language', isEdit: true }, 
        {key: 'writtenLanguagePreference', label: 'Written Language', isEdit: false }];
        let languageKey = ['spokenLanguagePreference', 'writtenLanguagePreference']
        let list = this.props.data.getIn(['memberView', 'preference', 0, 'ethinicityandLanguage']);
        let contentList = [];
        if(list) {
        languageList.map((ethnicity) => {
            let listCheck = [];
            let languageValue = '';
            for(let i = 0; i < list.size; i++) {
            if(languageKey.indexOf(list.getIn([i, 'type'])) > -1) {
                if(listCheck.indexOf(ethnicity.label) === -1) {
                    contentList.push({
                    label: ethnicity.label, 
                    value: list.getIn([i, 'selected']),
                    isEdit: ethnicity.isEdit,
                    data: list,
                    uiModalComponent: this.renderEditLanguage(this.props.data.getIn(['memberView', list.key]), list),
                    uiModalClass: 'languge-modal',
                    key: `renderLanguagePreference-${ethnicity.key}`
                    })
                }
                listCheck = contentList.map((list) => list.label);
            }
            }
        });
        return contentList.map((content, index) => <AccountDetailsList key={`renderLanguagePreference-${index}`} showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)} list={content}/>);
        }
        
    };

    renderEditEthnicity = (list) => {
        //TODO component for renderEditEthnicity UI Modal
        return (
        <Fragment>
        renderEditEthnicity
        </Fragment>
        )
    }

    renderEditLanguage = (list) => {
        //TODO component for renderEditLanguage UI Modal
        return (
        <Fragment>
        renderEditLanguage
        </Fragment>
        )
    }
    render() {
        let list = this.props.data;
        let listData = {}
        return (
            <Fragment>
                {this.renderEthnicityPreference()}
                {this.renderLanguagePreference()}
            </Fragment>
        )
    }
}

export default EthnicityList;