/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

class MainMenu extends Component {
  /**
   * Check if a menu item is selected
   * @param {string} name The menu item name
   * @returns {boolean}
   */
  isSelected(name) {
    let selected = false;

    if (name === "passwords") {
      selected = /^\/app\/(passwords|folders)/.test(this.props.location.pathname);
    } else if (name === "users") {
      selected = /^\/app\/(users|groups)/.test(this.props.location.pathname);
    } else if (name === "administration") {
      selected = /^\/app\/administration/.test(this.props.location.pathname);
    }

    return selected;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <nav>
        <div className="primary navigation top">
          <ul className="left">
            <li key="password">
              <div className={`row ${this.isSelected("passwords") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <Link to="/app/passwords" role="button"><span>passwords</span></Link>
                  </div>
                </div>
              </div>
            </li>
            <li key="users">
              <div className={`row ${this.isSelected("users") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <Link to="/app/users" role="button"><span>users</span></Link>
                  </div>
                </div>
              </div>
            </li>
            <li key="administration">
              <div className={`row ${this.isSelected("administration") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <Link to="/app/administration/mfa" role="button"><span>administration</span></Link>
                  </div>
                </div>
              </div>
            </li>
            <li key="help">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a href="https://help.passbolt.com" role="button"><span>help</span></a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className="right">
            <li key="logout">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a href={`${this.props.baseUrl}/logout`} role="button"><span>logout</span></a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  baseUrl: PropTypes.string,
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(MainMenu);
