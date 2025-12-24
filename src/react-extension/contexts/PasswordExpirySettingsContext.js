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
 * @since         4.4.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { withTranslation } from "react-i18next";
import { formatDateForApi } from "../../shared/utils/dateUtils";
import { DateTime } from "luxon";

/**
 * The User Passphrase Policies Context
 * @type {React.Context<Object>}
 */
export const PasswordExpirySettingsContext = React.createContext({
  getSettings: () => {}, // Returns settings for UI changes
  getDefaultExpirationDate: () => {}, // Returns the expiry date based on the configuration if any.
  findSettings: () => {}, // request the settings from the background page
  isFeatureEnabled: () => {}, // Returns true if the feature flag is enabled and the settings are set
});

/**
 * The Password Expiry settings context provider
 */
export class PasswordExpirySettingsContextProvider extends React.Component {
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
      settings: null, // the current password expiry settings
      findSettings: this.findSettings.bind(this), // find the Password expiry settings
      getSettings: this.getSettings.bind(this), // returns the settings that have been fetch previously
      getDefaultExpirationDate: this.getDefaultExpirationDate.bind(this), // Returns the expiry date based on the configuration if any.
      isFeatureEnabled: this.isFeatureEnabled.bind(this), // Returns true if the feature flag is enabled and the settings are set
    };
  }

  /**
   * Find the User Passphrase Policies
   * @return {Promise<void>}
   */
  async findSettings() {
    if (!this.props.context.siteSettings.canIUse("passwordExpiry") || this.getSettings() !== null) {
      return;
    }
    const settings = await this.props.context.port.request("passbolt.password-expiry.get-or-find");
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
   * Returns the expiry date based on the configuration if any.
   * @returns {string|null}
   */
  getDefaultExpirationDate() {
    if (!this.props.context.siteSettings.canIUse("passwordExpiryPolicies")) {
      return null;
    }

    const settings = this.getSettings();
    if (!settings?.default_expiry_period) {
      return null;
    }

    const durationInDays = settings.default_expiry_period;
    const expirationDate = DateTime.utc().plus({ days: durationInDays });
    return formatDateForApi(expirationDate);
  }

  /**
   * Returns true if the feature flag is enabled and the settings are set.
   * @returns {boolean}
   */
  isFeatureEnabled() {
    const settings = this.getSettings();
    if (!this.props.context.siteSettings.canIUse("passwordExpiry") || !settings) {
      return false;
    }

    const areSettingsEnabled = Boolean(settings.id);
    return areSettingsEnabled;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <PasswordExpirySettingsContext.Provider value={this.state}>
        {this.props.children}
      </PasswordExpirySettingsContext.Provider>
    );
  }
}

PasswordExpirySettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
};

export default withAppContext(withTranslation("common")(PasswordExpirySettingsContextProvider));

/**
 * Password expiry Context Consumer HOC
 * @param WrappedComponent
 */
export function withPasswordExpiry(WrappedComponent) {
  return class WithPasswordExpiry extends React.Component {
    render() {
      return (
        <PasswordExpirySettingsContext.Consumer>
          {(passwordExpiryContext) => (
            <WrappedComponent passwordExpiryContext={passwordExpiryContext} {...this.props} />
          )}
        </PasswordExpirySettingsContext.Consumer>
      );
    }
  };
}
