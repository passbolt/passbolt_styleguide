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
import XRegExp from "xregexp";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withAppContext} from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";

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
      password: "",
      passwordError: "",
      passwordWarning: "",
      hasAlreadyBeenValidated: false // True if the form has already been submitted once
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handleEmailInputKeyUp = this.handleEmailInputKeyUp.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
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
    } else if (!this.isEmail(email)) {
      emailError = this.translate("Please enter a valid email address.");
    }
    this.setState({email, emailError});
    return emailError === null;
  }

  /**
   * Check that a given string is a valid email
   * @param {string} email the email to test
   */
  isEmail(email) {
    const hostnameRegexp = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
    const emailRegexp = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${hostnameRegexp}$`;
    const xregexp = XRegExp(emailRegexp);
    return xregexp.test(email);
  }

  /**
   * Handle password input keyUp event.
   */
  handlePasswordInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      this.validatePasswordInput();
    } else {
      const hasResourcePasswordMaxLength = this.state.password.length >= RESOURCE_PASSWORD_MAX_LENGTH;
      const warningMessage = this.translate("Warning: this is the maximum size for this field, make sure your data was not truncated");
      const passwordWarning = hasResourcePasswordMaxLength ? warningMessage : '';
      this.setState({passwordWarning});
    }
  }

  /**
   * Validate the password input.
   * @return {Promise}
   */
  validatePasswordInput() {
    const password = this.state.password;
    let passwordError = null;
    if (!password.length) {
      passwordError = this.translate("A passphrase is required.");
    }

    if (SecretGenerator.entropy(this.state.password) < FAIR_STRENGTH_ENTROPY) {
      passwordError = this.translate(`A strong passphrase is required. The minimum complexity must be 'fair'`);
    }

    this.setState({passwordError});
    return passwordError === null;
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
    } else if (this.state.passwordError) {
      this.passwordInputRef.current.focus();
    }
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.save();
    }
  }

  /**
   * Save the changes.
   */
  async save() {
    this.setState({hasAlreadyBeenValidated: true});
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
    // Reset the form errors.
    this.setState({
      nameError: "",
      emailError: "",
      passwordError: "",
    });

    // Validate the form inputs.
    const isNameValid = this.validateNameInput();
    const isEmailValid = this.validateEmailInput();
    const isPasswordValid = this.validatePasswordInput();

    return isNameValid && isEmailValid && isPasswordValid;
  }

  async generateKey() {
    const generateGpgKeyDto = {
      name: this.state.name,
      email: this.state.email,
      algorithm: this.state.algorithm,
      keySize: this.state.keySize,
      passphrase: this.state.password,
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    const passwordEntropy = SecretGenerator.entropy(this.state.password);
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
          <div className="input select">
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
          <div className="input select">
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
          <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-password"><Trans>Organization key passphrase</Trans></label>
            <Password id="generate-organization-key-form-password" name="password"
              placeholder={this.translate("Passphrase")} autoComplete="new-password" preview={true}
              securityToken={this.props.context.userSettings.getSecurityToken()}
              onKeyUp={this.handlePasswordInputKeyUp} value={this.state.password}
              onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}
              inputRef={this.passwordInputRef}/>
            <PasswordComplexity entropy={passwordEntropy} error={Boolean(this.state.passwordError)}/>
            {this.state.passwordError &&
                <div className="password error-message">{this.state.passwordError}</div>
            }
            {this.state.passwordWarning &&
                <div className="password warning message">{this.state.passwordWarning}</div>
            }
          </div>
        </div>
        {!this.state.hasAlreadyBeenValidated &&
          <div className="warning message" id="generate-organization-key-setting-overridden-banner">
            <p>
              <Trans>Warning, we encourage you to generate your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.</Trans>
            </p>
          </div>
        }
        <div className="submit-wrapper clearfix">
          <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Generate & Apply")} />
          <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.onClose} />
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
