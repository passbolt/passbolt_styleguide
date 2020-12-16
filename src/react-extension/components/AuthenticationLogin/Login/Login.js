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
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import PropTypes from "prop-types";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import UserAvatar from "../../../../react/components/Common/Avatar/UserAvatar";
import {Link} from "react-router-dom";

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
      rememberMe: false, // The remember passphrase flag
      actions: {
        processing: false // True if one's processing passphrase
      },
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
   */
  get isReady() {
    return Boolean(this.context.loginInfo);
  }

  /**
   * Returns true if the user can perform actions on the component
   */
  get areActionsAllowed() {
    return !this.state.actions.processing;
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    return Object.values(this.state.errors).every(value => !value);
  }


  /**
   * Returns true if the component must be in a disabled mode
   */
  get mustBeDisabled() {
    return this.state.hasBeenValidated && !this.isValid;
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns the user full name
   */
  get fullname() {
    return this.context.loginInfo.userSettings.fullName;
  }

  /**
   * Returns the username
   */
  get username() {
    return this.context.loginInfo.userSettings.username;
  }

  /**
   * Returns the security token code of the suer
   */
  get securityTokenCode() {
    return this.context.loginInfo.userSettings.getSecurityTokenCode();
  }

  /**
   * Returns the style of the security token (color and text color)
   */
  get securityTokenStyle() {
    return {
      backgroundColor: this.context.loginInfo.userSettings.getSecurityTokenBackgroundColor(),
      color: this.context.loginInfo.userSettings.getSecurityTokenTextColor()
    };
  }

  /**
   * Returns the trusted domain
   */
  get trustedDomain() {
    return this.context.loginInfo.userSettings.getTrustedDomain();
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassphrase = this.handleChangePassphrase.bind(this);
    this.handleToggleRememberMe = this.handleToggleRememberMe.bind(this);
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
   * Whenever the user tosggles the remember me flag
   */
  async handleToggleRememberMe() {
    await this.toggleRemmemberMe();
  }

  /**
   * Whenever the user needs help because he lost his passphrase
   */
  async onPassphraseLost() {
    await this.context.onPassphraseLost();
  }

  /**
   * Check the private gpg key passphrase
   */
  async check() {
    await this.context.onCheckLoginPassphraseRequested(this.state.passphrase)
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
      this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
    }
    return Promise.reject(error);
  }

  /**
   * Logs the user
   * @returns {Promise<void>}
   */
  async login() {
    await this.context.onLoginRequested(this.state.passphrase, this.state.rememberMe);
  }

  /**
   * Whenever the login failed
   * @param error The error
   */
  onLoginFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
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
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <>
        {this.isReady &&
          <div className="login">
            <div className="login-user">
              <UserAvatar
                baseUrl={this.trustedDomain}/>
              <p className="login-user-name">{this.fullname}</p>
              <p className="login-user-email">{this.username}</p>
            </div>

            <form
              acceptCharset="utf-8"
              onSubmit={this.handleSubmit}>
              <div className="input text required">
                <label htmlFor="passphrase">
                  Passphrase
                </label>
                <div className="login-passphrase">
                  <input
                    id="passphrase"
                    ref={this.passphraseInputRef}
                    type="password"
                    name="passphrase"
                    className="login-passphrase-input"
                    value={this.state.passphrase}
                    onChange={this.handleChangePassphrase}
                    disabled={!this.areActionsAllowed}/>
                  <span
                    className="login-passphrase-security-token"
                    style={this.securityTokenStyle}>
                    {this.securityTokenCode}
                  </span>
                </div>
              </div>
              <div className="input checkbox">
                <input
                  id="remember-me"
                  type="checkbox"
                  name="remember-me"
                  value={this.state.rememberMe}
                  onChange={this.handleToggleRememberMe}
                  disabled={!this.areActionsAllowed}/>
                <label htmlFor="remember-me">
                  Remember until I logout.
                </label>
              </div>
              {this.state.hasBeenValidated &&
              <>
                <br/>
                {this.state.errors.emptyPassphrase &&
                <div className="empty-passphrase error message">The passphrase should not be empty</div>
                }
                {this.state.errors.invalidPassphrase &&
                <div className="invalid-passphrase error message">The passphrase is invalid </div>
                }
                {this.state.errors.invalidGpgKey &&
                <div className="invalid-gpg-key error message">The private key is invalid </div>
                }
              </>
              }
              <div className="form-actions">
                <button
                  type="submit"
                  className={`button primary big ${disabledClassName} ${processingClassName}`}
                  role="button"
                  disabled={this.mustBeDisabled || this.isProcessing}>
                  Login
                </button>
                <Link
                  to={{pathname: `${this.trustedDomain}/users/recover`}}
                  target="_parent">
                  Or recover another account.
                </Link>
              </div>
            </form>
          </div>
        }
      </>
    );
  }
}

Login.contextType = AuthenticationContext;
Login.propTypes = {
  dialogContext: PropTypes.any // The dialog context
};
export default withDialog(Login);
