import React, { Component, Fragment } from "react";

class EmailDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {... props};
    }

    updateEmail = () =>{
        
    }

    render() {
        const data = this.props.data;
        return (
        <Fragment>
            <input value={data.getIn(['memberView', 'Email'])} onChange={this.updateEmail}></input>
            <span>
            {
                data.getIn(['memberView', 'isEmailVerified']) ? 'verified' : 
                <a className="verification_link">unverified</a>
            }
            </span>
            <button  onClick={() => this.props.updateAccountDetails(this.state.data)}>
                Update
            </button>
        </Fragment>
        )
    }
}

export default EmailDetails;