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
  withAdministrationWorkspace,
  PRO_TEASING_MENUITEMS,
} from "../../../contexts/AdministrationWorkspaceContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import { withNavigationContext } from "../../../contexts/NavigationContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import { withAdministrationEncryptedMetadataGettingStarted } from "../../../contexts/Administration/AdministrationEncryptedMetadataGettingStartedContext/AdministrationEncryptedMetadataGettingStartedContext";
import MetadataGettingStartedSettingsEntity from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity";
import FrameSVG from "../../../../img/svg/Frame.svg";

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
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      isContentTypesOpened: true,
      isResourceConfigurationOpened: true,
      isAuthenticationOpened: true,
      isUserProvisionningOpened: true,
      isEmailsOpened: true,
    };
  }

  /**
   * Returns true if the given feature flag exists and is enabled
   * @param {string} featureFlag
   * @returns {boolean}
   */
  canIUse(featureFlag) {
    return Boolean(this.props.context.siteSettings?.canIUse(featureFlag));
  }

  /**
   * If the card is to be displayed for CE Admin as part of PRO teasing
   * @param {string} item
   * @returns {boolean}
   */
  isProTeasingMenuItem(item) {
    return PRO_TEASING_MENUITEMS.includes(item) && this.isCommunityEdition();
  }

  /**
   * Returns true if CE; false if PRO
   * @returns {boolean}
   */
  isCommunityEdition() {
    return this.props.context.siteSettings.isCommunityEdition;
  }

  /**
   * Returns true if the user has the MFA capability
   * @returns {boolean}
   */
  get isMfaEnabled() {
    return this.canIUse("multiFactorAuthentication");
  }

  /**
   * Returns true if the user has the user directory capability
   * @returns {boolean}
   */
  get isUserDirectoryEnabled() {
    return this.canIUse("directorySync") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
  }

  /**
   * Can I use the EE plugin
   * @returns {boolean}
   */
  get canIUseEE() {
    return this.canIUse("ee") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.SUBSCRIPTION);
  }

  /**
   * Can I use the locale plugin.
   * @type {boolean}
   */
  get canIUseLocale() {
    return this.canIUse("locale");
  }

  /**
   * Can I use the account recovery plugin
   * @returns {boolean}
   */
  get canIUseAccountRecovery() {
    return (
      this.canIUse("accountRecovery") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY)
    );
  }

  /**
   * Can I use the SMTP settings plugin
   * @returns {boolean}
   */
  get canIUseSmtpSettings() {
    return this.canIUse("smtpSettings");
  }

  /**
   * Can I use the self registration settings plugin
   * @returns {boolean}
   */
  get canIUseSelfRegistrationSettings() {
    return this.canIUse("selfRegistration");
  }

  /**
   * Can I use the sso plugin
   * @returns {boolean}
   */
  get canIUseSso() {
    return this.canIUse("sso") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.SSO);
  }

  /**
   * Can I use the mfa policy plugin
   * @returns {boolean}
   */
  get canIUseMfaPolicy() {
    return this.canIUse("mfaPolicies") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.MFA_POLICY);
  }

  /**
   * Can I use the password policy plugin
   * @returns {boolean}
   */
  get canIUsePasswordPolicies() {
    return (
      this.canIUse("passwordPoliciesUpdate") ||
      this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES)
    );
  }

  /**
   * Can I use the secret revisions plugin
   * @returns {boolean}
   */
  get canIUseSecretHistory() {
    return this.canIUse("secretRevisions");
  }

  /**
   * Can I use the RBACS plugin
   * @returns {boolean}
   */
  get canIUseRbacs() {
    return this.canIUse("rbacs");
  }

  /**
   * Can I use the User Passphrase Policies plugin
   * @returns {boolean}
   */
  get canIUseUserPassphrasePolicies() {
    return (
      this.canIUse("userPassphrasePolicies") ||
      this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES)
    );
  }

  /**
   * Can I use the User Passphrase Policies plugin
   * @returns {boolean}
   */
  get canIUsePasswordExpiry() {
    return this.canIUse("passwordExpiry");
  }

  /**
   * Can I use the healthcheck plugin
   * @returns {boolean}
   */
  get canIUseHealthcheck() {
    return this.canIUse("healthcheckUi");
  }

  /**
   * Can I use the metadata plugin
   * @returns {boolean}
   */
  get canIUseMetadata() {
    return this.canIUse("metadata");
  }

  /**
   * Returns true if the user has the SCIM capability
   * @returns {boolean}
   */
  get canIUseScim() {
    return this.canIUse("scim") || this.isProTeasingMenuItem(AdministrationWorkspaceMenuTypes.SCIM);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleMfaClick = this.handleMfaClick.bind(this);
    this.handleUserDirectoryClick = this.handleUserDirectoryClick.bind(this);
    this.handleEmailNotificationsClick = this.handleEmailNotificationsClick.bind(this);
    this.handleSubscriptionClick = this.handleSubscriptionClick.bind(this);
    this.handleInternationalizationClick = this.handleInternationalizationClick.bind(this);
    this.handleAccountRecoveryClick = this.handleAccountRecoveryClick.bind(this);
    this.handleSmtpSettingsClick = this.handleSmtpSettingsClick.bind(this);
    this.handleSelfRegistrationClick = this.handleSelfRegistrationClick.bind(this);
    this.handleSsoClick = this.handleSsoClick.bind(this);
    this.handleMfaPolicyClick = this.handleMfaPolicyClick.bind(this);
    this.handleRbacsClick = this.handleRbacsClick.bind(this);
    this.handlePasswordPoliciesClick = this.handlePasswordPoliciesClick.bind(this);
    this.handleSecretHistoryClick = this.handleSecretHistoryClick.bind(this);
    this.handleUserPassphrasePoliciesClick = this.handleUserPassphrasePoliciesClick.bind(this);
    this.handlePasswordExpirySettingsClick = this.handlePasswordExpirySettingsClick.bind(this);
    this.handleHealthcheckClick = this.handleHealthcheckClick.bind(this);
    this.handleContentTypesEncryptedMetadataClick = this.handleContentTypesEncryptedMetadataClick.bind(this);
    this.handleContentTypesMetadataKeyClick = this.handleContentTypesMetadataKeyClick.bind(this);
    this.handleMigrateMetadataClick = this.handleMigrateMetadataClick.bind(this);
    this.handleAllowedContentTypesClick = this.handleAllowedContentTypesClick.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
    this.handleMetadataGettingStartedClick = this.handleMetadataGettingStartedClick.bind(this);
    this.handleScimClick = this.handleScimClick.bind(this);
  }

  /**
   * Handles the click on accordion header
   * @param {string} subMenuItem
   */
  handleSubmenuClick(subMenuItem) {
    const newState = {
      [subMenuItem]: !this.state[subMenuItem],
    };
    this.setState(newState);
  }

  /**
   * Handle when the user click on the mfa menu
   */
  handleHomeClick() {
    this.props.navigationContext.onGoToAdministrationRequested();
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
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationUsersDirectoryRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationUsersDirectoryRequested();
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
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationSubscriptionRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationSubscriptionRequested();
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
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationAccountRecoveryRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationAccountRecoveryRequested();
  }

  /**
   * Handle when the user click on the smtp settings menu
   */
  handleSmtpSettingsClick() {
    this.props.navigationContext.onGoToAdministrationSmtpSettingsRequested();
  }

  /**
   * Handle when the user click on the self registration settings menu
   */
  handleSelfRegistrationClick() {
    this.props.navigationContext.onGoToAdministrationSelfRegistrationRequested();
  }

  /**
   * Handle when the user click on the sso menu
   */
  handleSsoClick() {
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationSsoRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationSsoRequested();
  }

  /**
   * Handle when the user click on the rbac menu
   */
  handleRbacsClick() {
    this.props.navigationContext.onGoToAdministrationRbacsRequested();
  }

  /**
   * Handle when the user click on the Mfa policy settings menu
   */
  handleMfaPolicyClick() {
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationMfaPolicyRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationMfaPolicyRequested();
  }

  /**
   * Handle when the user click on the Password policies settings menu
   */
  handlePasswordPoliciesClick() {
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationPasswordPoliciesRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationPasswordPoliciesRequested();
  }

  /**
   * Handle when the user click on the secret history settings menu
   */
  handleSecretHistoryClick() {
    this.props.navigationContext.onGoToAdministrationSecretHistoryRequested();
  }

  /**
   * Handle when the user click on the User Passphrase Policies menu
   */
  handleUserPassphrasePoliciesClick() {
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationUserPassphrasePoliciesRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationUserPassphrasePoliciesRequested();
  }

  /**
   * Handle when the user click on the User Passphrase Policies menu
   */
  handlePasswordExpirySettingsClick() {
    this.props.navigationContext.onGoToAdministrationPasswordExpirySettingsRequested();
  }

  /**
   * Handle when the user click on the Mfa policy settings menu
   */
  handleHealthcheckClick() {
    this.props.navigationContext.onGoToAdministrationHealthcheckRequested();
  }

  /**
   * Handle when the user click on the content types encrypted metadata settings menu
   */
  handleContentTypesEncryptedMetadataClick() {
    this.props.navigationContext.onGoToAdministrationContentTypesEncryptedMetadataRequested();
  }

  /**
   * Handle when the user click on the content types metadata key settings menu
   */
  handleContentTypesMetadataKeyClick() {
    this.props.navigationContext.onGoToAdministrationContentTypesMetadataKeyRequested();
  }

  /**
   * Handle when the user click on the metadata getting started settings menu
   */
  handleMetadataGettingStartedClick() {
    this.props.navigationContext.onGoToAdministrationMetadataGettingStartedRequested();
  }

  /**
   * Handle when the user click on the SCIM settings menu
   */
  handleScimClick() {
    this.isCommunityEdition()
      ? this.props.navigationContext.onGoToAdministrationScimRequestedTeasing()
      : this.props.navigationContext.onGoToAdministrationScimRequested();
  }

  /**
   * Handle when the user click on the migrate metadata key settings menu
   */
  handleMigrateMetadataClick() {
    this.props.navigationContext.onGoToAdministrationMigrateMetadataRequested();
  }

  /**
   * Handle when the user click on the Allow content type menu
   */
  handleAllowedContentTypesClick() {
    this.props.navigationContext.onGoToAdministrationAllowContentTypesRequested();
  }

  /**
   * If Home menu is selected
   * @returns {boolean}
   */
  isHomeSelected() {
    return (
      AdministrationWorkspaceMenuTypes.NONE === this.props.administrationWorkspaceContext.selectedAdministration ||
      AdministrationWorkspaceMenuTypes.HOME === this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If MFA menu is selected
   * @returns {boolean}
   */
  isMfaSelected() {
    return AdministrationWorkspaceMenuTypes.MFA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If MFA policiy menu is selected
   * @returns {boolean}
   */
  isMfaPolicySelected() {
    return (
      AdministrationWorkspaceMenuTypes.MFA_POLICY === this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Password policiy menu is selected
   * @returns {boolean}
   */
  isPasswordPoliciesSelected() {
    return (
      AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If secret history menu is selected
   * @returns {boolean}
   */
  isSecretHistorySelected() {
    return (
      AdministrationWorkspaceMenuTypes.SECRET_HISTORY ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If User Directory menu is selected
   * @returns {boolean}
   */
  isUserDirectorySelected() {
    return (
      AdministrationWorkspaceMenuTypes.USER_DIRECTORY ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Email Notifications menu is selected
   * @returns {boolean}
   */
  isEmailNotificationsSelected() {
    return (
      AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Subscription menu is selected
   * @returns {boolean}
   */
  isSubscriptionSelected() {
    return (
      AdministrationWorkspaceMenuTypes.SUBSCRIPTION === this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Internationalization menu is selected
   * @returns {boolean}
   */
  isInternationalizationSelected() {
    return (
      AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Account Recovery menu is selected
   * @returns {boolean}
   */
  isAccountRecoverySelected() {
    return (
      AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
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
   * If SMTP settings menu is selected
   * @returns {boolean}
   */
  isSmtpSettingsSelected() {
    return (
      AdministrationWorkspaceMenuTypes.SMTP_SETTINGS ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Self registration settings menu is selected
   * @returns {boolean}
   */
  isSelfRegistrationSettingsSelected() {
    return (
      AdministrationWorkspaceMenuTypes.SELF_REGISTRATION ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If User Passphrase Policies menu is selected
   * @returns {boolean}
   */
  isUserPassphrasePoliciesSelected() {
    return (
      AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Password Expiry menu is selected
   * @returns {boolean}
   */
  isPasswordExpirySettingsSelected() {
    return (
      AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Healthcheck menu is selected
   * @returns {boolean}
   */
  isHealthcheckSelected() {
    return (
      AdministrationWorkspaceMenuTypes.HEALTHCHECK === this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If content types encrypted metadata menu is selected
   * @returns {boolean}
   */
  isContentTypesEncryptedMetadataSelected() {
    return (
      AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If content types metadata key menu is selected
   * @returns {boolean}
   */
  isContentTypesMetadataKeySelected() {
    return (
      AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If metadata getting started menu is selected
   * @returns {boolean}
   */
  isMetadataGettingStartedSelected() {
    return (
      AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If content types metadata key menu is selected
   * @returns {boolean}
   */
  isMigrateMetadataSelected() {
    return (
      AdministrationWorkspaceMenuTypes.MIGRATE_METADATA ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Allow content types menu is selected
   * @returns {boolean}
   */
  isAllowedContentTypesSelected() {
    return (
      AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES ===
      this.props.administrationWorkspaceContext.selectedAdministration
    );
  }

  /**
   * If Allow SCIM menu is selected
   * @returns {boolean}
   */
  isScimSelected() {
    return AdministrationWorkspaceMenuTypes.SCIM === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * Should display resource configuration section.
   * @returns {boolean}
   */
  canSeeResourceConfiguration() {
    return this.canIUsePasswordExpiry || this.canIUsePasswordPolicies || this.canIUseSecretHistory;
  }

  /**
   * Should display autentication section.
   * @returns {boolean}
   */
  canSeeAuthentication() {
    return (
      this.canIUseUserPassphrasePolicies ||
      this.canIUseAccountRecovery ||
      this.canIUseSso ||
      this.canIUseMfaPolicy ||
      this.isMfaEnabled
    );
  }

  /**
   * Should display user provisioning section.
   * @returns {boolean}
   */
  canSeeUserProvisionning() {
    return this.isUserDirectoryEnabled || this.canIUseSelfRegistrationSettings;
  }

  /**
   * Get the metadataGettingStartedSettings
   * @return {MetadataGettingStartedSettingsEntity}
   */
  get metadataGettingStartedSettings() {
    return this.props.metadataGettingStartedSettings;
  }

  /**
   * Returns true if the "Getting started" menu item should be displayed
   * @returns {boolean}
   */
  get shouldShowGettingStartedMenu() {
    return this.metadataGettingStartedSettings?.enabled === true && !this.isBeta("metadata");
  }

  /**
   * Returns true if the current feature flag is marked beta.
   * @param {string} flag
   * @returns {boolean}
   */
  isBeta(flag) {
    return this.props.context.siteSettings.isFeatureBeta(flag);
  }

  /**
   * Retursn true when the component is ready to be displayed.
   * @returns {boolean}
   */
  get isReady() {
    return this.metadataGettingStartedSettings !== null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="navigation-secondary navigation-administration">
        <ul id="administration_menu" className="clearfix menu ready">
          {this.isReady && (
            <>
              <li id="home">
                <div className={`row ${this.isHomeSelected() ? "selected" : ""}`}>
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <button className="link no-border" type="button" onClick={this.handleHomeClick}>
                        <span>
                          <Trans>Home</Trans>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {this.canIUseEE && (
                <li id="subscription_menu">
                  <div className={`row ${this.isSubscriptionSelected() ? "selected" : ""}`}>
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button className="link no-border" type="button" onClick={this.handleSubscriptionClick}>
                          <span>
                            <Trans>Subscription</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {this.canIUseMetadata && (
                <li id="content-types" className="accordion-header">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button
                          className="link no-border"
                          type="button"
                          onClick={() => this.handleSubmenuClick("isContentTypesOpened")}
                        >
                          {this.state.isContentTypesOpened ? <CaretDownSVG /> : <CaretRightSVG />}
                          <span>
                            <Trans>Resource types</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.isContentTypesOpened && (
                    <ul id="administration-sub-menu-content-type" className="menu">
                      {this.shouldShowGettingStartedMenu && (
                        <li id="metadata_getting_started_menu">
                          <div className={`row  ${this.isMetadataGettingStartedSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleMetadataGettingStartedClick}
                                >
                                  <span>
                                    <Trans>Getting started</Trans>
                                  </span>
                                  <span className="chips new">new</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {!this.shouldShowGettingStartedMenu && (
                        <>
                          <li id="metadata_key_menu">
                            <div className={`row  ${this.isContentTypesMetadataKeySelected() ? "selected" : ""}`}>
                              <div className="main-cell-wrapper">
                                <div className="main-cell">
                                  <button
                                    className="link no-border"
                                    type="button"
                                    onClick={this.handleContentTypesMetadataKeyClick}
                                  >
                                    <span>
                                      <Trans>Metadata key</Trans>
                                    </span>
                                    {this.isBeta("metadata") && <span className="chips beta">beta</span>}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li id="encrypted_metadata_menu">
                            <div className={`row  ${this.isContentTypesEncryptedMetadataSelected() ? "selected" : ""}`}>
                              <div className="main-cell-wrapper">
                                <div className="main-cell">
                                  <button
                                    className="link no-border"
                                    type="button"
                                    onClick={this.handleContentTypesEncryptedMetadataClick}
                                  >
                                    <span>
                                      <Trans>Encrypted metadata</Trans>
                                    </span>
                                    {this.isBeta("metadata") && <span className="chips beta">beta</span>}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li id="migrate_metadata_menu">
                            <div className={`row  ${this.isMigrateMetadataSelected() ? "selected" : ""}`}>
                              <div className="main-cell-wrapper">
                                <div className="main-cell">
                                  <button
                                    className="link no-border"
                                    type="button"
                                    onClick={this.handleMigrateMetadataClick}
                                  >
                                    <span>
                                      <Trans>Migrate metadata</Trans>
                                    </span>
                                    {this.isBeta("metadata") && <span className="chips beta">beta</span>}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li id="allowed_content_type_menu">
                            <div className={`row  ${this.isAllowedContentTypesSelected() ? "selected" : ""}`}>
                              <div className="main-cell-wrapper">
                                <div className="main-cell">
                                  <button
                                    className="link no-border"
                                    type="button"
                                    onClick={this.handleAllowedContentTypesClick}
                                  >
                                    <span>
                                      <Trans>Allow content types</Trans>
                                    </span>
                                    {this.isBeta("metadata") && <span className="chips beta">beta</span>}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </li>
              )}
              {this.canSeeResourceConfiguration() && (
                <li id="password-configuration" className="accordion-header">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button
                          className="link no-border"
                          type="button"
                          onClick={() => this.handleSubmenuClick("isResourceConfigurationOpened")}
                        >
                          {this.state.isResourceConfigurationOpened ? <CaretDownSVG /> : <CaretRightSVG />}
                          <span>
                            <Trans>Resource policies</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.isResourceConfigurationOpened && (
                    <ul>
                      {this.canIUsePasswordExpiry && (
                        <li id="password_expiry_menu">
                          <div className={`row ${this.isPasswordExpirySettingsSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handlePasswordExpirySettingsClick}
                                >
                                  <span>
                                    <Trans>Password Expiry</Trans>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUsePasswordPolicies && (
                        <li id="password_policy_menu">
                          <div className={`row ${this.isPasswordPoliciesSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handlePasswordPoliciesClick}
                                >
                                  <span>
                                    <Trans>Password Policy</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUseSecretHistory && (
                        <li id="secret_history_menu">
                          <div className={`row ${this.isSecretHistorySelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleSecretHistoryClick}
                                >
                                  <span>
                                    <Trans>Secret history</Trans>
                                  </span>
                                  {this.isBeta("secretRevisions") && <span className="chips beta">beta</span>}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              )}
              {this.canSeeAuthentication() && (
                <li id="authentication" className="accordion-header">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button
                          className="link no-border"
                          type="button"
                          onClick={() => this.handleSubmenuClick("isAuthenticationOpened")}
                        >
                          {this.state.isAuthenticationOpened ? <CaretDownSVG /> : <CaretRightSVG />}
                          <span>
                            <Trans>Authentication</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.isAuthenticationOpened && (
                    <ul>
                      {this.canIUseUserPassphrasePolicies && (
                        <li id="user_passphrase_policies_menu">
                          <div className={`row ${this.isUserPassphrasePoliciesSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleUserPassphrasePoliciesClick}
                                >
                                  <span>
                                    <Trans>User Passphrase Policies</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUseAccountRecovery && (
                        <li id="account_recovery_menu">
                          <div className={`row ${this.isAccountRecoverySelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleAccountRecoveryClick}
                                >
                                  <span>
                                    <Trans>Account Recovery</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUseSso && (
                        <li id="sso_menu">
                          <div className={`row ${this.isSsoSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button className="link no-border" type="button" onClick={this.handleSsoClick}>
                                  <span>
                                    <Trans>Single Sign-On</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUseMfaPolicy && (
                        <li id="mfa_policy_menu">
                          <div className={`row ${this.isMfaPolicySelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button className="link no-border" type="button" onClick={this.handleMfaPolicyClick}>
                                  <span>
                                    <Trans>MFA Policy</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.isMfaEnabled && (
                        <li id="mfa_menu">
                          <div className={`row ${this.isMfaSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button className="link no-border" type="button" onClick={this.handleMfaClick}>
                                  <span>
                                    <Trans>Multi Factor Authentication</Trans>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              )}
              {this.canSeeUserProvisionning() && (
                <li id="user-provisionning" className="accordion-header">
                  <div className="row">
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button
                          className="link no-border"
                          type="button"
                          onClick={() => this.handleSubmenuClick("isUserProvisionningOpened")}
                        >
                          {this.state.isUserProvisionningOpened ? <CaretDownSVG /> : <CaretRightSVG />}
                          <span>
                            <Trans>User provisionning</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.isUserProvisionningOpened && (
                    <ul>
                      {this.canIUseScim && (
                        <li id="scim_menu">
                          <div className={`row ${this.isScimSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button className="link no-border" type="button" onClick={this.handleScimClick}>
                                  <span>
                                    <Trans>SCIM</Trans>
                                  </span>
                                  {this.isBeta("scim") && <span className="chips beta">beta</span>}
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.isUserDirectoryEnabled && (
                        <li id="user_directory_menu">
                          <div className={`row ${this.isUserDirectorySelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleUserDirectoryClick}
                                >
                                  <span>
                                    <Trans>Users Directory</Trans>
                                  </span>
                                  {this.isCommunityEdition() && <FrameSVG className="pro-teasing-icon" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                      {this.canIUseSelfRegistrationSettings && (
                        <li id="self_registration_menu">
                          <div className={`row ${this.isSelfRegistrationSettingsSelected() ? "selected" : ""}`}>
                            <div className="main-cell-wrapper">
                              <div className="main-cell">
                                <button
                                  className="link no-border"
                                  type="button"
                                  onClick={this.handleSelfRegistrationClick}
                                >
                                  <span>
                                    <Trans>Self Registration</Trans>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              )}
              <li id="emails" className="accordion-header">
                <div className="row">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <button
                        className="link no-border"
                        type="button"
                        onClick={() => this.handleSubmenuClick("isEmailsOpened")}
                      >
                        {this.state.isEmailsOpened ? <CaretDownSVG /> : <CaretRightSVG />}
                        <span>
                          <Trans>Emails</Trans>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.isEmailsOpened && (
                  <ul>
                    {this.canIUseSmtpSettings && (
                      <li id="smtp_settings_menu">
                        <div className={`row ${this.isSmtpSettingsSelected() ? "selected" : ""}`}>
                          <div className="main-cell-wrapper">
                            <div className="main-cell">
                              <button className="link no-border" type="button" onClick={this.handleSmtpSettingsClick}>
                                <span>
                                  <Trans>Email server</Trans>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    <li id="email_notification_menu">
                      <div className={`row ${this.isEmailNotificationsSelected() ? "selected" : ""}`}>
                        <div className="main-cell-wrapper">
                          <div className="main-cell">
                            <button
                              className="link no-border"
                              type="button"
                              onClick={this.handleEmailNotificationsClick}
                            >
                              <span>
                                <Trans>Email Notifications</Trans>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </li>
              {this.canIUseRbacs && (
                <li id="rbacs_menu">
                  <div className={`row ${this.isRbacSelected() ? "selected" : ""}`}>
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button className="link no-border" type="button" onClick={this.handleRbacsClick}>
                          <span>
                            <Trans>Role-Based Access Control</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {this.canIUseLocale && (
                <li id="internationalization_menu">
                  <div className={`row ${this.isInternationalizationSelected() ? "selected" : ""}`}>
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button className="link no-border" type="button" onClick={this.handleInternationalizationClick}>
                          <span>
                            <Trans>Internationalisation</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {this.canIUseHealthcheck && (
                <li id="healthcheck_menu">
                  <div className={`row ${this.isHealthcheckSelected() ? "selected" : ""}`}>
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button className="link no-border" type="button" onClick={this.handleHealthcheckClick}>
                          <span>
                            <Trans>Passbolt API Status</Trans>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </>
          )}
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
  metadataGettingStartedSettings: PropTypes.instanceOf(MetadataGettingStartedSettingsEntity), // The metadata getting started settings
};

export default withRouter(
  withAppContext(
    withNavigationContext(
      withAdministrationWorkspace(
        withAdministrationEncryptedMetadataGettingStarted(withTranslation("common")(DisplayAdministrationMenu)),
      ),
    ),
  ),
);
