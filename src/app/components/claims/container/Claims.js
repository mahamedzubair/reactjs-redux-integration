import React, { Component } from "react";
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import Table from "../../../components/Table";

@translate(["common"])
class Claims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          servicedate: "10/02/2018",
          facilityprovider: "Jacksonville Va Specialty Clinic",
          servicetype: "Health",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "10/01/2018",
          facilityprovider: "CVS",
          servicetype: "Pharmacy",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "09/27/2018",
          facilityprovider: "Life Care Center of Jacksonville",
          servicetype: "Dental",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "06/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Health",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "07/27/2018",
          facilityprovider: "CVS #231",
          servicetype: "Dental",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "09/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Health",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$2.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "10/01/2018",
          facilityprovider: "CVS #232",
          servicetype: "Pharmacy",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$6.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "06/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Dental",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$8.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "10/02/2018",
          facilityprovider: "CVS #232",
          servicetype: "Health",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$22.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "10/01/2018",
          facilityprovider: "CVS #232",
          servicetype: "Dental",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$12.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "07/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Pharmacy",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$62.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "07/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Health",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$42.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "09/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Pharmacy",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$22.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "09/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Dental",
          status: "Processed",
          claimcharge: "$2.49",
          yourcost: "$10.49",
          showdetails: "Show Details"
        },
        {
          servicedate: "09/27/2018",
          facilityprovider: "CVS #232",
          servicetype: "Health",
          status: "Denied",
          claimcharge: "$2.49",
          yourcost: "$12.49",
          showdetails: "Show Details"
        }
      ],
    };
  }

  /// @@@@@@@@ RENDERS ....................

  render() {
    const columns =[
        {
          name: "Facility/Provider",
          key: "facilityprovider",
          sort: true,
        },
        {
          name: "Service",
          key: "servicedate",
          sort: true,
        },
        {
          name: "Service Type",
          key: "servicetype",
          sort: true,
        },
        {
          name: "Status",
          key: "status",
          sort: true,
        },
        {
          name: "Claim Charge",
          key: "claimcharge",
          sort: false,
        },
        {
          name: "Your Cost",
          key: "yourcost",
          sort: false,
        },
        {
          name: "Show Details",
          key: "showdetails",
          sort: false,
        }
    ]
    return (
      <div className="row">
        <div className="small-12 large-12 medium-12 columns">
          <h1>Claims</h1>
            <Table 
              data={this.state.data}
              headers={columns}
              defaultRowDisplay={10}
              id="claims"
              sortable={true}
              filterLimitedIndex="3"
              providerRowDisplay='facilityprovider'
              />
        </div>
      </div>
    );
  }
}

export default Claims;

