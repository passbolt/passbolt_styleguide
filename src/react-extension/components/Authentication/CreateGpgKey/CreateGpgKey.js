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
import Icon from "../../../../react/components/Common/Icons/Icon";
import SecurityComplexity from "../../../lib/Secret/SecretComplexity";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";
import PropTypes from "prop-types";

/**
 * The component allows the user to create a Gpg key by automatic generation or by manually importing one
 */
class CreateGpgKey extends Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.createReferences();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      passphrase: '', // The current passphrase
      passphraseStrength: {  // The current passphrase strength
        id: '',
        label: ''
      },
      isObfuscated: true, // True if the paasphrase should not be visible
      errors: {}, // The list of errors
      actions: {
        processing: false // True if one's processing passphrase
      },
      hintClassNames: { // The class names for passphrase hints
        enoughLength: '',
        uppercase: '',
        alphanumeric: '',
        specialCharacters: ''
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
    const validation = {
      enoughLength:  this.state.passphrase.length >= 8
    };
    return Object.values(validation).every(value => value);
  }

  /**
   * Returns true if the component must be in a disabled mode
   */
  get mustBeDisabled() {
    return !this.isValid;
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Bind the event handlers
   */
  bindEventHandlers() {
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleToggleObfuscate = this.handleToggleObfuscate.bind(this);
    this.handleImportGpgKey = this.handleImportGpgKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create component element references
   */
  createReferences() {
    this.passphraseInput = React.createRef();
  }

  /**
   * Whenever the passphrase change
   * @param event The input event
   */
  handlePassphraseChange(event) {
    const passphrase = event.target.value;
    const passphraseStrength = this.evaluatePassphraseStrength(passphrase);
    const hintClassNames = this.evaluatePassphraseHintClassNames(passphrase);
    this.setState({passphrase, passphraseStrength, hintClassNames});
  }

  /**
   * Whenever one wants to toggle the obfusctated mode
   */
  handleToggleObfuscate() {
    this.toggleObfuscate();
  }

  /**
   * Whenever the user wants to import his gpg key manually
   */
  handleImportGpgKey() {
    this.importGpgKey();
  }

  /**
   * Whenever the user submits the passphrase
   * @param event A form submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.generateGpgKey();
  }

  /**
   * Returns the strength evaluation of the passphrase
   * @param passphrase The passphrase to evaluate
   */
  evaluatePassphraseStrength(passphrase) {
    return SecurityComplexity.getStrength(passphrase);
  }

  /**
   * Evaluate the passphrase hints classnames
   * @param passphrase The passphrase to evaluate
   */
  evaluatePassphraseHintClassNames(passphrase) {
    const masks = SecurityComplexity.matchMasks(passphrase);
    const hintClassName = condition => condition ? 'success' : 'error';
    return {
      enoughLength:  hintClassName(passphrase.length >= 8),
      uppercase: hintClassName(masks.uppercase),
      alphanumeric: hintClassName(masks.alpha && masks.digit),
      specialCharacters: hintClassName(masks.special)
    };
  }

  /**
   * Generate the Gpg key
   */
  async generateGpgKey() {
    await this.toggleProcessing();
    this.context.onGenerateGpgKeyRequested(this.state.passphrase)
      .catch(this.onGpgKeyGeneratedFailure.bind(this));
  }

  /**
   * Whenever the gpg key generation failed
   * @param error The error
   */
  onGpgKeyGeneratedFailure(error) {
    const ErrorDialogProps = {message: error.message};
    this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
  }

  /**
   * Request to import the gpg key
   */
  importGpgKey() {
    this.context.onGoToImportGpgKeyRequested();
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <div className="choose-passphrase">
        <h1>Please choose a password</h1>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <p className="message">
            This password is the only password you will need to remember from now on, choose wisely!
          </p>
          <div className="input text password required">
            {this.state.isObfuscated &&
              <input
                id="passphrase-input"
                type="password"
                ref={this.passphraseInput}
                value={this.state.passphrase}
                onChange={this.handlePassphraseChange}
                disabled={!this.areActionsAllowed}/>
            }
            {!this.state.isObfuscated &&
              <input
                id="passphrase-input"
                type="text"
                ref={this.passphraseInput}
                value={this.state.passphrase}
                onChange={this.handlePassphraseChange}
                disabled={!this.areActionsAllowed}/>
            }
            <a
              className="password-view button-icon button button-toggle"
              role="button"
              onClick={this.handleToggleObfuscate}>
              <Icon name="eye-open"/>
              <span className="visually-hidden">view</span>
            </a>
            <div className="password-complexity">
              <span className="progress">
                <span className={`progress-bar ${this.state.passphraseStrength.id}`}></span>
              </span>
            </div>
          </div>

          <div className="password-hints">
            <ul>
              <li className={this.state.hintClassNames.enoughLength}>
                It is at least 8 characters in length
              </li>
              <li className={this.state.hintClassNames.uppercase}>
                It contains lower and uppercase characters
              </li>
              <li className={this.state.hintClassNames.alphanumeric}>
                It contains letters and numbers
              </li>
              <li className={this.state.hintClassNames.specialCharacters}>
                It contains special characters (like / or * or %)
              </li>
            </ul>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big ${disabledClassName} ${processingClassName}`}
              role="button"
              disabled={this.mustBeDisabled || this.isProcessing}>
              Next
            </button>
            <a
              id="import-key-link"
              onClick={this.handleImportGpgKey}
              disabled={!this.areActionsAllowed}>
              I want to import an OpenPGP Key
            </a>
          </div>
        </form>
      </div>
    );
  }
}

CreateGpgKey.contextType = AuthenticationContext;
CreateGpgKey.propTypes = {
  dialogContext: PropTypes.any // The dialog context
};

export default withDialog(CreateGpgKey);
