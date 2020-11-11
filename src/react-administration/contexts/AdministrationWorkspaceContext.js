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
import AppContext from "./AppContext";
import {withRouter} from "react-router-dom";
import {withLoading} from "../../react/contexts/Common/LoadingContext";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const AdministrationWorkspaceContext = React.createContext({
  selectedAdministration: null, // The current menu administration selected
  isSaveEnabled: false, // If the button save settings is enable
  mustSaveSettings: false, // Must save settings
  isTestEnabled: false, // If the button test settings is enable
  mustTestSettings: false, // Must test settings
  isSynchronizeEnabled: false, // If the button synchronize settings is enable
  mustSynchronizeSettings: false, // Must synchronize settings
  mustSimulateSynchronizeSettings: false, // Must simulate synchronize settings
  onSaveEnabled: () => {}, // Whenever a user change settings
  onMustSaveSettings: () => {}, // Whenever a user wants save settings
  onTestEnabled: () => {}, // Whenever a user change settings
  onMustTestSettings: () => {}, // Whenever a user wants save settings
  onSynchronizeEnabled: () => {}, // Whenever a user have settings to be synchronized
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
      isSaveEnabled: false, // If the button save settings is enable
      mustSaveSettings: false, // Must save settings
      isTestEnabled: false, // If the button test settings is enable
      mustTestSettings: false, // Must test settings
      isSynchronizeEnabled: false, // If the button synchronize settings is enable
      mustSynchronizeSettings: false, // Must synchronize settings
      mustSimulateSynchronizeSettings: false, // Must simulate synchronize settings
      onSaveEnabled: this.handleSaveEnabled.bind(this), // Whenever a user change settings
      onMustSaveSettings: this.handleMustSaveSettings.bind(this), // Whenever a user wants save settings
      onTestEnabled: this.handleTestEnabled.bind(this), // Whenever a user have settings to be tested
      onMustTestSettings: this.handleMustTestSettings.bind(this), // Whenever a user wants test settings
      onSynchronizeEnabled: this.handleSynchronizeEnabled.bind(this), // Whenever a user have settings to be synchronized
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
    await this.setState({isSaveEnabled: true});
  }

  /**
   * Handle must save settings
   */
  async handleMustSaveSettings() {
    await this.setState({mustSaveSettings: true});
  }

  /**
   * Handle test enabled
   */
  async handleTestEnabled(boolean) {
    await this.setState({isTestEnabled: boolean});
  }

  /**
   * Handle must test settings
   */
  async handleMustTestSettings() {
    await this.setState({mustTestSettings: true});
  }

  /**
   * Handle synchronize enabled
   */
  async handleSynchronizeEnabled(boolean) {
    await this.setState({isSynchronizeEnabled: boolean});
  }

  /**
   * Handle reset state settings
   */
  async handleResetActionsSettings() {
    await this.setState({mustSaveSettings: false, mustTestSettings: false, mustSynchronizeSettings: false, mustSimulateSynchronizeSettings: false});
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
    const isUserDirectoryLocation = this.props.location.pathname.includes('users-directory');
    const isEmailNotificationLocation = this.props.location.pathname.includes('email-notification');
    const isSaveEnabled = false;
    const mustSaveSettings = false;
    const isTestEnabled = false;
    const mustTestSettings = false;
    const isSynchronizeEnabled = false;

    let selectedAdministration;
    if (isMfaLocation) {
      selectedAdministration = AdministrationWorkspaceMenuTypes.MFA;
    } else if (isUserDirectoryLocation) {
      selectedAdministration =  AdministrationWorkspaceMenuTypes.USER_DIRECTORY;
    } else if (isEmailNotificationLocation) {
      selectedAdministration =  AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION;
    }
    await this.setState({selectedAdministration, isSaveEnabled, mustSaveSettings, isTestEnabled, mustTestSettings, isSynchronizeEnabled});
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
AdministrationWorkspaceContextProvider.contextType = AppContext;
AdministrationWorkspaceContextProvider.propTypes = {
  children: PropTypes.any, // The component children
  location: PropTypes.object, // The router location
  match: PropTypes.object, // The router match helper
  history: PropTypes.object, // The router history
  loadingContext: PropTypes.object // The loading context
};

export default withRouter(withLoading(AdministrationWorkspaceContextProvider));

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
  USER_DIRECTORY: 'USER-DIRECTORY', // User directory administration menu selected
  EMAIL_NOTIFICATION: 'EMAIL-NOTIFICATION', // Email notification administration menu selected
};
