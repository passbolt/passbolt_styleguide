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
 * @since         5.0.0
 */
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import memoize from "memoize-one";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import SelectResourceForm from "../ResourceForm/SelectResourceForm";
import OrchestrateResourceForm from "../ResourceForm/OrchestrateResourceForm";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import AddResourceName from "../ResourceForm/AddResourceName";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {DateTime} from "luxon";
import {ResourceEditCreateFormEnumerationTypes} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import {withResourceTypesLocalStorage} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {ENTROPY_THRESHOLDS} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import ConfirmCreateEdit, {ConfirmEditCreateOperationVariations, ConfirmEditCreateRuleVariations} from "../ConfirmCreateEdit/ConfirmCreateEdit";
import {withDialog} from "../../../contexts/DialogContext";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {withRouter} from "react-router-dom";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {
  RESOURCE_TYPE_PASSWORD_STRING_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.resourceFormEntity = new ResourceFormEntity({resource_type_id: this.props.resourceType.id, folder_parent_id: props.folderParentId}, {validate: false, resourceTypes: this.props.resourceTypes});
    this.state = this.defaultState;
    this.passwordEntropyError = false;
    this.bindCallbacks();
  }

  /**
   * Ge the default state
   * @returns {*}
   */
  get defaultState() {
    return {
      resource: this.resourceFormEntity.toDto(), // The resource to create
      resourceFormSelected: this.selectResourceFormByResourceSecretData(), // The selected form to display
      resourceType: this.props.resourceType, // The resource type
      isProcessing: false, // Is the form processing (loading, submitting).
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
      isPasswordDictionaryCheckRequested: true, // Is the password check against a dictionary request.
      passwordEntropy: null, // the current password entropy
      passwordInDictionary: false,
      isPasswordDictionaryCheckServiceAvailable: true,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectForm = this.onSelectForm.bind(this);
    this.onAddSecret = this.onAddSecret.bind(this);
    this.onDeleteSecret = this.onDeleteSecret.bind(this);
    this.handleConvertToDescription = this.handleConvertToDescription.bind(this);
    this.handleConvertToNote = this.handleConvertToNote.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.acceptCreationConfirmation = this.acceptCreationConfirmation.bind(this);
    this.rejectCreationConfirmation = this.rejectCreationConfirmation.bind(this);
    this.consumePasswordEntropyError = this.consumePasswordEntropyError.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    await Promise.all([
      this.props.passwordExpiryContext.findSettings(),
      this.props.passwordPoliciesContext.findPolicies(),
    ]);

    this.initPwnedPasswordService();
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
   * Validate form.
   * @param {object} resourceFormEntityDto The form resource entity dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   *   A clone need to be created before validation to use marshall function from TotpEntity that modify the content but the form should not be modified for the user
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize(resourceFormDto => {
    const resourceFormEntity = new ResourceFormEntity(resourceFormDto, {validate: false, resourceTypes: this.props.resourceTypes});
    resourceFormEntity.removeEmptySecret({validate: false});
    resourceFormEntity.addRequiredSecret({validate: false});
    return resourceFormEntity.validate();
  });

  /**
   * Verify the data health. This intends for user, to inform if data form has invalid size
   * @param {object} resourceFormEntityDto The form resource entity dto settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  verifyDataHealth = memoize(resourceFormDto => this.resourceFormEntity?.verifyHealth());

  /**
   * Selected the resource form by resource type
   * @return {string | null} The selected form
   */
  selectResourceFormByResourceSecretData() {
    if (this.resourceFormEntity?.secret?.password != null) {
      return ResourceEditCreateFormEnumerationTypes.PASSWORD;
    } else if (this.resourceFormEntity?.secret?.totp != null) {
      return ResourceEditCreateFormEnumerationTypes.TOTP;
    } else if (this.resourceFormEntity?.secret?.customFields?.length > 0) {
      return ResourceEditCreateFormEnumerationTypes.CUSTOM_FIELDS;
    } else if (this.resourceFormEntity?.secret?.description != null) {
      return ResourceEditCreateFormEnumerationTypes.NOTE;
    }
    return null;
  }

  /**
   * Select resource form by first error
   * @param {EntityValidationError} errors
   */
  selectResourceFormByFirstError(errors) {
    if (errors.hasError("secret")) {
      if (errors.details.secret.hasError("totp")) {
        this.setState({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP});
      }
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
    let value;
    if (target.type === "number") {
      value = Number.isNaN(target.valueAsNumber) ? "" : target.valueAsNumber;
    } else {
      value = target.value;
    }

    this.resourceFormEntity.set(name, value, {validate: false});

    const newState = {resource: this.resourceFormEntity.toDto()};

    if (name === "secret.password") {
      newState.passwordInDictionary = false;
      newState.passwordEntropy = value?.length
        ? SecretGenerator.entropy(value)
        : null;
    }

    this.setState(newState);
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.isProcessing) {
      return;
    }

    this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    try {
      // Create a clone entity from DTO and remove empty secret and add required secret
      const resourceFormEntity = this.createAndSanitizeResourceFormEntity();

      // Validate the entity
      const validationError = resourceFormEntity.validate();

      if (validationError?.hasErrors()) {
        this.selectResourceFormByFirstError(validationError);
        await this.toggleProcessing();
        return;
      }

      if (!this.isMinimumRequiredEntropyReached()) {
        this.handlePasswordMinimumEntropyNotReached(resourceFormEntity);
        return;
      } else if (await this.isPasswordInDictionary()) {
        this.handlePasswordInDictionary(resourceFormEntity);
        return;
      }

      await this.save(resourceFormEntity);
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
    }
  }

  /**
   * Returns true if the given entropy is greater or equal to the minimum required entropy.
   * @returns {boolean}
   */
  isMinimumRequiredEntropyReached() {
    const hasResourceTypePassword = this.state.resourceType.hasPassword();
    if (!hasResourceTypePassword) {
      return true;
    }

    // we accept empty password in the case of v4 resource type, or we accept null password in the case of v5 resource type
    const isPasswordNotEmpty = Boolean(this.state.resource.secret.password);
    if (!isPasswordNotEmpty) {
      return true;
    }

    return this.state.passwordEntropy
      && this.state.passwordEntropy >= ENTROPY_THRESHOLDS.WEAK;
  }

  /**
   * Check if the password is part of a dictionary.
   * @returns {Promise<boolean>}
   */
  async isPasswordInDictionary() {
    // does the current resource actually has a password
    const hasResourceTypePassword = this.state.resourceType.hasPassword();
    if (!hasResourceTypePassword) {
      return false;
    }

    // we accept empty password in the case of v4 resource type, or we accept null password in the case of v5 resource type
    const isPasswordNotEmpty = Boolean(this.state.resource.secret.password);
    if (!isPasswordNotEmpty) {
      return false;
    }

    const password = this.state.resource.secret.password;
    if (!this.state.isPasswordDictionaryCheckRequested || !this.state.isPasswordDictionaryCheckServiceAvailable) {
      return false;
    }

    const {isPwnedServiceAvailable, inDictionary} = await this.pownedService.evaluateSecret(password);

    if (!isPwnedServiceAvailable) {
      this.setState({isPasswordDictionaryCheckServiceAvailable: false});
      return false;
    }

    return inDictionary;
  }

  /**
   * Request password not reaching minimum entropy creation confirmation.
   * @param {ResourceFormEntity} resourceFormEntity The resource form entity
   */
  handlePasswordMinimumEntropyNotReached(resourceFormEntity) {
    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.CREATE,
      rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      resourceName: this.state.resource?.metadata?.name,
      onConfirm: () => this.acceptCreationConfirmation(resourceFormEntity),
      onReject: this.rejectCreationConfirmation
    };
    this.props.dialogContext.open(ConfirmCreateEdit, confirmCreationDialog);
  }

  /**
   * Request password in dictionary creation confirmation.
   * @param {ResourceFormEntity} resourceFormEntity The resource form entity
   */
  handlePasswordInDictionary(resourceFormEntity) {
    this.setState({
      passwordInDictionary: true,
    });

    const confirmCreationDialog = {
      operation: ConfirmEditCreateOperationVariations.CREATE,
      rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
      resourceName: this.state.resource?.metadata?.name,
      onConfirm: () => this.acceptCreationConfirmation(resourceFormEntity),
      onReject: this.rejectCreationConfirmation
    };
    this.props.dialogContext.open(ConfirmCreateEdit, confirmCreationDialog);
  }

  /**
   * Accept the creation confirmation.
   * @param {ResourceFormEntity} resourceFormEntity The resource form entity
   */
  async acceptCreationConfirmation(resourceFormEntity) {
    try {
      await this.save(resourceFormEntity);
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
    }
  }

  /**
   * Reject the creation confirmation.
   */
  rejectCreationConfirmation() {
    this.passwordEntropyError = true;
    this.setState({
      resourceFormSelected: ResourceEditCreateFormEnumerationTypes.PASSWORD,
      isProcessing: false,
    });
  }

  /**
   * Returns true if the password entropy has been marked as erroneous.
   * The value is then "consumed";
   * @returns {boolean}
   */
  consumePasswordEntropyError() {
    const hasPasswordEntropyError = this.passwordEntropyError;
    this.passwordEntropyError = false;
    return hasPasswordEntropyError;
  }

  /**
   * Create and sanitize resource form entity
   *
   * The user should not be blocked during the creation so the goal is to find the best match between resource type available
   * - Remove empty secret that is required like Totp (this will find the best match for resource type)
   * - Add minimum required secret like password to match resource type
   * Sanitize:
   *  - remove empty secret
   *  - add required secret
   *
   * @returns {ResourceFormEntity}
   */
  createAndSanitizeResourceFormEntity() {
    const resourceFormEntity = new ResourceFormEntity(this.state.resource, {validate: false, resourceTypes: this.props.resourceTypes});
    const expiryDate = this.getResourceExpirationDate();
    if (typeof(expiryDate) !== "undefined") {
      resourceFormEntity.set("expired", expiryDate, {validate: false});
    }
    if (resourceFormEntity.metadata.name.length === 0) {
      resourceFormEntity.set("metadata.name", "no name", {validate: false});
    }
    resourceFormEntity.removeEmptySecret({validate: false});
    resourceFormEntity.addRequiredSecret({validate: false});
    resourceFormEntity.removeUnusedNonEmptyMetadata();

    const resourceType = this.props.resourceTypes.getFirstById(resourceFormEntity.resourceTypeId);
    const shouldResetUsername = !resourceFormEntity.metadata.username
      || resourceFormEntity.metadata.username.length === 0;

    if (shouldResetUsername) {
      const usernameResetValue = resourceType.isStandaloneTotp() ? null : "";
      resourceFormEntity.set("metadata.username", usernameResetValue, {validate: false});
    }

    return resourceFormEntity;
  }

  /**
   * Save the resource
   * @param {ResourceFormEntity} resource
   * @returns {Promise<void>}
   */
  async save(resource) {
    const createdResource = await this.createResource(resource);
    await this.handleSaveSuccess(createdResource);
  }

  /**
   * Create the resource
   * @param {ResourceFormEntity} resource
   * @returns {Promise<Object>} returns the newly created resource
   */
  createResource(resource) {
    const resourceDto = resource.toResourceDto();
    const resourceType = this.props.resourceTypes.getFirstById(resource.resourceTypeId);
    const isV4PasswordString = resourceType.slug === RESOURCE_TYPE_PASSWORD_STRING_SLUG;
    const secretDto = isV4PasswordString ? resource.toSecretDto().password : resource.toSecretDto();
    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Handle save operation success.
   * @param {object} createdResource
   * @returns {Promise<void>}
   */
  async handleSaveSuccess(createdResource) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been added successfully"));
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
    if (error?.name === "UserAbortsOperationError" || error?.name === "UntrustedMetadataKeyError") {
      console.warn(error);
      return;
    }
    console.error(error);
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Toggle processing state when validating / saving
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.isProcessing;
    return new Promise(resolve => {
      this.setState({isProcessing: !prev}, () => resolve());
    });
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Set the state for the resource form selected
   * @param event
   * @param resourceFormSelected
   */
  onSelectForm(event, resourceFormSelected) {
    this.setState({resourceFormSelected});
  }

  /**
   * Add secret to the resourceFormEntity
   * @param {string} secret The secret to add
   */
  onAddSecret(secret) {
    this.resourceFormEntity.addSecret(secret, {validate: false});
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    this.setState({resource: this.resourceFormEntity.toDto(), resourceFormSelected: secret, resourceType});
  }

  /**
   * Delete secret to the resourceFormEntity
   * @param {string} secret The secret to delete
   */
  onDeleteSecret(secret) {
    this.resourceFormEntity.deleteSecret(secret, {validate: false});
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    if (this.state.resourceFormSelected === secret) {
      this.setState({resource: this.resourceFormEntity.toDto(), resourceFormSelected: this.selectResourceFormByResourceSecretData(), resourceType});
    } else {
      this.setState({resource: this.resourceFormEntity.toDto(), resourceType});
    }
  }

  /**
   * Handle convert note to metadata description
   */
  handleConvertToDescription() {
    this.resourceFormEntity.convertToMetadataDescription({validate: false});
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    this.setState({
      resource: this.resourceFormEntity.toDto(),
      resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION,
      resourceType
    });
  }

  /**
   * Handle convert description to secret note
   */
  handleConvertToNote() {
    this.resourceFormEntity.convertToNote({validate: false});
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    this.setState({
      resource: this.resourceFormEntity.toDto(),
      resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE,
      resourceType
    });
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
    const warnings = this.verifyDataHealth(this.state.resource);
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.resource) : null;

    return (
      <DialogWrapper title={this.translate("Create a resource")} className="create-resource"
        disabled={this.state.isProcessing} onClose={this.handleClose}>
        <SelectResourceForm
          resourceType={this.state.resourceType}
          resourceFormSelected={this.state.resourceFormSelected}
          resource={this.state.resource}
          onAddSecret={this.onAddSecret}
          onDeleteSecret={this.onDeleteSecret}
          onSelectForm={this.onSelectForm}
          disabled={this.state.isProcessing}
        />
        <form onSubmit={this.handleFormSubmit} className="grid-and-footer" noValidate>
          <div className="grid">
            <AddResourceName
              resource={this.state.resource}
              resourceType={this.state.resourceType}
              folderParentId={this.props.folderParentId}
              onChange={this.handleInputChange}
              warnings={warnings}
              errors={errors}
              disabled={this.state.isProcessing}
              onIconClick={this.onSelectForm}
            />
            <div className="create-workspace">
              <OrchestrateResourceForm
                resourceFormSelected={this.state.resourceFormSelected}
                resource={this.state.resource}
                resourceType={this.state.resourceType}
                onChange={this.handleInputChange}
                onConvertToDescription={this.handleConvertToDescription}
                onConvertToNote={this.handleConvertToNote}
                isAllowedToConvertNote={true}
                passwordEntropy={this.state.passwordEntropy}
                warnings={warnings}
                errors={errors}
                consumePasswordEntropyError={this.consumePasswordEntropyError}
                disabled={this.state.isProcessing}/>
            </div>
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.state.isProcessing} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Create")} disabled={this.state.isProcessing} processing={this.state.isProcessing}/>
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
  dialogContext: PropTypes.object, // The dialog context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  passwordPoliciesContext: PropTypes.object, // The password policy context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  resourceType: PropTypes.instanceOf(ResourceTypeEntity).isRequired, // The resource types entity
  t: PropTypes.func, // The translation function
};

export default  withRouter(withAppContext(withPasswordPolicies(withPasswordExpiry(withResourceTypesLocalStorage(withActionFeedback(withDialog(withTranslation('common')(CreateResource))))))));

