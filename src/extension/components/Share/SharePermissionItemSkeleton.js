import {hot} from "react-hot-loader";
import React, {Component} from "react";
import SharePermissionDeleteButton from "./SharePermissionDeleteButton";

class SharePermissionItemSkeleton extends Component {

  constructor(props) {
    super();
  }

  render() {
    return(
      <li className="row skeleton">
        <div className="avatar"></div>
        <div className="aro">
          <div className="aro-name"></div>
          <div className="aro-details"></div>
        </div>
        <div className="select rights"></div>
        <div className="actions"></div>
        <div className="shimmer"></div>
      </li>
    );
  }
}

SharePermissionItemSkeleton.propTypes = {
};

export default hot(module)(SharePermissionItemSkeleton);
