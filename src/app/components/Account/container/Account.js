import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { translate } from "react-i18next";
import {fromJS, toArray, mapKeys} from 'immutable';
import * as links from '../../../constants/routes';
import AddressDetails from './Addressdetails/AddressDetails';
import AccountDetailsList from './AccountDetailsList/AccountDetailsList';
import ProfileDetails from './ProfileDetails/ProfileDetails'

//import {numberWithoutDecimalFormat} from 'modules/Utility';

import UIModal from "../../UI/UIModal";
import UIAccordion from '../../UI/UIAccordion';
//import UIAccordion from "UI/UIAccordion";
//import UIDropZone from "UI/UIDropZone";
//import UIRadioSelection from "UI/UIRadioSelection";
//import UICheckSelection from "UI/UICheckSelection";

import * as AccountDetailActions from '../actions';

//@translate(["common", "account"])
class Account extends Component {
  constructor(props) {
    super(props);
  }

  /// @@@@@@ TRANSFORMATION ........................

  componentDidMount() {
    this.props.dispatch(AccountDetailActions.fetchAccountDetails());
  }

  renderProfileDiv = () => {
    const { t } = this.props;
    console.log("account", this.props)
    let list = this.props.data.getIn(['memberView'], fromJS([]));
    let progress = this.props.data.get('profileOptimization');
    return (
      <div className="account">
        <div className="border-image">
          <img src="images/circular-image-treatment.jpg" />
        </div>
        <button className="image-icon">
          <span aria-hidden="true" className="icon icon-1x icon-pencil"></span>
        </button>
        <div className="top-5x">
          <h2 className="hl-medium">{list.get('MemberFirstName')} {list.get('MemberLastName')}</h2>
          <div className="progress-bar" role="progressbar" tabIndex="0" aria-valuenow={progress} aria-valuemin="0"
            aria-valuetext={`${progress} percent`}
            aria-valuemax="100">
            <div className="progress" style={{width:`${progress}%`}}></div>
          </div>
          <p><span className="font">{progress}</span> / 100</p>
          <hr className="collapse" />
          <p><strong>account:accountcomplete</strong></p>
          <hr className="collapse" />
          <p><a href="#" className="font">account:emergencycontact</a></p>
          <p><a href="#" className="font">account:verifyemail</a></p>
        </div>
      </div>
    );
  };

  renderAddressEmailAndPhone = (t) => {
    
  };

  updateAccountDetails = (details) => {
      //TODO AXIOS post method can be added here
      console.log('details', details);
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="columns small-12">
            <h1>"account:account"</h1>
          </div>
          </div>
          <div className="rows top-4x">
          <div className="columns small-12 medium-4 large-4">
            {this.renderProfileDiv()}
          </div>
          <div className="columns small-12 medium-8 large-8">
            <ProfileDetails data={this.props.data}/>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.AccountDetailReducer
  };
}

export default connect(mapStateToProps)(Account);
