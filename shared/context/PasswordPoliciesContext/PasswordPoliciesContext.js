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
  loadPolicies: () => {}, // Returns the currently loaded password policies
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
      loadPolicies: this.loadPolicies.bind(this), // Find the current password settings  Policy
    };
  }

  /**
   * Return Password policies
   * return them if already loaded, else load
   * @return {Promise<void>}
   */
  async loadPolicies() {
    const { policies } = this.state;
    if (policies !== null) {
      return policies;
    }

    const newPolicies = await this.props.context.port.request("passbolt.password-policies.get");
    this.setState({ policies: newPolicies });
    return newPolicies;
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
