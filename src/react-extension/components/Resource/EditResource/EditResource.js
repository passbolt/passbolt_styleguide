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
import PownedService from '../../../../shared/services/api/secrets/pownedService';
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import Totp from "../../../../shared/components/Totp/Totp";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {DateTime} from "luxon";
import ConfirmCreateEdit, {
  ConfirmEditCreateOperationVariations,
  ConfirmEditCreateRuleVariations
} from "../ConfirmCreateEdit/ConfirmCreateEdit";
import {ENTROPY_THRESHOLDS} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import EntityValidationError from "../../../../shared/models/entity/abstract/entityValidationError";
import ResourceViewModel from "../../../../shared/models/resource/ResourceViewModel";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceViewModelFactory from "../../../../shared/models/resource/ResourceViewModelFactory";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import EditSVG from "../../../../img/svg/edit.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import DiceSVG from "../../../../img/svg/dice.svg";
import SettingSVG from "../../../../img/svg/settings.svg";
import LockSVG from "../../../../img/svg/lock.svg";
import UnlockSVG from "../../../../img/svg/unlock.svg";
import AttentionSVG from "../../../../img/svg/attention.svg";
import SelectResourceForm from "../ResourceForm/SelectResourceForm";
import KeySVG from "../../../../img/svg/key.svg";

class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
    this.createInputRef();
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      resourceViewModel: null,
      originalResourceType: null, // The original resource type of the resource
      originalSecret: null, // The original secret of the resource
      resourceType: null, // The actual resource type of the resource when editing
      errors: new EntityValidationError(), //the validation errors set
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPasswordDictionaryCheckRequested: true, // Is the password check against a dictionary request.
      isPasswordDictionaryCheckServiceAvailable: true, // Is the password dictionary check service available.
      passwordInDictionary: false,
      passwordEntropy: null,
      generatorSettings: null,
      isSecretDecrypting: true,
      processing: false,
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
    this.handleTotpClick = this.handleTotpClick.bind(this);
    this.handleDeleteTotpClick = this.handleDeleteTotpClick.bind(this);
    this.applyTotp = this.applyTotp.bind(this);
    this.save = this.save.bind(this);
    this.rejectEditionConfirmation = this.rejectEditionConfirmation.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.passwordInputRef = React.createRef();
  }

  /**
   * Whenever the component has been mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    this.initializeResourceViewModel();
    await this.props.passwordPoliciesContext.findPolicies();
    this.initPwnedPasswordService();
    this.initPasswordGeneratorConfiguration();
  }

  /**
   * Whenever the component has been changed (props)
   * @param {object} prevProps The previous component props
   */
  componentDidUpdate(prevProps) {
    this.handleLastGeneratedPasswordChanged(prevProps.resourcePasswordGeneratorContext.lastGeneratedPassword);
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

  /**
   * initialize the resource view model
   */
  initializeResourceViewModel() {
    const resourceType = this.props.resourceTypes.getFirstById(this.props.resource.resource_type_id);

    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndEntityDto(resourceType, this.props.resource);

    this.setState({
      resourceViewModel: resourceViewModel,
      originalResourceType: resourceType,
      resourceType: resourceType,
    }, this.initializeSecret);
  }


  /**
   * Initialize the secret associated to the resource
   * @returns {Promise<void>}
   */
  async initializeSecret() {
    let decryptedSecret;
    try {
      decryptedSecret = await this.props.context.port.request("passbolt.secret.find-by-resource-id", this.props.resource.id);
    } catch (error) {
      this.handleClose();
    }
    const resourceViewModel = this.state.resourceViewModel.updateSecret(decryptedSecret);
    const passwordEntropy = SecretGenerator.entropy(resourceViewModel.password);

    this.setState({
      isSecretDecrypting: false,
      originalSecret: decryptedSecret,
      passwordEntropy: passwordEntropy,
      resourceViewModel: resourceViewModel,
    });
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

    const resourceViewModel = this.state.resourceViewModel.cloneWithMutation("password", lastGeneratedPassword);

    this.setState({
      resourceViewModel,
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

  /**
   * Must encrypt the description
   * @returns {boolean}
   */
  get mustEncryptDescription() {
    return !this.state.resourceViewModel.isDescriptionUnencrypted();
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.processing) {
      return;
    }

    this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    const validationErrors = this.validate();
    if (validationErrors.hasErrors()) {
      await this.toggleProcessing();
      this.focusFirstFieldError(validationErrors);
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
   * Request password not reaching minimum entropy edition confirmation.
   */
  handlePasswordMinimumEntropyNotReached() {
    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.EDIT,
      rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      resourceName: this.state.resourceViewModel.name,
      onConfirm: this.save,
      onReject: this.rejectEditionConfirmation
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
      operation: ConfirmEditCreateOperationVariations.EDIT,
      rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
      resourceName: this.state.resourceViewModel.name,
      onConfirm: this.save,
      onReject: this.rejectEditionConfirmation
    };
    this.props.dialogContext.open(ConfirmCreateEdit, confirmCreationDialog);
  }

  /**
   * Reject the creation confirmation.
   * @returns {Promise<void>}
   */
  async rejectEditionConfirmation() {
    await this.toggleProcessing();
    this.passwordInputRef.current.focus();
  }

  /**
   * Save the resource
   * @returns {Promise<void>}
   */
  async save() {
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
   * @returns {EntityValidationError}
   */
  validate() {
    const errors = this.state.resourceViewModel.validate(ResourceViewModel.EDIT_MODE);
    this.setState({errors});
    return errors;
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
   * @returns {Promise<boolean>}
   */
  async isPasswordInDictionary() {
    if (!this.state.isPasswordDictionaryCheckRequested || !this.state.isPasswordDictionaryCheckServiceAvailable) {
      return false;
    }

    const {isPwnedServiceAvailable, inDictionary} = await this.pownedService.evaluateSecret(this.state.resourceViewModel.password);

    if (!isPwnedServiceAvailable) {
      this.setState({isPasswordDictionaryCheckServiceAvailable: false});
      return false;
    }

    return inDictionary;
  }

  /*
   * =============================================================
   *  Update resource
   * =============================================================
   */
  /**
   * Update the resource
   * @returns {Promise<void>}
   */
  async updateResource() {
    const isSecretChanged = this.state.resourceViewModel.areSecretsDifferent(this.state.originalSecret);
    if (!isSecretChanged) {
      await this.props.context.port.request("passbolt.resources.update", this.state.resourceViewModel.toResourceDto(), null);
      return;
    }

    let resourceViewModel = this.state.resourceViewModel;
    if (this.shouldUpdateExpirationDate()) {
      resourceViewModel = this.state.resourceViewModel.cloneWithMutation("expired", this.getResourceExpirationDate());
    }

    const resourceDto = resourceViewModel.toResourceDto();
    const secretDto = this.state.resourceViewModel.toSecretDto();
    await this.props.context.port.request("passbolt.resources.update", resourceDto, secretDto);
  }

  /**
   * Returns true if the expiration date of the resource should be updated.
   * @returns {boolean}
   */
  shouldUpdateExpirationDate() {
    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    if (!passwordExpirySettings?.automatic_update) {
      return false;
    }

    return this.state.resourceViewModel.password !==  this.state.originalSecret.password;
  }

  /**
   * Get the expiration date on the given resource according to the password expiry settings
   * @returns {DateTime|null}
   */
  getResourceExpirationDate() {
    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    if (passwordExpirySettings.default_expiry_period == null) {
      // settings say we need to update the expiration date but the default_expiry_period is null so, we mark the resource as "not expired".
      return null;
    }

    // we have to update the expiration date in future based on the configuration.
    return DateTime.utc().plus({days: passwordExpirySettings.default_expiry_period}).toISO();
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
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
   * @param {Error} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name !== "UserAbortsOperationError") {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
    }
  }

  /**
   * handle error to display the error dialog
   * @param {Error} error
   */
  handleError(error) {
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Focus the first field of the form which is in error state.
   * @param {EntityValidationError} validationErrors
   */
  focusFirstFieldError(validationErrors) {
    if (validationErrors.hasError("password")) {
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
    const name = target.name;
    const value = target.value || null;

    const newState = {
      resourceViewModel: this.state.resourceViewModel.cloneWithMutation(name, value),
    };

    if (name === "password") {
      newState.passwordInDictionary = false;
      newState.passwordEntropy = value?.length
        ? SecretGenerator.entropy(value)
        : null;
    }

    if (this.state.hasAlreadyBeenValidated) {
      newState.errors = newState.resourceViewModel.validate(ResourceViewModel.EDIT_MODE);
    }

    this.setState(newState);
  }

  /**
   * Returns true if the `maxLength` property of the given field has been reached.
   * @param {string} fieldName
   * @returns {boolean}
   */
  isFieldMaxSizeReached(fieldName) {
    const schema = this.state.resourceViewModel.constructor.getSchema();
    if (typeof(schema.properties[fieldName]?.maxLength) === "undefined") {
      return false;
    }

    return this.state.resourceViewModel[fieldName]?.length >= schema.properties[fieldName].maxLength;
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
    const resourceViewModel = this.state.resourceViewModel.cloneWithMutation("password", password);
    this.setState({resourceViewModel, passwordEntropy, passwordInDictionary: false});
    this.isPasswordInDictionary(password);
  }

  /**
   * Whenever the user wants to open the password generator
   */
  handleOpenGenerator() {
    this.props.dialogContext.open(GenerateResourcePassword);
  }

  /**
   * Handle click on totp button
   */
  handleTotpClick() {
    const totp = this.state.resourceViewModel.totp;
    const mode = totp
      ? TotpWorkflowMode.EDIT_TOTP
      : TotpWorkflowMode.ADD_TOTP;
    const onApply = this.applyTotp;
    this.props.workflowContext.start(HandleTotpWorkflow, {mode, totp, onApply});
  }

  /**
   * Handle delete totp
   */
  handleDeleteTotpClick() {
    let resourceType;
    if (this.state.resourceType.isV5()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.state.resourceType.isV4()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    }
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id,
    };
    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, dto);
    this.setState({resourceViewModel, resourceType});
  }

  /**
   * Apply the totp
   * @param {object} totp
   */
  applyTotp(totp) {
    let resourceType;
    if (this.state.resourceType.isV5()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG);
    } else if (this.state.resourceType.isV4()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG);
    }
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id,
      totp: totp
    };
    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, dto);
    this.setState({resourceViewModel, resourceType});
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
   * @returns {Promise<void>}
   */
  async handleDescriptionToggle() {
    const isOriginalResourceSlugInitialized = this.state.originalResourceType !== null;
    if (!isOriginalResourceSlugInitialized) {
      //let's ensure we know the resource slug before running any checks.
      return false;
    }

    //only a resource of type `password-string` can toggle its description field encryption state in the edit form.
    const isOriginalResourcePasswordString =  this.state.originalResourceType.isPasswordString();
    if (!isOriginalResourcePasswordString) {
      return false;
    }

    const canToggleDescription = this.state.resourceViewModel.canToggleDescription();
    if (!canToggleDescription) {
      return;
    }

    // Get the resource type associated to the version
    let resourceType;
    if (this.state.originalResourceType.isV5()) {
      resourceType = this.state.resourceViewModel.isDescriptionUnencrypted()
        ? this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG)
        : this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG);
    } else if (this.state.originalResourceType.isV4()) {
      resourceType = this.state.resourceViewModel.isDescriptionUnencrypted()
        ? this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG)
        : this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_STRING_SLUG);
    }

    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id
    };

    const newResourceViewModel = new ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, dto);
    this.setState({resourceViewModel: newResourceViewModel, resourceType: resourceType});
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
    return this.state.isSecretDecrypting
      ? this.translate("Decrypting")
      : this.translate("Password");
  }

  /**
   * Get the description placeholder text depending on state
   * @returns {string}
   */
  getDescriptionPlaceholder() {
    return this.state.isSecretDecrypting && this.mustEncryptDescription
      ? this.translate("Decrypting")
      : this.translate("Description");
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns true if the password input should be disabled.
   * @returns {boolean}
   */
  isPasswordDisabled() {
    return this.state.isSecretDecrypting;
  }

  /**
   * Returns true if the description textarea should be disabeld.
   * @returns {boolean}
   */
  isDescriptionDisabled() {
    return (this.state.isSecretDecrypting && !this.state.resourceViewModel.isDescriptionUnencrypted());
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
    return this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Returns true if the current resourceViewModel has a totp set
   * @returns {boolean}
   */
  get hasTotp() {
    return Boolean(this.state.resourceViewModel.totp);
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
    const isReady = this.state.resourceViewModel !== null;
    if (!isReady) {
      return null;
    }

    const isPasswordError = this.state.errors.hasError("password", "required");

    const isMaxLengthNameWarning = this.isFieldMaxSizeReached("name");
    const isMaxLengthUriWarning = this.isFieldMaxSizeReached("uri");
    const isMaxLengthUsernameWarning = this.isFieldMaxSizeReached("username");
    const isMaxLengthPasswordWarning = this.isFieldMaxSizeReached("password");
    const isMaxLengthDescriptionWarning = this.isFieldMaxSizeReached("description");

    const resourceViewModel = this.state.resourceViewModel;

    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;
    return (
      <DialogWrapper title={this.translate("Edit resource")} className="edit-resource"
        disabled={this.hasAllInputDisabled()} onClose={this.handleClose}>
        <SelectResourceForm resourceType={this.state.resourceType}/>
        <form className="grid-and-footer" onSubmit={this.handleFormSubmit} noValidate>
          <div className="grid">
            <div className="resource-info">
              <div className="resource-icon">
                <KeySVG/>
              </div>
              <div className="information">
                <div className="input text">
                  <input id="resource-name" name="name" type="text" value={resourceViewModel.name || ""} onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()} maxLength="255" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
                  {isMaxLengthNameWarning &&
                    <div className="name warning-message">
                      <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="edit-workspace">
              <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label htmlFor="edit-password-form-uri"><Trans>URI</Trans>{isMaxLengthUriWarning && <AttentionSVG className="attention-required"/>}</label>
                <input id="edit-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                  autoComplete="off" value={resourceViewModel.uri || ""} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                  disabled={this.hasAllInputDisabled()}/>
                {isMaxLengthUriWarning && (
                  <div className="uri warning-message">
                    <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                  </div>
                )}
              </div>
              <div className={`input text ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label htmlFor="edit-password-form-username"><Trans>Username</Trans>{isMaxLengthUsernameWarning && <AttentionSVG className="attention-required"/>}</label>
                <input id="edit-password-form-username" name="username" type="text" className="fluid" maxLength="255"
                  autoComplete="off" value={resourceViewModel.username || ""} onChange={this.handleInputChange}
                  placeholder={this.translate("Username")}
                  disabled={this.hasAllInputDisabled()}/>
                {isMaxLengthUsernameWarning && (
                  <div className="username warning-message">
                    <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                  </div>
                )}
              </div>
              <div className={`input-password-wrapper input required ${isPasswordError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label htmlFor="edit-password-form-password">
                  <Trans>Password</Trans>{isMaxLengthPasswordWarning && <AttentionSVG className="attention-required"/>}
                </label>
                <div className="password-button-inline">
                  <Password id="edit-password-form-password" name="password"
                    value={resourceViewModel.password || ""}
                    placeholder={this.getPasswordInputPlaceholder()}
                    onChange={this.handleInputChange}
                    autoComplete="new-password"
                    disabled={this.hasAllInputDisabled() || this.isPasswordDisabled()}
                    preview={true}
                    inputRef={this.passwordInputRef}
                  />
                  <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                    className={`password-generate button-icon ${this.hasAllInputDisabled() || this.isPasswordDisabled() ? "disabled" : ""}`}>
                    <DiceSVG/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </button>
                  {this.canUsePasswordGenerator &&
                    <button type="button" onClick={this.handleOpenGenerator}
                      className={`password-generator button-icon ${this.hasAllInputDisabled() || this.isPasswordDisabled() ? "disabled" : ""}`}>
                      <SettingSVG/>
                      <span className="visually-hidden"><Trans>Open generator</Trans></span>
                    </button>
                  }
                </div>
                <PasswordComplexity entropy={passwordEntropy} error={isPasswordError}/>
                {isPasswordError &&
                  <div className="password error-message"><Trans>A password is required.</Trans></div>
                }
                {isMaxLengthPasswordWarning &&
                  <div className="password warning-message">
                    <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                  </div>
                }
              </div>
              <div className={`input textarea ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                <label htmlFor="edit-password-form-description"><Trans>Description</Trans>
                  {isMaxLengthDescriptionWarning &&
                    <AttentionSVG className="attention-required"/>
                  }
                  {!this.mustEncryptDescription &&
                    <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                      <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                        <UnlockSVG/>
                      </Tooltip>
                    </button>
                  }
                  {this.mustEncryptDescription &&
                    <button type="button" onClick={this.handleDescriptionToggle} className="link inline lock-toggle">
                      <Tooltip message={this.translate("The description content will be encrypted.")}>
                        <LockSVG/>
                      </Tooltip>
                    </button>
                  }
                </label>
                <textarea id="edit-password-form-description" name="description" maxLength="10000"
                  className="required" aria-required={true} placeholder={this.getDescriptionPlaceholder()} value={resourceViewModel.description || ""}
                  disabled={this.hasAllInputDisabled() || this.isDescriptionDisabled()} onChange={this.handleInputChange}>
                </textarea>
                {isMaxLengthDescriptionWarning &&
                  <div className="description warning-message">
                    <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                  </div>
                }
              </div>
              {this.canUseTotp && !this.hasTotp &&
                <div className="input input-totp-wrapper">
                  <button type="button" className="add-totp link no-border link-icon" onClick={this.handleTotpClick} disabled={this.state.processing}>
                    <Icon name="plus-circle"/>
                    <span className="link-label"><Trans>Add TOTP</Trans></span>
                  </button>
                </div>
              }
              {this.canUseTotp && this.hasTotp &&
                <div className={`input input-totp-wrapper ${this.state.processing ? 'disabled' : ''}`}>
                  <label htmlFor="create-password-form-totp"><Trans>TOTP</Trans></label>
                  <div className="input-wrapper-inline totp">
                    <Totp totp={resourceViewModel.totp}/>
                    <button type="button" className="edit-totp button-icon" onClick={this.handleTotpClick} disabled={this.state.processing}>
                      <EditSVG/>
                    </button>
                    <button type="button" className="delete-totp button-icon" onClick={this.handleDeleteTotpClick} disabled={this.state.processing}>
                      <DeleteSVG/>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} processing={this.hasAllInputDisabled()}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditResource.propTypes = {
  resource: PropTypes.object, // The resource to edit
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context,
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  workflowContext: PropTypes.any, // The workflow context
  passwordExpiryContext: PropTypes.object, // The password expiry context
};

export default withAppContext(
  withResourceWorkspace(
    withResourceTypesLocalStorage(
      withResourcePasswordGeneratorContext(
        withActionFeedback(
          withPasswordPolicies(
            withDialog(
              withWorkflow(
                withPasswordExpiry(
                  withTranslation('common')(EditResource))))))))));
