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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withTranslation} from "react-i18next";
import UserPassphrasePoliciesViewModel from "../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesViewModel";

/**
 * The Administration User Passphrase Policies Context
 * @type {React.Context<Object>}
 */
export const AdministrationUserPassphrasePoliciesContext = React.createContext({
  isProcessing: false,
  settings: {},
  getSettings: () => {}, // Returns settings for UI changes
  findSettings: () => {}, // request the settings from the background page
});

/**
 * The Administration password policies context provider
 */
export class AdministrationUserPassphrasePoliciesContextProvider extends React.Component {
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
      isProcessing: false,
      settings: new UserPassphrasePoliciesViewModel(),
      findSettings: this.findSettings.bind(this),
      getSettings: this.getSettings.bind(this),
    };
  }

  /**
   * Find the User Passphrase Policies
   * @return {Promise<void>}
   */
  async findSettings() {
    this.setState({isProcessing: true});

    const result = await this.props.context.port.request("passbolt.user-passphrase-policies.find");
    const settings = new UserPassphrasePoliciesViewModel(result);

    //Init saved setting
    this.setState({
      settings,
      isProcessing: false,
    });
  }

  /**
   * Returns the settings that have been fetch previously.
   * @returns {object}
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
      <AdministrationUserPassphrasePoliciesContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationUserPassphrasePoliciesContext.Provider>
    );
  }
}

AdministrationUserPassphrasePoliciesContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withAppContext(withTranslation('common')(AdministrationUserPassphrasePoliciesContextProvider));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminUserPassphrasePolicies(WrappedComponent) {
  return class WithAdminUserPassphrasePolicies extends React.Component {
    render() {
      return (
        <AdministrationUserPassphrasePoliciesContext.Consumer>
          {adminUserPassphrasePoliciesContext => (
            <WrappedComponent
              adminUserPassphrasePoliciesContext={adminUserPassphrasePoliciesContext}
              {...this.props}
            />
          )}
        </AdministrationUserPassphrasePoliciesContext.Consumer>
      );
    }
  };
}
