/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";

export const AdminSsoContext = React.createContext({
  ssoConfig: null, // The current sso configuration
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getSsoConfiguration: () => {}, // Return the current sso configuration from the context state
  save: () => {}, // Save the sso configuration changes
});

/**
 * The related context provider
 */
export class AdminSsoContextProvider extends React.Component {
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
      ssoConfig: null, // The current sso configuration
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getSsoConfiguration: this.getSsoConfiguration.bind(this), // Return the current sso configuration from the context state
      save: this.save.bind(this), // Save the sso configuration changes
    };
  }

  /**
   * Find the sso configuration
   * @return {Promise<void>}
   */
  async loadSsoConfiguration() {
    //@todo @mock
    const ssoConfig = {
      provider: "azure",
      data: {
        url: "https://login.microsoftonline.com/passbolt-app",
        app_id: "f2j3m5n6-c3k4-m5p7-x2j4-y2k4m5n7q8r9",
        directory_id: "5n6p8r9s-m5n6-6p7q-3k5n-8r9s3k4m5n7q",
        secret: "u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRfUjXn"
      }
    };
    this.setState({ssoConfig});
  }

  /**
   * Get the current sso config from the context's state.
   * @returns {Object}
   */
  getSsoConfiguration() {
    return this.state.ssoConfig;
  }

  /**
   * Whenever the save has been requested
   * @param {Object} ssoConfig The current sso configuration
   */
  async save(ssoConfig) {
    //@todo @mock
    this.setState({ssoConfig});
    console.log("Saved sso config:", ssoConfig);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSsoContext.Provider value={this.state}>
        {this.props.children}
      </AdminSsoContext.Provider>
    );
  }
}

AdminSsoContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  accountRecoveryContext: PropTypes.object, // The account recovery context
};
export default withAppContext(AdminSsoContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSso(WrappedComponent) {
  return class WithAdminSso extends React.Component {
    render() {
      return (
        <AdminSsoContext.Consumer>
          {
            adminSsoContext => <WrappedComponent adminSsoContext={adminSsoContext} {...this.props} />
          }
        </AdminSsoContext.Consumer>
      );
    }
  };
}

