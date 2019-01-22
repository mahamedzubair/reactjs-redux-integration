import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class AccountManagementList extends Component {
    constructor(props) {
        super(props);
    }

    renderAccountManagement = (t) => {
        return(
            <div>
                renderAccountManagement
            </div>
        );
    };
    render() {
        return (
            <Fragment>
                {this.renderAccountManagement()}
            </Fragment>
        )
    }
}

export default AccountManagementList;