import React, { Component } from "react";
class ClaimsOverview extends Component {
    render() {
        return (
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
        )
    }
}

export default ClaimsOverview;
