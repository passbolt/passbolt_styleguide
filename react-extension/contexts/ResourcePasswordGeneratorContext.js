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
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";
import { withPasswordPolicies } from "../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const ResourcePasswordGeneratorContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  getSettings: () => {}, // returns the current generator settings
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  consumeLastGeneratedPassword: () => {}, // consumes and returns the last generated password from the generator
  resetSecretGeneratorSettings: () => {}, // reset the secret generator settings with the organisation's default
});

/**
 * The related context provider
 */
class ResourcePasswordGeneratorContextProvider extends React.Component {
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
      onPasswordGenerated: this.onPasswordGenerated.bind(this), // Whenever the a password has been generated with the generator
      getSettings: this.getSettings.bind(this), // returns the current generator settings
      consumeLastGeneratedPassword: this.consumeLastGeneratedPassword.bind(this), // consumes and returns the last generated password from the generator
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
   * Returns the current generator settings
   * @returns {Object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Whenever a password has been generated with the generator
   * @param password The generated password
   * @param generator The updated generator
   */
  onPasswordGenerated(password, generatorSettings) {
    this.setState({
      lastGeneratedPassword: password,
      settings: generatorSettings,
    });
  }

  /**
   * Consumes the last generated password if any.
   * @returns {string|null}
   */
  consumeLastGeneratedPassword() {
    const password = this.state.lastGeneratedPassword;
    this.setState({
      lastGeneratedPassword: null,
    });
    return password;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ResourcePasswordGeneratorContext.Provider value={this.state}>
        {this.props.children}
      </ResourcePasswordGeneratorContext.Provider>
    );
  }
}

ResourcePasswordGeneratorContextProvider.displayName = "ResourcePasswordGeneratorContextProvider";
ResourcePasswordGeneratorContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  passwordPoliciesContext: PropTypes.object, // The password policies context
  children: PropTypes.any,
};

export default withAppContext(withPasswordPolicies(ResourcePasswordGeneratorContextProvider));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourcePasswordGeneratorContext(WrappedComponent) {
  return class WithResourcePasswordGenerator extends React.Component {
    render() {
      return (
        <ResourcePasswordGeneratorContext.Consumer>
          {(ResourcePasswordGeneratorContext) => (
            <WrappedComponent resourcePasswordGeneratorContext={ResourcePasswordGeneratorContext} {...this.props} />
          )}
        </ResourcePasswordGeneratorContext.Consumer>
      );
    }
  };
}
