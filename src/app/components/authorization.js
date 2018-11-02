import React, { Component } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Table from "../../../components/Table";
import axios from "axios";

@translate(["common"])
class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters:[],
      columns: []
    };
  }

  componentDidMount()  {
    axios
      .get("http://wks41b6049:3000/public/claims01.json")
      .then(res => {
        const data = res.data.claimsList;
        this.setState({ data });
      })
      .catch(error => {
        console.log("fetchRequestFailed", error);
      });
  }

  /// @@@@@@@@ RENDERS ....................

  render() {
    const columns = [
          {
            name: "Received Date",
            key: "receiveddate",
            sort:true
          },
          {
            name: "Facility/Provider",
            key: "facilityprovider",
            sort:true
          },
          {
            name: "Service Type",
            key: "servicetype",
            sort:true
          },
          {
            name: "Status",
            key: "status",
            sort:true
          },
          {
            name: "Show Details",
            key: "showdetails",
            sort:false
          }
    ];
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1 id="authorization">Authorizations</h1>
            <Table
              data={this.state.data}
              headers={columns}
              defaultRowDisplay={10}
              id="authorization"
              sortable={true}
              filterLimitedIndex="3"
              />
        </div>
      </div>
    );
  }
}

export default Authorization;

