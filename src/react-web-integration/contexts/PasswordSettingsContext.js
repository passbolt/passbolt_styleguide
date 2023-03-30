/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";
import PasswordPolicyViewModel from '../../shared/models/passwordPolicy/PasswordPolicyViewModel';

/**
 * The Password settings Context
 * @type {React.Context<Object>}
 */
export const PasswordSettingsContext = React.createContext({
  getPolicies: () => {}, // Returns settings for UI changes
  findPolicies: () => {}, // Find the current self registraiton settings and store it in the state
});

/**
 * The Password settings  context provider
 */
export class PasswordSettingsContextProvider extends React.Component {
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
      policies: null,
      getPolicies: this.getPolicies.bind(this), // Returns policy for password settings Policy
      findPolicies: this.findPolicies.bind(this), // Find the current password settings  Policy
    };
  }

  /**
   * Find the password policy settings
   * @return {Promise<void>}
   */
  async findPolicies() {
    if (this.getPolicies() !== null) {
      return;
    }

    const result = await this.props.context.port.request("passbolt.password-policies.get");
    if (result) {
      this.setState({policies: new PasswordPolicyViewModel(result)});
    }
  }

  /**
   * Returns the policies for password setting.
   * @returns {object}
   */
  getPolicies() {
    return this.state.policies;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <PasswordSettingsContext.Provider value={this.state}>
        {this.props.children}
      </PasswordSettingsContext.Provider>
    );
  }
}

PasswordSettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(PasswordSettingsContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withPasswordSettings(WrappedComponent) {
  return class WithPasswordSettings extends React.Component {
    render() {
      return (
        <PasswordSettingsContext.Consumer>
          {passwordSettingsContext => (
            <WrappedComponent
              passwordSettingsContext={passwordSettingsContext}
              {...this.props}
            />
          )}
        </PasswordSettingsContext.Consumer>
      );
    }
  };
}
