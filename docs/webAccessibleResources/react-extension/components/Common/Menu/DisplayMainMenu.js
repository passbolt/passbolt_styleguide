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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

class DisplayMainMenu extends Component {
  constructor() {
    super();
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

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
   * Handles the click on Sign out button
   * @returns {Promise<void>}
   */
  async handleSignOutClick() {
    try {
      await this.props.context.onLogoutRequested();
    } catch (error) {
      this.props.dialogContext.open(NotifyError, {error});
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const canViewUsersWorkspace = this.props.rbacContext.canIUseUiAction(uiActions.USERS_VIEW_WORKSPACE);

    return (
      <nav>
        <div className="primary navigation top">
          <ul>
            <li key="password">
              <div className={`row ${this.isSelected("passwords") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button className="passwords link no-border" type="button" onClick={this.props.navigationContext.onGoToPasswordsRequested}><span><Trans>passwords</Trans></span></button>
                  </div>
                </div>
              </div>
            </li>
            {canViewUsersWorkspace &&
              <li key="users">
                <div className={`row ${this.isSelected("users") ? "selected" : ""}`}>
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <button
                        className="users link no-border" type="button" onClick={this.props.navigationContext.onGoToUsersRequested}>
                        <span><Trans>users</Trans></span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            }
            {this.isLoggedInUserAdmin() &&
            <li key="administration">
              <div className={`row ${this.isSelected("administration") ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button className="administration link no-border" type="button" onClick={this.props.navigationContext.onGoToAdministrationRequested}>
                      <span><Trans>administration</Trans></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            }
            <li key="help">
              <div className="row">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a className="help"
                      href="https://help.passbolt.com"
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
                    <button
                      className="sign-out link no-border"
                      type="button"
                      onClick={this.handleSignOutClick}>
                      <span><Trans>sign out</Trans></span>
                    </button>
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
  rbacContext: PropTypes.any, // The role based access control context
  navigationContext: PropTypes.any, // The navigation context
  history: PropTypes.object, // The router history
  location: PropTypes.object, // Router location prop
  dialogContext: PropTypes.object, // the dialog context prop
};

export default withAppContext(withRbac(withRouter(withNavigationContext(withDialog(withTranslation("common")(DisplayMainMenu))))));
