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

export const SsoContext = React.createContext({
  ssoServerConfig: null, // The current sso server configuration
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getProvider: () => {}, // Return the current sso configuration from the context state
  isBrowserExtensionConfigured: () => {}, // Returns true if the client data is configured for SSO
});

/**
 * The related context provider
 */
export class SsoContextProvider extends React.Component {
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
      ssoServerConfig: null, // The current sso configuration
      isSsoClientDataSet: false, // Is the SSO data configured for the current browser extension
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getProvider: this.getProvider.bind(this), // Return the current sso provider configured
      isBrowserExtensionConfigured: this.isBrowserExtensionConfigured.bind(this), // Returns true if the current browser extension is configured for SSO.
    };
  }

  /**
   * Find the sso configuration
   * @return {Promise<void>}
   */
  async loadSsoConfiguration() {
    console.log("loadSsoConfiguration");
    //@todo @mock
    const ssoServerConfig = {
      provider: "azure",
      data: {
        url: "https://login.microsoftonline.com/passbolt-app"
      }
    };
    const ssoClientConfiguration = await this.props.context.port.request("passbolt.auth.get-sso-client-data");
    const isSsoClientDataSet = Boolean(ssoClientConfiguration);
    this.setState({ssoServerConfig, isSsoClientDataSet});
  }

  /**
   * Get the current sso provider configured.
   * @returns {string}
   */
  getProvider() {
    return this.state.ssoServerConfig?.provider;
  }

  /**
   * Returns true if there is a configuration set for the current browser extension
   * @returns {boolean}
   */
  isBrowserExtensionConfigured() {
    return this.state.isSsoClientDataSet;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <SsoContext.Provider value={this.state}>
        {this.props.children}
      </SsoContext.Provider>
    );
  }
}

SsoContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};
export default withAppContext(SsoContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withSso(WrappedComponent) {
  return class withSso extends React.Component {
    render() {
      return (
        <SsoContext.Consumer>
          {
            ssoContext => <WrappedComponent ssoContext={ssoContext} {...this.props} />
          }
        </SsoContext.Consumer>
      );
    }
  };
}

