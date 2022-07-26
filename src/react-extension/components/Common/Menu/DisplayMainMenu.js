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
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withAppContext} from "../../../contexts/AppContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {Trans, withTranslation} from "react-i18next";

class DisplayMainMenu extends Component {
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
   * Is the logged in user admin
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <nav>
        <div className="primary navigation top">
          <ul>
            <li key="password">
              <div className={`row ${this.isSelected("passwords") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.props.navigationContext.onGoToPasswordsRequested} role="button"><span><Trans>passwords</Trans></span></a>
                  </div>
                </div>
              </div>
            </li>
            <li key="users">
              <div className={`row ${this.isSelected("users") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.props.navigationContext.onGoToUsersRequested} role="button"><span><Trans>users</Trans></span></a>
                  </div>
                </div>
              </div>
            </li>
            {this.isLoggedInUserAdmin() &&
            <li key="administration">
              <div className={`row ${this.isSelected("administration") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.props.navigationContext.onGoToAdministrationRequested} role="button"><span><Trans>administration</Trans></span></a>
                  </div>
                </div>
              </div>
            </li>
            }
            <li key="help">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a href="https://help.passbolt.com"
                      role="button"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span><Trans>help</Trans></span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li key="logout" className="right">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a role="button"
                      onClick={this.props.context.onLogoutRequested}>
                      <span><Trans>sign out</Trans></span>
                    </a>
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

DisplayMainMenu.propTypes = {
  context: PropTypes.object, // The application context
  navigationContext: PropTypes.any, // The navigation context
  history: PropTypes.object, // The router history
  location: PropTypes.object, // Router location prop
};

export default withAppContext(withRouter(withNavigationContext(withTranslation("common")(DisplayMainMenu))));
