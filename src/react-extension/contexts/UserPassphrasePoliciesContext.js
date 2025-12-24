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
 * @since         4.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { withTranslation } from "react-i18next";

/**
 * The User Passphrase Policies Context
 * @type {React.Context<Object>}
 */
export const UserPassphrasePoliciesContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  findSettings: () => {}, // request the settings from the background page
});

/**
 * The User passphrase Policies context provider
 */
export class UserPassphrasePoliciesContextProvider extends React.Component {
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
      settings: null, // the current user passphrase policies settings
      findSettings: this.findSettings.bind(this), // find the User Passphrase Policies
      getSettings: this.getSettings.bind(this), // returns the settings that have been fetch previously
    };
  }

  /**
   * Find the User Passphrase Policies
   * @return {Promise<void>}
   */
  async findSettings() {
    const settings = await this.props.context.port.request("passbolt.user-passphrase-policies.find");
    this.setState({ settings });
  }

  /**
   * Get the User Passphrase Policies
   * @return {Object}
   */
  getSettings() {
    return this.state.settings;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <UserPassphrasePoliciesContext.Provider value={this.state}>
        {this.props.children}
      </UserPassphrasePoliciesContext.Provider>
    );
  }
}

UserPassphrasePoliciesContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
};

export default withAppContext(withTranslation("common")(UserPassphrasePoliciesContextProvider));

/**
 * Administration User Passphrase Policies Context Consumer HOC
 * @param WrappedComponent
 */
export function withUserPassphrasePolicies(WrappedComponent) {
  return class WithAdminUserPassphrasePolicies extends React.Component {
    render() {
      return (
        <UserPassphrasePoliciesContext.Consumer>
          {(userPassphrasePoliciesContext) => (
            <WrappedComponent userPassphrasePoliciesContext={userPassphrasePoliciesContext} {...this.props} />
          )}
        </UserPassphrasePoliciesContext.Consumer>
      );
    }
  };
}
