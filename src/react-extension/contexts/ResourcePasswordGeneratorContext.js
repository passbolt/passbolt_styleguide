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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import PropTypes from "prop-types";

/**
 * Context related to resources ( filter, current selections, etc.)
 */
export const ResourcePasswordGeneratorContext = React.createContext({
  settings: null, // The current settings of generators
  lastGeneratedPassword: null, // The last password generated
  onPasswordGenerated: () => {}, // Whenever the a password has been generated with the generator
  onLastGeneratedPasswordCleared: () => {} // Whenever the last generated password must be cleared
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
      onLastGeneratedPasswordCleared: this.onLastGeneratedPasswordCleared.bind(this) // Whenever the last generated password must be cleared
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
    const generatorSettings = await this.props.context.port.request('passbolt.password-generator.settings');
    this.setState({
      settings: generatorSettings
    });
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

ResourcePasswordGeneratorContextProvider.displayName = 'ResourcePasswordGeneratorContextProvider';
ResourcePasswordGeneratorContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any,
};


export default withAppContext(ResourcePasswordGeneratorContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withResourcePasswordGeneratorContext(WrappedComponent) {
  return class WithResourcePasswordGenerator extends React.Component {
    render() {
      return (
        <ResourcePasswordGeneratorContext.Consumer>
          {
            ResourcePasswordGeneratorContext => <WrappedComponent resourcePasswordGeneratorContext={ResourcePasswordGeneratorContext} {...this.props} />
          }
        </ResourcePasswordGeneratorContext.Consumer>
      );
    }
  };
}
