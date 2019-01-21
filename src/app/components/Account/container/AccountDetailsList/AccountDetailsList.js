import React, { Component, Fragment } from "react";
const AccountDetailsList = (props) => {
 return (
      <div key={props.list.key}>
        <div>{props.list.label}</div>
        <div>{props.list.value}</div>
        {props.list.isEdit && <button className="image-icon-text" onClick={props.showEditModal.bind(this, props.list.uiModalComponent)} aria-haspopup="dialog">
          <span aria-hidden="true" className="icon icon-1x icon-pencil" />
          <div>button.edit</div>
        </button>}
      </div>
    )
};

export default AccountDetailsList;