import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class EmergencyContactList extends Component {
    constructor(props) {
        super(props);
    }

    renderEmergencyContact = (t) => {
        return(
            <div>
                renderEmergencyContact
            </div>
        );
    };

    render() {
        return (
            <Fragment>
                {this.renderEmergencyContact()}
            </Fragment>
        )
    }
}

export default EmergencyContactList;