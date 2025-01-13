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
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../contexts/AdministrationWorkspaceContext";
import DisplayMainMenu from "../Common/Menu/DisplayMainMenu";
import Logo from "../Common/Navigation/Header/Logo";
import DisplayUserBadgeMenu from "../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import DisplayAdministrationMenu from "./DisplayAdministrationMenu/DisplayAdministrationMenu";
import DisplayMfaAdministration from "./DisplayMfaAdministration/DisplayMfaAdministration";
import DisplayAdministrationWorkspaceBreadcrumb
  from "./DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";
import DisplayUserDirectoryAdministration
  from "./DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration";
import DisplayEmailNotificationsAdministration
  from "./DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration";
import SearchBar from "../Common/Navigation/Search/SearchBar";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey/DisplaySubscriptionKey";
import DisplayInternationalizationAdministration
  from "./DisplayInternationalizationAdministration/DisplayInternationalizationAdministration";
import ManageAccountRecoveryAdministrationSettings
  from "./ManageAccountRecoveryAdministrationSettings/ManageAccountRecoveryAdministrationSettings";
import ManageSmtpAdministrationSettings
  from "./ManageSmtpAdministrationSettings/ManageSmtpAdministrationSettings.js";
import DisplaySelfRegistrationAdministration from "./DisplaySelfRegistrationAdministration/DisplaySelfRegistrationAdministration";
import ManageSsoSettings from "./ManageSsoSettings/ManageSsoSettings";
import DisplayMfaPolicyAdministration from "./DisplayMfaPolicyAdministration/DisplayMfaPolicyAdministration";
import DisplayRbacAdministration from "./DisplayRbacAdministration/DisplayRbacAdministration";
import DisplayPasswordPoliciesAdministration from "./DisplayPasswordPoliciesAdministration/DisplayPasswordPoliciesAdministration";
import DisplayAdministrationUserPassphrasePolicies from "./DisplayAdministrationUserPassphrasePolicies/DisplayAdministrationUserPassphrasePolicies";
import DisplayAdministrationPasswordExpiry from "./DisplayAdministrationPasswordExpiry/DisplayAdministrationPasswordExpiry";
import DisplayHttpError from "../Common/Error/DisplayHttpError/DisplayHttpError";
import DisplayHealthcheckAdministration from "./DisplayHealthcheckAdministration/DisplayHealthcheckAdministration";
import DisplayContentTypesEncryptedMetadataAdministration
  from "./DisplayContentTypesEncryptedMetadataAdministration/DisplayContentTypesEncryptedMetadataAdministration";

class AdministrationWorkspace extends Component {
  /**
   * If MFA menu is selected
   * @returns {boolean}
   */
  isMfaSelected() {
    return AdministrationWorkspaceMenuTypes.MFA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If MFA policy menu is selected
   * @returns {boolean}
   */
  isMfaPolicySelected() {
    return AdministrationWorkspaceMenuTypes.MFA_POLICY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Password policies menu is selected
   * @returns {boolean}
   */
  isPasswordPoliciesSelected() {
    return AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If User directory menu is selected
   * @returns {boolean}
   */
  isUserDirectorySelected() {
    return AdministrationWorkspaceMenuTypes.USER_DIRECTORY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Email notifications menu is selected
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
   * If SMTP settings menu is selected
   * @returns {boolean}
   */
  isSmtpSettingsSelected() {
    return AdministrationWorkspaceMenuTypes.SMTP_SETTINGS === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Self registration settings menu is selected
   * @returns {boolean}
   */
  isSelfRegistrationSelected() {
    return AdministrationWorkspaceMenuTypes.SELF_REGISTRATION === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If SSO menu is selected
   * @returns {boolean}
   */
  isSsoSelected() {
    return AdministrationWorkspaceMenuTypes.SSO === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If RBAC menu is selected
   * @returns {boolean}
   */
  isRbacSelected() {
    return AdministrationWorkspaceMenuTypes.RBAC === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If User Passphrase Policies menu is selected
   * @returns {boolean}
   */
  isUserPassphrasePoliciesSelected() {
    return AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Password Expiry menu is selected
   * @returns {boolean}
   */
  isPasswordExpirySelected() {
    return AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If content types metadata is selected
   * @returns {boolean}
   */
  isContentTypesMetadataSelected() {
    return AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If the page access is denied
   * @returns {boolean}
   */
  get isHttpError403() {
    return AdministrationWorkspaceMenuTypes.HTTP_403_ACCESS_DENIED === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If the page accessed does not exist or if the corresponding feature flag is disabled
   * @returns {boolean}
   */
  get isHttpError404() {
    return AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  isHealthcheckSelected() {
    return AdministrationWorkspaceMenuTypes.HEALTHCHECK === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  render() {
    const AdministrationWorkspaceAction = this.props.administrationWorkspaceContext.administrationWorkspaceAction;
    return (
      <div id="container" className="page administration">
        <div id="app" tabIndex="1000">
          <div className="header first">
            <DisplayMainMenu/>
          </div>
          <div className="header second">
            <Logo/>
            <SearchBar disabled={true}/>
            <DisplayUserBadgeMenu baseUrl={this.props.context.trustedDomain || this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
          </div>
          <div className="header third">
            <div className="col1 main-action-wrapper">
            </div>{/* Deprecated */}
            <AdministrationWorkspaceAction/>{/* Deprecated */}
            <div id="administration-actions-content-action"></div>
          </div>
          <div className="panel main">
            <div>
              <div className="panel left">
                {!this.isHttpError403 &&
                <DisplayAdministrationMenu/>
                }
              </div>
              <div className="panel middle">
                {!this.isHttpError403 &&
                <DisplayAdministrationWorkspaceBreadcrumb/>
                }
                <div className="grid grid-responsive-12">
                  {this.isHttpError403 &&
                  <DisplayHttpError errorCode={403}/>
                  }
                  {this.isHttpError404 &&
                  <DisplayHttpError errorCode={404}/>
                  }
                  {this.isMfaSelected() &&
                  <DisplayMfaAdministration/>
                  }
                  {this.isMfaPolicySelected() &&
                  <DisplayMfaPolicyAdministration/>
                  }
                  {this.isPasswordPoliciesSelected() &&
                  <DisplayPasswordPoliciesAdministration/>
                  }
                  {this.isUserDirectorySelected() &&
                  <DisplayUserDirectoryAdministration/>
                  }
                  {this.isEmailNotificationsSelected() &&
                  <DisplayEmailNotificationsAdministration/>
                  }
                  {this.isSubscriptionSelected() &&
                  <DisplaySubscriptionKey/>
                  }
                  {this.isInternationalizationSelected() &&
                  <DisplayInternationalizationAdministration/>
                  }
                  {this.isAccountRecoverySelected() &&
                  <ManageAccountRecoveryAdministrationSettings/>
                  }
                  {this.isSmtpSettingsSelected() &&
                  <ManageSmtpAdministrationSettings/>
                  }
                  {this.isSelfRegistrationSelected() &&
                  <DisplaySelfRegistrationAdministration/>
                  }
                  {this.isSsoSelected() &&
                  <ManageSsoSettings/>
                  }
                  {this.isRbacSelected() &&
                  <DisplayRbacAdministration/>
                  }
                  {this.isUserPassphrasePoliciesSelected() &&
                  <DisplayAdministrationUserPassphrasePolicies/>
                  }
                  {this.isPasswordExpirySelected() &&
                  <DisplayAdministrationPasswordExpiry/>
                  }
                  {this.isHealthcheckSelected() &&
                    <DisplayHealthcheckAdministration/>
                  }
                  {this.isContentTypesMetadataSelected() &&
                    <DisplayContentTypesEncryptedMetadataAdministration/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdministrationWorkspace.propTypes = {
  context: PropTypes.any, // The application context provider
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
};

export default withAppContext(withAdministrationWorkspace(AdministrationWorkspace));
