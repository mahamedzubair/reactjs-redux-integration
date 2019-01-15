import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { translate } from "react-i18next";
import {fromJS, toArray, mapKeys} from 'immutable';
import * as links from '../../../constants/routes';
import AddressDetails from './Addressdetails/AddressDetails';
import EmailDetails from './EmailDetails/EmailDetails';

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
    this.state = this.ingressDataTransform(props);
  }

  /// @@@@@@ TRANSFORMATION ........................

  ingressDataTransform = props => {
    // responsible for transforming any incomming data into usable state for the container.
    let state = {};
    state["modalVisibility"] = false;
    state["isMegaButton"] = true;
    state["passwordConfirmation"] = false;

    return state;
  };

  componentDidMount() {
    this.props.dispatch(AccountDetailActions.fetchAccountDetails());
  }

  toggleDialogVisibility = (component) => {
    this.setState((prevState) => {
      return { 
        modalVisibility: !prevState.modalVisibility,
        modalComponent: component ? component : ''
      }
    })
  };

  renderAccordionContentRow = (list) => {
    return (
      <div key={list.key}>
        <div>{list.label}</div>
        <div>{list.value}</div>
        {list.isEdit && <button className="image-icon-text" onClick={this.toggleDialogVisibility.bind(this, list.uiModalComponent)} aria-haspopup="dialog">
          <span aria-hidden="true" className="icon icon-1x icon-pencil" />
          <div>button.edit</div>
        </button>}
      </div>
    )
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

  appendAddressDetails = (list) => {
    list.mapKeys((key, value) => {
      value = value && key !== 'type' ? value : '';
      address = `${address} ${value}`;
    });
    console.log('list.mapKeys(', list.mapKeys());
    return address;
  }

  getFullAddress = (address) => {
    return(
      <Fragment>
        <span>{address.get('AddressLine1')}</span>
        <span>{address.get('addressline2')}</span>
        <span>
          {address.get('City')}, 
          {address.get('State')},  
          {address.get('ZipCode')}
        </span>
      </Fragment>
    );
  }

  renderAddressTypes = () => {
   let list = this.props.data;
    let addressLabel = ['Home/Mailing Address', 'Alternate Address', 'Billing Address'];
    let listData = [];
    for(let i = 0; i < list.getIn(['memberView', 'address']).size; i++) {
      listData.push({
          label: addressLabel[i], 
          value: this.getFullAddress(list.getIn(['memberView', 'address', i])),
          isEdit: i === 0 ? true : false,
          data: list.getIn(['memberView', 'address']),
          uiModalComponent: this.renderEditAddress(list.getIn(['memberView', 'address'])),
          key: `renderAddressTypes-${i}`
      }); 
    }
    return listData.map((listData) => this.renderAccordionContentRow(listData))
  }

  renderEmailValue = () => {
    return (
      <span> 
        <span>{this.props.data.getIn(['memberView', 'Email'])}</span>
        <span>
        {
            this.props.data.getIn(['memberView', 'isEmailVerified']) ? 'verified' : 
              <a className="verification_link">unverified</a>
          }
        </span>
      </span>
    )
    
  }

  renderEmailAddress = () => {
    let email = this.props.data.getIn(['memberView', 'Email']);
    let emailList = {
      label: 'Email', 
      value: this.renderEmailValue(),
      isEdit: true,
      data: email,
      uiModalComponent: this.renderEditEmail(email),
      key: 'renderEmailAddress'
    }
    return this.renderAccordionContentRow(emailList)
  }

  renderMobileValue = (list) => {
    return (
      <span key={list.key + '-renderMobileValue'}> 
        <span>({list.suffix}){this.props.data.getIn(['memberView', list.key])}</span>
        <span>
        {
            this.props.data.getIn(['memberView', list.verifcationKey]) ? 'verified' : 
            <a className="verification_link">unverified</a>
          }
        </span>
      </span>
    )

  }

  renderMobileNumber = () => {
    let contactDetails = [
        {label: 'Phone', suffix: 'M', key: 'MobileNum', labelHide: false, verifcationKey: 'isPhoneNumMobVerified'}, 
        {label: 'Home', suffix: 'H', key: 'PhoneNum',  labelHide: true, verifcationKey: 'isPhoneNumHomeVerified'},
        {label: 'Buisness', suffix: 'B', key: 'BusinessPhNum',  labelHide: true, verifcationKey: 'isPhoneNumBusiVerified'}
      ]
    let mobileList = [];
    contactDetails.forEach((list, index) => {
      mobileList.push({
        label: !list.labelHide ? list.label : '', 
        value: this.renderMobileValue(list),
        isEdit: index === 0 ? true : false,
        data: this.props.data.getIn(['memberView', list.key]),
        uiModalComponent: this.renderEditPhoneNumber(this.props.data.getIn(['memberView', list.key]), list),
        key: `renderEmailAddress-${index}`
      })

    });
    return mobileList.map((list) => this.renderAccordionContentRow(list))
  }

  renderEditAddress = (address) => {
    return (<AddressDetails data={this.props.data} email={address} updateAccountDetails={this.updateAccountDetails}/>)
    
  }

  renderEditEmail = (email) => {
    return (<EmailDetails data={this.props.data} updateAccountDetails={this.updateAccountDetails}/>)
    
  }

  renderEditPhoneNumber = (phoneList, phoneOption) => {
    return (
      <div key={phoneOption.key + '-renderEditPhoneNumber'}>
        renderEditPhoneNumber compoennt {phoneList}
      </div>
      )
  }

  renderAddressEmailAndPhone = (t) => {
    let list = this.props.data;
   let listData = {}
    return <div className="row">
        <div className="columns small-12 medium-4 large-4" />
        <div className="columns small-12 medium-7 large-7" />
        <div className="columns small-12 medium-1 large-1">
        {list.getIn(['memberView', 'address']) && this.renderAddressTypes()}
        {list.getIn(['memberView', 'Email']) && this.renderEmailAddress()}
        {list.getIn(['memberView', 'MobileNum']) && this.renderMobileNumber()}
        </div>
      </div>;
  };

  renderEthnicityLanguagePreference = (t) => {
    return (
      <Fragment>
        {this.renderEthnicityPreference(t)}
        {this.renderLanguagePreference(t)}
      </Fragment>
    )
  }

  renderEthnicityPreference = (t) => {
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
              key: `renderEthnicityLanguagePreference-${key}`
            }
          });
        }
      }
      return this.renderAccordionContentRow(contentList)
    }
    
  };

  renderLanguagePreference = (t) => {
    let languageList = [{key: 'spokenLanguagePreference', label: 'Spoken Language' }, 
       {key: 'writtenLanguagePreference', label: 'Written Language'}];
    let langulatKey = ['spokenLanguagePreference', 'writtenLanguagePreference']
    let list = this.props.data.getIn(['memberView', 'preference', 0, 'ethinicityandLanguage']);
    let contentList = [];
    if(list) {
      languageList.map((ethnicity) => {
        let listCheck = [];
        let languageValue = '';
        for(let i = 0; i < list.size; i++) {
          if(langulatKey.indexOf(list.getIn([i, 'type'])) > -1) {
              if(listCheck.indexOf(ethnicity.label) === -1) {
                contentList.push({
                  label: ethnicity.label, 
                  value: list.getIn([i, 'selected']),
                  isEdit: true,
                  data: list,
                  uiModalComponent: this.renderEditLanguage(this.props.data.getIn(['memberView', list.key]), list),
                  key: `renderLanguagePreference-${ethnicity.key}`
                })
              }
            listCheck = contentList.map((list) => list.label);
          }
        }
      });
      return contentList.map((content) => this.renderAccordionContentRow(content));
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

  renderAccessibilityMobilityTransportation = (t) => {
    return(
      <div>
      renderAccessibilityMobilityTransportation
      </div>
    );
  };

  renderAccountManagement = (t) => {
    return(
      <div>
      renderAccountManagement
      </div>
    );
  };

  renderPaymentMethods = (t) => {
    return(
      <div>
      renderPaymentMethods
      </div>
    );
  };

  renderEmergencyContact = (t) => {
    return(
      <div>
      renderEmergencyContact
      </div>
    );
  };

  renderLegalSettings = (t) => {
    return(
      <div>
      renderLegalSettings
      </div>
    );
  };

  renderProfileDetail = () => {
    const {t} = this.props;
    const accordionContent = [
      {
        araiLabel: 'account:accordionHeaders.addressEmailAndPhone',
        header: 'account:accordionHeaders.addressEmailAndPhone',
        body: this.renderAddressEmailAndPhone(t)
      },
      {
        araiLabel: 'account:accordionHeaders.ethnicityLanguagePreference',
        header: 'account:accordionHeaders.ethnicityLanguagePreference',
        body: this.renderEthnicityLanguagePreference(t)
      },
      {
        araiLabel: 'account:accordionHeaders.accessibilityMobilityTransportation',
        header: 'account:accordionHeaders.accessibilityMobilityTransportation',
        body: this.renderAccessibilityMobilityTransportation(t)
      },
      {
        araiLabel: 'account:accordionHeaders.accountManagement',
        header: 'account:accordionHeaders.accountManagement',
        body: this.renderAccountManagement(t)
      },
      {
        araiLabel: 'account:accordionHeaders.paymentMethods',
        header: 'account:accordionHeaders.paymentMethods',
        body: this.renderPaymentMethods(t)
      },
      {
        araiLabel: 'account:accordionHeaders.emergencyContact',
        header: 'account:accordionHeaders.emergencyContact',
        body: this.renderEmergencyContact(t)
      },
      {
        araiLabel: 'account:accordionHeaders.legalSettings',
        header: 'account:accordionHeaders.legalSettings',
        body: this.renderLegalSettings(t)
      }
    ];
    return(
      <div>
        <UIModal visible={this.state.modalVisibility} onExit={this.toggleDialogVisibility}>
          {this.state.modalComponent}
       </UIModal>
        <UIAccordion>
          {accordionContent}
        </UIAccordion>
      </div>
    )
  }

  updateAccountDetails = (details) => {
      //TODO AXIOS post method can be added here
      console.log('details', details);
  }
  // renderProfileDetail = () => {
  //   const { t } = this.props;
  //   let paymentSelection = [{ label: "Set as Default", value: "1" }];
  //   const accordionContent = [
  //     {
  //       header: "Addresses, Email and Phone Numbers",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <h4>
  //               <strong>{t("account:address")}</strong>
  //             </h4>
  //             <div className="accordion-item-meta">
  //               <p>{t("account:addressdetails")}</p>
  //               <p>{t("account:city")}</p>
  //             </div>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:alternateaddress")}</strong>
  //               {t("account:alternateaddressdetails")}
  //             </p>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:billingaddress")}</strong>
  //             </p>
  //           </div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:email")}</strong>
  //               {t("account:emailaddress")}
  //             </p>
  //             <p className="accordion-item-edit">
  //               <a href="#">{t("account:verification")}</a>
  //             </p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     {
  //       header: "Ethnicity and Language Preference",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:ethnicity")}</strong>
  //               {t("account:ethnicitytype")}
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:spokenlanguage")}</strong>
  //               {t("account:english")}
  //             </p>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:writtenlanguage")}</strong>
  //               {t("account:english")}
  //             </p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     {
  //       header: "Accessibility, Mobility, Disability and Transportation",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:accessibility")}</strong>
  //               {t("account:accessibilitytype")}
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:mobility")}</strong>
  //               {t("account:mobilitytype")}
  //             </p>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:disability")}</strong>
  //             </p>
  //           </div>
  //           <div>
  //             <p>
  //               <strong>{t("account:transportation")}</strong>
  //               {t("account:transportationtype")}
  //             </p>
  //           </div>
  //         </div>
  //       )
  //     },
  //     {
  //       header: "Payment Methods",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:cardtype")}</strong>
  //               {t("account:cardnumber")}
  //             </p>
  //             <div>{t("account:expdate")}</div>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //             <div className="fieldset">
  //               <UIRadioSelection
  //                 label=""
  //                 name="metals"
  //                 defaultValue={"1"}
  //                 choices={paymentSelection}
  //                 onValidatedChange={this.paymentChange}
  //               />
  //             </div>
  //           </div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:accountype")}</strong>
  //               {t("account:accountno")}
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //             <div className="fieldset">
  //               <UIRadioSelection
  //                 label=""
  //                 name="metals"
  //                 defaultValue={"1"}
  //                 choices={paymentSelection}
  //                 onValidatedChange={this.paymentChange}
  //               />
  //             </div>
  //           </div>
  //           {this.renderChangePassword()}
  //         </div>
  //       )
  //     },
  //     {
  //       header: "Emergency Contact",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>
  //                 {t("account:emergencyname")}
  //                 {t("account:relation")}
  //               </strong>
  //               {t("account:contactno")}
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:addemergency")}</strong>
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     },
  //     {
  //       header: "Legal Settings",
  //       body: (
  //         <div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:poa")}</strong>
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:hpoa")}</strong>
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //           <div className="accordion-item-details">
  //             <p>
  //               <strong>{t("account:legalforms")}</strong>
  //             </p>
  //             <div className="accordion-item-edit">
  //               <img
  //                 alt="edit icon"
  //                 src="http://bcbsfl.protoshare.com/wa/asset?oid=5928"
  //                 className="s9-content pointer"
  //                 onClick={this.toggle}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     }
  //   ];
  //   return (
  //     <div className="account-grid-item-2">
  //       <UIAccordion>{accordionContent}</UIAccordion>
  //     </div>
  //   );
  // };

  // toggle = () => {
  //   this.setState(prevState => ({
  //     modalVisibility: !prevState.modalVisibility
  //   }));
  // };

  // renderChangePassword = () => {
  //   let agree = [
  //     {
  //       label:
  //         "Yes, I want to recieve all future communications electronically",
  //       value: "nil"
  //     }
  //   ];
  //   const { t } = this.props;
  //   return (
  //     <UIModal visible={this.state.modalVisibility} onExit={this.onModalExit}>
  //       <div className="row head">
  //         <div className="columns small-1">
  //           <button
  //             aria-label="close-dialog"
  //             title="close-dialog"
  //             onClick={this.onModalExit}
  //           />
  //         </div>
  //       </div>

  //       <div className="change-password-modal">
  //         <h2 className="modal-header">{t("account:changepassword")}</h2>
  //         <section className="modal-body">
  //           <div className="modal-form">
  //             <div className="modal-form-group">
  //               <label className="modal-form-group-label" for="password">
  //                 {t("account:password")}
  //               </label>
  //               <input
  //                 type="text"
  //                 name="password"
  //                 placeholder="Enter Password"
  //                 id="password"
  //               />
  //             </div>
  //             <div className="modal-form-group">
  //               <span className="modal-form-group-label">
  //                 {t("account:passwordstrength")} : {t("account:passwordtype")}
  //               </span>
  //             </div>
  //             <div className="password-strength" />
  //             <div className="modal-form-group">
  //               <label
  //                 className="modal-form-group-label"
  //                 for="confirm-password"
  //               >
  //                 {t("account:confirmpassword")}
  //               </label>
  //               <input
  //                 type="password"
  //                 name="confirm-password"
  //                 placeholder="Confirm Your Password"
  //                 id="confirm-password"
  //               />
  //             </div>
  //             <div className="modal-form-group">
  //               <div className="modal-hlp-txt">
  //                 <UICheckSelection
  //                   label=""
  //                   name="agree"
  //                   className="fieldset"
  //                   defaultValue={["1"]}
  //                   choices={agree}
  //                   onValidatedChange={this.paymentChange}
  //                   hasNoneOfTheAbove={true}
  //                 />
  //               </div>
  //             </div>
  //             <div className="icon icon-exclamation-circle password-tooltip" />
  //             <span className="tooltip-text">{t("account:readmore")}</span>
  //           </div>
  //           <div className="password-guidelines">
  //             <h3 className="guidelines-header">{t("account:guidelines")}</h3>
  //             <h4 className="guidelines-sub-header">
  //               {t("account:passwordexample")}
  //             </h4>
  //             <div className="guidelines-description">
  //               <p>{t("account:guidelinesdescription-1")}</p>
  //               <p>{t("account:guidelinesdescription-2")}</p>
  //               <p>{t("account:guidelinesdescription-3")}</p>
  //               <p>{t("account:guidelinesdescription-4")}</p>
  //               <p>{t("account:guidelinesdescription-5")}</p>
  //               <p>{t("account:guidelinesdescription-6")}</p>
  //               <p>{t("account:guidelinesdescription-7")}</p>
  //             </div>
  //           </div>
  //         </section>
  //         <div className="modal-footer">
  //           <button className="modal-btn primary-btn" onClick={this.onModalExit}>
  //             {t("account:Close")}
  //           </button>
  //           <button className="modal-btn secondary-btn" onClick={this.handleSubmit}>
  //             {t("account:savechanges")}
  //           </button>
  //         </div>
  //         {this.renderPasswordConfirmation()}
  //       </div>
  //     </UIModal>
  //   );
  // };
  // paymentChange = () => { };
  // handleSubmit = () => {
  //   this.setState(prevState => ({
  //     passwordConfirmation: !prevState.passwordConfirmation
  //   }));
  // };
  // onModalExit = () => {
  //   this.setState({ modalVisibility: false });
  // };
  // renderPasswordConfirmation = () => {
  //   console.log("renderPasswordConfirmation");
  //   const { t } = this.props;
  //   return (
  //     <UIModal
  //       visible={this.state.passwordConfirmation}
  //       onExit={this.onModalExit}
  //     >
  //       <div className="changepassword-main">
  //         <div className="changepassword-sub">
  //           <div className="icon icon-check success-icon" />
  //           <div className="confirmation-icon" />
  //         </div>
  //         <h2 className="confirmation-status">{t("account:success")}</h2>
  //         <p className="confirmation-msg">{t("account:successmsg")}</p>
  //         <button className="confirmation-btn" onClick={this.onModalExit}>
  //           {t("account:ok")}
  //         </button>
  //       </div>
  //     </UIModal>
  //   );
  // };

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
            {this.renderProfileDetail()}
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
