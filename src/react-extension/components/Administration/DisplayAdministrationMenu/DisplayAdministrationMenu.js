/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../../contexts/AdministrationWorkspaceContext";
import AppContext, {withAppContext} from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component allows to display the menu of the administration
 */
class DisplayAdministrationMenu extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Returns true if the user has the MFA capability
   * @returns {boolean}
   */
  get isMfaEnabled() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('multiFactorAuthentication');
  }

  /**
   * Returns true if the user has the user directory capability
   * @returns {boolean}
   */
  get isUserDirectoryEnabled() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('directorySync');
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleMfaClick = this.handleMfaClick.bind(this);
    this.handleUserDirectoryClick = this.handleUserDirectoryClick.bind(this);
    this.handleEmailNotificationsClick = this.handleEmailNotificationsClick.bind(this);
  }

  /**
   * Handle when the user click on the mfa menu
   */
  handleMfaClick() {
    this.props.history.push({pathname: '/app/administration/mfa'});
  }

  /**
   * Handle when the user click on the user directory menu
   */
  handleUserDirectoryClick() {
    this.props.history.push({pathname: '/app/administration/users-directory'});
  }

  /**
   * Handle when the user click on the email notifications menu
   */
  handleEmailNotificationsClick() {
    this.props.history.push({pathname: '/app/administration/email-notification'});
  }

  /**
   * If MFA menu is selected
   * @returns {boolean}
   */
  isMfaSelected() {
    return AdministrationWorkspaceMenuTypes.MFA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If User Directory menu is selected
   * @returns {boolean}
   */
  isUserDirectorySelected() {
    return AdministrationWorkspaceMenuTypes.USER_DIRECTORY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Email Notifications menu is selected
   * @returns {boolean}
   */
  isEmailNotificationsSelected() {
    return AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="navigation first">
        <ul id="administration_menu" className="clearfix menu ready">
          {this.isMfaEnabled &&
            <li id="mfa_menu">
              <div className={`row  ${this.isMfaSelected() ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.handleMfaClick}><span><Trans>Multi Factor Authentication</Trans></span></a>
                  </div>
                </div>
              </div>
            </li>
          }
          {this.isUserDirectoryEnabled &&
            <li id="user_directory_menu">
              <div className={`row  ${this.isUserDirectorySelected() ? "selected" : ""}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <a onClick={this.handleUserDirectoryClick}><span><Trans>Users Directory</Trans></span></a>
                  </div>
                </div>
              </div>
            </li>
          }
          <li id="email_notification_menu">
            <div className={`row  ${this.isEmailNotificationsSelected() ? "selected" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleEmailNotificationsClick}><span><Trans>Email Notifications</Trans></span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

DisplayAdministrationMenu.contextType = AppContext;

DisplayAdministrationMenu.propTypes = {
  context: PropTypes.object, // The app context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  history: PropTypes.object, // The router history
  t: PropTypes.func, // The translation function
};

export default withRouter(withAppContext(withAdministrationWorkspace(withTranslation('common')(DisplayAdministrationMenu))));
