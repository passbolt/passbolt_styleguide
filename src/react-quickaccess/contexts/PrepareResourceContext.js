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
  initCustomGenerator: () => {}, // Initialise the generator with the given configuration
  isCustomGeneratorInitialised: () => {}, // returns true if the generator initialisation has been initialised
  getCurrentGenerator: () => {}, // Get the current password generator set
  getGeneratorForType: () => {}, // Returns the generator of the given type
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
      isInitialised: false, // true if the generator has already been initialised
      initCustomGenerator: this.initCustomGenerator.bind(this), // Initialise the generator with the given configuration
      isCustomGeneratorInitialised: this.isCustomGeneratorInitialised.bind(this), // returns true if the generator initialisation has been initialised
      getGeneratorForType: this.getGeneratorForType.bind(this), // Returns the generator of the given type
      getCurrentGenerator: this.getCurrentGenerator.bind(this), // Get the current password generator set
      changeGenerator: this.changeGenerator.bind(this), // Change the default password generator
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
    await this.initializePasswordGenerator();
  }

  /**
   * Initialize the password generator
   */
  async initializePasswordGenerator() {
    if (this.props.context.isAuthenticated) {
      const settings = await this.props.context.port.request('passbolt.password-generator.settings');
      this.setState({settings});
    }
  }

  /**
   * Init the password generator configuration based on a custom configuration (default settings + organisation settings)
   * It's made to be used once to avoid multiple time initialisation.
   * It can happens with the <ResourceCreatePage/> when clicking on the generator configuration and then go back to the page
   * (for instance the componentDidMount is called again, so the component is initialised twice is this case).
   * @param {object} passwordConfiguration
   */
  initCustomGenerator(passwordGeneratorConfiguration) {
    if (this.state.isInitialised) {
      return;
    }
    const settings = {... this.state.settings};
    settings.default_generator = passwordGeneratorConfiguration.type;
    settings.generators = settings.generators.map(defaultGenerator => defaultGenerator.type === passwordGeneratorConfiguration.type ? passwordGeneratorConfiguration : defaultGenerator);
    this.setState({settings, isInitialised: true});
  }

  /**
   * Returns true if 'initCustomeGenerator' has already been called.
   * @returns {boolean}
   */
  isCustomGeneratorInitialised() {
    return this.state.isInitialised;
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
      await this.initializePasswordGenerator();
    }
  }

  /**
   * Whenever a password has been generated with the generator
   * @param password The generated password
   */
  onPasswordGenerated(password, generator) {
    this.changeGenerator(generator);
    this.updateGeneratedPassword(password);
  }

  /**
   * Whenever a resource has been prepared by the user
   * @param resource The prepared resource
   */
  onPrepareResource(resource) {
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
   * Get the currently selected and configured generator
   * @returns {Object} the current generator set
   */
  getCurrentGenerator() {
    const type = this.state.settings.default_generator;
    return this.getGeneratorForType(type);
  }

  /**
   * Returns the currently set generator of the given type
   * @param {string} type the generator type
   */
  getGeneratorForType(type) {
    return this.state.settings.generators.find(
      generator => generator.type === type
    );
  }

  /**
   * Updates the last generated password
   * @param lastGeneratedPassword The last generated password
   */
  updateGeneratedPassword(lastGeneratedPassword) {
    this.setState({lastGeneratedPassword});
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
