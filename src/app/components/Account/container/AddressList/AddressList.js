import React, { Component, Fragment } from "react";
import AccountDetailsList from './../AccountDetailsList/AccountDetailsList'
import EmailDetails from './../EmailDetails/EmailDetails';
import AddressDetails from './../Addressdetails/AddressDetails';

class AddressList extends Component {
    constructor(props) {
        super(props);
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
            uiModalClass: 'address-modal',
            key: `renderAddressTypes-${i}`
        }); 
        }
        return listData.map((listData, index) => <AccountDetailsList key={`renderAddressTypes-${index}`} showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)}  list={listData}/>)
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

    renderEditAddress = (address) => {
        return (<AddressDetails data={this.props.data} email={address} updateAccountDetails={this.props.updateAccountDetails}/>)
    }

    renderEditEmail = (email) => {
        return (<EmailDetails data={this.props.data} updateAccountDetails={this.props.updateAccountDetails}/>)
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

    renderEmailAddress = () => {
        let email = this.props.data.getIn(['memberView', 'Email']);
        let emailList = {
        label: 'Email', 
        value: this.renderEmailValue(),
        isEdit: true,
        data: email,
        uiModalComponent: this.renderEditEmail(email),
        uiModalClass: 'email-modal',
        key: 'renderEmailAddress'
        }
        return <AccountDetailsList showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)}  list={emailList}/>
    }

    renderEditPhoneNumber = (phoneList, phoneOption) => {
        return (
        <div key={phoneOption.key + '-renderEditPhoneNumber'}>
            renderEditPhoneNumber compoennt {phoneList}
        </div>
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
        return mobileList.map((list, index) => <AccountDetailsList key={`renderMobileNumber-${index}`} showEditModal={(component, modalClass) => this.props.showEditModal(component, modalClass)} list={list}/>)
    }

    render() {
        let list = this.props.data;
        let listData = {}
        return (
            <div className="row">
                <div className="columns small-12 medium-4 large-4" />
                <div className="columns small-12 medium-7 large-7" />
                <div className="columns small-12 medium-1 large-1">
                {list.getIn(['memberView', 'address']) && this.renderAddressTypes()}
                {list.getIn(['memberView', 'Email']) && this.renderEmailAddress()}
                {list.getIn(['memberView', 'MobileNum']) && this.renderMobileNumber()}
                </div>
            </div>
        )
    }
}

export default AddressList;