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
import ResourcePasswordDescriptionViewModel from "../../../../shared/models/resource/ResourcePasswordDescriptionViewModel";
import ResourcePasswordStringViewModel from "../../../../shared/models/resource/ResourcePasswordStringViewModel";
import EntityValidationError from "../../../../shared/models/entity/abstract/entityValidationError";
import ResourceViewModel from "../../../../shared/models/resource/ResourceViewModel";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import ResourceViewModelFactory from "../../../../shared/models/resource/ResourceViewModelFactory";
import EditSVG from "../../../../img/svg/edit.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import DiceSVG from "../../../../img/svg/dice.svg";
import SettingSVG from "../../../../img/svg/settings.svg";
import LockSVG from "../../../../img/svg/lock.svg";
import UnlockSVG from "../../../../img/svg/unlock.svg";

class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
    this.createInputRef();
  }

  get defaultState() {
    return {
      resourceViewModel: null,
      errors: new EntityValidationError(), //the validation errors set
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPasswordDictionaryCheckRequested: true, // Is the password check against a dictionary request.
      isPasswordDictionaryCheckServiceAvailable: true, // Is the password dictionary check service available.
      passwordInDictionary: false,
      passwordEntropy: null,
      generatorSettings: null,
      processing: false,
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleLastGeneratedPasswordChanged = this.handleLastGeneratedPasswordChanged.bind(this);
    this.handleTotpClick = this.handleTotpClick.bind(this);
    this.applyTotp = this.applyTotp.bind(this);
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
    this.initResourceViewModel();
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
   * Initialize the resource view model
   */
  initResourceViewModel() {
    const dto = {
      folder_parent_id: this.props.folderParentId,
      resource_type_id: this.props.resourceType.id
    };

    const expiryDate = this.getResourceExpirationDate();
    if (typeof(expiryDate) !== "undefined") {
      dto.expired = expiryDate;
    }

    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(this.props.resourceType, dto);
    this.setState({resourceViewModel});
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
   * Request password not reaching minimum entropy creation confirmation.
   */
  handlePasswordMinimumEntropyNotReached() {
    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.CREATE,
      rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      resourceName: this.state.resourceViewModel.name,
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
      resourceName: this.state.resourceViewModel.name,
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
      const createdResource = await this.createResource();
      await this.handleSaveSuccess(createdResource);
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
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
   * @returns {EntityValidationError}
   */
  validate() {
    const errors = this.state.resourceViewModel.validate(ResourceViewModel.CREATE_MODE);
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
   *  Create resource
   * =============================================================
   */
  /**
   * Create the resource
   * @returns {Promise<Object>} returns the newly created resource
   */
  createResource() {
    const resourceDto = this.state.resourceViewModel.toResourceDto();
    const secretDto = this.state.resourceViewModel.toSecretDto();
    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Get the expiration date on the given resource according to the password expiry settings.
   * The value is set to `undefined` if the feature is not activated,
   * otherwise it is set to `null` if the expiration date must be unset
   * or else a `DateTime` at when the expiration should occur.
   * @returns {DateTime|null|undefined}
   */
  getResourceExpirationDate() {
    if (!this.props.passwordExpiryContext.isFeatureEnabled()) {
      return undefined;
    }

    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    if (!(passwordExpirySettings?.automatic_update)) {
      return undefined;
    }

    if (passwordExpirySettings.default_expiry_period == null) {
      return null;
    }

    return DateTime.utc().plus({days: passwordExpirySettings.default_expiry_period}).toISO();
  }

  /**
   * Handle save operation success.
   * @param {object} createdResource
   * @returns {Promise<void>}
   */
  async handleSaveSuccess(createdResource) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been added successfully"));
    this.props.history.push(`/app/passwords/view/${createdResource.id}`);
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
    if (error.name !== "UserAbortsOperationError") {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
    }
  }

  /**
   * Handle any unexpected errors.
   * @param error
   */
  handleError(error) {
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Focus the first field of the form which is in error state.
   * @param {EntityValidationError} validationErrors
   */
  focusFirstFieldError(validationErrors) {
    if (validationErrors.hasError("name")) {
      this.nameInputRef.current.focus();
    } else if (validationErrors.hasError("password")) {
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
      newState.errors = newState.resourceViewModel.validate();
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
    if (this.state.processing) {
      return;
    }

    const password = SecretGenerator.generate(this.state.generatorSettings);
    const passwordEntropy = SecretGenerator.entropy(password);

    const resourceViewModel = this.state.resourceViewModel.cloneWithMutation("password", password);

    this.setState({
      resourceViewModel,
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
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: this.props.resourceType.id,
    };
    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(this.props.resourceType, dto);
    this.setState({resourceViewModel});
  }

  /**
   * Apply the totp
   * @param {object} totp
   */
  applyTotp(totp) {
    let resourceType;
    if (this.props.resourceType.isV5()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG);
    } else if (this.props.resourceType.isV4()) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG);
    }
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id,
      totp: totp
    };
    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, dto);
    this.setState({resourceViewModel});
  }

  /**
   * Handle close
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
  handleDescriptionToggle() {
    const resourceViewModel = this.state.resourceViewModel;
    if (!resourceViewModel.canToggleDescription()) {
      return;
    }

    const newResourceViewModelType = resourceViewModel.isDescriptionUnencrypted()
      ? ResourcePasswordDescriptionViewModel
      : ResourcePasswordStringViewModel;

    const resourceType = this.props.resourceTypes.getFirstBySlug(newResourceViewModelType.resourceTypeSlug);
    const dto = {
      ...this.state.resourceViewModel,
      resource_type_id: resourceType.id
    };

    const newResourceViewModel = new newResourceViewModelType(dto);
    this.setState({resourceViewModel: newResourceViewModel});
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
    return this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Has a totp
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

    const isNameError = this.state.errors.hasError("name", "required");
    const isPasswordError = this.state.errors.hasError("password", "required");

    const isMaxLengthNameWarning = this.isFieldMaxSizeReached("name");
    const isMaxLengthUriWarning = this.isFieldMaxSizeReached("uri");
    const isMaxLengthUsernameWarning = this.isFieldMaxSizeReached("username");
    const isMaxLengthPasswordWarning = this.isFieldMaxSizeReached("password");
    const isMaxLengthDescriptionWarning = this.isFieldMaxSizeReached("description");

    const resourceViewModel = this.state.resourceViewModel;

    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;
    return (
      <DialogWrapper title={this.translate("Create a password")} className="create-password-dialog"
        disabled={this.state.processing} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${isNameError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-name"><Trans>Name</Trans>{isMaxLengthNameWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-name" name="name" type="text" value={resourceViewModel.name || ""} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
              {isNameError &&
                <div className="name error-message"><Trans>A name is required.</Trans></div>
              }
              {isMaxLengthNameWarning &&
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                </div>
              }
            </div>
            <div className={`input text ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-uri"><Trans>URI</Trans>{isMaxLengthUriWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                autoComplete="off" value={resourceViewModel.uri || ""} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.state.processing}/>
              {isMaxLengthUriWarning &&
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                </div>
              }
            </div>
            <div className={`input text ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-username"><Trans>Username</Trans>{isMaxLengthUsernameWarning && <Icon name="exclamation" />}</label>
              <input id="create-password-form-username" name="username" type="text" className="fluid" maxLength="255"
                autoComplete="off" value={resourceViewModel.username || ""} onChange={this.handleInputChange} placeholder={this.translate("Username")}
                disabled={this.state.processing}/>
              {isMaxLengthUsernameWarning &&
                <div className="username warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
                </div>
              }
            </div>
            <div className={`input-password-wrapper input required ${isPasswordError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-password">
                <Trans>Password</Trans>{isMaxLengthPasswordWarning && <Icon name="exclamation"/>}
              </label>
              <div className="password-button-inline">
                <Password id="create-password-form-password"
                  name="password"
                  autoComplete="new-password"
                  placeholder={this.translate("Password")}
                  preview={true}
                  value={resourceViewModel.password || ""}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  inputRef={this.passwordInputRef}/>
                <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                  className={`password-generate button-icon ${this.state.processing ? "disabled" : ""}`}>
                  <DiceSVG/>
                  <span className="visually-hidden"><Trans>Generate</Trans></span>
                </button>
                {this.canUsePasswordGenerator &&
                  <button type="button" onClick={this.handleOpenGenerator}
                    className={`password-generator button-icon ${this.state.processing ? "disabled" : ""}`}>
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
                <div className="password warning-message"><strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans></div>
              }
            </div>
            <div className={`input textarea ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-password-form-description"><Trans>Description</Trans>
                {isMaxLengthDescriptionWarning &&
                  <Icon name="exclamation"/>
                }
                <button type="button" onClick={this.handleDescriptionToggle} className="button-transparent inline lock-toggle">
                  {resourceViewModel.isDescriptionUnencrypted() ? (
                    <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                      <UnlockSVG/>
                    </Tooltip>
                  ) : (
                    <Tooltip message={this.translate("The description content will be encrypted.")}>
                      <LockSVG/>
                    </Tooltip>
                  )}
                </button>
              </label>
              <textarea id="create-password-form-description" name="description" maxLength="10000"
                placeholder={this.translate("Add a description")} value={resourceViewModel.description || ""}
                disabled={this.state.processing} onChange={this.handleInputChange}>
              </textarea>
              {isMaxLengthDescriptionWarning &&
                <div className="description warning-message"><strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans></div>
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
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource types collection
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  workflowContext: PropTypes.any, // The workflow context
};

export default  withRouter(withAppContext(withPasswordPolicies(withResourceTypesLocalStorage(withPasswordExpiry(withActionFeedback(withResourcePasswordGeneratorContext(withDialog(withWorkflow(withTranslation('common')(CreateResource))))))))));

