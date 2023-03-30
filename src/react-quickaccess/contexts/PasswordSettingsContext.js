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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import PasswordPolicyViewModel from '../../shared/models/passwordPolicy/PasswordPolicyViewModel';

/**
 * The Password settings Context
 * @type {React.Context<Object>}
 */
export const PasswordSettingsContext = React.createContext({
  getPolicies: () => {}, // Returns settings for UI changes
  findPolicies: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  clearContext: () => {}, // put the data to its default state value
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
      processing: true, // Context is processing data
      passwordSettings: null, // Check if settings are defined
      getPolicies: this.getPolicies.bind(this), // Returns policy for password settings Policy
      findPolicies: this.findPolicies.bind(this), // Find the current password settings  Policy
      setProcessing: this.setProcessing.bind(this), // set processing
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * Find the password policy settings
   * @return {Promise<void>}
   */
  async findPolicies() {
    if (!this.props.context.siteSettings.canIUse('passwordPolicies')) {
      return;
    }

    if (this.getPolicies() !== null) {
      return;
    }

    this.setProcessing(true);
    const result = await this.props.context.port.request("passbolt.password-policies.get");

    this.setState({policies: new PasswordPolicyViewModel(result)});
    this.setProcessing(false);
  }

  /**
   * Returns the policies for password setting.
   * @returns {object}
   */
  getPolicies() {
    return this.state.policies;
  }

  /**
   * Handle processing change.
   * @params {Boolean} processing value
   * @returns {void}
   */
  setProcessing(processing) {
    this.setState({processing});
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {policies, processing} = this.defaultState;
    this.setState({
      policies,
      processing,
    });
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
