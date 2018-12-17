import React, { Component } from "react";
import NotificationBar from "../../UI/UINotification";
class ClaimsOverview extends Component {
    constructor(props) {
    super(props);
        this.state = {
            hideNotifiaction: false
        };
    }
    closeNotification = () => {
        this.setState({hideNotifiaction: true})
    }
    render() {
        let queryString = {}; 
        this.props.location.search.substring(1).replace(/([^=&]+)=([^&]*)/g, 
            (m, key, value) => queryString[decodeURIComponent(key)] = decodeURIComponent(value)); 
        return (
            <div>
                <div> 
                    Recieve Data: {queryString.receiveddate}
                    <br/>
                    claimAppealed:  {queryString.claimAppealed.toString()}
                    <br/>
                    receiveddate:  {queryString.receiveddate}
                    <br/>
                    savedCost:  {queryString.savedCost}
                    <br/>
                    servicetype:  {queryString.servicetype}
                    <br/>
                    status:  {queryString.status}
                    <br/>
                    yourcost:  {queryString.yourcost}
                </div>
                { queryString.savedCost && 
                    !this.state.hideNotifiaction &&
                    <NotificationBar name="Cost Status" 
                    title={`$ Saving Alert Next Time Save ${queryString.yourcost}`} 
                    onClose={this.closeNotification}
                    onClick={this.closeNotification}/>
                }
            </div>
        )
    }
}

export default ClaimsOverview;
