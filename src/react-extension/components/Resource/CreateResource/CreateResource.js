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
  RESOURCE_DESCRIPTION_MAX_LENGTH,
  RESOURCE_NAME_MAX_LENGTH,
  RESOURCE_PASSWORD_MAX_LENGTH,
  RESOURCE_URI_MAX_LENGTH,
} from "../../../../shared/constants/inputs.const";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import Totp from "../../../../shared/components/Totp/Totp";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {DateTime} from "luxon";
import ConfirmCreateEdit, {
  ConfirmEditCreateOperationVariations,
  ConfirmEditCreateRuleVariations
} from "../ConfirmCreateEdit/ConfirmCreateEdit";
import {ENTROPY_THRESHOLDS} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";

class CreateResource extends Component {
  constructor() {
    super();
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
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
      uriWarning: "",
      password: "",
      passwordError: "",
      passwordWarning: "",
      description: "",
      descriptionWarning: "",
      totp: null, // The totp
      encryptDescription: false,
      resourceTypeId: null, // The resource type id
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPasswordDictionaryCheckRequested: true, // Is the password check against a dictionary request.
      isPasswordDictionaryCheckServiceAvailable: true, // Is the password dictionary check service available.
      passwordInDictionary: false,
      passwordEntropy: null,
      generatorSettings: null,
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
    this.handleAddTotpClick = this.handleAddTotpClick.bind(this);
    this.applyTotp = this.applyTotp.bind(this);
    this.handleEditTotpClick = this.handleEditTotpClick.bind(this);
    this.handleDeleteTotpClick = this.handleDeleteTotpClick.bind(this);
    this.save = this.save.bind(this);
    this.rejectCreationConfirmation = this.rejectCreationConfirmation.bind(this);
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
  async componentDidMount() {
    this.initResourceType();
    await Promise.all([
      this.props.passwordPoliciesContext.findPolicies(),
      this.props.passwordExpiryContext.findSettings(),
    ]);
    this.initPwnedPasswordService();
    this.initPasswordGeneratorConfiguration();
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
   */
  initPwnedPasswordService() {
    const isPasswordDictionaryCheckRequested = this.props.passwordPoliciesContext.shouldRunDictionaryCheck();

    if (isPasswordDictionaryCheckRequested) {
      this.pownedService = new PownedService(this.props.context.port);
    }

    this.setState({isPasswordDictionaryCheckRequested});
  }

  /**
   * Initialize the password generator configuration
   */
  initPasswordGeneratorConfiguration() {
    this.setState({
      generatorSettings: this.props.resourcePasswordGeneratorContext.getSettings()
    });
  }

  /*
   * =============================================================
   *  Resource password generator
   * =============================================================
   */

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
      passwordEntropy,
      passwordInDictionary: false,
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

  isLegacyResourceTypeEnabled() {
    return this.resourceTypesSettings.isLegacyResourceTypeEnabled();
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
  get isTotpResource() {
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

    this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    if (!this.isMinimumRequiredEntropyReached()) {
      this.handlePasswordMinimumEntropyNotReached();
      return;
    } else if (await this.isPasswordInDictionary()) {
      this.handlePasswordInDictionary();
      return;
    }

    await this.save();
  }

  /**
   * Request password not reaching minimum entropy creation confirmation.
   */
  handlePasswordMinimumEntropyNotReached() {
    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.CREATE,
      rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      resourceName: this.state.name,
      onConfirm: this.save,
      onReject: this.rejectCreationConfirmation
    };
    this.props.dialogContext.open(ConfirmCreateEdit, confirmCreationDialog);
  }

  /**
   * Request password in dictionary creation confirmation.
   */
  handlePasswordInDictionary() {
    this.setState({
      passwordInDictionary: true
    });

    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.CREATE,
      rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
      resourceName: this.state.name,
      onConfirm: this.save,
      onReject: this.rejectCreationConfirmation
    };
    this.props.dialogContext.open(ConfirmCreateEdit, confirmCreationDialog);
  }

  /**
   * Reject the creation confirmation.
   */
  async rejectCreationConfirmation() {
    await this.toggleProcessing();
    this.passwordInputRef.current.focus();
  }

  /**
   * Save the resource
   * @returns {Promise<void>}
   */
  async save() {
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
      passwordError: "",
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
   * Returns true if the given entropy is greater or equal to the minimum required entropy.
   * @returns {boolean}
   */
  isMinimumRequiredEntropyReached() {
    return this.state.passwordEntropy
      && this.state.passwordEntropy >= ENTROPY_THRESHOLDS.WEAK;
  }


  /**
   * Check if the password is part of a dictionary.
   * @return {Promise<boolean>}
   */
  async isPasswordInDictionary() {
    if (!this.state.isPasswordDictionaryCheckRequested || !this.state.isPasswordDictionaryCheckServiceAvailable) {
      return false;
    }

    const {isPwnedServiceAvailable, inDictionary} = await this.pownedService.evaluateSecret(this.state.password);

    if (!isPwnedServiceAvailable) {
      this.setState({isPasswordDictionaryCheckServiceAvailable: false});
      return false;
    }

    return inDictionary;
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
      folder_parent_id: this.props.folderParentId,
      metadata: {
        name: this.state.name,
        username: this.state.username,
        uris: [this.state.uri],
        resource_type_id: this.state.resourceTypeId,
      },
    };

    if (this.props.passwordExpiryContext.isFeatureEnabled()) {
      this.setResourceExpirationDate(resourceDto);
    }

    // Resource types enabled but legacy type requested
    if (this.isLegacyResource) {
      return this.createWithoutEncryptedDescription(resourceDto, this.state.password);
    }

    // Resource types with totp encrypted
    if (this.isTotpResource) {
      const secretDto = this.state.totp.toSecretDto();
      secretDto.password = this.state.password;
      secretDto.description = this.state.description;
      return this.createWithEncryptedDescriptionAndTotp(resourceDto, secretDto);
    }

    // Resource type with encrypted description
    return this.createWithEncryptedDescription(resourceDto, {
      description: this.state.description,
      password: this.state.password
    });
  }

  /**
   * Sets the expiration date on the given resource according to the password expiry settings
   * @param {object}
   */
  setResourceExpirationDate(resourceDto) {
    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    if (!passwordExpirySettings) {
      // no settings are defined, we don't process any expiration date
      return;
    }

    if (!passwordExpirySettings.automatic_update) {
      // the settings are defined such that we don't do any update on a password change.
      return;
    }

    if (passwordExpirySettings.default_expiry_period == null) {
      // settings say we need to update the expiration date but the default_expiry_period is null so, we mark the resource as "not expired".
      resourceDto.expired = null;
      return;
    }

    // we have to update the expiration date in future based on the configuration.
    const date = DateTime.utc().plus({days: passwordExpirySettings.default_expiry_period});
    resourceDto.expired = date.toISO();
  }

  /**
   * Create with encrypted description type
   *
   * @param {object} resourceDto
   * @param {object} secretDto
   * @returns {Promise<*>}
   */
  async createWithEncryptedDescription(resourceDto, secretDto) {
    resourceDto.resource_type_id = this.state.resourceTypeId;
    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Create with encrypted description and totp type
   *
   * @param {object} resourceDto
   * @param {object} secretDto
   * @returns {Promise<*>}
   */
  async createWithEncryptedDescriptionAndTotp(resourceDto, secretDto) {
    resourceDto.resource_type_id = this.state.resourceTypeId;
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
    resourceDto.resource_type_id = this.resourceTypesSettings.findResourceTypeIdBySlug(
      this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
    );
    resourceDto.metadata.description = this.state.description;

    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretString);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(resource) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been added successfully"));
    this.props.history.push(`/app/passwords/view/${resource.id}`);
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
      [name]: value,
    };

    if (name === "password") {
      newState.passwordInDictionary = false;
      if (value.length) {
        newState.passwordEntropy = SecretGenerator.entropy(value);
      } else {
        newState.passwordEntropy = null;
      }
    }
    this.setState(newState);
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

    const password = SecretGenerator.generate(this.state.generatorSettings);
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
   * Handle close
   */
  async handleClose() {
    // ensure the secret generator settings are back to the organisation's default in case a new secret is generated later
    await this.props.resourcePasswordGeneratorContext.resetSecretGeneratorSettings();
    this.props.onClose();
  }

  /**
   * Switch to toggle description field encryption
   */
  handleDescriptionToggle() {
    const isCurrentlyEncrypted = this.mustEncryptDescription;
    // Description must be encrypted if totp has been added
    if (isCurrentlyEncrypted && this.isLegacyResourceTypeEnabled() && !this.hasTotp) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
      );
      this.setState({resourceTypeId});
    } else if (!isCurrentlyEncrypted && this.isEncryptedDescriptionEnabled()) {
      const resourceTypeId = this.resourceTypesSettings.findResourceTypeIdBySlug(
        this.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
      );
      this.setState({resourceTypeId});
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
            <div className={`input text ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-uri"><Trans>URI</Trans>{this.state.uriWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text" onKeyUp={this.handleUriInputKeyUp}
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.state.processing}/>
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
              <textarea id="create-password-form-description" name="description" maxLength="10000"
                placeholder={this.translate("Add a description")} value={this.state.description}
                disabled={this.state.processing}  onKeyUp={this.handleDescriptionInputKeyUp} onChange={this.handleInputChange}>
              </textarea>
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
  folderParentId: PropTypes.string, // The folder parent id
  onClose: PropTypes.func, // Whenever the component must be closed
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  workflowContext: PropTypes.any, // The workflow context
};

export default  withRouter(withAppContext(withPasswordPolicies(withPasswordExpiry(withActionFeedback(withResourcePasswordGeneratorContext(withDialog(withWorkflow(withTranslation('common')(CreateResource)))))))));

