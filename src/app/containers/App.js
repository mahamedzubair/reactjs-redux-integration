import React from "react";
import {connect} from "react-redux";

import { User } from "../components/User";
import { Main } from "../components/Main";
import  Claims  from "../components/Claims";
import Authorization from "../components/authorization"

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Authorization/>
                <Claims/>
            </div>
        );
    }
}

export default App;
