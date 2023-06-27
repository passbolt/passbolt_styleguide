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
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import {withAppContext} from "../../shared/context/AppContext/AppContext";

export const SsoContext = React.createContext({
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getProvider: () => {}, // Return the current sso configuration from the context state
  hasUserAnSsoKit: () => {}, // Returns true if the current user has an SSO kit built locally
  runSignInProcess: () => {}, // Launches the SSO process with the configured provider
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
    this.handleSpecificError.bind(this);
    return {
      ssoLocalConfiguredProvider: null, // the provider configured for the local SSO kit if any, null otherwise
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getProvider: this.getProvider.bind(this), // Return the current sso provider configured
      hasUserAnSsoKit: this.hasUserAnSsoKit.bind(this), // Returns true if the current user has an SSO kit built locally
      runSignInProcess: this.runSignInProcess.bind(this), // Launches the SSO process with the configured provider
    };
  }

  /**
   * Find the sso configuration
   * @return {Promise<void>}
   */
  async loadSsoConfiguration() {
    const ssoLocalConfiguredProvider = await this.props.context.port.request("passbolt.sso.get-local-configured-provider");
    this.setState({ssoLocalConfiguredProvider});
  }

  /**
   * Get the current sso provider configured.
   * @returns {string}
   */
  getProvider() {
    return this.state.ssoLocalConfiguredProvider;
  }

  /**
   * Returns true if the current user has an SSO kit built locally
   * @returns {boolean}
   */
  hasUserAnSsoKit() {
    return Boolean(this.state.ssoLocalConfiguredProvider);
  }

  /**
   * Launches the SSO process with the configured provider
   * @returns {Promise<void>}
   */
  async runSignInProcess() {
    try {
      const provider = this.getProvider();
      await this.props.context.port.request(`passbolt.sso.sign-in-with-${provider}`, true);
    } catch (e) {
      console.error(e);
      this.handleSpecificError(e);
      throw e;
    }
  }

  /**
   * Handles error from the background page during SSO sign-in.
   * @param {Error} e
   */
  handleSpecificError(e) {
    let errorToThrow = e;
    switch (e.name) {
      case 'InvalidMasterPasswordError': {
        errorToThrow = new Error(this.props.t("The passphrase from the SSO kit doesn't match your private key: {{error}}", {error: e.message}));
        break;
      }
      case 'OutdatedSsoKitError': {
        errorToThrow = new Error(this.props.t("The SSO kit is outdated and can't be used to decrypt your passphrase: {{error}}", {error: e.message}));
        break;
      }
    }

    throw errorToThrow;
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
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(SsoContextProvider));

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

