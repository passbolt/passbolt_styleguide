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
import {withAppContext} from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import {Trans} from "react-i18next";
import {withNavigationContext} from "../../../contexts/NavigationContext";

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
   * Can I use the EE plugin
   * @returns {boolean}
   */
  get canIUseEE() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('ee');
  }

  /**
   * Can I use the locale plugin.
   * @type {boolean}
   */
  get canIUseLocale() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && this.props.context.siteSettings.canIUse('locale');
  }

  /**
   * Can I use the account recovery plugin
   * @returns {boolean}
   */
  get canIUseAccountRecovery() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('accountRecovery');
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleMfaClick = this.handleMfaClick.bind(this);
    this.handleUserDirectoryClick = this.handleUserDirectoryClick.bind(this);
    this.handleEmailNotificationsClick = this.handleEmailNotificationsClick.bind(this);
    this.handleSubscriptionClick = this.handleSubscriptionClick.bind(this);
    this.handleInternationalizationClick = this.handleInternationalizationClick.bind(this);
    this.handleAccountRecoveryClick = this.handleAccountRecoveryClick.bind(this);
  }

  /**
   * Handle when the user click on the mfa menu
   */
  handleMfaClick() {
    this.props.navigationContext.onGoToAdministrationMfaRequested();
  }

  /**
   * Handle when the user click on the user directory menu
   */
  handleUserDirectoryClick() {
    this.props.navigationContext.onGoToAdministrationUsersDirectoryRequested();
  }

  /**
   * Handle when the user click on the email notifications menu
   */
  handleEmailNotificationsClick() {
    this.props.navigationContext.onGoToAdministrationEmailNotificationsRequested();
  }

  /**
   * Handle when the user click on the subscription menu
   */
  handleSubscriptionClick() {
    this.props.navigationContext.onGoToAdministrationSubscriptionRequested();
  }

  /**
   * Handle when the user click on the internationalization menu
   */
  handleInternationalizationClick() {
    this.props.navigationContext.onGoToAdministrationInternationalizationRequested();
  }

  /**
   * Handle when the user click on the account recovery menu
   */
  handleAccountRecoveryClick() {
    this.props.navigationContext.onGoToAdministrationAccountRecoveryRequested();
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
   * If Subscription menu is selected
   * @returns {boolean}
   */
  isSubscriptionSelected() {
    return AdministrationWorkspaceMenuTypes.SUBSCRIPTION === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Internationalization menu is selected
   * @returns {boolean}
   */
  isInternationalizationSelected() {
    return AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Account Recovery menu is selected
   * @returns {boolean}
   */
  isAccountRecoverySelected() {
    return AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="navigation-secondary navigation-administration">
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
          {this.canIUseLocale &&
          <li id="internationalization_menu">
            <div className={`row  ${this.isInternationalizationSelected() ? "selected" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleInternationalizationClick}><span><Trans>Internationalisation</Trans></span></a>
                </div>
              </div>
            </div>
          </li>
          }
          {this.canIUseEE &&
          <li id="subscription_menu">
            <div className={`row  ${this.isSubscriptionSelected() ? "selected" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleSubscriptionClick}><span><Trans>Subscription</Trans></span></a>
                </div>
              </div>
            </div>
          </li>
          }
          {this.canIUseAccountRecovery &&
          <li id="account_recovery_menu">
            <div className={`row  ${this.isAccountRecoverySelected() ? "selected" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleAccountRecoveryClick}>
                    <span><Trans>Account Recovery</Trans></span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          }
        </ul>
      </div>
    );
  }
}

DisplayAdministrationMenu.propTypes = {
  context: PropTypes.object, // The app context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
};

export default withRouter(withAppContext(withNavigationContext(withAdministrationWorkspace((DisplayAdministrationMenu)))));
