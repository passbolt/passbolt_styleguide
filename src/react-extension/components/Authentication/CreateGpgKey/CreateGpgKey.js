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
import PropTypes from "prop-types";
import debounce from "debounce-promise";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../Common/Icons/Icon";
import SecurityComplexity from "../../../../shared/lib/Secret/SecretComplexity";
import SecretComplexity from "../../../../shared/lib/Secret/SecretComplexity";

/**
 * The component display variations.
 * @type {Object}
 */
export const CreateGpgKeyVariation = {
  SETUP: 'Setup',
  GENERATE_ACCOUNT_RECOVERY_GPG_KEY: 'Account recovery request key'
};

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
    this.evaluatePassphraseIsInDictionaryDebounce = debounce(this.evaluatePassphraseIsInDictionary, 300);
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
        specialCharacters: '',
        notInDictionary: ''
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
      enoughLength: this.state.hintClassNames.enoughLength === "success",
      enoughStrength: this.state.passphraseStrength.id !== "n/a",
      notInDictionary: this.state.hintClassNames.notInDictionary === "success"
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
  async handlePassphraseChange(event) {
    const passphrase = event.target.value;
    await this.setState({passphrase});
    const passphraseStrength = this.evaluatePassphraseStrength(passphrase);
    const hintClassNames = this.evaluatePassphraseHintClassNames(passphrase);
    this.setState({passphraseStrength, hintClassNames});
    await this.checkPassphraseIsInDictionary(passphrase, hintClassNames);
  }

  /**
   * check if the passphrase is in dictionary
   * @returns {Promise<void>}
   */
  async checkPassphraseIsInDictionary() {
    const hintClassName = condition => condition ? 'success' : 'error';

    // debounce only to check the passphrase is in dictionary
    const isPwned = await this.evaluatePassphraseIsInDictionaryDebounce(this.state.passphrase).catch(() => null);
    const notInDictionary = isPwned !== null ? hintClassName(!isPwned) : null;

    // if the passphrase is in dictionary, force the complexity to n/a
    const passphraseStrength = {...this.state.passphraseStrength};
    passphraseStrength.id = isPwned ? 'n/a' : this.state.passphraseStrength.id;

    this.setState({
      hintClassNames: {
        ...this.state.hintClassNames,
        notInDictionary
      },
      passphraseStrength
    });
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
      specialCharacters: hintClassName(masks.special),
      notInDictionary: this.state.hintClassNames.notInDictionary || 'error'
    };
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @param passphrase The passphrase to evaluate
   * @return {Promise<boolean>} Return true if the password is part of a dictionary, false otherwise
   */
  async evaluatePassphraseIsInDictionary(passphrase) {
    if (passphrase.length >= 8) {
      return SecretComplexity.ispwned(passphrase);
    }
    return true;
  }

  /**
   * Generate the Gpg key
   */
  async generateGpgKey() {
    await this.toggleProcessing();
    this.props.onComplete(this.state.passphrase);
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
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <div className="create-gpg-key">
        <h1>
          {this.props.displayAs === CreateGpgKeyVariation.SETUP &&
          <Trans>Welcome to Passbolt, please select a passphrase!</Trans>
          }
          {this.props.displayAs === CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY &&
          <Trans>Choose a new passphrase.</Trans>
          }
        </h1>
        <form acceptCharset="utf-8" onSubmit={this.handleSubmit} className="enter-passphrase">
          <p>
            <Trans>This passphrase is the only passphrase you will need to remember from now on, choose wisely!</Trans>
          </p>
          <div className="input text password required">
            <input
              id="passphrase-input"
              type={this.state.isObfuscated ? "password" : "text"}
              ref={this.passphraseInput}
              value={this.state.passphrase}
              onChange={this.handlePassphraseChange}
              disabled={!this.areActionsAllowed}
              autoFocus={true}
              autoComplete="off"/>
            <a
              className={`password-view button-icon button button-toggle ${this.state.isObfuscated ? "" : "selected"}`}
              role="button"
              onClick={this.handleToggleObfuscate}>
              <Icon name="eye-open"/>
              <span className="visually-hidden">view</span>
            </a>
            <div className="password-complexity">
              <span className="progress">
                <span className={`progress-bar ${this.state.passphraseStrength.id}`}/>
              </span>
            </div>
          </div>

          <div className="password-hints">
            <ul>
              <li className={this.state.hintClassNames.enoughLength}>
                <Trans>It is at least 8 characters in length</Trans>
              </li>
              <li className={this.state.hintClassNames.uppercase}>
                <Trans>It contains lower and uppercase characters</Trans>
              </li>
              <li className={this.state.hintClassNames.alphanumeric}>
                <Trans>It contains letters and numbers</Trans>
              </li>
              <li className={this.state.hintClassNames.specialCharacters}>
                <Trans>It contains special characters (like / or * or %)</Trans>
              </li>
              <li className={this.state.hintClassNames.notInDictionary}>
                <Trans>It is not part of an exposed data breaches</Trans>
              </li>
            </ul>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${disabledClassName} ${processingClassName}`}
              role="button"
              disabled={this.mustBeDisabled || this.isProcessing}>
              <Trans>Next</Trans>
            </button>
            {this.props.onSecondaryActionClick &&
            <a onClick={this.props.onSecondaryActionClick}>
              {{
                [CreateGpgKeyVariation.SETUP]: <Trans>Or use an existing private key.</Trans>,
              }[this.props.displayAs]}
            </a>
            }
          </div>
        </form>
      </div>
    );
  }
}

CreateGpgKey.defaultProps = {
  displayAs: CreateGpgKeyVariation.SETUP,
};

CreateGpgKey.propTypes = {
  onComplete: PropTypes.func.isRequired, // The callback function to call when the form is submitted
  displayAs: PropTypes.PropTypes.oneOf([
    CreateGpgKeyVariation.SETUP,
    CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY
  ]), // Defines how the form should be displayed and behaves
  onSecondaryActionClick: PropTypes.func, // Callback to trigger when the user clicks on the secondary action link.
  t: PropTypes.func.isRequired, // The translation function
};

export default withTranslation('common')(CreateGpgKey);
