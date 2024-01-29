/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 *
 */
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import debounce from "debounce-promise";
import PownedService from '../../../shared/services/api/secrets/pownedService';
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withPasswordPolicies} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {withPasswordExpiry} from "../../../react-extension/contexts/PasswordExpirySettingsContext";

class SaveResource extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
    this.isPwndProcessingPromise = null;
    this.evaluatePasswordIsInDictionaryDebounce = debounce(this.evaluatePasswordIsInDictionaryDebounce, 300);
  }

  async componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    this.loadPasswordMetaFromTabForm();
    await this.props.passwordPoliciesContext.findPolicies();
    this.initPwnedPasswordService();
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  getDefaultState() {
    return {
      loaded: false,
      error: "",
      name: "",
      nameError: "",
      username: "",
      usernameError: "",
      uri: "",
      uriError: "",
      password: "",
      passwordError: "",
      passwordEntropy: null,
      isPwnedServiceAvailable: true,
      passwordInDictionary: false,
    };
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
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  async loadPasswordMetaFromTabForm() {
    const {name, uri, username, secret_clear} = await this.props.context.port.request("passbolt.quickaccess.prepare-autosave");
    this.setState({name, uri, username, password: secret_clear});
    this.loadPassword(secret_clear);
    this.setState({loaded: true});
    this.evaluatePasswordIsInDictionaryDebounce(secret_clear);
  }

  handleClose() {
    window.close();
  }

  validateFields() {
    const state = {
      nameError: "",
      passwordError: ""
    };
    let isValid = true;

    if (this.state.name === "") {
      state.nameError = this.translate("A name is required.");
      isValid = false;
    }

    if (this.state.password === "") {
      state.passwordError = this.translate("A password is required.");
      isValid = false;
    }

    this.setState(state);
    return isValid;
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      processing: true,
      error: "",
      nameError: "",
      usernameError: "",
      uriError: "",
    });

    if (!this.validateFields()) {
      this.setState({processing: false});
      return;
    }

    const resourceDto = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
      resource_type_id: this.resourceTypesSettings.findResourceTypeIdBySlug(this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION),
      expired: this.props.passwordExpiryContext.getDefaultExpirationDate(),
    };

    const secretDto = {
      password: this.state.password,
      description: ""
    };

    try {
      await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
      this.handleClose();
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

  handleSubmitError(error) {
    if (error.name === "PassboltApiFetchError"
      && error.data.code === 400 && error.data.body
      && (error.data.body.name || error.data.body.username || error.data.body.uri)) {
      // Could not validate resource data.
      this.setState({
        nameError: this.formatValidationFieldError(error.data.body.name),
        usernameError: this.formatValidationFieldError(error.data.body.username),
        uriError: this.formatValidationFieldError(error.data.body.uri),
        processing: false
      });
    } else {
      // An unexpected error occured.
      this.setState({
        error: error.message,
        processing: false
      });
    }
  }

  formatValidationFieldError(fieldErrors) {
    if (!fieldErrors) {
      return "";
    }
    return Object.values(fieldErrors).join(', ');
  }

  handlePasswordChange(event) {
    if (event.target.value.length && this.state.isPwnedServiceAvailable) {
      this.isPwndProcessingPromise = this.evaluatePasswordIsInDictionaryDebounce(event.target.value);
    } else {
      this.setState({
        passwordInDictionary: false,
      });
    }
    this.loadPassword(event.target.value);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  loadPassword(password) {
    const passwordEntropy = password ? SecretGenerator.entropy(password) : null;
    this.setState({password, passwordEntropy});
  }

  /**
   * Get resource types settings
   * @return {*}
   */
  get resourceTypesSettings() {
    return this.props.context.resourceTypesSettings;
  }

  /**
   * Evaluate to check if password is in a dictionary.
   * @param {string} password the password to evaluate
   * @return {Promise<void>}
   */
  async evaluatePasswordIsInDictionaryDebounce(password) {
    if (!this.state.isPwnedServiceAvailable || !password) {
      return;
    }

    const result = await this.pownedService.evaluateSecret(password);
    this.setState({
      isPwnedServiceAvailable: result.isPwnedServiceAvailable,
      //we ensure after the resolution of the deobunced promise that if the passphrase is empty we do not display the 'in dictionary' warning message
      passwordInDictionary: this.state.password && this.state.password !== "" && result.inDictionary
    });
  }

  render() {
    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;
    return (
      <div className="resource-auto-save">
        <h1 className="title"><Trans>Would you like to save this credential ?</Trans></h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="resource-auto-save-form">
            <div className="form-container">
              <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
                <label htmlFor="name"><Trans>Name</Trans></label>
                <input name="name" value={this.state.name} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="required fluid" maxLength="255" type="text" id="name" autoComplete="off" />
                {this.state.nameError &&
                <div className="error-message">{this.state.nameError}</div>
                }
              </div>
              <div className={`input text ${this.state.uriError ? "error" : ""}`}>
                <label htmlFor="uri"><Trans>URL</Trans></label>
                <input name="uri" value={this.state.uri} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="fluid" maxLength="1024" type="text" id="uri" autoComplete="off" />
                {this.state.uriError &&
                <div className="error-message">{this.state.uriError}</div>
                }
              </div>
              <div className="input text">
                <label htmlFor="username"><Trans>Username</Trans></label>
                <input name="username" value={this.state.username} onChange={this.handleInputChange} disabled={this.state.processing}
                  className="fluid" maxLength="255" type="text" id="username" autoComplete="off" />
                {this.state.usernameError &&
                <div className="error-message">{this.state.usernameError}</div>
                }
              </div>
              <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""}`}>
                <label htmlFor="password"><Trans>Password</Trans>
                  {this.pownedService && (this.state.passwordInDictionary || !this.state.isPwnedServiceAvailable)  &&
                  <Icon name="exclamation"/>
                  }</label>
                <div className="password-button-inline">
                  <Password name="password" value={this.state.password} preview={true} onChange={this.handlePasswordChange} disabled={this.state.processing}
                    placeholder={this.translate('Password')} id="password" autoComplete="new-password"/>
                </div>
                <PasswordComplexity entropy={passwordEntropy} error={Boolean(this.state.passwordError)}/>
                {this.state.passwordError &&
                  <div className="error-message">{this.state.passwordError}</div>
                }
                {!this.state.isPwnedServiceAvailable &&
                  <div className="pwned-password warning-message"><Trans>The pwnedpasswords service is unavailable, your password might be part of an exposed data breach</Trans></div>
                }
                {this.state.passwordInDictionary &&
                  <div className="pwned-password warning-message"><Trans>The password is part of an exposed data breach.</Trans></div>
                }
              </div>
            </div>
          </div>
          <div className="submit-wrapper input flex-row-end">
            <a className="cancel" role="button" onClick={this.handleClose}>{this.translate("no, thanks")}</a>
            <button type="submit" className={`button primary big ${this.state.processing ? "processing" : ""}`} role="button"
              disabled={this.state.processing}>
              <Trans>Save</Trans>
              {this.state.processing &&
                <Icon name="spinner"/>
              }
            </button>
            {this.state.error &&
            <div className="error-message">{this.state.error}</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

SaveResource.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  passwordExpiryContext: PropTypes.object, // The password expiry context
};

export default withAppContext(withRouter(withPasswordPolicies(withPasswordExpiry(withTranslation('common')(SaveResource)))));
