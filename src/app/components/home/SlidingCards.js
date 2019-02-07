import React, { Component, Fragment } from 'react';
import { translate, Interpolate } from 'react-i18next';

//@translate(['common'])
class SlidingCards extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            careTeamPanelShow: false,
            annualHealthPanelShow: false,
            diabetesPanelShow: false,
            projectPanelShow: false
        };
    } 
    hideCard = (key) => {
        let toggle = this.state;
        toggle[key] = true;
        this.setState({toggle})
    }
  render() {
    return (
    <Fragment>
        <div className="sliding-container"></div>
        <div className="sliding-container" >
            <div className="holder">
                <div  className={ `standard panel ${this.state.careTeamPanelShow ? 'inactive' : ''}`} 
                    onClick={() => this.hideCard('careTeamPanelShow')}>
                    <h3>Take your Annual health assesment part1 </h3>
                    <button>skip</button>
                </div>
                <div className={ `standard panel ${this.state.annualHealthPanelShow ? 'inactive' : ''}`} 
                    onClick={() => this.hideCard('annualHealthPanelShow')}>
                    <h3>Take your Annual health assesment part2</h3>
                    <button>skip</button>
                </div>
                <div className={ `standard panel ${this.state.diabetesPanelShow ? 'inactive' : ''}`} 
                    onClick={() => this.hideCard('diabetesPanelShow')}>
                    <h3>Take your Annual health assesment part3</h3>
                    <button>skip</button>
                </div>
                <div className={ `standard panel ${this.state.projectPanelShow ? 'inactive' : ''}`} 
                    onClick={() => this.hideCard('projectPanelShow')}>
                    <h3>Take your Annual health assesment part4</h3>
                    <button>skip</button>
                </div>
            </div>
        </div>
      </Fragment>
    )
  }
}

export default SlidingCards;