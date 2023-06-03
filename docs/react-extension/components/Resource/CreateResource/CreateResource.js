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
 * @since         2.14.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withRouter} from "react-router-dom";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

import {Trans, withTranslation} from "react-i18next";
import GenerateResourcePassword from "../../ResourcePassword/GenerateResourcePassword/GenerateResourcePassword";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import {maxSizeValidation} from "../../../lib/Error/InputValidator";
import {
  RESOURCE_NAME_MAX_LENGTH,
  RESOURCE_PASSWORD_MAX_LENGTH,
  RESOURCE_URI_MAX_LENGTH,
  RESOURCE_DESCRIPTION_MAX_LENGTH,
} from "../../../../shared/constants/inputs.const";
import debounce from "debounce-promise";
import PownedService from "../../../../shared/services/api/secrets/pownedService";

class CreateResource extends Component {
  constructor() {
    super();
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
    this.evaluatePasswordIsInDictionaryDebounce = debounce(this.evaluatePasswordIsInDictionaryDebounce, 300);
  }

  getDefaultState() {
    return {
      name: "",
      nameError: "",
      nameWarning: "",
      username: "",
      usernameError: "",
      usernameWarning: "",
      uri: "",
      uriError: "",
      uriWarning: "",
      password: "",
      passwordError: "",
      passwordWarning: "",
      description: "",
      descriptionError: "",
      descriptionWarning: "",
      encryptDescription: false,
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPwnedServiceAvailable: true,
      passwordInDictionary: false,
      passwordEntropy: null,
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
    this.handleDescriptionInputKeyUp = this.handleDescriptionInputKeyUp.bind(this);
    this.handleUriInputKeyUp = this.handleUriInputKeyUp.bind(this);
    this.handleUsernameInputKeyUp = this.handleUsernameInputKeyUp.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleLastGeneratedPasswordChanged = this.handleLastGeneratedPasswordChanged.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  /**
   * Whenever the component has been mounted
   */
  componentDidMount() {
    this.pownedService = new PownedService(this.props.context.port);
    if (this.isEncryptedDescriptionEnabled()) {
      this.setState({encryptDescription: true});
    }
  }

  /**
   * Whenever the component has been changed (props)
   * @param prevProps The previous component props
   */
  componentDidUpdate(prevProps) {
    this.handleLastGeneratedPasswordChanged(
      prevProps.resourcePasswordGeneratorContext.lastGeneratedPassword
    );
  }

  /*
   * =============================================================
   *  Resource password generator
   * =============================================================
   */
  get currentGeneratorConfiguration() {
    const type = this.props.resourcePasswordGeneratorContext.settings.default_generator;
    return this.props.resourcePasswordGeneratorContext.settings.generators.find(
      generator => generator.type === type
    );
  }

  /**
   * Whenever a new password has been generated through the generator
   * @param previousLastGeneratedPassword The previous last generated password value
   */
  handleLastGeneratedPasswordChanged(previousLastGeneratedPassword) {
    const currentLastGeneratedPassword = this.props.resourcePasswordGeneratorContext.lastGeneratedPassword;
    const hasLastGeneratedPasswordChanged = previousLastGeneratedPassword !== currentLastGeneratedPassword;
    if (hasLastGeneratedPasswordChanged) {
      this.setState({password: currentLastGeneratedPassword});
    }
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  isEncryptedDescriptionEnabled() {
    return this.props.context.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  isLegacyResourceTypeEnabled() {
    return this.props.context.resourceTypesSettings.isLegacyResourceTypeEnabled();
  }

  areResourceTypesEnabled() {
    return this.props.context.resourceTypesSettings.areResourceTypesEnabled();
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    await this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const resource = await this.createResource();
      await this.handleSaveSuccess(resource);
    } catch (error) {
      await this.toggleProcessing();
      await this.handleSaveError(error);
    }
  }

  /**
   * Toggle processing state when validating / saving
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /*
   * =============================================================
   *  Validation
   * =============================================================
   */
  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      nameError: "",
      uriError: "",
      usernameError: "",
      passwordError: "",
      descriptionError: "",
    });

    // Validate the form inputs.
    await Promise.all([
      this.validateNameInput(),
      this.validatePasswordInput()
    ]);

    return this.state.nameError === "" && this.state.passwordError === "";
  }

  /**
   * Validate the password input.
   * @return {Promise}
   */
  validatePasswordInput() {
    const password = this.state.password;
    let passwordError = "";
    if (!password.length) {
      passwordError = this.translate("A password is required.");
    }

    return new Promise(resolve => {
      this.setState({passwordError}, resolve);
    });
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
   * Evaluate to check if password is in a dictionary.
   * @return {Promise}
   */
  async evaluatePasswordIsInDictionaryDebounce() {
    let passwordEntropy = null;
    if (this.state.isPwnedServiceAvailable) {
      passwordEntropy = this.state.password.length > 0 ? SecretGenerator.entropy(this.state.password) : null;
      const result = await this.pownedService.evaluateSecret(this.state.password);
      const passwordInDictionary = this.state.password.length > 0 ?  result.inDictionary : false;
      this.setState({isPwnedServiceAvailable: result.isPwnedServiceAvailable, passwordInDictionary});
    }
    this.setState({passwordEntropy});
  }

  /*
   * =============================================================
   *  Create resource
   * =============================================================
   */
  /**
   * Create the resource
   * @returns {Promise<Object>} returns the newly created resource
   */
  async createResource() {
    const resourceDto = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
      folder_parent_id: this.props.context.resourceCreateDialogProps.folderParentId,
    };

    // No resource types, legacy case
    if (!this.areResourceTypesEnabled()) {
      return this.createResourceLegacy(resourceDto, this.state.password);
    }

    // Resource types enabled but legacy type requested
    if (!this.state.encryptDescription) {
      return this.createWithoutEncryptedDescription(resourceDto, this.state.password);
    }

    // Resource type with encrypted description
    return this.createWithEncryptedDescription(resourceDto, {
      description: this.state.description,
      password: this.state.password
    });
  }

  /**
   * Create legacy resource with no resource type
   *
   * @param resourceDto
   * @param {string} secretString
   * @returns {Promise<*>}
   * @deprecated will be removed when v2 support is dropped
   */
  async createResourceLegacy(resourceDto, secretString) {
    resourceDto.description = this.state.description;
    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretString);
  }

  /**
   * Create with encrypted description type
   *
   * @param {object} resourceDto
   * @param {object} secretDto
   * @returns {Promise<*>}
   */
  async createWithEncryptedDescription(resourceDto, secretDto) {
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );

    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Create with legacy secret type
   *
   * @param {object} resourceDto
   * @param {string} secretString
   * @returns {Promise<*>}
   */
  async createWithoutEncryptedDescription(resourceDto, secretString) {
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
    );
    resourceDto.description = this.state.description;

    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretString);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(resource) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been added successfully"));
    if (resource.folder_parent_id) {
      // TODO and select resource inside that folder
      this.selectAndScrollToFolder(resource.folder_parent_id);
    } else {
      this.selectAndScrollToResource(resource.id);
    }
    this.props.context.setContext({passwordEditDialogProps: null});
    this.props.history.push(`/app/passwords/view/${resource.id}`);
    this.props.onClose();
  }

  /*
   * =============================================================
   *  Error handling
   * =============================================================
   */
  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      // Do nothing
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error,
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    } else if (this.state.passwordError) {
      this.passwordInputRef.current.focus();
    }
  }

  /*
   * =============================================================
   *  Out of dialog actions
   * =============================================================
   */
  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   */
  selectAndScrollToResource(id) {
    this.props.context.port.emit("passbolt.resources.select-and-scroll-to", id);
  }

  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   * @returns {void}
   */
  selectAndScrollToFolder(id) {
    this.props.context.port.emit("passbolt.folders.select-and-scroll-to", id);
  }

  /*
   * =============================================================
   *  Dialog actions event handlers
   * =============================================================
   */
  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "password") {
      if (value.length) {
        this.evaluatePasswordIsInDictionaryDebounce();
      } else {
        this.setState({
          passwordInDictionary: false,
          passwordEntropy: null,
        });
      }
    }
    this.setState({
      [name]: value,
    });
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateNameInput();
      this.setState(state);
    } else {
      const nameWarning = maxSizeValidation(this.state.name, RESOURCE_NAME_MAX_LENGTH, this.translate);
      this.setState({nameWarning});
    }
  }

  /**
   * Handle password input keyUp event.
   */
  handlePasswordInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validatePasswordInput();
      this.setState(state);
    } else {
      const passwordWarning = maxSizeValidation(this.state.password, RESOURCE_PASSWORD_MAX_LENGTH, this.translate);
      this.setState({passwordWarning});
    }
  }

  /**
   * Handle generate password button click.
   */
  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }

    const password = SecretGenerator.generate(this.currentGeneratorConfiguration);
    const passwordEntropy = SecretGenerator.entropy(password);

    this.setState({
      password: password,
      passwordError: "",
      passwordInDictionary: false,
      passwordEntropy
    });
  }

  /**
   * Whenever the user wants to open the password generator
   */
  handleOpenGenerator() {
    this.props.dialogContext.open(GenerateResourcePassword);
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
    this.props.context.setContext({resourceCreateDialogProps: null});
  }

  /**
   * Switch to toggle description field encryption
   */
  handleDescriptionToggle() {
    const isCurrentlyEncrypted = this.state.encryptDescription;
    if (isCurrentlyEncrypted && this.isLegacyResourceTypeEnabled()) {
      return this.setState({encryptDescription: false});
    }
    if (!isCurrentlyEncrypted && this.isEncryptedDescriptionEnabled()) {
      return this.setState({encryptDescription: true});
    }
  }

  /**
   * Whenever the user input keys in the description area
   */
  handleDescriptionInputKeyUp() {
    if (!this.state.hasAlreadyBeenValidated) {
      const descriptionWarning = maxSizeValidation(this.state.description, RESOURCE_DESCRIPTION_MAX_LENGTH, this.translate);
      this.setState({descriptionWarning});
    }
  }

  /**
   * Whenever the user input keys in the name area
   */
  handleUriInputKeyUp() {
    if (!this.state.hasAlreadyBeenValidated) {
      const uriWarning = maxSizeValidation(this.state.uri, RESOURCE_URI_MAX_LENGTH, this.translate);
      this.setState({uriWarning});
    }
  }

  /**
   * Whenever the user input keys in the username area
   */
  handleUsernameInputKeyUp() {
    if (!this.state.hasAlreadyBeenValidated) {
      const usernameWarning = maxSizeValidation(this.state.username, RESOURCE_NAME_MAX_LENGTH, this.translate);
      this.setState({usernameWarning});
    }
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse("passwordGenerator");
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;
    return (
      <DialogWrapper title={this.translate("Create a password")} className="create-password-dialog"
        disabled={this.state.processing} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-name"><Trans>Name</Trans>{this.state.nameWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
              {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
              }
              {this.state.nameWarning && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>
              )}
            </div>
            <div className={`input text ${this.state.uriError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-uri"><Trans>URI</Trans>{this.state.uriWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text" onKeyUp={this.handleUriInputKeyUp}
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.state.processing}/>
              {this.state.uriError &&
              <div className="error-message">{this.state.uriError}</div>
              }
              {this.state.uriWarning && (
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.uriWarning}
                </div>
              )}
            </div>
            <div className={`input text ${this.state.usernameError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-username"><Trans>Username</Trans>{this.state.usernameWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-username" name="username" type="text" className="fluid" maxLength="255"   onKeyUp={this.handleUsernameInputKeyUp}
                autoComplete="off" value={this.state.username} onChange={this.handleInputChange} placeholder={this.translate("Username")}
                disabled={this.state.processing}/>
              {this.state.usernameError &&
              <div className="error-message">{this.state.usernameError}</div>
              }
              {this.state.usernameWarning && (
                <div className="username warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.usernameWarning}
                </div>
              )}
            </div>
            <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-password">
                <Trans>Password</Trans>
                {(this.state.passwordWarning || this.state.passwordInDictionary || !this.state.isPwnedServiceAvailable) &&
                  <Icon name="exclamation"/>
                }
              </label>
              <div className="password-button-inline">
                <Password id="create-password-form-password"
                  name="password"
                  autoComplete="new-password"
                  placeholder={this.translate("Password")}
                  preview={true}
                  onKeyUp={this.handlePasswordInputKeyUp}
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  inputRef={this.passwordInputRef}/>
                <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                  className={`password-generate button-icon ${this.state.processing ? "disabled" : ""}`}>
                  <Icon name='dice' big={true}/>
                  <span className="visually-hidden"><Trans>Generate</Trans></span>
                </button>
                {this.canUsePasswordGenerator &&
                  <button type="button" onClick={this.handleOpenGenerator}
                    className={`password-generator button-icon ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='settings' big={true}/>
                    <span className="visually-hidden"><Trans>Open generator</Trans></span>
                  </button>
                }
              </div>
              <PasswordComplexity entropy={passwordEntropy} error={Boolean(this.state.passwordError)}/>
              {this.state.passwordError &&
                <div className="password error-message">{this.state.passwordError}</div>
              }
              {this.state.passwordWarning &&
                <div className="password warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.passwordWarning}</div>
              }
              {!this.state.isPwnedServiceAvailable &&
                    <div className="pwned-password warning-message"><Trans>The pwnedpasswords service is unavailable, your password might be part of an exposed data breach</Trans></div>
              }
              {this.state.passwordInDictionary &&
                    <div className="pwned-password warning-message"><Trans>The password is part of an exposed data breach.</Trans></div>
              }
            </div>
            <div className={`input textarea ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-description"><Trans>Description</Trans>
                {this.state.descriptionWarning &&
                  <Icon name="exclamation"/>
                }
                {!this.areResourceTypesEnabled() &&
                <Tooltip message={this.translate("Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
                }
                {this.areResourceTypesEnabled() && !this.state.encryptDescription &&
                <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                  <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                    <Icon name="lock-open"/>
                  </Tooltip>
                </button>
                }
                {this.areResourceTypesEnabled() && this.state.encryptDescription &&
                <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                  <Tooltip message={this.translate("The description content will be encrypted.")}>
                    <Icon name="lock"/>
                  </Tooltip>
                </button>
                }
              </label>
              <textarea id="create-password-form-description" aria-required={true} name="description" maxLength="10000"
                className="required" placeholder={this.translate("Add a description")} value={this.state.description}
                disabled={this.state.processing}  onKeyUp={this.handleDescriptionInputKeyUp} onChange={this.handleInputChange}>
              </textarea>
              {this.state.descriptionError &&
              <div className="error-message">{this.state.descriptionError}</div>
              }
              {this.state.descriptionWarning &&
              <div className="description warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.descriptionWarning}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Create")} disabled={this.state.processing} processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateResource.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object, // Router history
  onClose: PropTypes.func, // Whenever the component must be closed
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default  withResourcePasswordGeneratorContext(withAppContext(withActionFeedback(withRouter(withDialog(withTranslation('common')(CreateResource))))));

