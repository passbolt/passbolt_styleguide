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
import {withAppContext} from "./AppContext";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const PasswordGeneratorContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  onLastGeneratedPasswordCleared: () => {}, // Whenever the last generated password must be cleared
  getSettings: () => {} // Whenever the settings must be get
});

/**
 * The related context provider
 */
class PasswordGeneratorContextProvider extends React.Component {
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
      onLastGeneratedPasswordCleared: this.onLastGeneratedPasswordCleared.bind(this), // Whenever the last generated password must be cleared
      getSettings: this.getSettings.bind(this) // Whenever the settings must be get
    };
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    this.initializePasswordGenerator();
  }

  /**
   * Initialize the password generator
   */
  async initializePasswordGenerator() {
    if (this.props.context.isAuthenticated) {
      const generatorSettings = await this.props.context.port.request('passbolt.password-generator.settings');
      await this.setState({
        settings: generatorSettings
      });
    }
  }

  /**
   * Whenever the component updated
   * @param previousProps The component previous props
   */
  async componentDidUpdate(previousProps) {
    await this.handleIsAuthenticatedChange(previousProps.context.isAuthenticated);
  }

  /**
   * Whenever the contextual isAuthenticated has changed
   * @param previousIsAuthenticated The previous isAuthenticated
   */
  async handleIsAuthenticatedChange(previousIsAuthenticated) {
    // This is a way to tell that the user has been authenticated
    const isAuthenticatedNow = !previousIsAuthenticated && this.props.context.isAuthenticated;
    if (isAuthenticatedNow) {
      this.initializePasswordGenerator();
    }
  }

  /**
   * Whenever a password has been generated with the generator
   * @param password The generated password
   */
  async onPasswordGenerated(password, generator) {
    await this.changeGenerator(generator);
    await this.updateGeneratedPassword(password);
  }

  /**
   * Whenever the last generated password must be cleared
   */
  onLastGeneratedPasswordCleared() {
    this.setState({lastGeneratedPassword: {}});
  }

  /**
   * Change the default password generator
   * @param generator A generator
   */
  changeGenerator(generator) {
    const settings = {... this.state.settings};
    settings.default_generator = generator.type;
    settings.generators = settings.generators.map(defaultGenerator => defaultGenerator.type === generator.type ? generator : defaultGenerator);
    this.setState({settings});
  }

  /**
   * Updates the last generated password
   * @param lastGeneratedPassword The last generated password
   */
  async updateGeneratedPassword(lastGeneratedPassword) {
    await this.setState({lastGeneratedPassword});
  }

  /**
   * Get the settings of the password generator
   * @returns {Promise<*>}
   */
  async getSettings() {
    if (!this.state.settings) {
      await this.initializePasswordGenerator();
    }
    return this.state.settings;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <PasswordGeneratorContext.Provider value={this.state}>
        {this.props.children}
      </PasswordGeneratorContext.Provider>
    );
  }
}

PasswordGeneratorContextProvider.displayName = 'PasswordGeneratorContextProvider';
PasswordGeneratorContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any,
};


export default withAppContext(PasswordGeneratorContextProvider);

/**
 * Generate Password Context Consumer HOC
 * @param WrappedComponent
 */
export function withPasswordGeneratorContext(WrappedComponent) {
  return class WithPasswordGenerator extends React.Component {
    render() {
      return (
        <PasswordGeneratorContext.Consumer>
          {
            PasswordGeneratorContext => <WrappedComponent passwordGeneratorContext={PasswordGeneratorContext} {...this.props} />
          }
        </PasswordGeneratorContext.Consumer>
      );
    }
  };
}
