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
 * @since         3.0.0
 */
import * as React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";

/**
 * Context related to application navigation.
 */
export const NavigationContext = React.createContext({
  // Administration
  onGoToAdministrationRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace
  onGoToAdministrationSelfRegistrationRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace self registration
  onGoToAdministrationMfaRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace mfa
  onGoToAdministrationUsersDirectoryRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace users directory
  onGoToAdministrationEmailNotificationsRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace email notifications
  onGoToAdministrationSubscriptionRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace subscription
  onGoToAdministrationInternationalizationRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace internationalization
  onGoToAdministrationAccountRecoveryRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace account recovery
  onGoToAdministrationSmtpSettingsRequested: () => {
  }, // Whenever the users wants to navigate to the administration workspace SMTP settings
  onGoToAdministrationSsoRequested: () => {
  }, // Whenever the user wants to navigate to the administration workspace sso
  onGoToAdministrationPasswordPoliciesRequested: () => {
  }, // Whenever the user wants to navigate to the administration workspace password policies settings
  onGoToAdministrationUserPassphrasePoliciesRequested: () => {
  }, // Whenever the user wants to navigate to the administration workspace user passphrase policies
  // Passwords
  onGoToPasswordsRequested: () => {
  }, // Whenever the user wants to navigate to the passwords workspace
  // Users
  onGoToUsersRequested: () => {
  }, // Whenever the user wants to navigate to the users workspace
  // User settings
  onGoToUserSettingsProfileRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace profile section.
  onGoToUserSettingsPassphraseRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace passphrase section.
  onGoToUserSettingsSecurityTokenRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace security token section.
  onGoToUserSettingsThemeRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace theme section.
  onGoToUserSettingsMfaRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace mfa section.
  onGoToUserSettingsKeysRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace keys section.
  onGoToUserSettingsMobileRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace mobile section.
  onGoToUserSettingsDesktopRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace desktop section.
  onGoToUserSettingsAccountRecoveryRequested: () => {
  }, // Whenever the user wants to navigate to the users settings workspace mobile section.
  onGoToNewTab: () => {
  }, // Whenever the user want to navigate to a new url.
  onGoToAdministrationRbacsRequested: () => {
  }, // Whenever the user wants to navigate to the administration workspace rbacs section.
});

/**
 * The navigation context provider provider
 */
class NavigationContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      // Common
      onGoToNewTab: this.onGoToNewTab.bind(this), //
      // Administration
      onGoToAdministrationRequested: this.onGoToAdministrationRequested.bind(this), // Whenever the user wants to navigate to the administration workspace
      onGoToAdministrationMfaRequested: this.onGoToAdministrationMfaRequested.bind(this), // Whenever the user wants to navigate to the administration workspace mfa
      onGoToAdministrationUsersDirectoryRequested: this.onGoToAdministrationUsersDirectoryRequested.bind(this), // Whenever the user wants to navigate to the administration workspace users directory
      onGoToAdministrationEmailNotificationsRequested: this.onGoToAdministrationEmailNotificationsRequested.bind(this), // Whenever the user wants to navigate to the administration workspace email notifications
      onGoToAdministrationSubscriptionRequested: this.onGoToAdministrationSubscriptionRequested.bind(this), // Whenever the user wants to navigate to the administration workspace subscription
      onGoToAdministrationInternationalizationRequested: this.onGoToAdministrationInternationalizationRequested.bind(this), // Whenever the user wants to navigate to the administration workspace internationalization
      onGoToAdministrationAccountRecoveryRequested: this.onGoToAdministrationAccountRecoveryRequested.bind(this), // Whenever the user wants to navigate to the administration workspace account recovery
      onGoToAdministrationSmtpSettingsRequested: this.onGoToAdministrationSmtpSettingsRequested.bind(this), // Whenever the users wants to navigate to the administration workspace SMTP settings
      onGoToAdministrationSelfRegistrationRequested: this.onGoToAdministrationSelfRegistrationRequested.bind(this), //Whenever the users wants to navigate to the administration workspace self registration settings
      onGoToAdministrationSsoRequested: this.onGoToAdministrationSsoRequested.bind(this), // Whenever the user wants to navigate to the administration workspace sso
      onGoToAdministrationMfaPolicyRequested: this.onGoToAdministrationMfaPolicyRequested.bind(this), // Whenever the user wants to navigate to the administration workspace internationalization
      onGoToAdministrationPasswordPoliciesRequested: this.onGoToAdministrationPasswordPoliciesRequested.bind(this), // Whenever the user wants to navigate to the administration workspace password policies
      onGoToAdministrationUserPassphrasePoliciesRequested: this.onGoToAdministrationUserPassphrasePoliciesRequested.bind(this), // Whenever the user wants to navigate to the administration workspace user passphrase policies
      // Passwords
      onGoToPasswordsRequested: this.onGoToPasswordsRequested.bind(this), // Whenever the user wants to navigate to the passwords workspace
      // Users
      onGoToUsersRequested: this.onGoToUsersRequested.bind(this), // Whenever the user wants to navigate to the users workspace
      // User settings
      onGoToUserSettingsProfileRequested: this.onGoToUserSettingsProfileRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace profile section.
      onGoToUserSettingsPassphraseRequested: this.onGoToUserSettingsPassphraseRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace pasphrase section.
      onGoToUserSettingsSecurityTokenRequested: this.onGoToUserSettingsSecurityTokenRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace security token section.
      onGoToUserSettingsThemeRequested: this.onGoToUserSettingsThemeRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace theme section.
      onGoToUserSettingsMfaRequested: this.onGoToUserSettingsMfaRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace mfa section.
      onGoToUserSettingsKeysRequested: this.onGoToUserSettingsKeysRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace keys section.
      onGoToUserSettingsMobileRequested: this.onGoToUserSettingsMobileRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace mobile section.
      onGoToUserSettingsDesktopRequested: this.onGoToUserSettingsDesktopRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace mobile section.
      onGoToUserSettingsAccountRecoveryRequested: this.onGoToUserSettingsAccountRecoveryRequested.bind(this), // Whenever the user wants to navigate to the users settings workspace account recovery section.
      onGoToAdministrationRbacsRequested: this.onGoToAdministrationRbacsRequested.bind(this), // Whenever the user wants to navigate to the administration workspace rbacs section.
    };
  }

  /**
   *
   * @param appName
   * @param pathname
   * @returns {Promise<void>}
   */
  async goTo(appName, pathname) {
    if (appName === this.props.context.name) {
      await this.props.history.push({pathname});
    } else {
      const trustedDomain = this.props.context.userSettings ? this.props.context.userSettings.getTrustedDomain() : this.props.context.trustedDomain;
      const url = `${trustedDomain}${pathname}`;
      window.open(url, '_parent', 'noopener,noreferrer');
    }
  }

  /**
   * Open new tab.
   * @param {string} url The url to go too
   */
  onGoToNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /*
   * =============================================================
   *  Administration navigation
   * =============================================================
   */

  /**
   * Whenever the user wants to navigate to the administration workspace.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationRequested() {
    let pathname = "/app/administration/email-notification";
    if (this.isMfaEnabled) {
      pathname = "/app/administration/mfa";
    } else if (this.isUserDirectoryEnabled) {
      pathname = "/app/administration/users-directory";
    } else if (this.isSmtpSettingsEnable) {
      pathname = "/app/administration/smtp-settings";
    } else if (this.isSelfRegistrationEnable) {
      pathname = "/app/administration/self-registation";
    } else if (this.isPasswordPoliciesEnable) {
      pathname = "/app/administration/password-policies";
    } else if (this.isUserPassphrasePoliciesEnable) {
      pathname = "/app/administration/user-passphrase-policies";
    }
    await this.goTo("api", pathname);
  }

  /**
   * Whenever the user wants to navigate to the administration workspace mfa.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationMfaRequested() {
    await this.goTo("api", "/app/administration/mfa");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace mfa policy.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationMfaPolicyRequested() {
    await this.goTo("api", "/app/administration/mfa-policy");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace password policy.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationPasswordPoliciesRequested() {
    await this.goTo("browser-extension", "/app/administration/password-policies");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace selft registration.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationSelfRegistrationRequested() {
    await this.goTo("api", "/app/administration/self-registration");
  }


  /**
   * Whenever the user wants to navigate to the administration workspace users directory.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationUsersDirectoryRequested() {
    await this.goTo("api", "/app/administration/users-directory");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace email notifications.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationEmailNotificationsRequested() {
    await this.goTo("api", "/app/administration/email-notification");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace email notifications.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationSmtpSettingsRequested() {
    await this.goTo("api", "/app/administration/smtp-settings");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace subscription.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationSubscriptionRequested() {
    await this.goTo("browser-extension", "/app/administration/subscription");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace internationalization.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationInternationalizationRequested() {
    await this.goTo("api", "/app/administration/internationalization");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace account recovery.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationAccountRecoveryRequested() {
    await this.goTo("browser-extension", "/app/administration/account-recovery");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace sso.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationSsoRequested() {
    await this.goTo("browser-extension", "/app/administration/sso");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace rbac.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationRbacsRequested() {
    await this.goTo("api", "/app/administration/rbacs");
  }

  /**
   * Whenever the user wants to navigate to the administration workspace user passphrase policies.
   * @returns {Promise<void>}
   */
  async onGoToAdministrationUserPassphrasePoliciesRequested() {
    await this.goTo("browser-extension", "/app/administration/user-passphrase-policies");
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
   * Returns true if the user has the SMTP settings capability
   * @returns {boolean}
   */
  get isSmtpSettingsEnable() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('smtpSettings');
  }

  /**
   * Returns true if the user has the self registration enabled
   * @returns {boolean}
   */
  get isSelfRegistrationEnable() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('selfRegistration');
  }

  /**
   * Returns true if the user has the self registration enabled
   * @returns {boolean}
   */
  get isPasswordPoliciesEnable() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('passwordPoliciesUpdate');
  }

  /**
   * Returns true if the user has the self registration enabled
   * @returns {boolean}
   */
  get isUserPassphrasePoliciesEnable() {
    const siteSettings = this.props.context.siteSettings;
    return siteSettings && siteSettings.canIUse('userPassphrasePolicies');
  }

  /*
   * =============================================================
   *  Passwords navigation
   * =============================================================
   */

  /**
   * Whenever the user wants to navigate to the passwords workspace.
   * @returns {Promise<void>}
   */
  async onGoToPasswordsRequested() {
    await this.goTo("browser-extension", "/app/passwords");
  }

  /*
   * =============================================================
   *  Users navigation
   * =============================================================
   */

  /**
   * Whenever the user wants to navigate to the users workspace.
   * @returns {Promise<void>}
   */
  async onGoToUsersRequested() {
    await this.goTo("browser-extension", "/app/users");
  }

  /*
   * =============================================================
   *  User settings navigation
   * =============================================================
   */

  /**
   * Whenever the user wants to navigate to the users settings workspace profile section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsProfileRequested() {
    await this.goTo("browser-extension", "/app/settings/profile");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace passphrase section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsPassphraseRequested() {
    await this.goTo("browser-extension", "/app/settings/passphrase");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace security token section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsSecurityTokenRequested() {
    await this.goTo("browser-extension", "/app/settings/security-token");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace theme section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsThemeRequested() {
    await this.goTo("browser-extension", "/app/settings/theme");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace mfa section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsMfaRequested() {
    await this.goTo("api", "/app/settings/mfa");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace keys section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsKeysRequested() {
    await this.goTo("browser-extension", "/app/settings/keys");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace mobile section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsMobileRequested() {
    await this.goTo("browser-extension", "/app/settings/mobile");
  }

  /**
   * Whenever the user wants to navigate to the users settings workspace desktop section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsDesktopRequested() {
    await this.goTo("browser-extension", "/app/settings/desktop");
  }


  /**
   * Whenever the user wants to navigate to the users settings workspace account recovery section.
   * @returns {Promise<void>}
   */
  async onGoToUserSettingsAccountRecoveryRequested() {
    await this.goTo("browser-extension", "/app/settings/account-recovery");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <NavigationContext.Provider value={this.state}>
        {this.props.children}
      </NavigationContext.Provider>
    );
  }
}

NavigationContextProvider.displayName = 'NavigationContextProvider';
NavigationContextProvider.propTypes = {
  context: PropTypes.object, // The application context
  children: PropTypes.any, // The component children
  location: PropTypes.object, // The router location
  match: PropTypes.object, // The router match helper
  history: PropTypes.object, // The router history
};

export default withRouter(withAppContext(NavigationContextProvider));

/**
 * Navigation Context Consumer HOC
 * @param WrappedComponent
 */
export function withNavigationContext(WrappedComponent) {
  return class WithAdministrationWorkspace extends React.Component {
    render() {
      return (
        <NavigationContext.Consumer>
          {
            navigationContext => <WrappedComponent navigationContext={navigationContext} {...this.props} />
          }
        </NavigationContext.Consumer>
      );
    }
  };
}

