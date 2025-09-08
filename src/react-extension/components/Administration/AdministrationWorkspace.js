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
import {Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../contexts/AdministrationWorkspaceContext";
import DisplayUserBadgeMenu from "../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import DisplayAdministrationMenu from "./DisplayAdministrationMenu/DisplayAdministrationMenu";
import DisplayMfaAdministration from "./DisplayMfaAdministration/DisplayMfaAdministration";
import DisplayAdministrationWorkspaceBreadcrumb
  from "./DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";
import DisplayUserDirectoryAdministration
  from "./DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration";
import DisplayUserDirectoryAdministrationTeasing from "./DisplayUserDirectoryAdministrationTeasing/DisplayUserDirectoryAdministrationTeasing";
import DisplayEmailNotificationsAdministration
  from "./DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey/DisplaySubscriptionKey";
import DisplaySubscriptionKeyTeasing from "./DisplaySubscriptionKeyTeasing/DisplaySubscriptionKeyTeasing";
import DisplayInternationalizationAdministration
  from "./DisplayInternationalizationAdministration/DisplayInternationalizationAdministration";
import ManageAccountRecoveryAdministrationSettings
  from "./ManageAccountRecoveryAdministrationSettings/ManageAccountRecoveryAdministrationSettings";
import ManageAccountRecoveryAdministrationSettingsTeasing
  from "./ManageAccountRecoveryAdministrationSettingsTeasing/ManageAccountRecoveryAdministrationSettingsTeasing";
import ManageSmtpAdministrationSettings
  from "./ManageSmtpAdministrationSettings/ManageSmtpAdministrationSettings.js";
import DisplaySelfRegistrationAdministration from "./DisplaySelfRegistrationAdministration/DisplaySelfRegistrationAdministration";
import ManageSsoSettings from "./ManageSsoSettings/ManageSsoSettings";
import ManageSsoSettingsTeasing from "./ManageSsoSettingsTeasing/ManageSsoSettingsTeasing";
import DisplayMfaPolicyAdministration from "./DisplayMfaPolicyAdministration/DisplayMfaPolicyAdministration";
import DisplayMfaPolicyAdministrationTeasing from "./DisplayMfaPolicyAdministrationTeasing/DisplayMfaPolicyAdministrationTeasing";
import DisplayRbacAdministration from "./DisplayRbacAdministration/DisplayRbacAdministration";
import DisplayPasswordPoliciesAdministration from "./DisplayPasswordPoliciesAdministration/DisplayPasswordPoliciesAdministration";
import DisplayPasswordPoliciesAdministrationTeasing from "./DisplayPasswordPoliciesAdministrationTeasing/DisplayPasswordPoliciesAdministrationTeasing";
import DisplayAdministrationUserPassphrasePolicies from "./DisplayAdministrationUserPassphrasePolicies/DisplayAdministrationUserPassphrasePolicies";
import DisplayAdministrationUserPassphrasePoliciesTeasing from "./DisplayAdministrationUserPassphrasePoliciesTeasing/DisplayAdministrationUserPassphrasePoliciesTeasing";
import DisplayAdministrationPasswordExpiry from "./DisplayAdministrationPasswordExpiry/DisplayAdministrationPasswordExpiry";
import DisplayHttpError from "../Common/Error/DisplayHttpError/DisplayHttpError";
import DisplayHealthcheckAdministration from "./DisplayHealthcheckAdministration/DisplayHealthcheckAdministration";
import DisplayContentTypesEncryptedMetadataAdministration
  from "./DisplayContentTypesEncryptedMetadataAdministration/DisplayContentTypesEncryptedMetadataAdministration";
import {Trans} from "react-i18next";
import ArrowLeftSVG from "../../../img/svg/arrow_left.svg";
import {withNavigationContext} from "../../contexts/NavigationContext";
import Footer from "../Common/Footer/Footer.js";
import DisplayContentTypesMetadataKeyAdministration
  from "./DisplayContentTypesMetadataKeyAdministration/DisplayContentTypesMetadataKeyAdministration";
import DisplayMigrateMetadataAdministration from "./DisplayMigrateMetadataAdministration/DisplayMigrateMetadataAdministration";
import DisplayContentTypesAllowedContentTypesAdministration from "./DisplayContentTypesAllowedContentTypesAdministration/DisplayContentTypesAllowedContentTypesAdministration";
import AdministrationHomePage from "./HomePage/AdministrationHomePage.js";
import WorkspaceSwitcher, {WORKSPACE_ENUM} from "../Common/Navigation/WorkspaceSwitcher/WorkspaceSwitcher.js";
import DisplayAdministrationMetadataGettingStarted from "./DisplayAdministrationMetadataGettingStarted/DisplayAdministrationMetadataGettingStarted.js";
import DisplayScimSettingsAdministration from "./DisplayScimSettingsAdministration/DisplayScimSettingsAdministration.js";
import DisplayScimAdministrationTeasing from "./DisplayScimAdministrationTeasing/DisplayScimAdministrationTeasing.js";

class AdministrationWorkspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  /**
   * Returns true if CE; false if PRO
   * @returns {boolean}
   */
  isCommunityEdition() {
    return this.props.context.siteSettings.isCommunityEdition;
  }

  /**
   * If the administration Home page selected
   * @returns {boolean}
   */
  isHomePageSelected() {
    return AdministrationWorkspaceMenuTypes.HOME === this.props.administrationWorkspaceContext.selectedAdministration
      || AdministrationWorkspaceMenuTypes.NONE === this.props.administrationWorkspaceContext.selectedAdministration;
  }

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
   * If content types encrypted metadata is selected
   * @returns {boolean}
   */
  isContentTypesEncryptedMetadataSelected() {
    return AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If content types metadata key is selected
   * @returns {boolean}
   */
  isContentTypesMetadataKeySelected() {
    return AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If content types metadata key is selected
   * @returns {boolean}
   */
  isMigrateMetadataSelected() {
    return AdministrationWorkspaceMenuTypes.MIGRATE_METADATA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If allow content types is selected
   * @returns {boolean}
   */
  isAllowContentTypesSelected() {
    return AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If get started metadata is selected
   * @returns {boolean}
   */
  isGetStartedMetadataSelected() {
    return AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If SCIM is selected
   * @returns {boolean}
   */
  isScimSelected() {
    return AdministrationWorkspaceMenuTypes.SCIM === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * Handle go back to resource workspace
   */
  handleGoBack() {
    this.props.navigationContext.onGoToPasswordsRequested();
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
    return (
      <div id="container" className="page administration">
        <div id="app" className="app" tabIndex="1000">
          <div className="panel main">
            <div className="panel left">
              {!this.isHttpError403 &&
                <div className="sidebar-content">
                  <div className="top-bar-left-navigation">
                    <div className="navigation">
                      <button type="button" className="button-transparent back" onClick={this.handleGoBack}>
                        <ArrowLeftSVG/>
                      </button>
                      <span className="title administration"><Trans>Organisation settings</Trans></span>
                    </div>
                  </div>
                  <div className="sidebar-content-left">
                    <DisplayAdministrationMenu/>
                  </div>
                </div>
              }
            </div>
            <div className="panel middle">
              <div className="header">
                {!this.isHttpError403 &&
                  <>
                    <div className="header-left"></div>
                    <div className="header-right">
                      <WorkspaceSwitcher isUserAdmin={true} isUserWorkspaceVisible={true} currentWorkspace={WORKSPACE_ENUM.ORGANISATION_SETTINGS}/>
                      <DisplayUserBadgeMenu baseUrl={this.props.context.trustedDomain || this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
                    </div>
                  </>
                }
              </div>
              <div className="middle-right">
                <div className="breadcrumbs-and-grid">
                  <div className="top-bar">
                    <DisplayAdministrationWorkspaceBreadcrumb/>
                  </div>
                  <div className="main-page">
                    {this.isHttpError403 &&
                      <DisplayHttpError errorCode={403}/>
                    }
                    {this.isHttpError404 &&
                      <DisplayHttpError errorCode={404}/>
                    }
                    {this.isHomePageSelected() &&
                      <AdministrationHomePage/>
                    }
                    {this.isMfaSelected() &&
                      <DisplayMfaAdministration/>
                    }
                    {this.isMfaPolicySelected() &&
                      (this.isCommunityEdition() ? <DisplayMfaPolicyAdministrationTeasing/> : <DisplayMfaPolicyAdministration/>)
                    }
                    {this.isPasswordPoliciesSelected() &&
                      (this.isCommunityEdition() ? <DisplayPasswordPoliciesAdministrationTeasing/> : <DisplayPasswordPoliciesAdministration/>)
                    }
                    {this.isUserDirectorySelected() &&
                      (this.isCommunityEdition() ? <DisplayUserDirectoryAdministrationTeasing/> : <DisplayUserDirectoryAdministration/>)
                    }
                    {this.isEmailNotificationsSelected() &&
                      <DisplayEmailNotificationsAdministration/>
                    }
                    {this.isSubscriptionSelected() &&
                      (this.isCommunityEdition() ? <DisplaySubscriptionKeyTeasing/> : <DisplaySubscriptionKey/>)
                    }
                    {this.isInternationalizationSelected() &&
                      <DisplayInternationalizationAdministration/>
                    }
                    {this.isAccountRecoverySelected() &&
                      (this.isCommunityEdition() ? <ManageAccountRecoveryAdministrationSettingsTeasing/> : <ManageAccountRecoveryAdministrationSettings/>)
                    }
                    {this.isSmtpSettingsSelected() &&
                      <ManageSmtpAdministrationSettings/>
                    }
                    {this.isSelfRegistrationSelected() &&
                      <DisplaySelfRegistrationAdministration/>
                    }
                    {this.isSsoSelected() &&
                      (this.isCommunityEdition() ? <ManageSsoSettingsTeasing/> : <ManageSsoSettings/>)
                    }
                    {this.isRbacSelected() &&
                      <DisplayRbacAdministration/>
                    }
                    {this.isUserPassphrasePoliciesSelected() &&
                      (this.isCommunityEdition() ? <DisplayAdministrationUserPassphrasePoliciesTeasing/> : <DisplayAdministrationUserPassphrasePolicies/>)
                    }
                    {this.isPasswordExpirySelected() &&
                      <DisplayAdministrationPasswordExpiry/>
                    }
                    {this.isHealthcheckSelected() &&
                      <DisplayHealthcheckAdministration/>
                    }
                    {this.isContentTypesEncryptedMetadataSelected() &&
                      <DisplayContentTypesEncryptedMetadataAdministration/>
                    }
                    {this.isContentTypesMetadataKeySelected() &&
                      <DisplayContentTypesMetadataKeyAdministration/>
                    }
                    {this.isMigrateMetadataSelected() &&
                      <DisplayMigrateMetadataAdministration/>
                    }
                    {this.isAllowContentTypesSelected() &&
                      <DisplayContentTypesAllowedContentTypesAdministration/>
                    }
                    {
                      this.isGetStartedMetadataSelected() &&
                      <DisplayAdministrationMetadataGettingStarted/>
                    }
                    {
                      this.isScimSelected() &&
                      (this.isCommunityEdition() ? <DisplayScimAdministrationTeasing/> : <DisplayScimSettingsAdministration/>)

                    }
                  </div>
                </div>
                <Switch>
                  <Route exact path={[
                    "/app/administration",
                    "/app/administration/user-provisionning/scim", // to be removed when documentation will be written
                    "app/administration/scim-teasing"
                  ]}/>
                  <Route>
                    <div className="help-panel">
                      <div className="sidebar-help" id="administration-help-panel">
                      </div>
                      <Footer/>
                    </div>
                  </Route>
                </Switch>
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
  navigationContext: PropTypes.any, // The application navigation context
};

export default withAppContext(withNavigationContext(withAdministrationWorkspace(AdministrationWorkspace)));
