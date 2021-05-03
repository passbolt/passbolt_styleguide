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
 * @since         3.0.0
 */
import React, {Component} from "react";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withAuthenticationContext} from "../../../contexts/AuthenticationContext";
import PropTypes from "prop-types";
import {withDialog} from "../../../contexts/DialogContext";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {Link} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../Common/Icons/Icon";
import {withAppContext} from "../../../contexts/AppContext";

/**
 * This component allows the user to log in with his account
 */
class Login extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.createReferences();
  }


  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      passphrase: '', // The passphrase
      rememberMe: false, // The remember me flag
      actions: {
        processing: false // True if one's processing passphrase
      },
      isObfuscated: true, // True if the passphrase should not be visible
      hasPassphraseFocus: false, // The password input has focus
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        emptyPassphrase: false, // True if the passphrase is empty
        invalidPassphrase: false, // True if the passphrase is invalid
        invalidGpgKey: false, // True if the gpg key is invalid
      }
    };
  }

  /**
   * Returns true if there is data enough to be rendered
   * @returns {boolean}
   */
  get isReady() {
    return Boolean(this.props.authenticationContext.loginInfo);
  }

  /**
   * Returns true if the user can perform actions on the component
   * @returns {boolean}
   */
  get areActionsAllowed() {
    return !this.state.actions.processing;
  }

  /**
   * Returns true if the passphrase is valid
   * @returns {boolean}
   */
  get isValid() {
    return Object.values(this.state.errors).every(value => !value);
  }

  /**
   * Returns true if the component must be in a processing mode
   * @returns {boolean}
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Return true if there is a validation error
   * @returns {boolean}
   */
  get hasErrors() {
    return this.state.errors.emptyPassphrase || this.state.errors.invalidPassphrase || this.state.errors.invalidGpgKey;
  }

  /**
   * Returns the user full name
   */
  get fullname() {
    return this.props.authenticationContext.loginInfo.userSettings.fullName;
  }

  /**
   * Returns the username
   */
  get username() {
    return this.props.authenticationContext.loginInfo.userSettings.username;
  }

  /**
   * Returns the security token code of the suer
   */
  get securityTokenCode() {
    return this.props.authenticationContext.loginInfo.userSettings.getSecurityTokenCode();
  }

  /**
   * Returns the style of the security token (color and text color)
   */
  get securityTokenStyle() {
    const {userSettings} = this.props.authenticationContext.loginInfo;
    const inverseStyle =  {background: userSettings.getSecurityTokenTextColor(), color: userSettings.getSecurityTokenBackgroundColor()};
    const fullStyle =  {background: userSettings.getSecurityTokenBackgroundColor(), color: userSettings.getSecurityTokenTextColor()};
    return this.state.hasPassphraseFocus ? inverseStyle : fullStyle;
  }

  /**
   * Get the passphrase input style.
   * @return {Object}
   */
  get passphraseInputStyle() {
    const {userSettings} = this.props.authenticationContext.loginInfo;
    const emptyStyle =  {background: "", color: ""};
    const fullStyle =  {background: userSettings.getSecurityTokenBackgroundColor(), color: userSettings.getSecurityTokenTextColor()};
    return this.state.hasPassphraseFocus ? fullStyle : emptyStyle;
  }

  /**
   * Returns the trusted domain
   */
  get trustedDomain() {
    return this.props.authenticationContext.loginInfo.userSettings.getTrustedDomain();
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassphrase = this.handleChangePassphrase.bind(this);
    this.handleToggleRememberMe = this.handleToggleRememberMe.bind(this);
    this.handleFocusPassphrase = this.handleFocusPassphrase.bind(this);
    this.handleBlurPassphrase = this.handleBlurPassphrase.bind(this);
    this.handleToggleObfuscate = this.handleToggleObfuscate.bind(this);
  }

  /**
   * Creates the references
   */
  createReferences() {
    this.passphraseInputRef = React.createRef();
  }

  /**
   * Whenever the users submits his passphrase
   * @param event Dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.validate();

    if (this.isValid) {
      await this.toggleProcessing();
      await this.check()
        .then(this.login.bind(this));
    }
  }

  /**
   * Whenever the user changes the private key
   * @param event An input event
   */
  async handleChangePassphrase(event) {
    const passphrase = event.target.value;
    await this.fillPassphrase(passphrase);
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Whenever the user focus on the passphrase input
   */
  handleFocusPassphrase() {
    this.setState({hasPassphraseFocus: true});
  }

  /**
   * Whenever the user blurs on the passphrase input
   */
  handleBlurPassphrase() {
    this.setState({hasPassphraseFocus: false});
  }

  /**
   * Whenever the user tosggles the remember me flag
   */
  async handleToggleRememberMe() {
    await this.toggleRemmemberMe();
  }

  /**
   * Whenever one wants to toggle the obfusctated mode
   */
  handleToggleObfuscate() {
    this.toggleObfuscate();
  }

  /**
   * Whenever the user needs help because he lost his passphrase
   */
  async onPassphraseLost() {
    await this.props.authenticationContext.onPassphraseLost();
  }

  /**
   * Check the private gpg key passphrase
   */
  async check() {
    await this.props.authenticationContext.onCheckLoginPassphraseRequested(this.state.passphrase)
      .catch(this.onCheckFailure.bind(this));
  }

  /**
   * Whenever the passphrase check failed
   * @param error The error
   */
  onCheckFailure(error) {
    // It can happen when the user has entered the wrong passphrase.
    if (error.name === "InvalidMasterPasswordError") {
      this.setState({actions: {processing: false}, errors: {invalidPassphrase: true}});
    } else if (error.name === 'GpgKeyError') {
      this.setState({actions: {processing: false}, errors: {invalidGpgKey: true}});
    } else {
      this.setState({actions: {processing: false}});
      const ErrorDialogProps = {message: error.message};
      this.props.dialogContext.open(NotifyError, ErrorDialogProps);
    }
    return Promise.reject(error);
  }

  /**
   * Logs the user
   * @returns {Promise<void>}
   */
  async login() {
    await this.props.authenticationContext.onLoginRequested(this.state.passphrase, this.state.rememberMe);
  }

  /**
   * Whenever the login failed
   * @param error The error
   */
  onLoginFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(NotifyError, ErrorDialogProps);
    return Promise.reject(error);
  }

  /**
   * Fill the passphrase
   * @param passphrase A passphrase
   */
  async fillPassphrase(passphrase) {
    await this.setState({passphrase});
  }

  /**
   * Toggle the remember me flag value
   */
  async toggleRemmemberMe() {
    await this.setState({rememberMe: !this.state.rememberMe});
  }

  /**
   * Validate the security token data
   */
  async validate() {
    const {passphrase} = this.state;
    const emptyPassphrase =  passphrase.trim() === '';
    if (emptyPassphrase) {
      await this.setState({hasBeenValidated: true, errors: {emptyPassphrase}});
      return;
    }
    await this.setState({hasBeenValidated: true, errors: {}});
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({actions: {processing: true}});
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    return (
      <>
        {this.isReady &&
          <div className="login">
            <div className="login-user">
              <UserAvatar baseUrl={this.trustedDomain} className="big avatar user-avatar"/>
              <p className="login-user-name">{this.fullname}</p>
              <p className="login-user-email">{this.username}</p>
            </div>

            <form acceptCharset="utf-8" onSubmit={this.handleSubmit} className="enter-passphrase">
              <div className={`input text required ${this.hasErrors ? "error" : ""}`}>
                <label htmlFor="passphrase">
                  <Trans>Passphrase</Trans>
                </label>
                <div className="password with-token">
                  <input
                    id="passphrase"
                    ref={this.passphraseInputRef}
                    type={this.state.isObfuscated ? "password" : "text"}
                    name="passphrase"
                    className="login-passphrase-input"
                    style={this.passphraseInputStyle}
                    value={this.state.passphrase}
                    onChange={this.handleChangePassphrase}
                    onFocus={this.handleFocusPassphrase}
                    onBlur={this.handleBlurPassphrase}
                    disabled={!this.areActionsAllowed}
                    autoFocus={true}/>
                  <a
                    className={`password-view button-icon button button-toggle ${this.state.isObfuscated ? "" : "selected"}`}
                    role="button"
                    onClick={this.handleToggleObfuscate}>
                    <Icon name="eye-open"/>
                    <span className="visually-hidden">view</span>
                  </a>
                  <span className="security-token" style={this.securityTokenStyle}>
                    {this.securityTokenCode}
                  </span>
                </div>
                {this.state.hasBeenValidated &&
                <>
                  {this.state.errors.emptyPassphrase &&
                  <div className="empty-passphrase error-message"><Trans>The passphrase should not be empty.</Trans></div>
                  }
                  {this.state.errors.invalidPassphrase &&
                  <div className="invalid-passphrase error-message"><Trans>The passphrase is invalid.</Trans></div>
                  }
                  {this.state.errors.invalidGpgKey &&
                  <div className="invalid-gpg-key error-message"><Trans>The private key is invalid.</Trans></div>
                  }
                </>
                }
              </div>
              {this.props.canRememberMe &&
                <div className="input checkbox">
                  <input
                    id="remember-me"
                    type="checkbox"
                    name="remember-me"
                    value={this.state.rememberMe}
                    onChange={this.handleToggleRememberMe}
                    disabled={!this.areActionsAllowed}/>
                  <label htmlFor="remember-me">
                    <Trans>Remember until signed out.</Trans>
                  </label>
                </div>
              }

              <div className="form-actions">
                <button
                  type="submit"
                  className={`button primary big full-width ${processingClassName}`}
                  role="button"
                  disabled={this.isProcessing}>
                  <Trans>Sign in</Trans>
                </button>
                <Link
                  to={{pathname: `${this.trustedDomain}/users/recover?locale=${this.props.context.locale}`}}
                  target="_parent"
                  rel="noopener noreferrer">
                  <Trans>Or switch to another account.</Trans>
                </Link>
              </div>
            </form>
          </div>
        }
      </>
    );
  }
}

Login.propTypes = {
  context: PropTypes.any, // The application context
  authenticationContext: PropTypes.any, // The authentication context
  canRememberMe: PropTypes.bool, // True if the remember me flag must be displayed
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};
export default withAppContext(withAuthenticationContext(withDialog(withTranslation('common')(Login))));
