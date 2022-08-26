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
  ssoConfig: null, // The current sso configuration
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getProvider: () => {}, // Return the current sso configuration from the context state
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
      ssoConfig: null, // The current sso configuration
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getProvider: this.getProvider.bind(this), // Return the current sso provider configured
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
        url: "https://login.microsoftonline.com/passbolt-app"
      }
    };
    this.setState({ssoConfig});
  }

  /**
   * Get the current sso provider configured.
   * @returns {string}
   */
  getProvider() {
    return this.state.ssoConfig?.provider;
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

