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
import {withAppContext} from "../../shared/context/AppContext/AppContext";

/**
 * Context related to prepare a resource ( name, url, username, password.)
 */
export const PrepareResourceContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  resourcePrepared: null, // The resource prepared
  onPrepareResource: () => {}, // Whenever a resource has been prepared
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  onLastGeneratedPasswordCleared: () => {}, // Whenever the last generated password must be cleared
  getSettings: () => {}, // Whenever the settings must be get
  getLastGeneratedPassword: () => {}, // Whenever the last generated password must be get
  getPreparedResource: () => {} // Whenever the prepared resource must be get
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
      onPrepareResource: this.onPrepareResource.bind(this), // Whenever a resource has been prepared
      onPasswordGenerated: this.onPasswordGenerated.bind(this), // Whenever the a password has been generated with the generator
      getSettings: this.getSettings.bind(this), // Whenever the settings must be get
      getLastGeneratedPassword: this.getLastGeneratedPassword.bind(this), // Whenever the last generated password must be get
      getPreparedResource: this.getPreparedResource.bind(this) // Whenever the prepared resource must be get
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
   * Whenever a resource has been prepared by the user
   * @param resource The prepared resource
   */
  async onPrepareResource(resource) {
    this.setState({resourcePrepared: resource});
  }

  /**
   * Whenever the last generated password must be cleared
   */
  clearLastGeneratedPassword() {
    this.setState({lastGeneratedPassword: null});
  }

  /**
   * Whenever the prepared resource must be cleared
   */
  clearPreparedResource() {
    this.setState({resourcePrepared: null});
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
   * Get the last generated password
   * @returns {null|*}
   */
  getLastGeneratedPassword() {
    const lastGeneratedPassword =  this.state.lastGeneratedPassword;
    this.clearLastGeneratedPassword();
    return lastGeneratedPassword;
  }

  /**
   * Get the prepared resource
   * @returns {null|*}
   */
  getPreparedResource() {
    const resourcePrepared =  this.state.resourcePrepared;
    this.clearPreparedResource();
    return resourcePrepared;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <PrepareResourceContext.Provider value={this.state}>
        {this.props.children}
      </PrepareResourceContext.Provider>
    );
  }
}

PrepareResourceContextProvider.displayName = 'PrepareResourceContextProvider';
PrepareResourceContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any,
};


export default withAppContext(PrepareResourceContextProvider);

/**
 * Generate Password Context Consumer HOC
 * @param WrappedComponent
 */
export function withPrepareResourceContext(WrappedComponent) {
  return class WithPrepareResource extends React.Component {
    render() {
      return (
        <PrepareResourceContext.Consumer>
          {
            PrepareResourceContext => <WrappedComponent prepareResourceContext={PrepareResourceContext} {...this.props} />
          }
        </PrepareResourceContext.Consumer>
      );
    }
  };
}
