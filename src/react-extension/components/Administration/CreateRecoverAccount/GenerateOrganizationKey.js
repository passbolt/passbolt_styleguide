/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {SecretGeneratorComplexity} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import {withAppContext} from "../../../contexts/AppContext";

/** Resource password max length */
const RESOURCE_PASSWORD_MAX_LENGTH = 4096;

/**
 * This component allows to display the generate organization key for the administration
 */
class ImportOrganizationKey extends React.Component {
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
      keySize: "4080",
      password: "",
      passwordError: "",
      passwordWarning: "",
      passphraseStyle: {
        background: "",
        color: ""
      },
      securityTokenStyle: {
        background: this.props.context.userSettings.getSecurityTokenBackgroundColor(),
        color: this.props.context.userSettings.getSecurityTokenTextColor(),
      },
      viewPassword: false,
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
    this.handlePasswordInputFocus = this.handlePasswordInputFocus.bind(this);
    this.handlePasswordInputBlur = this.handlePasswordInputBlur.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
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
      const state = this.validateNameInput();
      this.setState(state);
    }
  }

  /**
   * Validate the name input.
   * @return {Promise}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = "";
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }

    return new Promise(resolve => {
      this.setState({nameError: nameError}, resolve);
    });
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
   * Handle email input keyUp event.
   */
  handleEmailInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateNameInput();
      this.setState(state);
    }
  }

  /**
   * Validate the email input.
   * @returns {Promise<void>}
   */
  async validateEmailInput() {
    let emailError = null;
    const email = this.state.email.trim();
    if (!email.length) {
      emailError = this.translate("A username is required.");
    } else if (!this.isEmail(email)) {
      emailError = this.translate("Please enter a valid email address.");
    }
    return this.setState({email, emailError});
  }

  /**
   * Handle password input keyUp event.
   */
  handlePasswordInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validatePasswordInput();
      this.setState(state);
    } else {
      const hasResourcePasswordMaxLength = this.state.password.length >= RESOURCE_PASSWORD_MAX_LENGTH;
      const warningMessage = this.translate("Warning: this is the maximum size for this field, make sure your data was not truncated");
      const passwordWarning = hasResourcePasswordMaxLength ? warningMessage : '';
      this.setState({passwordWarning});
    }
  }

  /**
   * Handle view password button click.
   */
  handleViewPasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    this.setState({viewPassword: !this.state.viewPassword});
  }

  /**
   * Validate the password input.
   * @return {Promise}
   */
  validatePasswordInput() {
    const password = this.state.password;
    let passwordError = "";
    if (!password.length) {
      passwordError = this.translate("A passphrase is required.");
    }

    return new Promise(resolve => {
      this.setState({passwordError: passwordError}, resolve);
    });
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle password input focus.
   */
  handlePasswordInputFocus() {
    this.setState({
      passphraseStyle: {
        background: this.props.context.userSettings.getSecurityTokenBackgroundColor(),
        color: this.props.context.userSettings.getSecurityTokenTextColor(),
      },
      securityTokenStyle: {
        background: this.props.context.userSettings.getSecurityTokenTextColor(),
        color: this.props.context.userSettings.getSecurityTokenBackgroundColor(),
      }
    });
  }

  /**
   * Handle password input blur.
   */
  handlePasswordInputBlur() {
    this.setState({
      passphraseStyle: {
        background: "",
        color: ""
      },
      securityTokenStyle: {
        background: this.props.context.userSettings.getSecurityTokenBackgroundColor(),
        color: this.props.context.userSettings.getSecurityTokenTextColor(),
      }
    });
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
    await this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      this.handleValidateError();
      await this.toggleProcessing();
      return;
    }
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
    await Promise.all([
      this.validateNameInput(),
      this.validateEmailInput(),
      this.validatePasswordInput()
    ]);

    return this.state.nameError === "" && this.state.emailError === "" && this.state.passwordError === "";
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
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
    const passwordStrength = SecretGeneratorComplexity.strength(passwordEntropy);
    /*
     * The parser can't find the translation for passwordStrength.label
     * To fix that we can use it in comment
     * this.translate("n/a")
     * this.translate("very weak")
     * this.translate("weak")
     * this.translate("fair")
     * this.translate("strong")
     * this.translate("very strong")
     */
    return (
      <form onSubmit={this.handleFormSubmit} noValidate>
        <div className="form-content generate-organization-key">
          <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-name"><Trans>Name</Trans></label>
            <input id="generate-organization-key-form-name" name="name" type="text" value={this.state.name}
              onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} ref={this.nameInputRef} className="required fluid" maxLength="64"
              required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
            {this.state.nameError &&
            <div className="name error-message">{this.state.nameError}</div>
            }
          </div>
          <div className={`input text required ${this.state.emailError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-email"><Trans>Email</Trans></label>
            <input id="generate-organization-key-form-email" name="email" ref={this.emailInputRef} className="fluid" maxLength="64" type="email"
              autoComplete="off" value={this.state.email} onChange={this.handleInputChange} placeholder={this.translate("Email Address")}
              onKeyUp={this.handleEmailInputKeyUp} disabled={this.hasAllInputDisabled()}/>
            {this.state.emailError &&
            <div className="error-message">{this.state.emailError}</div>
            }
          </div>
          <div className="input select">
            <label htmlFor="generate-organization-key-form-algorithm">
              <Trans>Algorithm</Trans>
              <Tooltip message={this.translate("Algorithm and key size cannot be changed at the moment. These are secure default")}
                icon="info-circle"/>
            </label>
            <input id="generate-organization-key-form-algorithm" name="algorithm" value={this.state.algorithm}
              className="fluid" type="text"
              autoComplete="off" disabled={true}/>
          </div>
          <div className="input select">
            <label htmlFor="generate-organization-key-form-keySize">
              <Trans>Key Size</Trans>
              <Tooltip message={this.translate("Algorithm and key size cannot be changed at the moment. These are secure default")}
                icon="info-circle"/>
            </label>
            <input id="generate-organization-key-form-key-size" name="keySize" value={this.state.keySize}
              className="fluid" type="text"
              autoComplete="off" disabled={true}/>
          </div>
          <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""}`}>
            <label htmlFor="generate-organization-key-form-password"><Trans>Organization key passphrase</Trans></label>
            <div className="input text password">
              <input id="generate-organization-key-form-password" name="password" className="required" maxLength="4096"
                placeholder={this.translate("Passphrase")} required="required" type={this.state.viewPassword ? "text" : "password"}
                onKeyUp={this.handlePasswordInputKeyUp} value={this.state.password}
                onFocus={this.handlePasswordInputFocus} onBlur={this.handlePasswordInputBlur}
                onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()}
                autoComplete="new-password"
                ref={this.passwordInputRef}/>
              <a onClick={this.handleViewPasswordButtonClick}
                className={`password-view button button-icon toggle ${this.state.viewPassword ? "selected" : ""}`}>
                <Icon name='eye-open' big={true}/>
                <span className="visually-hidden">view</span>
              </a>
              <span className="security-token" style={this.state.securityTokenStyle}>{this.props.context.userSettings.getSecurityTokenCode()}</span>
            </div>
            <div className={`password-complexity ${passwordStrength.id}`}>
              <span className="progress">
                <span className={`progress-bar ${passwordStrength.id}`} />
              </span>
              <span className="complexity-text">
                <div>
                  <Trans>Complexity:</Trans> <strong>{this.translate(passwordStrength.label)}</strong>
                </div>
                <div>
                  <Trans>Entropy:</Trans> <strong>{passwordEntropy.toFixed(1)} bits</strong>
                </div>
              </span>
            </div>
            {this.state.passwordError &&
            <div className="input text">
              <div className="password error-message">{this.state.passwordError}</div>
            </div>
            }
            {this.state.passwordWarning &&
            <div className="input text">
              <div className="password warning message">{this.state.passwordWarning}</div>
            </div>
            }
          </div>
        </div>
        {!this.state.hasAlreadyBeenValidated &&
        <div className="warning message" id="generate-organization-key-setting-overridden-banner">
          <p>
            <Trans>Warning, we encourage you to generate  your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.</Trans>
          </p>
        </div>
        }
        <div className="submit-wrapper clearfix">
          <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Generate & Apply")}/>
          <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.onClose} />
        </div>
      </form>
    );
  }
}

ImportOrganizationKey.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ImportOrganizationKey));
