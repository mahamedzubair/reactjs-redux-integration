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
        return (
            <div>
                <div> 
                    Recieve Data: {this.props.location.state.rowData.receiveddate}
                    <br/>
                    claimAppealed:  {this.props.location.state.rowData.claimAppealed.toString()}
                    <br/>
                    receiveddate:  {this.props.location.state.rowData.receiveddate}
                    <br/>
                    savedCost:  {this.props.location.state.rowData.savedCost}
                    <br/>
                    servicetype:  {this.props.location.state.rowData.servicetype}
                    <br/>
                    status:  {this.props.location.state.rowData.status}
                    <br/>
                    yourcost:  {this.props.location.state.rowData.yourcost}
                </div>
                { this.props.location.state.rowData.savedCost && 
                    !this.state.hideNotifiaction &&
                    <NotificationBar name="Cost Status" 
                    title={`$ Saving Alert Next Time Save ${this.props.location.state.rowData.yourcost}`} 
                    onClose={this.closeNotification}
                    onClick={this.closeNotification}/>
                }
            </div>
        )
    }
}

export default ClaimsOverview;
