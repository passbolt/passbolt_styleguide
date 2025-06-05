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
import {Trans, withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import Password from "../../../../shared/components/Password/Password";
import ExternalServiceUnavailableError from "../../../../shared/lib/Error/ExternalServiceUnavailableError";
import ExternalServiceError from "../../../../shared/lib/Error/ExternalServiceError";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import AppEmailValidatorService from "../../../../shared/services/validator/AppEmailValidatorService";
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import PasswordComplexityWithGoal from "../../../../shared/components/PasswordComplexityWithGoal/PasswordComplexityWithGoal";
import InfoSVG from "../../../../img/svg/info.svg";
import AttentionSVG from "../../../../img/svg/attention.svg";

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
      passphraseConfirmation: "",
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
  async componentDidMount() {
    await this.props.passwordPoliciesContext.findPolicies();
    this.initPwnedPasswordService();
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
    this.passphraseConfirmationInputRef = React.createRef();
  }

  /**
   * Initialize the pwned password service
   */
  initPwnedPasswordService() {
    const isPwnedServiceAvailable = this.props.passwordPoliciesContext.shouldRunDictionaryCheck();

    if (isPwnedServiceAvailable) {
      this.pownedService = new PownedService(this.props.context.port);
    }

    this.setState({isPwnedServiceAvailable});
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
    } else {
      this.setState({
        passphraseInDictionnary: false,
        passwordEntropy: null,
      });
    }
    if (this.state.hasAlreadyBeenValidated) {
      this.setState({
        passphraseInDictionnary: false,
      });
      this.validatePassphraseInput();
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
   * @return {boolean}
   */
  validatePassphraseInput() {
    return !this.hasAnyErrors();
  }

  /**
   * Validates the passphrase confirmation input.
   * @returns {boolean}
   */
  validatePassphraseConfirmationInput() {
    return !this.isEmptyPasswordConfirmation() && !this.isPassphraseAndConfirmationDifferent();
  }

  /**
   * Checks if the current passphrase has strong enough entropy.
   *
   * @returns {boolean} True if the passphrase has strong enough entropy, false otherwise.
   */
  hasWeakPassword() {
    return !this.isMinimumRequiredEntropyReached(this.state.passphraseEntropy);
  }

  /**
   * Returns true if the passphrase confirmation is empty
   * @returns {boolean}
   */
  isEmptyPasswordConfirmation() {
    return !this.state.passphraseConfirmation.length;
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
   * Returns true if the passphrase is different than the passphraseConfirmation and is not empty.
   * False is returned when passphraseConfirmation is empty to avoid conflict with the `isEmptyPasswordConfirmation` validation rule
   * @returns {boolean}
   */
  isPassphraseAndConfirmationDifferent() {
    if (this.isEmptyPasswordConfirmation()) {
      return false;
    }

    return this.state.passphrase !== this.state.passphraseConfirmation;
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @param {string} passphrase the passphrase to evaluate
   * @return {Promise<boolean>}
   */
  async evaluatePassphraseIsInDictionary(passphrase) {
    let isPwnedServiceAvailable = this.state.isPwnedServiceAvailable;
    if (!isPwnedServiceAvailable || !this.pownedService) {
      return false;
    }

    let passphraseInDictionnary = false;

    try {
      const result =  await this.pownedService.evaluateSecret(passphrase);
      //we ensure after the resolution of the deobunced promise that the passphrase is not empty and the minimum entropy is still reached so we do not display the 'in dictionary' warning message when not relevant
      passphraseInDictionnary = this.state.passphrase && result.inDictionary && this.isMinimumRequiredEntropyReached(this.state.passphraseEntropy);
      isPwnedServiceAvailable = result.isPwnedServiceAvailable;
    } catch (error) {
      // If the service is unavailable don't block the user journey.
      if (error instanceof ExternalServiceUnavailableError || error instanceof ExternalServiceError) {
        isPwnedServiceAvailable = false;
        passphraseInDictionnary = false;
      } else {
        throw error;
      }
    }

    this.setState({
      isPwnedServiceAvailable,
      passphraseInDictionnary,
    });

    return passphraseInDictionnary;
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
    } else if (!this.validatePassphraseConfirmationInput()) {
      this.passphraseConfirmationInputRef.current.focus();
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

    await this.save();
  }

  /**
   * Check if we have any errors
   * @return {Boolean}
   */
  hasAnyErrors() {
    const validations = [
      this.isEmptyPassword(),
      this.state.passphraseInDictionnary,
    ];
    validations.push(this.hasWeakPassword());
    validations.push(!this.pownedService && this.state.passphrase.length < 8);
    return validations.includes(true);
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

    //the form is valid, check if passphrase is pwned
    const isPassphrasePwned = await this.evaluatePassphraseIsInDictionary(this.state.passphrase);
    if (isPassphrasePwned) {
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
    const isPassphraseValid = this.validatePassphraseInput();
    const isPassphraseConfirmationValid = this.validatePassphraseConfirmationInput();

    return isNameValid && isEmailValid && isPassphraseValid && isPassphraseConfirmationValid;
  }

  /**
   * Generate an ORK with the current configuration set.
   * @returns {Promise<Object>}
   */
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
   * Returns true if the given entropy is greater or equal to the minimum required entropy.
   * @param {number} passphraseEntropy
   * @returns {boolean}
   */
  isMinimumRequiredEntropyReached(passphraseEntropy) {
    return passphraseEntropy >= FAIR_STRENGTH_ENTROPY;
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
    const passphraseEntropy = this.state.passphraseInDictionnary  ? 0 : this.state.passphraseEntropy;

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
                <InfoSVG/>
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
                <InfoSVG/>
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
                <AttentionSVG className="attention-required"/>
              }
            </label>
            <Password id="generate-organization-key-form-password" name="password"
              placeholder={this.translate("Passphrase")} autoComplete="new-password" preview={true}
              securityToken={this.props.context.userSettings.getSecurityToken()}
              value={this.state.passphrase}
              onChange={this.handlePassphraseChange} disabled={this.hasAllInputDisabled()}
              inputRef={this.passphraseInputRef}/>
            <PasswordComplexityWithGoal entropy={passphraseEntropy} targetEntropy={FAIR_STRENGTH_ENTROPY}/>
            {this.state.hasAlreadyBeenValidated &&
              <div className="password error-message">
                {this.isEmptyPassword() &&
                  <div className="empty-passphrase error-message"><Trans>A passphrase is required.</Trans></div>
                }
                {this.hasWeakPassword() && passphraseEntropy > 0 &&
                  <div className="invalid-passphrase error-message"><Trans>A strong passphrase is required. The minimum complexity must be &#39;fair&#39;.</Trans></div>
                }
                {this.state.passphraseInDictionnary && passphraseEntropy === 0 && !this.isEmptyPassword() &&
                  <div className="invalid-passphrase error-message"><Trans>The passphrase should not be part of an exposed data breach.</Trans></div>
                }
              </div>
            }
          </div>

          <div className={`input-password-wrapper input required ${this.state.hasAlreadyBeenValidated && !this.validatePassphraseConfirmationInput() ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-password">
              <Trans>Organization key passphrase confirmation</Trans>
            </label>
            <Password id="generate-organization-key-form-password-confirmation" name="passphraseConfirmation"
              placeholder={this.translate("Passphrase confirmation")} autoComplete="new-password" preview={true}
              securityToken={this.props.context.userSettings.getSecurityToken()}
              value={this.state.passphraseConfirmation}
              onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}
              inputRef={this.passphraseConfirmationInputRef}/>
            {this.state.hasAlreadyBeenValidated &&
                <div className="password-confirmation error-message">
                  {this.isEmptyPasswordConfirmation() &&
                    <div className="empty-passphrase-confirmation error-message"><Trans>The passphrase confirmation is required.</Trans></div>
                  }
                  {this.isPassphraseAndConfirmationDifferent() &&
                    <div className="invalid-passphrase-confirmation error-message"><Trans>The passphrase confirmation should match the passphrase</Trans></div>
                  }
                </div>
            }
          </div>
          <div className="warning message no-margin" id="generate-organization-key-setting-overridden-banner">
            <p>
              <Trans>Warning, we encourage you to generate your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.</Trans>
            </p>
          </div>
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
  passwordPoliciesContext: PropTypes.object, // The password policy context
};

export default withAppContext(withDialog(withPasswordPolicies(withTranslation('common')(GenerateOrganizationKey))));
