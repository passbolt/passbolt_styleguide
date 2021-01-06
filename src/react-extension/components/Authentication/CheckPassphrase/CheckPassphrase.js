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

/**
 * This component checks the passphrase of an user gpg key
 */
class CheckPassphrase extends Component {
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
      }
    };
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
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.actions.processing;
  }


  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.focusOnPassphrase();
  }


  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassphrase = this.handleChangePassphrase.bind(this);
    this.handleToggleRememberMe = this.handleToggleRememberMe.bind(this);
    this.onPassphraseLost = this.onPassphraseLost.bind(this);
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
      await this.check();
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
   * Whenever the user toggles the remember me flag
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
    await this.context.onCheckImportedGpgKeyPassphraseRequested(this.state.passphrase, this.state.rememberMe)
      .catch(this.onCheckFailure.bind(this));
  }

  /**
   * Whenever the gpg key import failed
   * @param error The error
   */
  onCheckFailure(error) {
    // Whenever the passphrase is invalid.
    this.toggleProcessing();
    if (error.name === "InvalidMasterPasswordError") {
      this.setState({errors: {invalidPassphrase: true}});
    } else {
      const ErrorDialogProps = {message: error.message};
      this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
    }
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
    const emptyPassphrase = passphrase.trim() === '';
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
    await this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInputRef.current.focus();
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    return (
      <div className="enter-passphrase">
        <h1>Please enter your passphrase to continue.</h1>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className="input text required">
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              ref={this.passphraseInputRef}
              type="password"
              name="passphrase"
              value={this.state.passphrase}
              onChange={this.handleChangePassphrase}
              disabled={!this.areActionsAllowed}/>
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
                Remember until I logout.
              </label>
            </div>
          }
          {this.state.hasBeenValidated &&
            <>
              <br/>
              {this.state.errors.emptyPassphrase &&
              <div className="empty-passphrase error message">The passphrase should not be empty.</div>
              }
              {this.state.errors.invalidPassphrase &&
              <div className="invalid-passphrase error message">The passphrase is invalid.</div>
              }
            </>
          }
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big ${processingClassName}`}
              role="button"
              disabled={this.isProcessing}>
              Verify
            </button>
            {this.props.secondaryAction}
          </div>
        </form>
      </div>
    );
  }
}

CheckPassphrase.contextType = AuthenticationContext;
CheckPassphrase.propTypes = {
  canRememberMe: PropTypes.bool, // True if the remember me flag must be displayed
  dialogContext: PropTypes.any, // The dialog context
  secondaryAction: PropTypes.any // Secondary action to display
};
export default withDialog(CheckPassphrase);
