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
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import GenerateResourcePassword from "../../ResourcePassword/GenerateResourcePassword/GenerateResourcePassword";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import {maxSizeValidation} from "../../../lib/Error/InputValidator";
import {RESOURCE_PASSWORD_MAX_LENGTH} from '../../../../shared/constants/inputs.const';
import {RESOURCE_NAME_MAX_LENGTH, RESOURCE_DESCRIPTION_MAX_LENGTH, RESOURCE_URI_MAX_LENGTH} from '../../../../shared/constants/inputs.const';
import debounce  from 'debounce-promise';
import PownedService from '../../../../shared/services/api/secrets/pownedService';
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import Totp from "../../../../shared/components/Totp/Totp";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";

class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
    this.createInputRef();
    this.evaluatePasswordIsInDictionaryDebounce = debounce(this.evaluatePasswordIsInDictionaryDebounce, 300);
  }

  get defaultState() {
    const resource = this.props.context.resources.find(item => item.id === this.props.resourceId) || {};

    return {
      nameOriginal: resource.name || "",
      name: resource.name || "",
      nameError: "",
      nameWarning: "",
      username: resource.username || "",
      usernameError: "",
      usernameWarning: "",
      uri: resource.uri || "",
      uriError: "",
      uriWarning: "",
      passwordOriginal: null,
      password: "",
      passwordError: "",
      passwordWarning: "",
      description: resource.description || "",
      descriptionError: "",
      descriptionWarning: "",
      totp: null, // The totp
      isSecretDecrypting: true,
      resourceTypeIdOriginal: resource.resource_type_id || "",
      resourceTypeId: resource.resource_type_id || "",
      isPwnedServiceAvailable: true,
      passwordInDictionary: false,
      passwordEntropy: null,
      processing: false,
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionInputFocus = this.handleDescriptionInputFocus.bind(this);
    this.handleDescriptionInputBlur = this.handleDescriptionInputBlur.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
    this.handleDescriptionInputKeyUp = this.handleDescriptionInputKeyUp.bind(this);
    this.handleUriInputKeyUp = this.handleUriInputKeyUp.bind(this);
    this.handleUsernameInputKeyUp = this.handleUsernameInputKeyUp.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handleAddTotpClick = this.handleAddTotpClick.bind(this);
    this.handleEditTotpClick = this.handleEditTotpClick.bind(this);
    this.handleDeleteTotpClick = this.handleDeleteTotpClick.bind(this);
    this.applyTotp = this.applyTotp.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.descriptionInputRef = React.createRef();
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    await this.initialize();
    await this.props.passwordPoliciesContext.findPolicies();
    this.initPwnedPasswordService();
    this.initPasswordGeneratorConfiguration();
  }

  /**
   * Whenever the component has been changed (props)
   * @param prevProps The previous component props
   */
  componentDidUpdate(prevProps) {
    this.handleLastGeneratedPasswordChanged(prevProps.resourcePasswordGeneratorContext.lastGeneratedPassword);
  }

  /**
   * Initialize the resource type associate to the resource
   */
  initResourceType() {
    if (this.isEncryptedDescriptionEnabled()) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
      );
      this.setState({resourceTypeId});
    } else if (this.areResourceTypesEnabled()) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
      );
      this.setState({resourceTypeId});
    }
  }

  /**
   * Initialize the pwned password service
   * @returns {void}
   */
  initPwnedPasswordService() {
    const isPwnedServiceAvailable = this.props.passwordPoliciesContext.shouldRunDictionaryCheck();

    if (isPwnedServiceAvailable) {
      this.pownedService = new PownedService(this.props.context.port);
    }

    this.setState({isPwnedServiceAvailable});
  }

  /**
   * Initialize the password generator configuration
   */
  initPasswordGeneratorConfiguration() {
    this.setState({
      generatorSettings: this.props.resourcePasswordGeneratorContext.getSettings()
    });
  }

  /**
   * initialize component
   * @returns {Promise<void>}
   */
  async initialize() {
    await this.decryptSecret();
  }

  /**
   * Whenever a new password has been generated through the generator
   * @param previousLastGeneratedPassword The previous last generated password value
   */
  handleLastGeneratedPasswordChanged(previousLastGeneratedPassword) {
    const lastGeneratedPassword = this.props.resourcePasswordGeneratorContext.lastGeneratedPassword;
    if (!lastGeneratedPassword) {
      return;
    }

    const hasLastGeneratedPasswordChanged = previousLastGeneratedPassword !== this.props.resourcePasswordGeneratorContext.consumeLastGeneratedPassword();
    if (!hasLastGeneratedPasswordChanged) {
      return;
    }

    const passwordEntropy = SecretGenerator.entropy(lastGeneratedPassword);
    const generatorSettings = this.props.resourcePasswordGeneratorContext.getSettings();

    this.setState({
      password: lastGeneratedPassword,
      generatorSettings,
      passwordEntropy
    });
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  isEncryptedDescriptionEnabled() {
    return this.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  areResourceTypesEnabled() {
    return this.resourceTypesSettings.areResourceTypesEnabled();
  }

  /**
   * Get resources type settings
   * @return {ResourceTypesSettings|*}
   */
  get resourceTypesSettings() {
    return this.props.context.resourceTypesSettings;
  }

  /**
   * Must encrypt the description
   * @return {boolean}
   */
  get mustEncryptDescription() {
    return this.resourceTypesSettings.assertResourceTypeIdHasEncryptedDescription(this.state.resourceTypeId);
  }

  /**
   * Has encrypted description
   * @return {boolean}
   */
  get hasEncryptedDescription() {
    return this.resourceTypesSettings.assertResourceTypeIdHasEncryptedDescription(this.state.resourceTypeIdOriginal);
  }

  /**
   * Is legacy resource
   * @return {boolean}
   */
  get isLegacyResource() {
    return this.resourceTypesSettings.assertResourceTypeIdIsLegacy(this.state.resourceTypeId);
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.resourceTypesSettings.assertResourceTypeIdHasTotp(this.state.resourceTypeId);
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

    await this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const resource = await this.updateResource();
      await this.handleSaveSuccess(resource);
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
    }
  }

  /**
   * Toggle processing state
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
      error: "",
      nameError: "",
      uriError: "",
      usernameError: "",
      passwordError: "",
      descriptionError: ""
    });

    // Validate the form inputs.
    await Promise.all([
      this.validateNameInput(),
      this.validatePasswordInput()
    ]);

    return this.state.nameError === "" && this.state.passwordError === "";
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


  /*
   * =============================================================
   *  Update resource
   * =============================================================
   */
  /**
   * Update the resource
   * @returns {Promise<Object>} updated resource
   */
  async updateResource() {
    const resourceDto = {
      id: this.props.resourceId,
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
    };

    const isPasswordExpiryEnabled = this.props.passwordExpiryContext.isFeatureEnabled();
    const hasPasswordChanged = this.state.password !== this.state.passwordOriginal;
    if (isPasswordExpiryEnabled && hasPasswordChanged) {
      resourceDto.expired = this.computeNewExpirationDate();
    }

    if (!this.areResourceTypesEnabled()) {
      return this.updateResourceLegacy(resourceDto);
    }

    // Resource types enabled but legacy type requested
    if (this.isLegacyResource) {
      return this.updateWithoutEncryptedDescription(resourceDto);
    }

    // Resource types with totp encrypted
    if (this.isTotpResources) {
      return this.updateWithEncryptedDescriptionAndTotp(resourceDto);
    }

    return this.updateWithEncryptedDescription(resourceDto);
  }

  /**
   * Returns the new expiration date for the given resource according the the password expiry settings.
   * @todo: implement the computation with the full settings
   * @returns {Date|null}
   */
  computeNewExpirationDate() {
    return null;
  }

  /**
   * Update the resource (LEGACY)
   * @returns {Promise<Object>} updated resource
   * @deprecated will be removed when v2 support is dropped
   */
  async updateResourceLegacy(resourceDto) {
    resourceDto.description = this.state.description;
    const plaintextDto = this.state.password;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with non encrypted description content type
   * @param resourceDto
   */
  async updateWithoutEncryptedDescription(resourceDto) {
    resourceDto.description = this.state.description;
    resourceDto.resource_type_id = this.state.resourceTypeId;
    const plaintextDto = this.state.password;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with encrypted description content type
   * @param resourceDto
   */
  async updateWithEncryptedDescription(resourceDto) {
    resourceDto.resource_type_id = this.state.resourceTypeId;
    resourceDto.description = '';
    const plaintextDto = {
      description: this.state.description,
      password: this.state.password
    };

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with encrypted description and totp content type
   * @param resourceDto
   */
  async updateWithEncryptedDescriptionAndTotp(resourceDto) {
    resourceDto.resource_type_id = this.state.resourceTypeId;
    resourceDto.description = '';
    const plaintextDto = this.state.totp.toSecretDto();
    plaintextDto.password = this.state.password;
    plaintextDto.description = this.state.description;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been updated successfully"));
    this.props.resourceWorkspaceContext.onResourceEdited();
    this.handleClose();
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
  handleSaveError(error) {
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
      error: error
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

    const newState = {
      [name]: value
    };

    if (name === "password") {
      if (value.length) {
        this.evaluatePasswordIsInDictionaryDebounce(value);
        newState.passwordEntropy = SecretGenerator.entropy(value);
      } else {
        newState.passwordInDictionary = false;
        newState.passwordEntropy = null;
      }
    }
    this.setState(newState);
  }

  /**
   * Handle description input focus.
   */
  async handleDescriptionInputFocus() {
    const descriptionHasFocus = true;
    this.setState({passwordInputHasFocus: descriptionHasFocus});
    this.descriptionInputRef.current.focus();
  }

  /**
   * Handle description input blur.
   */
  handleDescriptionInputBlur() {
    this.setState({descriptionInputHasFocus: false});
  }

  /**
   * Handle name input keyUp event.
   */
  async handleNameInputKeyUp() {
    await this.validateNameInput();
    const nameWarning = maxSizeValidation(this.state.name, RESOURCE_NAME_MAX_LENGTH, this.translate);
    this.setState({nameWarning});
  }

  /**
   * Handle password input keyUp event.
   */
  async handlePasswordInputKeyUp() {
    await this.validatePasswordInput();
    const passwordWarning = maxSizeValidation(this.state.password, RESOURCE_PASSWORD_MAX_LENGTH, this.translate);
    this.setState({passwordWarning});
  }

  /**
   * Handle generate password button click.
   */
  handleGeneratePasswordButtonClick() {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const password = SecretGenerator.generate(this.state.generatorSettings);
    const passwordEntropy = SecretGenerator.entropy(password);
    this.setState({password: password, passwordEntropy, passwordInDictionary: false});
    this.evaluatePasswordIsInDictionaryDebounce(password);
  }

  /**
   * Whenever the user wants to open the password generator
   */
  handleOpenGenerator() {
    this.props.dialogContext.open(GenerateResourcePassword);
  }

  /**
   * Handle add totp
   */
  handleAddTotpClick() {
    this.props.workflowContext.start(HandleTotpWorkflow, {mode: TotpWorkflowMode.ADD_TOTP, onApply: this.applyTotp});
  }

  /**
   * Handle edit totp
   */
  handleEditTotpClick() {
    this.props.workflowContext.start(HandleTotpWorkflow, {mode: TotpWorkflowMode.EDIT_TOTP, totp: this.state.totp, onApply: this.applyTotp});
  }

  /**
   * Handle delete totp
   */
  handleDeleteTotpClick() {
    this.setState({totp: null});
    this.initResourceType();
  }

  /**
   * Apply the totp
   * @param {object} totp
   */
  applyTotp(totp) {
    const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
      this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_DESCRIPTION_TOTP
    );
    this.setState({totp, resourceTypeId});
  }

  /**
   * Handle close button click.
   * @returns {Promise<void>}
   */
  async handleClose() {
    // ensure the secret generator settings are back to the organisation's default in case a new secret is generated later
    await this.props.resourcePasswordGeneratorContext.resetSecretGeneratorSettings();
    this.props.onClose();
  }

  /**
   * Switch to toggle description field encryption
   */
  async handleDescriptionToggle() {
    // Description is not encrypted and encrypted description type is not supported => leave it alone
    if (!this.isEncryptedDescriptionEnabled()) {
      return;
    }

    // No obligation to keep description encrypted, allow toggle
    if (!this.mustEncryptDescription) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
      );
      this.setState({resourceTypeId});
    } else if (!this.isTotpResources && !this.hasEncryptedDescription) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
      );
      this.setState({resourceTypeId});
    }
  }

  /**
   * Whenever the user input keys in the description area
   */
  handleDescriptionInputKeyUp() {
    const descriptionWarning = maxSizeValidation(this.state.description, RESOURCE_DESCRIPTION_MAX_LENGTH, this.translate);
    this.setState({descriptionWarning});
  }


  /**
   * Whenever the user input keys in the name area
   */
  handleUriInputKeyUp() {
    const uriWarning = maxSizeValidation(this.state.uri, RESOURCE_URI_MAX_LENGTH, this.translate);
    this.setState({uriWarning});
  }

  /**
   * Whenever the user input keys in the username area
   */
  handleUsernameInputKeyUp() {
    const usernameWarning = maxSizeValidation(this.state.username, RESOURCE_NAME_MAX_LENGTH, this.translate);
    this.setState({usernameWarning});
  }


  /*
   * =============================================================
   *  Decryption
   * =============================================================
   */
  /**
   * Decrypt the password secret
   */
  async decryptSecret() {
    this.setState({
      isSecretDecrypting: true
    });

    try {
      const plaintextSecretDto = await this.getDecryptedSecret();
      const password = plaintextSecretDto.password;
      this.evaluatePasswordIsInDictionaryDebounce(password);
      this.setState({
        password: password,
        passwordOriginal: password,
        description: plaintextSecretDto.description || this.state.description,
        totp: plaintextSecretDto.totp ? new TotpViewModel(plaintextSecretDto.totp) : null,
        passwordEntropy: SecretGenerator.entropy(password),
        isSecretDecrypting: false,
      });
    } catch (error) {
      this.handleClose();
    }
  }

  /**
   * Get the decrypted password secret
   * @return {Promise<Object>}
   */
  async getDecryptedSecret() {
    return this.props.context.port.request("passbolt.secret.decrypt", this.props.resourceId);
  }

  /*
   * =============================================================
   *  Placeholder texts / status helpers
   * =============================================================
   */

  /**
   * Get the password input field placeholder.
   * @returns {string}
   */
  getPasswordInputPlaceholder() {
    let placeholder =  this.translate("Password");
    if (this.state.isSecretDecrypting) {
      placeholder = this.translate("Decrypting");
    }

    return placeholder;
  }

  /**
   * Get the description placeholder text depending on state
   * @returns {string}
   */
  getDescriptionPlaceholder() {
    if (this.state.isSecretDecrypting && this.mustEncryptDescription) {
      return this.translate("Decrypting");
    }
    return this.translate("Description");
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * @returns {boolean}
   */
  isPasswordDisabled() {
    return this.state.isSecretDecrypting;
  }

  /**
   * @returns {boolean}
   */
  isDescriptionDisabled() {
    return (this.state.isSecretDecrypting && this.mustEncryptDescription);
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse('passwordGenerator');
  }

  /**
   * Returns true if the logged in user can use the totp capability.
   * @returns {boolean}
   */
  get canUseTotp() {
    return this.areResourceTypesEnabled() && this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Has a totp
   * @return {boolean}
   */
  get hasTotp() {
    return Boolean(this.state.totp);
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
    const passwordEntropy = this.state.passwordInDictionary  ? 0 : this.state.passwordEntropy;
    const passwordPlaceholder = this.getPasswordInputPlaceholder();
    return (
      <DialogWrapper title={this.translate("Edit resource")} subtitle={this.state.nameOriginal} className="edit-password-dialog"
        disabled={this.hasAllInputDisabled()} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-name"><Trans>Name</Trans>{this.state.nameWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="edit-password-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled()} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true}/>
              {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
              }
              {this.state.nameWarning && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>
              )}
            </div>
            <div className={`input text ${this.state.uriError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-uri"><Trans>URI</Trans>{this.state.uriWarning &&
                  <Icon name="exclamation"/>
              }</label>
              <input id="edit-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                onKeyUp={this.handleUriInputKeyUp}
                disabled={this.hasAllInputDisabled()}/>
              {this.state.uriError &&
              <div className="error-message">{this.state.uriError}</div>
              }
              {this.state.uriWarning && (
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.uriWarning}
                </div>
              )}
            </div>
            <div className={`input text ${this.state.usernameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-username"><Trans>Username</Trans>{this.state.usernameWarning &&
                <Icon name="exclamation"/>
              }</label>
              <input id="edit-password-form-username" name="username" type="text" className="fluid" maxLength="255"
                autoComplete="off" value={this.state.username} onChange={this.handleInputChange}
                onKeyUp={this.handleUsernameInputKeyUp}
                placeholder={this.translate("Username")}
                disabled={this.hasAllInputDisabled()}/>
              {this.state.usernameError &&
              <div className="error-message">{this.state.usernameError}</div>
              }
              {this.state.usernameWarning && (
                <div className="username warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.usernameWarning}
                </div>
              )}
            </div>
            <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-password">
                <Trans>Password</Trans>
                {(this.state.passwordWarning || this.state.passwordInDictionary || !this.state.isPwnedServiceAvailable) && this.pownedService &&
                  <Icon name="exclamation"/>
                }
              </label>
              <div className="password-button-inline">
                <Password id="edit-password-form-password" name="password"
                  onKeyUp={this.handlePasswordInputKeyUp}
                  value={this.state.password}
                  placeholder={passwordPlaceholder}
                  onChange={this.handleInputChange}
                  autoComplete="new-password"
                  disabled={this.hasAllInputDisabled() || this.isPasswordDisabled()}
                  preview={true}
                  inputRef={this.passwordInputRef}
                />
                <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                  className={`password-generate button-icon ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                  <Icon name='dice' big={true}/>
                  <span className="visually-hidden"><Trans>Generate</Trans></span>
                </button>
                {this.canUsePasswordGenerator &&
                  <button type="button" onClick={this.handleOpenGenerator}
                    className={`password-generator button-icon ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
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
              {!this.state.isPwnedServiceAvailable && this.pownedService &&
                    <div className="pwned-password invalid-passphrase warning-message"><Trans>The pwnedpasswords service is unavailable, your password might be part of an exposed data breach</Trans></div>
              }
              {this.state.passwordInDictionary && this.pownedService &&
                    <div className="pwned-password invalid-passphrase warning-message"><Trans>The password is part of an exposed data breach.</Trans></div>
              }
            </div>
            <div className={`input textarea ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-description"><Trans>Description</Trans>
                {this.state.descriptionWarning &&
                  <Icon name="exclamation"/>
                }
                {!this.areResourceTypesEnabled() &&
                <Tooltip message={this.translate("Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
                }
                {this.areResourceTypesEnabled() && !this.mustEncryptDescription &&
                <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                  <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                    <Icon name="lock-open"/>
                  </Tooltip>
                </button>
                }
                {this.mustEncryptDescription &&
                <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                  <Tooltip message={this.translate("The description content will be encrypted.")}>
                    <Icon name="lock"/>
                  </Tooltip>
                </button>
                }
              </label>
              <textarea id="edit-password-form-description" name="description" maxLength="10000"
                className="required" aria-required={true} placeholder={this.getDescriptionPlaceholder()} value={this.state.description}
                disabled={this.hasAllInputDisabled() || this.isDescriptionDisabled()} onChange={this.handleInputChange} ref={this.descriptionInputRef}
                onFocus={this.handleDescriptionInputFocus} onBlur={this.handleDescriptionInputBlur}
                onKeyUp={this.handleDescriptionInputKeyUp}>
              </textarea>
              {this.state.descriptionError &&
              <div className="error-message">{this.state.descriptionError}</div>
              }
              {this.state.descriptionWarning &&
                <div className="description warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.descriptionWarning}</div>
              }
            </div>
            {this.canUseTotp && !this.hasTotp &&
              <div className="input input-totp-wrapper">
                <button type="button" className="add-totp link no-border link-icon" onClick={this.handleAddTotpClick} disabled={this.state.processing}>
                  <Icon name="plus-circle"/>
                  <span className="link-label"><Trans>Add TOTP</Trans></span>
                </button>
              </div>
            }
            {this.canUseTotp && this.hasTotp &&
              <div className={`input input-totp-wrapper ${this.state.processing ? 'disabled' : ''}`}>
                <label htmlFor="create-password-form-totp"><Trans>TOTP</Trans></label>
                <div className="input-wrapper-inline totp">
                  <Totp totp={this.state.totp}/>
                  <button type="button" className="edit-totp button-icon" onClick={this.handleEditTotpClick} disabled={this.state.processing}>
                    <Icon name='edit' big={true}/>
                  </button>
                  <button type="button" className="delete-totp button-icon" onClick={this.handleDeleteTotpClick} disabled={this.state.processing}>
                    <Icon name='trash' big={true}/>
                  </button>
                </div>
              </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} processing={this.hasAllInputDisabled()}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditResource.propTypes = {
  resourceId: PropTypes.string, // The id of the resource
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context,
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  workflowContext: PropTypes.any, // The workflow context
  passwordExpiryContext: PropTypes.object, // The password expiry context
};

export default withAppContext(
  withResourceWorkspace(
    withResourcePasswordGeneratorContext(
      withActionFeedback(
        withPasswordPolicies(
          withDialog(
            withWorkflow(
              withPasswordExpiry(
                withTranslation('common')(EditResource)))))))));
