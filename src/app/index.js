import {render} from "react-dom";
import React from "react";
import {Provider} from "react-redux";

import App from "./containers/App";
import store from "./store";

render(
        <App />, window.document.getElementById('app'));