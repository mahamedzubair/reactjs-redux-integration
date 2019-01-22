import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList';

class LegalSettingsList extends Component {
    constructor(props) {
        super(props);
    }

    renderLegalSettings = (t) => {
        return(
            <div>
                renderLegalSettings
            </div>
        );
    };
    render() {
        return (
            <Fragment>
                {this.renderLegalSettings()}
            </Fragment>
        )
    }
}

export default LegalSettingsList;