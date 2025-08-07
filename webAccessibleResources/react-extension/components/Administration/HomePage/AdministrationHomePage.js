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
 * @since         5.0.0
 */
import React from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import CardItem from "../../../../shared/components/Cards/CardItem";
import {AdministrationWorkspaceFeatureFlag, AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import SubscriptionSVG from "../../../../img/svg/subscription.svg";
import EncryptedMetadataSVG from "../../../../img/svg/encrypted_metadata.svg";
import ArrowBigUpDashSVG from "../../../../img/svg/arrow_big_up_dash.svg";
import ShapesSVG from "../../../../img/svg/content_type.svg";
import FileKey2SVG from "../../../../img/svg/file_key_2.svg";
import ExpirySVG from "../../../../img/svg/expiry.svg";
import PasswordPolicySVG from "../../../../img/svg/password_policy.svg";
import PassphrasePolicySVG from "../../../../img/svg/passphrase_policy.svg";
import AccountRecoverySVG from "../../../../img/svg/account_recovery.svg";
import SSOSVG from "../../../../img/svg/sso.svg";
import MFASVG from "../../../../img/svg/mfa_settings.svg";
import MFAPolicySVG from "../../../../img/svg/mfa_policy.svg";
import SelfRegisterSVG from "../../../../img/svg/self_register.svg";
import LDAPSVG from "../../../../img/svg/ldap.svg";
import EmailServerSVG from "../../../../img/svg/email_server.svg";
import RBACSVG from "../../../../img/svg/rbac.svg";
import InternationalSVG from "../../../../img/svg/international.svg";
import HeartPulseSVG from "../../../../img/svg/heart_pulse.svg";
import EmailNotificationsSVG from "../../../../img/svg/email_notifications.svg";
import MetadataKeySVG from "../../../../img/svg/metadata_key.svg";
import {withAdministrationEncryptedMetadataGettingStarted} from "../../../contexts/Administration/AdministrationEncryptedMetadataGettingStartedContext/AdministrationEncryptedMetadataGettingStartedContext";

const metadataMenuItems = [
  AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED,
  AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY,
  AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA,
  AdministrationWorkspaceMenuTypes.MIGRATE_METADATA,
  AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES
];

/**
 * This component represents the Administration Home Page
 */
class AdministrationHomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.handleClickOn = this.handleClickOn.bind(this);
    this.shouldBeDisplayed = this.shouldBeDisplayed.bind(this);
  }

  /**
   * Handles the click on a card of the home page.
   * @param {object} cardItemData
   */
  handleClickOn(cardItemData) {
    cardItemData.redirectTo();
  }

  /**
   * Returns the list of available "cards"/admin pages.
   * The list is filtered out based on the currently active flags.
   * @returns {array<object>}
   */
  get cardItemsData() {
    return [{
      icon: <SubscriptionSVG/>,
      title: this.props.t("Subscription"),
      description: this.props.t("Browse and update the subscription key details."),
      redirectTo: this.props.navigationContext.onGoToAdministrationSubscriptionRequested,
      flag: AdministrationWorkspaceMenuTypes.SUBSCRIPTION,
    }, {
      icon: <MetadataKeySVG/>,
      title: this.props.t("Getting started"),
      description: this.props.t("Define the strategy to enable new resource types and encrypted metadata."),
      redirectTo: this.props.navigationContext.onGoToAdministrationMetadataGettingStartedRequested,
      flag: AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED,
      isNew: true,
    }, {
      icon: <FileKey2SVG/>,
      title: this.props.t("Metadata key"),
      description: this.props.t("Control the layer of encryption that is used to protect metadata."),
      redirectTo: this.props.navigationContext.onGoToAdministrationContentTypesMetadataKeyRequested,
      flag: AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY,
    }, {
      icon: <EncryptedMetadataSVG/>,
      title: this.props.t("Encrypted metadata"),
      description: this.props.t("Choose between cleartext metadata and encrypted metadata."),
      redirectTo: this.props.navigationContext.onGoToAdministrationContentTypesEncryptedMetadataRequested,
      flag: AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA,
    }, {
      icon: <ArrowBigUpDashSVG/>,
      title: this.props.t("Migrate metadata"),
      description: this.props.t("Convert cleartext metadata into encrypted metadata."),
      redirectTo: this.props.navigationContext.onGoToAdministrationMigrateMetadataRequested,
      flag: AdministrationWorkspaceMenuTypes.MIGRATE_METADATA,
    }, {
      icon: <ShapesSVG/>,
      title: this.props.t("Allow resources types"),
      description: this.props.t("Control the resource types availability for all users."),
      redirectTo: this.props.navigationContext.onGoToAdministrationAllowContentTypesRequested,
      flag: AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES,
    }, {
      icon: <ExpirySVG/>,
      title: this.props.t("Password expiry"),
      description: this.props.t("Control the default behaviour of password expiry policy for all users."),
      redirectTo: this.props.navigationContext.onGoToAdministrationPasswordExpirySettingsRequested,
      flag: AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY,
    }, {
      icon: <PasswordPolicySVG/>,
      title: this.props.t("Password policy"),
      description: this.props.t("Modify the default settings of the passwords generator."),
      redirectTo: this.props.navigationContext.onGoToAdministrationPasswordPoliciesRequested,
      flag: AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES,
    }, {
      icon: <PassphrasePolicySVG/>,
      title: this.props.t("User passphrase policies"),
      description: this.props.t("Define the minimal entropy for the users' private key passphrase."),
      redirectTo: this.props.navigationContext.onGoToAdministrationUserPassphrasePoliciesRequested,
      flag: AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES,
    }, {
      icon: <AccountRecoverySVG/>,
      title: this.props.t("Account recovery"),
      description: this.props.t("Control the behavior for account recovery for all users."),
      redirectTo: this.props.navigationContext.onGoToAdministrationAccountRecoveryRequested,
      flag: AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY,
    }, {
      icon: <SSOSVG/>,
      title: this.props.t("Single Sign-On"),
      description: this.props.t("Select which Single Sign-on provider can be use to login."),
      redirectTo: this.props.navigationContext.onGoToAdministrationSsoRequested,
      flag: AdministrationWorkspaceMenuTypes.SSO,
    }, {
      icon: <MFASVG/>,
      title: this.props.t("Multi Factor Authentication"),
      description: this.props.t("Select which multi factor authentication provider can be use."),
      redirectTo: this.props.navigationContext.onGoToAdministrationMfaRequested,
      flag: AdministrationWorkspaceMenuTypes.MFA,
    }, {
      icon: <MFAPolicySVG/>,
      title: this.props.t("MFA Policy"),
      description: this.props.t("Control the default behaviour of multi factor authentication."),
      redirectTo: this.props.navigationContext.onGoToAdministrationMfaPolicyRequested,
      flag: AdministrationWorkspaceMenuTypes.MFA_POLICY,
    }, {
      icon: <LDAPSVG/>,
      title: this.props.t("Users directory"),
      description: this.props.t("Configure the synchronisation of users and groups with passbolt."),
      redirectTo: this.props.navigationContext.onGoToAdministrationUsersDirectoryRequested,
      flag: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
    }, {
      icon: <SelfRegisterSVG/>,
      title: this.props.t("Self registration"),
      description: this.props.t("Enable users  to enrol without prior admin invitation."),
      redirectTo: this.props.navigationContext.onGoToAdministrationSelfRegistrationRequested,
      flag: AdministrationWorkspaceMenuTypes.SELF_REGISTRATION,
    }, {
      icon: <EmailServerSVG/>,
      title: this.props.t("Email server"),
      description: this.props.t("Control the SMTP server configuration used to send emails."),
      redirectTo: this.props.navigationContext.onGoToAdministrationSmtpSettingsRequested,
      flag: AdministrationWorkspaceMenuTypes.SMTP_SETTINGS,
    }, {
      icon: <EmailNotificationsSVG/>,
      title: this.props.t("Email notifications"),
      description: this.props.t("Define which email notifications will be sent."),
      redirectTo: this.props.navigationContext.onGoToAdministrationEmailNotificationsRequested,
      flag: null,
    }, {
      icon: <RBACSVG/>,
      title: this.props.t("Role-Based Access Control"),
      description: this.props.t("Define UI level access controls for the user role."),
      redirectTo: this.props.navigationContext.onGoToAdministrationRbacsRequested,
      flag: AdministrationWorkspaceMenuTypes.RBAC,
    }, {
      icon: <InternationalSVG/>,
      title: this.props.t("Internationalisation"),
      description: this.props.t("Define the default language of the organisation."),
      redirectTo: this.props.navigationContext.onGoToAdministrationInternationalizationRequested,
      flag: AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION,
    }, {
      icon: <HeartPulseSVG/>,
      title: this.props.t("API Status"),
      description: this.props.t("Monitor the passbolt API's health and responsiveness."),
      redirectTo: this.props.navigationContext.onGoToAdministrationHealthcheckRequested,
      flag: AdministrationWorkspaceMenuTypes.HEALTHCHECK,
    }].filter(this.shouldBeDisplayed);
  }

  /**
   * Returns true if the given card item should be displayed.
   * @param {object} cardItemData
   * @returns {boolean}
   */
  shouldBeDisplayed(cardItemData) {
    if (!this.isFlagEnabled(cardItemData)) {
      //flag is disabled, we don't display the menu item
      return false;
    }

    if (!metadataMenuItems.includes(cardItemData.flag)) {
      //this is not a metadata special menu, so it's displayed
      return true;
    }

    const settings = this.props.metadataGettingStartedSettings;
    if (cardItemData.flag === AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED) {
      //this is the getting started menu, it will be displayed is the settings ask for it
      return !this.isDisplayedAsBeta(cardItemData) && settings.enabled;
    }

    //this is not the getting started menu, then the item is displayed only if the Getting Started menu should not be displayed.
    return this.isDisplayedAsBeta(cardItemData) || !settings.enabled;
  }

  /**
   * Is the flag enabled for the current card data.
   * @param {object} cardData
   * @returns {boolean}
   */
  isFlagEnabled(cardData) {
    return cardData.flag === null || Boolean(this.props.context.siteSettings?.canIUse(AdministrationWorkspaceFeatureFlag[cardData.flag]));
  }

  /**
   * Should the card be displayed as beta.
   * @param {object} cardItemData
   * @returns {boolean}
   */
  isDisplayedAsBeta(cardItemData) {
    if (cardItemData.flag === null) {
      return false;
    }
    return this.props.context.siteSettings.isFeatureBeta(AdministrationWorkspaceFeatureFlag[cardItemData.flag]);
  }

  /**
   * Returns true if hte home page is ready to be displayed.
   * @returns {boolean}
   */
  isReady() {
    return this.props.metadataGettingStartedSettings !== null;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="row">
        <div id="administration-home-page" className="main-column">
          <div className="main-content">
            <div className="grid">
              {this.isReady() && this.cardItemsData.map(cardItemData =>
                <CardItem
                  key={cardItemData.title}
                  icon={cardItemData.icon}
                  title={cardItemData.title}
                  description={cardItemData.description}
                  onClick={() => this.handleClickOn(cardItemData)}
                  isBeta={this.isDisplayedAsBeta(cardItemData)}
                  isNew={Boolean(cardItemData.isNew)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdministrationHomePage.propTypes = {
  context: PropTypes.object, // the app context
  navigationContext: PropTypes.object, // The application navigation context
  administrationEncryptedMetadataGettingStartedContext: PropTypes.object, // The administration encrypted metadata getting started context
  metadataGettingStartedSettings: PropTypes.object, // the metadata getting started settings if any
  t: PropTypes.func, // the translation function
};

export default withAppContext(withAdministrationEncryptedMetadataGettingStarted(withNavigationContext(withTranslation('common')(AdministrationHomePage))));
