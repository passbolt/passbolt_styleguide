import React, {Component} from "react";
import {hot} from "react-hot-loader";

class AutocompleteItemEmpty extends Component {
  render() {
    return(
      <li>
        <div className="row">
          <div className="main-cell-wrapper">
            <div className="main-cell">
              <p>No user or group found</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default hot(module)(AutocompleteItemEmpty);
