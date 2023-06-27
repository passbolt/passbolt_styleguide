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
  async componentDidUpdate(prevProps) {
    await this.handleRouteChange(prevProps.location);
  }

  /**
   * Handle save enabled
   */
  async handleSaveEnabled() {
    await this.setState({can: {...this.state.can, save: true}});
  }

  /**
   * Handle must save settings
   */
  async handleMustSaveSettings() {
    await this.setState({must: {...this.state.must, save: true}});
  }

  /**
   * Handle must edit subscription key
   */
  async handleMustEditSubscriptionKey() {
    await this.setState({must: {...this.state.must, editSubscriptionKey: true}});
  }

  /**
   * Handle must refresh subscription key
   */
  async handleMustRefreshSubscriptionKey() {
    await this.setState({must: {...this.state.must, refreshSubscriptionKey: true}});
  }

  /**
   * Handle reset state settings
   */
  async handleResetActionsSettings() {
    const must = {
      save: false,
      test: false,
      synchronize: false,
      editSubscriptionKey: false,
      refreshSubscriptionKey: false
    };
    await this.setState({must});
  }

  /**
   * Handle the route location change
   * @param previousLocation Previous router location
   */
  async handleRouteChange(previousLocation) {
    const hasLocationChanged = this.props.location.key !== previousLocation.key;
    if (hasLocationChanged) {
      await this.handleAdministrationMenuRouteChange();
    }
  }

  /**
   * Handle the administration menu route change
   */
  async handleAdministrationMenuRouteChange() {
    const isMfaLocation = this.props.location.pathname.includes('mfa');
    const isMfaPolicyLocation = this.props.location.pathname.includes('mfa-policy');
    const isUserDirectoryLocation = this.props.location.pathname.includes('users-directory');
    const isEmailNotificationLocation = this.props.location.pathname.includes('email-notification');
    const isSubscriptionLocation = this.props.location.pathname.includes('subscription');
    const isInternationalizationLocation = this.props.location.pathname.includes('internationalization');
    const isAccountRecoveryLocation = this.props.location.pathname.includes('account-recovery');
    const isSmtpSettingsLocation = this.props.location.pathname.includes('smtp-settings');
    const isSelfRegistrationLocation = this.props.location.pathname.includes('self-registration');
    const isSso = this.props.location.pathname.includes('sso');
    const rbac = this.props.location.pathname.includes('rbac');
    const can = {
      save: false,
      test: false,
      synchronize: false
    };
    const must = {
      save: false,
      test: false,
      synchronize: false,
      editSubscriptionKey: false,
      refreshSubscriptionKey: false
    };

    let selectedAdministration;

    if (isMfaPolicyLocation) {
      selectedAdministration =  AdministrationWorkspaceMenuTypes.MFA_POLICY;
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
    }
    await this.setState({selectedAdministration, can, must});
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
  async onUpdateSubscriptionKeyRequested(keyDto) {
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
  loadingContext: PropTypes.object // The loading context
};

export default withRouter(withAppContext(withLoading(AdministrationWorkspaceContextProvider)));

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
  MFA: 'MFA', // MFA administration menu selected
  MFA_POLICY: 'MFA-POLICY', //MFA Policy menu seleted
  USER_DIRECTORY: 'USER-DIRECTORY', // User directory administration menu selected
  EMAIL_NOTIFICATION: 'EMAIL-NOTIFICATION', // Email notification administration menu selected
  SUBSCRIPTION: 'SUBSCRIPTION', // Subscription administration menu selected
  INTERNATIONALIZATION: 'INTERNATIONALIZATION', // Internationalization administration menu selected
  ACCOUNT_RECOVERY: 'ACCOUNT-RECOVERY', // Account Recovery administration menu selected
  SMTP_SETTINGS: 'SMTP-SETTINGS', // Smtp settings administration menu selected
  SELF_REGISTRATION: 'SELF-REGISTRATION', // Self registration settings administration menu selected
  SSO: "SSO", // SSO administration menu selected
  RBAC: "RBAC" // RBAC administration menu selected
};
