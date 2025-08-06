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
import * as React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";
import {withLoading} from "./LoadingContext";
import {withRbac} from "../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../shared/services/rbacs/uiActionEnumeration";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const AdministrationWorkspaceContext = React.createContext({
  selectedAdministration: null, // The current menu administration selected
  can: {
    save: false, // If the button save settings is enable
  },
  must: {
    save: false, // Must save settings
    editSubscriptionKey: false, // Must edit subscription key
    refreshSubscriptionKey: false // Must refresh the subscription key
  },
  administrationWorkspaceAction: null, // Class of the component to display the actions of the users
  setDisplayAdministrationWorkspaceAction: () => {}, // Whenever the component to display workspace action is requested
  resetDisplayAdministrationWorkspaceAction: () => {}, // Whenever the reset of the display workspace action is requested
  onUpdateSubscriptionKeyRequested: () => {}, // Whenever the user update the subscription key
  onSaveEnabled: () => {}, // Whenever a user change settings
  onMustSaveSettings: () => {}, // Whenever a user wants save settings
  onMustEditSubscriptionKey: () => {}, // Whenever a user wants edit the susbcription key
  onMustRefreshSubscriptionKey: () => {}, // Whenever the susbcription key needs to be refreshed
  onResetActionsSettings: () => {}, // Reset states after a user do an action for the settings
});

/**
 * The related context provider
 */
class AdministrationWorkspaceContextProvider extends React.Component {
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
      selectedAdministration: AdministrationWorkspaceMenuTypes.NONE, // The current menu administration selected
      can: {
        save: false, // If the button save settings is enable
      },
      must: {
        save: false, // Must save settings
        editSubscriptionKey: false, // Must edit subscription key
        refreshSubscriptionKey: false // Must refresh the susbcription key
      },
      administrationWorkspaceAction: () => <></>, // Class of the component to display the actions of the users
      setDisplayAdministrationWorkspaceAction: this.setDisplayAdministrationWorkspaceAction.bind(this), // Whenever the component to display workspace action is requested
      resetDisplayAdministrationWorkspaceAction: this.resetDisplayAdministrationWorkspaceAction.bind(this), // Whenever the reset of the display workspace action is requested
      onUpdateSubscriptionKeyRequested: this.onUpdateSubscriptionKeyRequested.bind(this), // Whenever the user update the subscription key
      onSaveEnabled: this.handleSaveEnabled.bind(this), // Whenever a user change settings
      onMustSaveSettings: this.handleMustSaveSettings.bind(this), // Whenever a user wants save settings
      onMustEditSubscriptionKey: this.handleMustEditSubscriptionKey.bind(this), // Whenever a user wants edit the susbcription key
      onMustRefreshSubscriptionKey: this.handleMustRefreshSubscriptionKey.bind(this), // Whenever the susbcription key needs to be refreshed
      onResetActionsSettings: this.handleResetActionsSettings.bind(this), // Reset states after a user do an action for the settings
    };
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleAdministrationMenuRouteChange();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    this.handleRouteChange(prevProps.location);
  }

  /**
   * Handle save enabled
   */
  handleSaveEnabled() {
    this.setState({can: {...this.state.can, save: true}});
  }

  /**
   * Handle must save settings
   */
  handleMustSaveSettings() {
    this.setState({must: {...this.state.must, save: true}});
  }

  /**
   * Handle must edit subscription key
   */
  handleMustEditSubscriptionKey() {
    this.setState({must: {...this.state.must, editSubscriptionKey: true}});
  }

  /**
   * Handle must refresh subscription key
   */
  handleMustRefreshSubscriptionKey() {
    this.setState({must: {...this.state.must, refreshSubscriptionKey: true}});
  }

  /**
   * Handle reset state settings
   */
  handleResetActionsSettings() {
    const must = {
      save: false,
      test: false,
      synchronize: false,
      editSubscriptionKey: false,
      refreshSubscriptionKey: false
    };
    this.setState({must});
  }

  /**
   * Handle the route location change
   * @param previousLocation Previous router location
   */
  handleRouteChange(previousLocation) {
    const hasLocationChanged = this.props.location.key !== previousLocation.key;
    if (hasLocationChanged) {
      this.handleAdministrationMenuRouteChange();
    }
  }

  /**
   * Handle the administration menu route change
   */
  handleAdministrationMenuRouteChange() {
    const newState = {
      can: {
        save: false,
        test: false,
        synchronize: false
      },
      must: {
        save: false,
        test: false,
        synchronize: false,
        editSubscriptionKey: false,
        refreshSubscriptionKey: false
      },
    };

    if (!this.props.rbacContext.canIUseUiAction(uiActions.ADMINSTRATION_VIEW_WORKSPACE)) {
      newState.selectedAdministration = AdministrationWorkspaceMenuTypes.HTTP_403_ACCESS_DENIED;
      this.setState(newState);
      return;
    }

    const location = this.props.location.pathname;
    const isAdminHomePageLocation = ADMIN_URL_REGEXP.homePage.test(location);
    const isMfaLocation = ADMIN_URL_REGEXP.mfa.test(location);
    const isMfaPolicyLocation = ADMIN_URL_REGEXP.mfaPolicy.test(location);
    const isPasswordPoliciesLocation = ADMIN_URL_REGEXP.passwordPolicies.test(location);
    const isUserDirectoryLocation = ADMIN_URL_REGEXP.usersDirectory.test(location);
    const isEmailNotificationLocation = ADMIN_URL_REGEXP.emailNotification.test(location);
    const isSubscriptionLocation = ADMIN_URL_REGEXP.subscription.test(location);
    const isInternationalizationLocation = ADMIN_URL_REGEXP.internationalization.test(location);
    const isAccountRecoveryLocation = ADMIN_URL_REGEXP.accountRecovery.test(location);
    const isSmtpSettingsLocation = ADMIN_URL_REGEXP.smtpSettings.test(location);
    const isSelfRegistrationLocation = ADMIN_URL_REGEXP.selfRegistration.test(location);
    const isSso = ADMIN_URL_REGEXP.sso.test(location);
    const rbac = ADMIN_URL_REGEXP.rbac.test(location);
    const isUserPassphrasePolicies = ADMIN_URL_REGEXP.userPassphrasePolicies.test(location);
    const isPasswordExpirySettings = ADMIN_URL_REGEXP.passwordExpirySettings.test(location);
    const healthcheck = ADMIN_URL_REGEXP.healthcheck.test(location);
    const contentTypesEncryptedMetadata = ADMIN_URL_REGEXP.contentTypesEncryptedMetadata.test(location);
    const contentTypesMetadataKey = ADMIN_URL_REGEXP.contentTypesMetadataKey.test(location);
    const migrateMetadata = ADMIN_URL_REGEXP.migrateEncryptedMetadata.test(location);
    const allowContentType = ADMIN_URL_REGEXP.allowContentTypes.test(location);

    let selectedAdministration;
    if (isAdminHomePageLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.HOME;
    } else if (isMfaPolicyLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.MFA_POLICY;
    } else if (isPasswordPoliciesLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES;
    } else if (isMfaLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.MFA;
    } else if (isUserDirectoryLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.USER_DIRECTORY;
    } else if (isEmailNotificationLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION;
    } else if (isSubscriptionLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.SUBSCRIPTION;
    } else if (isInternationalizationLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION;
    } else if (isAccountRecoveryLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY;
    } else if (isSmtpSettingsLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.SMTP_SETTINGS;
    } else if (isSelfRegistrationLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.SELF_REGISTRATION;
    } else if (isSso) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.SSO;
    } else if (rbac) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.RBAC;
    } else if (isUserPassphrasePolicies) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES;
    } else if (isPasswordExpirySettings) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY;
    } else if (healthcheck) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.HEALTHCHECK;
    } else if (contentTypesEncryptedMetadata) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA;
    } else if (contentTypesMetadataKey) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY;
    } else if (migrateMetadata) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.MIGRATE_METADATA;
    } else if (allowContentType) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES;
    }

    // let's check if the current URL is actually supported
    const isUrlUnknown = !selectedAdministration;
    if (isUrlUnknown) {
      newState.selectedAdministration = AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND;
      this.setState(newState);
      return;
    }

    // the URL is supported, now check if the feature flag is enabled or not (except for email notification which doesn't have flag).
    const currentFeatureFlag = AdministrationWorkspaceFeatureFlag?.[selectedAdministration];

    newState.selectedAdministration = currentFeatureFlag && !this.props.context.siteSettings.canIUse(currentFeatureFlag)
      ? AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND
      : selectedAdministration;

    this.setState(newState);
  }

  /**
   * Set the display of the administration workspace action
   * @param administrationWorkspaceAction
   */
  setDisplayAdministrationWorkspaceAction(administrationWorkspaceAction) {
    this.setState({administrationWorkspaceAction});
  }

  /**
   * Reset the display of the administration workspace action
   */
  resetDisplayAdministrationWorkspaceAction() {
    this.setState({administrationWorkspaceAction: () => <></>});
  }

  /**
   * Whenever the update of the subscription is requested.
   * @param keyDto The new subscription key
   * @return {Promise<object>}
   */
  onUpdateSubscriptionKeyRequested(keyDto) {
    return this.props.context.port.request("passbolt.subscription.update", keyDto);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdministrationWorkspaceContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationWorkspaceContext.Provider>
    );
  }
}

AdministrationWorkspaceContextProvider.displayName = 'AdministrationWorkspaceContextProvider';

AdministrationWorkspaceContextProvider.propTypes = {
  context: PropTypes.object, // The application context
  children: PropTypes.any, // The component children
  location: PropTypes.object, // The router location
  match: PropTypes.object, // The router match helper
  history: PropTypes.object, // The router history
  loadingContext: PropTypes.object, // The loading context
  rbacContext: PropTypes.object, // The role based access control context
};

export default withRouter(withAppContext(withRbac(withLoading(AdministrationWorkspaceContextProvider))));

/**
 * Administration Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdministrationWorkspace(WrappedComponent) {
  return class WithAdministrationWorkspace extends React.Component {
    render() {
      return (
        <AdministrationWorkspaceContext.Consumer>
          {
            administrationWorkspaceContext => <WrappedComponent administrationWorkspaceContext={administrationWorkspaceContext} {...this.props} />
          }
        </AdministrationWorkspaceContext.Consumer>
      );
    }
  };
}

/**
 * The list of user workspace search filter types
 */
export const AdministrationWorkspaceMenuTypes = {
  NONE: 'NONE', // Initial administration menu selected
  HOME: 'HOME', // The administration homepage
  MFA: 'MFA', // MFA administration menu selected
  MFA_POLICY: 'MFA-POLICY', //MFA Policy menu seleted
  PASSWORD_POLICIES: 'PASSWORD-POLICIES', //Password Policies menu selected
  USER_DIRECTORY: 'USER-DIRECTORY', // User directory administration menu selected
  EMAIL_NOTIFICATION: 'EMAIL-NOTIFICATION', // Email notification administration menu selected
  SUBSCRIPTION: 'SUBSCRIPTION', // Subscription administration menu selected
  INTERNATIONALIZATION: 'INTERNATIONALIZATION', // Internationalization administration menu selected
  ACCOUNT_RECOVERY: 'ACCOUNT-RECOVERY', // Account Recovery administration menu selected
  SMTP_SETTINGS: 'SMTP-SETTINGS', // Smtp settings administration menu selected
  SELF_REGISTRATION: 'SELF-REGISTRATION', // Self registration settings administration menu selected
  SSO: "SSO", // SSO administration menu selected
  RBAC: "RBAC", // RBAC administration menu selected
  USER_PASSPHRASE_POLICIES: "USER-PASSPHRASE-POLICIES", // User Passphrase Policies administration menu selected
  PASSWORD_EXPIRY: "PASSWORD-EXPIRY", // Password Expiry administration menu selected
  HTTP_403_ACCESS_DENIED: "403-ACCESS-DENIED", // The HTTP error 403 access denied page
  HTTP_404_NOT_FOUND: "404-NOT-FOUND", // The HTTP error 404 not found page
  HEALTHCHECK: "HEALTHCHECK", // Healthcheck administration menu selected
  CONTENT_TYPES_ENCRYPTED_METADATA: "CONTENT_TYPES_ENCRYPTED_METADATA", // Content types encrypted metadata administration menu selected
  CONTENT_TYPES_METADATA_KEY: "CONTENT_TYPES_METADATA_KEY", // Content types metadata key administration menu selected
  MIGRATE_METADATA: "MIGRATE_METADATA", //Migrate metadata administration menu selected
  ALLOW_CONTENT_TYPES: "ALLOW_CONTENT_TYPES", // Allow content types administration menu selected
  METADATA_GETTING_STARTED: "METADATA_GETTING_STARTED", // metadata getting started menu selected
};

/**
 * A map of administration workspace menu keys with the corresponding feature flag values
 */
export const AdministrationWorkspaceFeatureFlag = {
  [AdministrationWorkspaceMenuTypes.MFA]: 'multiFactorAuthentication', // MFA administration feature flag
  [AdministrationWorkspaceMenuTypes.MFA_POLICY]: 'mfaPolicies', //MFA Policy menu seleted
  [AdministrationWorkspaceMenuTypes.PASSWORD_POLICIES]: 'passwordPoliciesUpdate', //Password Policies feature flag
  [AdministrationWorkspaceMenuTypes.USER_DIRECTORY]: 'directorySync', // User directory administration feature flag
  [AdministrationWorkspaceMenuTypes.SUBSCRIPTION]: 'ee', // Subscription administration feature flag
  [AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION]: 'locale', // Internationalization administration feature flag
  [AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY]: 'accountRecovery', // Account Recovery administration feature flag
  [AdministrationWorkspaceMenuTypes.SMTP_SETTINGS]: 'smtpSettings', // Smtp settings administration feature flag
  [AdministrationWorkspaceMenuTypes.SELF_REGISTRATION]: 'selfRegistration', // Self registration settings administration feature flag
  [AdministrationWorkspaceMenuTypes.SSO]: "sso", // SSO administration feature flag
  [AdministrationWorkspaceMenuTypes.RBAC]: "rbacs", // RBAC administration feature flag
  [AdministrationWorkspaceMenuTypes.USER_PASSPHRASE_POLICIES]: "userPassphrasePolicies", // User Passphrase Policies administration feature flag
  [AdministrationWorkspaceMenuTypes.PASSWORD_EXPIRY]: "passwordExpiry", // Password Expiry administration feature flag
  [AdministrationWorkspaceMenuTypes.HEALTHCHECK]: "healthcheckUi", // HealthCheck UI administration feature flag
  [AdministrationWorkspaceMenuTypes.CONTENT_TYPES_ENCRYPTED_METADATA]: "metadata", // Content types encrypted metadata flag
  [AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY]: "metadata", // Content types metadata key flag
  [AdministrationWorkspaceMenuTypes.MIGRATE_METADATA]: "metadata", // Migrate metadata flag
  [AdministrationWorkspaceMenuTypes.ALLOW_CONTENT_TYPES]: "metadata", // Allox content types flag
  [AdministrationWorkspaceMenuTypes.METADATA_GETTING_STARTED]: "metadata", // Allow  types flag
};

/**
 * The list of administration regular expression URL
 */
const ADMIN_URL_REGEXP = {
  homePage: /^\/app\/administration\/?$/,
  mfa: /^\/app\/administration\/mfa\/?$/,
  mfaPolicy: /^\/app\/administration\/mfa-policy\/?$/,
  passwordPolicies: /^\/app\/administration\/password-policies\/?$/,
  usersDirectory: /^\/app\/administration\/users-directory\/?$/,
  emailNotification: /^\/app\/administration\/email-notification\/?$/,
  subscription: /^\/app\/administration\/subscription\/?$/,
  internationalization: /^\/app\/administration\/internationalization\/?$/,
  accountRecovery: /^\/app\/administration\/account-recovery\/?$/,
  smtpSettings: /^\/app\/administration\/smtp-settings\/?$/,
  selfRegistration: /^\/app\/administration\/self-registration\/?$/,
  sso: /^\/app\/administration\/sso\/?$/,
  rbac: /^\/app\/administration\/rbacs\/?$/,
  userPassphrasePolicies: /^\/app\/administration\/user-passphrase-policies\/?$/,
  passwordExpirySettings: /^\/app\/administration\/password-expiry\/?$/,
  healthcheck: /^\/app\/administration\/healthcheck\/?$/,
  contentTypesEncryptedMetadata: /^\/app\/administration\/content-types\/metadata\/?$/,
  contentTypesMetadataKey: /^\/app\/administration\/content-types\/metadata-key\/?$/,
  migrateEncryptedMetadata: /^\/app\/administration\/migrate-metadata\/?$/,
  allowContentTypes: /^\/app\/administration\/allow-content-types\/?$/,
};
