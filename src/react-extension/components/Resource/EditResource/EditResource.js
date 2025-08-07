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
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withTranslation} from "react-i18next";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import SelectResourceForm from "../ResourceForm/SelectResourceForm";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import AddResourceName from "../ResourceForm/AddResourceName";
import OrchestrateResourceForm from "../ResourceForm/OrchestrateResourceForm";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import ConfirmCreateEdit, {
  ConfirmEditCreateOperationVariations,
  ConfirmEditCreateRuleVariations
} from "../ConfirmCreateEdit/ConfirmCreateEdit";
import {ENTROPY_THRESHOLDS} from "../../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import memoize from "memoize-one";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {DateTime} from "luxon";
import EditResourceSkeleton from "./EditResourceSkeleton";
import {
  RESOURCE_TYPE_PASSWORD_STRING_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import CustomFieldsCollection from "../../../../shared/models/entity/customField/customFieldsCollection";

class EditResource extends Component {
  constructor(props) {
    super(props);
    this.initializeResourceForm();
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Ge the default state
   * @returns {*}
   */
  get defaultState() {
    return {
      resource: null, // The resource to edit
      resourceType: null, // the current resource type
      resourceFormSelected: null, // The selected form to display
      originalSecret: null, // The original secret of the resource
      isSecretDecrypting: true,
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
    this.onUpgradeToV5 = this.onUpgradeToV5.bind(this);
    this.handleConvertToDescription = this.handleConvertToDescription.bind(this);
    this.handleConvertToNote = this.handleConvertToNote.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.acceptCreationConfirmation = this.acceptCreationConfirmation.bind(this);
    this.rejectEditionConfirmation = this.rejectEditionConfirmation.bind(this);
    this.consumePasswordEntropyError = this.consumePasswordEntropyError.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * Initialize resource form
   * @returns {Promise<void>}
   */
  async initializeResourceForm() {
    try {
      /*
       * structuredClone (Node > 17) will create a deep clone to not modify the object in reference
       * Warning: if the object has function this will throw an error
       */
      const resourceDto = structuredClone(this.props.resource);
      const secret = await this.getDecryptedSecret();
      this.mergeCustomFieldsMetadataAndSecret(resourceDto, secret);
      resourceDto.secret = secret;
      this.resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: this.props.resourceTypes});
      const passwordEntropy = secret?.password?.length
        ? SecretGenerator.entropy(secret.password)
        : null;

      this.setState({
        isSecretDecrypting: false,
        originalSecret: secret,
        resource: this.resourceFormEntity.toDto(),
        resourceType: this.props.resourceTypes.getFirstById(this.props.resource.resource_type_id),
        resourceFormSelected: this.selectResourceFormByResourceSecretData(),
        passwordEntropy
      });
    } catch (error) {
      // It can happen when the user has closed the passphrase entry dialog by instance.
      if (error?.name === "UserAbortsOperationError" || error?.name === "UntrustedMetadataKeyError") {
        console.warn(error);
        return;
      }
      this.props.dialogContext.open(NotifyError, {error});
      this.handleClose();
    }
  }

  /**
   * Merge custom fields metadata into secret
   * @param {object} resourceDto
   * @param {object} secret
   * @return {void}
   */
  mergeCustomFieldsMetadataAndSecret(resourceDto, secret) {
    if (secret?.custom_fields?.length > 0) {
      const customFieldsMetadataCollection = new CustomFieldsCollection(resourceDto.metadata.custom_fields);
      const customFieldsSecretCollection = new CustomFieldsCollection(secret.custom_fields);
      secret.custom_fields = CustomFieldsCollection.mergeCollectionsMetadataAndSecret(customFieldsMetadataCollection, customFieldsSecretCollection).toDto();
      // Set the custom fields to null to remove the reference in the metadata to not have inconsistency if the user remove the custom fields secret
      resourceDto.metadata.custom_fields = null;
      // Remove the property
      delete resourceDto.metadata.custom_fields;
    }
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
   * Get the decrypted secret associated to the resource
   * @returns {Promise<object>}
   */
  async getDecryptedSecret() {
    return await this.props.context.port.request("passbolt.secret.find-by-resource-id", this.props.resource.id);
  }

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
      onReject: this.rejectEditionConfirmation
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
      onReject: this.rejectEditionConfirmation
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
   * Reject the edition confirmation.
   */
  rejectEditionConfirmation() {
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
   *
   * Sanitize:
   *  - remove empty secret
   *  - add required secret
   *
   * @returns {ResourceFormEntity}
   */
  createAndSanitizeResourceFormEntity() {
    const resourceFormEntity = new ResourceFormEntity(this.state.resource, {validate: false, resourceTypes: this.props.resourceTypes});
    if (resourceFormEntity.metadata.name.length === 0) {
      resourceFormEntity.set("metadata.name", "no name", {validate: false});
    }
    resourceFormEntity.removeEmptySecret({validate: false});
    resourceFormEntity.addRequiredSecret({validate: false});

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
    await this.updateResource(resource);
    await this.handleSaveSuccess();
  }

  /*
   * =============================================================
   *  Update resource
   * =============================================================
   */
  /**
   * Update the resource
   * @param {ResourceFormEntity} resource
   * @returns {Promise<void>}
   */
  async updateResource(resource) {
    const isSecretChanged = resource.secret.areSecretsDifferent(this.state.originalSecret);
    if (this.props.resource.resource_type_id === resource.resourceTypeId) {
      if (!isSecretChanged) {
        await this.props.context.port.request("passbolt.resources.update", resource.toResourceDto(), null);
        return;
      }
    }

    if (isSecretChanged && this.shouldUpdateExpirationDate()) {
      resource.set("expired", this.getResourceExpirationDate());
    }

    const resourceDto = resource.toResourceDto();
    const resourceType = this.props.resourceTypes.getFirstById(resource.resourceTypeId);
    const secretDto = resourceType.isPasswordString() ? resource.toSecretDto().password : resource.toSecretDto();

    await this.props.context.port.request("passbolt.resources.update", resourceDto, secretDto);
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been updated successfully"));
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
   * Is allowed to convert a note
   * @returns {boolean}
   */
  get isAllowedToConvertNote() {
    const resourceType = this.props.resourceTypes.getFirstById(this.props.resource.resource_type_id);
    return resourceType.slug === RESOURCE_TYPE_PASSWORD_STRING_SLUG;
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  get hasAllInputDisabled() {
    return this.state.isProcessing;
  }

  /**
   * Should input be disabled? True if state secret is decrypting
   * @returns {boolean}
   */
  get hasSecretDecrypting() {
    return this.state.isSecretDecrypting;
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

    return this.state.resource.password !==  this.state.originalSecret.password;
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
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * The upgrade to v5 action raised by user
   * @returns {void}
   */
  onUpgradeToV5() {
    this.resourceFormEntity.upgradeToV5();
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    this.setState({resource: this.resourceFormEntity.toDto(), resourceType});
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
      <DialogWrapper title={this.translate("Edit a resource")} className="edit-resource"
        disabled={this.hasAllInputDisabled} onClose={this.handleClose}>
        {this.hasSecretDecrypting &&
          <EditResourceSkeleton/>
        }
        {!this.hasSecretDecrypting &&
          <>
            <SelectResourceForm
              resourceType={this.state.resourceType}
              resourceFormSelected={this.state.resourceFormSelected}
              resource={this.state.resource}
              onAddSecret={this.onAddSecret}
              onDeleteSecret={this.onDeleteSecret}
              onSelectForm={this.onSelectForm}
              canUpgradeResource={this.props.metadataTypeSettings?.allowV4V5Upgrade}
              onUpgradeToV5={this.onUpgradeToV5}
              disabled={this.hasAllInputDisabled}
            />
            <form className="grid-and-footer" onSubmit={this.handleFormSubmit} noValidate>
              <div className="grid">
                <AddResourceName
                  resource={this.state.resource}
                  resourceType={this.state.resourceType}
                  onChange={this.handleInputChange}
                  disabled={this.hasAllInputDisabled}
                  warnings={warnings}
                  errors={errors}
                  onIconClick={this.onSelectForm}
                />
                <div className="edit-workspace">
                  <OrchestrateResourceForm
                    resourceFormSelected={this.state.resourceFormSelected}
                    resource={this.state.resource}
                    resourceType={this.state.resourceType}
                    onChange={this.handleInputChange}
                    onConvertToDescription={this.handleConvertToDescription}
                    onConvertToNote={this.handleConvertToNote}
                    isAllowedToConvertNote={this.isAllowedToConvertNote}
                    passwordEntropy={this.state.passwordEntropy}
                    consumePasswordEntropyError={this.consumePasswordEntropyError}
                    disabled={this.hasAllInputDisabled}
                    warnings={warnings}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="submit-wrapper">
                <FormCancelButton disabled={this.hasAllInputDisabled} onClick={this.handleClose}/>
                <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled} processing={this.state.isProcessing}/>
              </div>
            </form>
          </>
        }
      </DialogWrapper>
    );
  }
}

EditResource.propTypes = {
  context: PropTypes.any, // The application context
  resource: PropTypes.object, // The resource to edit
  onClose: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  dialogContext: PropTypes.object, // The dialog context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  passwordPoliciesContext: PropTypes.object, // The password policy context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  t: PropTypes.func, // The translation function
};

export default withAppContext(withPasswordPolicies(withPasswordExpiry(withMetadataTypesSettingsLocalStorage(withResourceTypesLocalStorage(withActionFeedback(withDialog(withResourceWorkspace(withTranslation('common')(EditResource)))))))));
