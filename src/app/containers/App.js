import React, {Fragment} from "react";
import {connect} from "react-redux";

import { User } from "../components/User";
import { Main } from "../components/Main";
import Mains from "../components/side-route/Main";
import  Claims  from "../components/claims/container/Claims";
import Authorization from "../components/authorization/container/authorization";
import ClaimsOverview from "../components/claims-overview/container/ClaimsOverview";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
             <BrowserRouter>
                <Fragment>
                    <Route path="/auth" component={Authorization}/>
                    <Route path="/claims" component={Claims}/>
                    <Route path="/claimsoverview/:partyId/:claimId/:savedCost" component={ClaimsOverview}/>
                    <TitleRoute exact={true} path="/benefits/preventivecareservices" component={Benefits}  childComponent={PrescriptionDrugServices} />
                    <TitleRoute exact={true} path="/benefits/medicalbenefits" component={Benefits}  childComponent={ListDrugServices} />
                </Fragment>
            </BrowserRouter>
        );
    }
}

// this is pretty messy way to go; but context does not appear to work with router 4 :(
const TitleRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
      var newProps = {...props, ...rest};
      return (
          <Component {...newProps}/>
      )}}/>
);

class PrescriptionDrugServices extends React.Component {
    render() {
        return(
            <div>PrescriptionDrugServices</div>
        )
    }
}

class ListDrugServices extends React.Component {
    render() {
        return(
            <div>ListDrugServices</div>
        )
    }
}

class Benefits extends React.Component {
    render() {
        console.log(this.props)
        return(
            <div>
                <Mains childComponent={this.props.childComponent}/>
            </div>
        )
    }
}

export default App;
