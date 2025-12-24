/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../AppContext/AppContext";

/**
 * The Password settings Context
 * @type {React.Context<Object>}
 */
export const PasswordPoliciesContext = React.createContext({
  policies: null, // the currently loaded password policies
  getPolicies: () => {}, // Returns the currently loaded password policies
  findPolicies: () => {}, // Find the current password policies and store it in the state
  shouldRunDictionaryCheck: () => {}, // returns true if the password policies allows external dictionary checks
});

/**
 * The Password policies context provider
 */
export class PasswordPoliciesContextProvider extends React.Component {
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
      shouldRunDictionaryCheck: this.shouldRunDictionaryCheck.bind(this), // returns true if the password policies allows external dictionary checks
    };
  }

  /**
   * Find the password policies settings
   * @return {Promise<void>}
   */
  async findPolicies() {
    if (this.getPolicies() !== null) {
      return;
    }
    const policies = await this.props.context.port.request("passbolt.password-policies.get");
    this.setState({ policies });
  }

  /**
   * Returns the policies for password setting.
   * @returns {object}
   */
  getPolicies() {
    return this.state.policies;
  }

  /**
   * Returns true if the password policies allows external dictionary checks
   * @returns {boolean}
   */
  shouldRunDictionaryCheck() {
    return Boolean(this.state.policies?.external_dictionary_check);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <PasswordPoliciesContext.Provider value={this.state}>{this.props.children}</PasswordPoliciesContext.Provider>
    );
  }
}

PasswordPoliciesContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(PasswordPoliciesContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withPasswordPolicies(WrappedComponent) {
  return class WithPasswordPolicies extends React.Component {
    render() {
      return (
        <PasswordPoliciesContext.Consumer>
          {(passwordPoliciesContext) => (
            <WrappedComponent passwordPoliciesContext={passwordPoliciesContext} {...this.props} />
          )}
        </PasswordPoliciesContext.Consumer>
      );
    }
  };
}
