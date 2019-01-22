import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class PaymentList extends Component {
    constructor(props) {
        super(props);
    }

    renderPaymentMethods = (t) => {
        return(
            <div>
                renderPaymentMethods
            </div>
        );
    };
    render() {
        return (
            <Fragment>
                {this.renderPaymentMethods()}
            </Fragment>
        )
    }
}

export default PaymentList;