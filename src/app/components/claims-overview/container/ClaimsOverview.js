import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import NotificationBar from "../../UI/UINotification";
import UIAccordion from "../../UI/UIAccordion";
import * as links from "../../../constants/routes";
import Chart from "../../Chart";
import * as Actions from '../actions';

class ClaimsOverview extends Component {
    constructor(props) {
    super(props);
        this.state = {
            toggleAccordion: false
        };
    }

    componentDidMount() {
        let {partyId, transactionId, sourceSystem, tenantID, claimId} = this.props.location.search.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
        let params = `${partyId}/${claimId}?transactionId=${transactionId}&sourceSystem=${sourceSystem}`
        this.props.dispatch(Actions.fetchClaimOverview(params));
    }
    toggleAccordions = () => {
        this.setState({toggleAccordion: !this.state.toggleAccordion})
    }

    renderOverviewDetails = () => {
        let claimsData = this.props.data.claimOverviewData.Response.claimDetails;
        
        return(
            <div className="small-12 medium-5 large-5 columns">
                <div className="panel standard">
                <div className="row head">
                    <div className="columns small-12">
                    <h1 className="hl-medium">Claim Overview</h1>
                    </div>
                </div>
                <div className="row body data">
                    <div className="columns small-12">
                    {this.renderOverview(claimsData)}
                    <div className="top-1x">
                        <strong>Description</strong>
                    </div>
                    <div>
                        Occum aut dolo cusam alicius et etus rehendi rerera nem
                            hicimus,etus, there is a charcter limit of 200.
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    renderOverview = (list) => {
        return (
            <div>
                //TODO write render function for this
                Staus: {list.status}
                Claim Service Date: {list.claimProcessedDate}
                Claim Type: {list.claimType}
                Member Number: {list.memberNumber}
                Provider Name: {list.providerName}
                Diagnosis Code: {list.diagnosisCode}
            </div>
        )
    }

    // Render overall billing details

    renderBillingDetails = (list) => {
        return(
            <div className="small-12 medium-7 large-7 columns">
                <div className="panel standard">
                <div className="row head">
                    <div className="columns small-12">
                    <h1 className="hl-medium">Billing Details</h1>
                    </div>
                </div>
                <div className="row body">
                    <div className="columns small-12 medium-12 large-5">
                    {   list.Response && 
                        list  && 
                        <Chart
                        data={list.Response.ClaimPaid}
                        height={150}
                        width={200}
                        cutoutPercentage={0} 
                        axisLabel={['Member Responsibility', 'Florida Blue Paid']}
                        axisKey={['totalMemberResponsibility', 'serviceFloridaBluePaid']}/>
                    }
                    </div>
                    <div className="columns small-12 medium-12 large-7">
                        // details render here
                        Provider Billed: {list.Response.ClaimPaid.providerBilled}
                        <br/>
                        Member Discount: {list.Response.ClaimPaid.serviceMemberDiscount}
                        <br/>
                        Florida Blue Paid: {list.Response.ClaimPaid.serviceFloridaBluePaid}
                        <br/>
                        Memeber Responsibility: {list.Response.ClaimPaid.totalMemberResponsibility}
                        <br/>
                        <br/>
                        //Details list data
                        Deductable: 
                        <br/>
                        Coypayment:
                        <br/> 
                        CoInsuranse:
                        <br/>
                        Not Covered: 
                        <br/>
                    </div>
                </div>
                </div>
            </div>)
    }


    //Render saring alerts

    renderSavingAlert = () => {
        return(
            <div className="row">
                <div className="small-12 columns">
                    <div className="panel standard">
                    <div className="row">
                        <div className="columns small-12 medium-5 large-5">
                        <div className="row head">
                            <div className="columns">
                            <h1 className="hl-medium">Congrats!</h1>
                            </div>
                        </div>
                        <div className="row body">
                            <div className="columns">
                            <p>You saved $250 by choosing generic over brand</p>
                            </div>
                        </div>
                        </div>
                        <div className="columns small-12 medium-7 medium-7 border">
                        <div className="row head">
                            <div className="columns">
                            <span className="icon icon-money padding-right-1x"></span>
                            <strong>Savings Alert!</strong>
                            </div>
                        </div>
                        <div className="row body">
                            <div className="columns">
                            <p> You could have saved $ by choosing Urgent Care</p>
                            <a href="#" class="promo4">Find Urgent Care</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    // Render service details Accodion

    renderSeviceDetails = () => {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="panel standard">
                    <div className="row head">
                        <div className="columns small-6">
                        <h1 className="hl-medium">Service Under this Claim</h1>
                        </div>
                    </div>
                    <div className="row body">
                        <div className="columns small-12">
                        <UIAccordion className="accordion" 
                            expandAllOption={true} 
                            allowManyPanelsToBeOpen>
                            {this.renderAccordion()}
                        </UIAccordion>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    renderAccordion = () => {
         let overViewData = this.props.data.claimOverviewData.Response.Services;
         const accordionContent = [];
         overViewData.forEach((list, index) => {
            accordionContent.push( {
                ariaLabel: list.serviceProvider, 
                header: this.renderAccordionHeader(list),
                body: this.renderAccordionBody(list) 
            });
         });
         return accordionContent;
    }

    //render accodion header

    renderAccordionHeader = (list) =>  {
        return(<div>{list.claimServiceDate}</div>);
    }

    renderAccordionBody = (list) => {
        return (
         <div>
          <div className="row">
            <div className="columns small-12">
              Procedure Code: //Random
            </div>
          </div>
          <h1 className="hl-small">Billing Details</h1>
          <div className="row">
            <div className="small-5 columns">
              <Chart
                data={list}
                height={150}
                width={200}
                cutoutPercentage={0} 
                axisLabel={['Member Responsibility', 'Florida Blue Paid']}
                axisKey={['serviceMemberResponsibility', 'serviceFloridaBluePaid']}/>
            </div>
            <div className="small-4 columns top-1x">
              // Claim Details need to add
              Provider Billed: {list.providerBilled}
              Member Discount: {list.serviceMemberDiscount}
              Florida Blue Paid: {list.serviceFloridaBluePaid}
              Member Responsibility: {list.serviceMemberResponsibility}

            </div>
            <div className="small-3 columns top-1x">
              Deductable: {list.deductibleAmount}
              CoPayment: {list.copaymentAmount}
              CoInsuranse: {list.coinsuranceAmount}
              Not Covered: {list.serviceNetAmountCharged}
            </div>
          </div>
          <div>Remarks: {list.serviceRemarks}</div>
        </div>
      );
    }

    render() {
        let overViewData = this.props.data.claimOverviewData;
        let queryString = {}; 
        this.props.location.search.substring(1).replace(/([^=&]+)=([^&]*)/g, 
            (m, key, value) => queryString[decodeURIComponent(key)] = decodeURIComponent(value)); 

        return (
            <div className="row">
                { overViewData.Response && 
                    <div className="small-12 columns">
                        <h1 className="hl-large">
                            {overViewData.Response.claimDetails.memberName}
                        </h1>
                        <div className="row">
                            <div className="small-6 columns">
                                <Link to={links.CLAIMS} className="button naked">
                                    <span aria-hidden="true" className="icon icon-arrow-left" />
                                    <span>Back to Claims</span>
                                </Link>
                            </div>
                            <div className="small-6 columns text-right">
                                <a href="#" className="promo6 padding-right-3x">
                                    Questions
                                </a>
                                <Link to={links.APPEALCLAIM} className="promo6 padding-right-3x">
                                    Appeal
                                </Link>
                                <button 
                                    className="print-button claims-print-button hide-for-small-only"
                                    onClick={window.print}>
                                    <span className="icon icon-print" aria-hidden="true" />
                                    <span>Print</span>
                                </button>
                            </div>
                         </div>
                         <div className="row top-1x" data-equalizer>
                            {this.renderOverviewDetails()}
                            {this.renderBillingDetails(overViewData)}
                         </div>
                         { 
                            queryString.savedCost && JSON.parse(queryString.savedCost) &&
                            this.renderSavingAlert()
                         }
                         {this.renderSeviceDetails()}
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    data: state.ClaimOverviewReducer
  };
}

export default connect(mapStateToProps)(ClaimsOverview);
