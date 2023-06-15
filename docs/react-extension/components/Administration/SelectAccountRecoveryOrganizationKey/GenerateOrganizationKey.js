/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import debounce from "debounce-promise";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import ExternalServiceUnavailableError from "../../../../shared/lib/Error/ExternalServiceUnavailableError";
import ExternalServiceError from "../../../../shared/lib/Error/ExternalServiceError";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import AppEmailValidatorService from "../../../../shared/services/validator/AppEmailValidatorService";

/** Resource password max length */
const RESOURCE_PASSWORD_MAX_LENGTH = 4096;
const FAIR_STRENGTH_ENTROPY = 80;

/**
 * This component allows to display the generate organization key for the administration
 */
class GenerateOrganizationKey extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.isPwndProcessingPromise = null;
    this.evaluatePassphraseIsInDictionaryDebounce = debounce(this.evaluatePassphraseIsInDictionary, 300);
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      algorithm: "RSA",
      keySize: 4096,
      passphrase: "",
      passphraseWarning: "",
      passphraseEntropy: null,
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPwnedServiceAvailable: true, // True if the isPwned service can be reached
      passphraseInDictionnary: false, // True if the passphrase is into a dictionnary
    };
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.pownedService = new PownedService(this.props.context.port);
  }
  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handleEmailInputKeyUp = this.handleEmailInputKeyUp.bind(this);
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.emailInputRef = React.createRef();
    this.passphraseInputRef = React.createRef();
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      this.validateNameInput();
    }
  }

  /**
   * Validate the name input.
   * @return {Promise}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = null;
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }
    this.setState({nameError});
    return nameError === null;
  }

  /**
   * Handle email input keyUp event.
   */
  handleEmailInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      this.validateEmailInput();
    }
  }

  /**
   * Validate the email input.
   * @returns {Promise<void>}
   */
  validateEmailInput() {
    let emailError = null;
    const email = this.state.email.trim();
    if (!email.length) {
      emailError = this.translate("An email is required.");
    } else if (!AppEmailValidatorService.validate(email, this.props.context.siteSettings)) {
      emailError = this.translate("Please enter a valid email address.");
    }
    this.setState({email, emailError});
    return emailError === null;
  }

  /**
   * Handle passphrase input keyUp event.
   * @param {ReactEvent} event The react event.
   */
  async handlePassphraseChange(event) {
    const passphrase = event.target.value;
    this.setState({passphrase}, () => this.checkPassphraseValidity());
  }


  /**
   * Validate the passphrase for powned password or validation entropy.
   * @return {Promise<boolean>}
   */
  async checkPassphraseValidity() {
    let passphraseEntropy = null;

    if (this.state.passphrase.length > 0) {
      passphraseEntropy = SecretGenerator.entropy(this.state.passphrase);
      this.isPwndProcessingPromise = this.evaluatePassphraseIsInDictionaryDebounce();
    } else {
      this.setState({
        passphraseInDictionnary: false,
        passwordEntropy: null,
      });
    }
    if (this.state.hasAlreadyBeenValidated) {
      await this.validatePassphraseInput();
    } else {
      const hasResourcePassphraseMaxLength = this.state.passphrase.length >= RESOURCE_PASSWORD_MAX_LENGTH;
      const warningMessage = this.translate("this is the maximum size for this field, make sure your data was not truncated");
      const passphraseWarning = hasResourcePassphraseMaxLength ? warningMessage : '';
      this.setState({passphraseWarning});
    }
    this.setState({passphraseEntropy});
  }

  /**
   * Validate the passphrase.
   * @param {string} passphrase the passphrase to validate
   * @param {integer|null} passphraseEntropy the entropy of the given passphrase
   * @return {Promise<boolean>}
   */
  async validatePassphraseInput() {
    return !this.hasAnyErrors();
  }

  /**
   * Checks if the current passphrase has strong enough entropy.
   *
   * @returns {boolean} True if the passphrase has strong enough entropy, false otherwise.
   */
  hasStrongPassword() {
    return this.state.passphraseEntropy < FAIR_STRENGTH_ENTROPY;
  }

  /**
   * Checks if the current passphrase is empty.
   *
   * @returns {boolean} True if the passphrase is empty, false otherwise.
   */
  isEmptyPassword() {
    return !this.state.passphrase.length;
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @return {Promise<boolean>} Returns true if the passphrase is part of a dictionary, false otherwise
   */
  async evaluatePassphraseIsInDictionary() {
    if (!this.state.isPwnedServiceAvailable) {
      return false;
    }

    let isPwned;
    try {
      const result =  await this.pownedService.evaluateSecret(this.state.passphrase);
      isPwned = result.inDictionary;
      this.setState({
        isPwnedServiceAvailable: result.isPwnedServiceAvailable
      });
      this.setState({passphraseInDictionnary: isPwned && !this.isEmptyPassword()});
    } catch (error) {
      // If the service is unavailable don't block the user journey.
      if (error instanceof ExternalServiceUnavailableError || error instanceof ExternalServiceError) {
        this.setState({
          isPwnedServiceAvailable: false
        });
        this.setState({passphraseInDictionnary: false});
        return false;
      } else {
        throw error;
      }
    }

    return isPwned;
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    this.focusFirstFieldError();
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    } else if (this.state.emailError) {
      this.emailInputRef.current.focus();
    } else if (this.hasAnyErrors()) {
      this.passphraseInputRef.current.focus();
    }
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.processing) {
      return;
    }
    this.setState({hasAlreadyBeenValidated: true});

    await this.isPwndProcessingPromise;
    if (this.state.passphraseInDictionnary) {
      return;
    }

    await this.save();
  }

  /**
   * Check if we have any errors
   * @return {Boolean}
   */
  hasAnyErrors() {
    return this.isEmptyPassword() || this.hasStrongPassword() || this.state.passphraseInDictionnary;
  }

  /**
   * Save the changes.
   */
  async save() {
    this.toggleProcessing();

    if (!await this.validate()) {
      this.handleValidateError();
      this.toggleProcessing();
      return;
    }

    const key = await this.generateKey();
    this.props.onUpdateOrganizationKey(key.public_key.armored_key, key.private_key.armored_key);
  }

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Validate the form inputs.
    const isNameValid = this.validateNameInput();
    const isEmailValid = this.validateEmailInput();
    const isPassphraseValid = await this.validatePassphraseInput();

    return isNameValid && isEmailValid && isPassphraseValid;
  }

  async generateKey() {
    const generateGpgKeyDto = {
      name: this.state.name,
      email: this.state.email,
      algorithm: this.state.algorithm,
      keySize: this.state.keySize,
      passphrase: this.state.passphrase,
    };

    return await this.props.context.port.request("passbolt.account-recovery.generate-organization-key", generateGpgKeyDto);
  }

  /**
   * Toggle the processing mode
   */
  toggleProcessing() {
    this.setState({processing: !this.state.processing});
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * check if passphrase has warnings to display
   * @returns {function(...[*]=)}
   */
  get isPassphraseWarning() {
    return this.state.passphrase?.length > 0 && !this.state.hasAlreadyBeenValidated &&
    (!this.state.isPwnedServiceAvailable || this.state.passphraseInDictionnary);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const passphraseEntropy = this.state.passphraseInDictionnary ? 0 : this.state.passphraseEntropy;

    return (
      <form onSubmit={this.handleFormSubmit} noValidate>
        <div className="form-content generate-organization-key">
          <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-name"><Trans>Name</Trans></label>
            <input id="generate-organization-key-form-name" name="name" type="text" value={this.state.name}
              onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} ref={this.nameInputRef} className="required fluid" maxLength="64"
              required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")} />
            {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
            }
          </div>
          <div className={`input text required ${this.state.emailError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-email"><Trans>Email</Trans></label>
            <input id="generate-organization-key-form-email" name="email" ref={this.emailInputRef} className="required fluid" maxLength="64" type="email"
              autoComplete="off" value={this.state.email} onChange={this.handleInputChange} placeholder={this.translate("Email Address")}
              onKeyUp={this.handleEmailInputKeyUp} disabled={this.hasAllInputDisabled()} required="required"/>
            {this.state.emailError &&
              <div className="email error-message">{this.state.emailError}</div>
            }
          </div>
          <div className="input select-wrapper">
            <label htmlFor="generate-organization-key-form-algorithm">
              <Trans>Algorithm</Trans>
              <Tooltip message={this.translate("Algorithm and key size cannot be changed at the moment. These are secure default")}>
                <Icon name="info-circle"/>
              </Tooltip>
            </label>
            <input id="generate-organization-key-form-algorithm" name="algorithm" value={this.state.algorithm}
              className="fluid" type="text"
              autoComplete="off" disabled={true} />
          </div>
          <div className="input select-wrapper">
            <label htmlFor="generate-organization-key-form-keySize">
              <Trans>Key Size</Trans>
              <Tooltip message={this.translate("Algorithm and key size cannot be changed at the moment. These are secure default")}>
                <Icon name="info-circle"/>
              </Tooltip>
            </label>
            <input id="generate-organization-key-form-key-size" name="keySize" value={this.state.keySize}
              className="fluid" type="text"
              autoComplete="off" disabled={true} />
          </div>
          <div className={`input-password-wrapper input required ${this.hasAnyErrors() && this.state.hasAlreadyBeenValidated ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-password">
              <Trans>Organization key passphrase</Trans>
              {this.isPassphraseWarning &&
                <Icon name="exclamation"/>
              }
            </label>
            <Password id="generate-organization-key-form-password" name="password"
              placeholder={this.translate("Passphrase")} autoComplete="new-password" preview={true}
              securityToken={this.props.context.userSettings.getSecurityToken()}
              value={this.state.passphrase}
              onChange={this.handlePassphraseChange} disabled={this.hasAllInputDisabled()}
              inputRef={this.passphraseInputRef}/>
            <PasswordComplexity entropy={passphraseEntropy}/>
            {this.state.hasAlreadyBeenValidated &&
              <div className="password error-message">
                {this.isEmptyPassword() &&
                  <div className="empty-passphrase error-message"><Trans>A passphrase is required.</Trans></div>
                }
                {this.hasStrongPassword() && passphraseEntropy > 0 &&
                  <div className="invalid-passphrase error-message"><Trans>A strong passphrase is required. The minimum complexity must be &#39;fair&#39;.</Trans></div>
                }
                {this.state.passphraseInDictionnary && passphraseEntropy === 0 && !this.isEmptyPassword() &&
                  <div className="invalid-passphrase error-message"><Trans>The passphrase should not be part of an exposed data breach.</Trans></div>
                }
              </div>
            }
            {this.state.passphrase?.length > 0 && !this.state.hasAlreadyBeenValidated &&
                <>
                  {!this.state.isPwnedServiceAvailable &&
                    <div className="password warning-message"><Trans>The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach.</Trans></div>
                  }
                  {this.state.passphraseInDictionnary &&
                    <div className="password warning-message"><Trans>The passphrase is part of an exposed data breach.</Trans></div>
                  }
                </>
            }
            {!this.state.isPwnedServiceAvailable &&
              <div className="password warning-message"><strong><Trans>Warning:</Trans></strong> <Trans>The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach.</Trans></div>
            }
          </div>
        </div>
        <div className="warning message" id="generate-organization-key-setting-overridden-banner">
          <p>
            <Trans>Warning, we encourage you to generate your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.</Trans>
          </p>
        </div>
        <div className="submit-wrapper clearfix">
          <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.onClose} />
          <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Generate & Apply")} />
        </div>
      </form>
    );
  }
}

GenerateOrganizationKey.propTypes = {
  context: PropTypes.any, // The application context
  onUpdateOrganizationKey: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withTranslation('common')(GenerateOrganizationKey)));
