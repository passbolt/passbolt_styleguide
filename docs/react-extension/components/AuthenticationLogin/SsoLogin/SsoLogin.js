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
 * @since         3.10.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

/**
 * This component allows the user to log in with his account
 */
class SsoLogin extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      actions: {
        processing: false // True if one's processing passphrase
      },
    };
  }

  /**
   * Returns true if the user can perform actions on the component
   * @returns {boolean}
   */
  get areActionsAllowed() {
    return !this.state.actions.processing;
  }

  /**
   * Returns true if the component must be in a processing mode
   * @returns {boolean}
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns the user full name
   */
  get fullname() {
    return this.props.userSettings?.fullName
      || `${this.props.account?.first_name} ${this.props.account?.last_name}`;
  }

  /**
   * Returns the username
   */
  get username() {
    return this.props.userSettings?.username || this.props.account?.username;
  }

  /**
   * Returns the trusted domain
   */
  get trustedDomain() {
    return this.props.userSettings?.getTrustedDomain()
      || this.props.account?.domain;
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSwitchToPassphrase = this.handleSwitchToPassphrase.bind(this);
    this.handleSignInWithSso = this.handleSignInWithSso.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  toggleProcessing() {
    this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Switches the UI to the passphrase mode.
   */
  handleSwitchToPassphrase(event) {
    event.preventDefault();
    if (!this.isProcessing) {
      this.props.switchToPassphraseLogin();
    }
  }

  /**
   * Handle the click on the SSO login button.
   * @returns {Promise<void>}
   */
  async handleSignInWithSso(event) {
    event.preventDefault();
    this.setState({
      actions: {
        processing: true
      }
    });

    await this.props.onSsoSignIn();

    this.setState({
      actions: {
        processing: false
      }
    });
  }

  /**
   * Returns the provider information of the current SSO provider configured.
   * @return {object}
   */
  get ssoProviderData() {
    return this.props.ssoProvider;
  }

  /**
   * Render the component
   */
  render() {
    const ssoProviderData = this.ssoProviderData;
    return (
      <div className="login">
        <div className="login-user">
          <UserAvatar user={this.props.account?.user} baseUrl={this.trustedDomain} className="big avatar user-avatar"/>
          <p className="login-user-name">{this.fullname}</p>
          <p className="login-user-email">{this.username}</p>
        </div>
        <div className="form-actions sso-login-form">
          <button type="button" className={`sso-login-button ${this.isProcessing ? "disabled" : ""} ${ssoProviderData.id}`} onClick={this.handleSignInWithSso} disabled={this.isProcessing} >
            <span className="provider-logo">
              {ssoProviderData.icon}
            </span>
            {this.props.t(`Sign in with {{providerName}}`, {providerName: ssoProviderData.name})}
          </button>
          <button className="link" type="button" onClick={this.handleSwitchToPassphrase}>
            <Trans>Sign in with my passphrase.</Trans>
          </button>
        </div>
      </div>
    );
  }
}

SsoLogin.propTypes = {
  account: PropTypes.object, // The user account
  userSettings: PropTypes.object, // The user settings
  onSsoSignIn: PropTypes.func, // Callback to trigger whenever the user wants to sign-in using SSO
  switchToPassphraseLogin: PropTypes.func, // Callback to trigger whenever the user wants to proceed with passphrase
  ssoProvider: PropTypes.object, // The SSO provider if any
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(SsoLogin));
