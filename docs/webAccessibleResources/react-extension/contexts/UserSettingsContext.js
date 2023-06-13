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
 * @since         3.1.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";

export const UserSettingsContext = React.createContext({
  state: null, // The state in the user settings process
  oldPassphrase: null, // The old passphrase to update
  onIntroductionPassphraseRequested: () => {
  }, // Whenever the introduction of the passphrase is requested
  onProvidePassphraseRequested: () => {
  }, // Whenever the provide passphrase is requested
  onCheckProvidePassphraseRequested: () => {
  }, // Whenever the check provide passphrase is requested
  onUpdatePassphraseRequested: () => {
  }, // Whenever the user wants to update the passphrase
  onGoToIntroductionPassphraseRequested: () => {
  }, // Whenever the user wants to go back to the passphrase introduction
  onDownloadRecoveryKitRequested: () => {
  }, // Whenever the user wants download the recovery kit.
  onUpdateSecurityTokenRequested: () => {
  }, // Whenever the user wants update the security token.
  onUpdateUserLocaleRequested: () => {
  }, // Whenever the update of the locale is requested.
});

/**
 * The related context provider
 */
export class UserSettingsContextProvider extends React.Component {
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
      state: UserSettingsContextState.INITIAL_STATE,
      oldPassphrase: null,
      onIntroductionPassphraseRequested: this.onIntroductionPassphraseRequested.bind(this),
      onProvidePassphraseRequested: this.onProvidePassphraseRequested.bind(this),
      onCheckProvidePassphraseRequested: this.onCheckProvidePassphraseRequested.bind(this),
      onUpdatePassphraseRequested: this.onUpdatePassphraseRequested.bind(this),
      onGoToIntroductionPassphraseRequested: this.onGoToIntroductionPassphraseRequested.bind(this),
      onDownloadRecoveryKitRequested: this.onDownloadRecoveryKitRequested.bind(this),
      onUpdateSecurityTokenRequested: this.onUpdateSecurityTokenRequested.bind(this),
      onUpdateLocaleUserRequested: this.handleUpdateLocaleUserRequested.bind(this),
    };
  }

  /**
   * Whenever the introduction passphrase is requested
   */
  async onIntroductionPassphraseRequested() {
    await this.setState({state: UserSettingsContextState.PASSPHRASE_INTRODUCTION});
  }

  /**
   * Whenever the provide passphrase is requested
   */
  async onProvidePassphraseRequested() {
    await this.setState({state: UserSettingsContextState.PASSPHRASE_TO_PROVIDE_REQUESTED});
  }

  /**
   * Whenever the check provide passphrase is requested
   * @param passphrase A passphrase
   */
  async onCheckProvidePassphraseRequested(passphrase) {
    await this.props.context.port.request('passbolt.auth.verify-passphrase', passphrase);
    await this.setState({state: UserSettingsContextState.PASSPHRASE_TO_PROVIDE_CHECKED, oldPassphrase: passphrase});
  }

  /**
   * Whenever the user wants to go back to the passphrase introduction
   */
  async onGoToIntroductionPassphraseRequested() {
    await this.setState({state: UserSettingsContextState.PASSPHRASE_INTRODUCTION, oldPassphrase: null});
  }

  /**
   * Whenever the update passphrase is requested
   * @param {string} passphrase The new passphrase
   */
  async onUpdatePassphraseRequested(passphrase) {
    await this.props.context.port.request('passbolt.user.update-private-key', this.state.oldPassphrase, passphrase);
    await this.setState({state: UserSettingsContextState.PASSPHRASE_UPDATED, oldPassphrase: null});
  }

  /**
   * Whenever the download of the recovery kit is requested
   */
  async onDownloadRecoveryKitRequested() {
    await this.props.context.port.request('passbolt.keyring.download-my-private-key');
  }

  /**
   * Whenever the update security token is requested
   * @param securityTokenDto The security token DTO
   */
  async onUpdateSecurityTokenRequested(securityTokenDto) {
    await this.props.context.port.request('passbolt.users.update-security-token', securityTokenDto);
  }

  /**
   * Whenever the update of the locale is requested
   * @param localeDto The locale DTO
   */
  async handleUpdateLocaleUserRequested(localeDto) {
    await this.props.context.port.request("passbolt.locale.update-user-locale", localeDto);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <UserSettingsContext.Provider value={this.state}>
        {this.props.children}
      </UserSettingsContext.Provider>
    );
  }
}

UserSettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any // The children components
};
export default withAppContext(UserSettingsContextProvider);

/**
 * UserSettings Context Consumer HOC
 * @param WrappedComponent
 */
export function withUserSettings(WrappedComponent) {
  return class withUserSettings extends React.Component {
    render() {
      return (
        <UserSettingsContext.Consumer>
          {
            userSettingsContext => <WrappedComponent userSettingsContext={userSettingsContext} {...this.props} />
          }
        </UserSettingsContext.Consumer>
      );
    }
  };
}

/**
 * The authentication types of state
 */
export const UserSettingsContextState = {
  INITIAL_STATE: 'Initial State',
  PASSPHRASE_INTRODUCTION: 'Passphrase Introduction',
  PASSPHRASE_TO_PROVIDE_REQUESTED: 'Passphrase To Provide Requested',
  PASSPHRASE_TO_PROVIDE_CHECKED: 'Passphrase To Provide Checked',
  PASSPHRASE_UPDATED: 'Passphrase Updated',
};
