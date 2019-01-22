import React, { Component, Fragment } from "react";

import AddressList from "./../AddressList/AddressList";
import EthnicityList from "./../EthnicityList/EthnicityList";
import AccesabilityList from "./../AccesabilityList/AccesabilityList";
import AccountManagementList from "./../AccountManagementList/AccountManagementList";
import PaymentList from "./../PaymentList/PaymentList";
import EmergencyContactList from "./../EmergencyContactList/EmergencyContactList";
import LegalSettingsList from "./../LegalSettingsList/LegalSettingsList";

import UIModal from "../../../UI/UIModal";
import UIAccordion from '../../../UI/UIAccordion';

class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state = this.ingressDataTransform(props);
    }

    ingressDataTransform = props => {
        // responsible for transforming any incomming data into usable state for the container.
        let state = {};
        state["modalVisibility"] = false;
        state["isMegaButton"] = true;
        state["passwordConfirmation"] = false;

        return state;
    };

    toggleDialogVisibility = (component?, modalClass?) => {
        this.setState((prevState) => {
        return { 
            modalVisibility: !prevState.modalVisibility,
            modalComponent: component ? component : '',
            modalClass: modalClass ? modalClass : ''
        }
        })
    };

    render() {
        const {t} = this.props;
        const accordionContent = [
        {
            araiLabel: 'account:accordionHeaders.addressEmailAndPhone',
            header: 'account:accordionHeaders.addressEmailAndPhone',
            body: <AddressList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.ethnicityLanguagePreference',
            header: 'account:accordionHeaders.ethnicityLanguagePreference',
            body: <EthnicityList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.accessibilityMobilityTransportation',
            header: 'account:accordionHeaders.accessibilityMobilityTransportation',
            body: <AccesabilityList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.accountManagement',
            header: 'account:accordionHeaders.accountManagement',
            body: <AccountManagementList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.paymentMethods',
            header: 'account:accordionHeaders.paymentMethods',
            body: <PaymentList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.emergencyContact',
            header: 'account:accordionHeaders.emergencyContact',
            body: <EmergencyContactList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        },
        {
            araiLabel: 'account:accordionHeaders.legalSettings',
            header: 'account:accordionHeaders.legalSettings',
            body: <LegalSettingsList data={this.props.data} showEditModal={(component, modalClass) => this.toggleDialogVisibility(component, modalClass)}/>
        }
        ];
        return(
        <Fragment>
            <UIModal visible={this.state.modalVisibility} onExit={this.toggleDialogVisibility} dialogClass={this.state.modalClass}>
                {this.state.modalComponent}
            </UIModal>
            <UIAccordion>
                {accordionContent}
            </UIAccordion>
        </Fragment>
        )
    }
}

export default ProfileDetails;