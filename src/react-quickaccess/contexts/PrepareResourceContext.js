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
 * @since         3.3.0
 */

import * as React from "react";
import PropTypes from "prop-types";
import { withPasswordPolicies } from "../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import { withAppContext } from "../../shared/context/AppContext/AppContext";

/**
 * Context related to prepare a resource ( name, url, username, password.)
 */
export const PrepareResourceContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  resourcePrepared: null, // The resource prepared
  onPrepareResource: () => {}, // Whenever a resource has been prepared
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  getSettings: () => {}, // Whenever the settings must be get
  consumeLastGeneratedPassword: () => {}, // Whenever the last generated password must be get
  consumePreparedResource: () => {}, // Whenever the prepared resource must be get
  resetSecretGeneratorSettings: () => {}, // reset the secret generator settings with the organisation's default
});

/**
 * The related context provider
 */
class PrepareResourceContextProvider extends React.Component {
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
      settings: null, // The current settings of generators
      lastGeneratedPassword: null, // The last password generated
      resourcePrepared: null, // The resource prepared
      getSettings: this.getSettings.bind(this), // returns the current generator settings
      onPrepareResource: this.onPrepareResource.bind(this), // Whenever a resource has been prepared
      onPasswordGenerated: this.onPasswordGenerated.bind(this), // Whenever the a password has been generated with the generator
      consumeLastGeneratedPassword: this.consumeLastGeneratedPassword.bind(this), // Whenever the last generated password must be get
      consumePreparedResource: this.consumePreparedResource.bind(this), // Whenever the prepared resource must be get
      resetSecretGeneratorSettings: this.resetSecretGeneratorSettings.bind(this), // reset the secret generator settings with the organisation's default
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   */
  componentDidMount() {
    this.resetSecretGeneratorSettings();
  }

  /**
   * Initialize the secret generator settings.
   * @return {Promise<void>}
   */
  async resetSecretGeneratorSettings() {
    await this.props.passwordPoliciesContext.findPolicies();
    const passwordPolicies = this.props.passwordPoliciesContext.getPolicies();
    this.setState({ settings: passwordPolicies });
  }

  /**
   * Whenever a password has been generated with the generator
   * @param password The generated password
   */
  onPasswordGenerated(newPassword, newGeneratorSettings) {
    this.setState({
      lastGeneratedPassword: newPassword,
      settings: newGeneratorSettings,
    });
  }

  /**
   * Whenever a resource has been prepared by the user
   * @param resource The prepared resource
   */
  onPrepareResource(resource) {
    this.setState({ resourcePrepared: resource });
  }

  /**
   * Get the settings of the password generator
   * @returns {Object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Get the last generated password
   * @returns {string|null}
   */
  consumeLastGeneratedPassword() {
    const lastGeneratedPassword = this.state.lastGeneratedPassword;
    this.setState({ lastGeneratedPassword: null });
    return lastGeneratedPassword;
  }

  /**
   * Consume the prepared resource
   * @returns {Object|null}
   */
  consumePreparedResource() {
    const resourcePrepared = this.state.resourcePrepared;
    this.setState({ resourcePrepared: null });
    return resourcePrepared;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <PrepareResourceContext.Provider value={this.state}>{this.props.children}</PrepareResourceContext.Provider>;
  }
}

PrepareResourceContextProvider.displayName = "PrepareResourceContextProvider";
PrepareResourceContextProvider.propTypes = {
  context: PropTypes.object,
  passwordPoliciesContext: PropTypes.object, // The password settings context
  children: PropTypes.any,
};

export default withAppContext(withPasswordPolicies(PrepareResourceContextProvider));

/**
 * Generate Password Context Consumer HOC
 * @param WrappedComponent
 */
export function withPrepareResourceContext(WrappedComponent) {
  return class WithPrepareResource extends React.Component {
    render() {
      return (
        <PrepareResourceContext.Consumer>
          {(PrepareResourceContext) => (
            <WrappedComponent prepareResourceContext={PrepareResourceContext} {...this.props} />
          )}
        </PrepareResourceContext.Consumer>
      );
    }
  };
}
