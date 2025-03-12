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
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import SelectResourceForm from "../ResourceForm/SelectResourceForm";
import OrchestrateResourceForm from "../ResourceForm/OrchestrateResourceForm";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import AddResourceName from "../ResourceForm/AddResourceName";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import memoize from "memoize-one";

class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.resourceFormEntity = new ResourceFormEntity({resource_type_id: this.props.resourceType.id}, {validate: false, resourceTypes: this.props.resourceTypes});
    this.state = this.defaultState;
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
      hasAlreadyBeenValidated: false // True if the form has already been submitted once.
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
    this.save = this.save.bind(this);
  }

  /**
   * Validate form.
   * @param {object} resourceFormEntityDto The form resource entity dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize(resourceFormDto => this.resourceFormEntity?.validate());

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
    } else if (this.resourceFormEntity?.secret?.description != null) {
      return ResourceEditCreateFormEnumerationTypes.NOTE;
    }
    return null;
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
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value || null;
    this.resourceFormEntity.set(name, value, {validate: false});

    this.setState({resource: this.resourceFormEntity.toDto()});
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.isProcessing) {
      return;
    }

    this.save();
  }

  /**
   * Save the resource
   * @returns {Promise<void>}
   */
  async save() {
    const validationError = this.validateForm(this.state.resource);

    if (validationError?.hasErrors()) {
      const hasAlreadyBeenValidated = true;
      this.setState({hasAlreadyBeenValidated});
      return;
    }

    this.setState({isProcessing: true});

    this.setState({
      hasAlreadyBeenValidated: true,
      isProcessing: false,
    });
  }

  /**
   * Handle close
   * @returns {Promise<void>}
   */
  async handleClose() {
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
        disabled={this.state.processing} onClose={this.handleClose}>
        <SelectResourceForm resourceType={this.state.resourceType} resourceFormSelected={this.state.resourceFormSelected}
          resource={this.state.resource} onAddSecret={this.onAddSecret} onDeleteSecret={this.onDeleteSecret} onSelectForm={this.onSelectForm}/>
        <form onSubmit={this.handleFormSubmit} className="grid-and-footer" noValidate>
          <div className="grid">
            <AddResourceName resource={this.state.resource} folderParentId={this.props.folderParentId} onChange={this.handleInputChange} warnings={warnings}
              errors={errors}/>
            <div className="create-workspace">
              <OrchestrateResourceForm
                resourceFormSelected={this.state.resourceFormSelected}
                resource={this.state.resource}
                resourceType={this.state.resourceType}
                onChange={this.handleInputChange}
                onConvertToDescription={this.handleConvertToDescription}
                onConvertToNote={this.handleConvertToNote}
                warnings={warnings}
                errors={errors}/>
            </div>
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Create")} disabled={this.state.processing} processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateResource.propTypes = {
  folderParentId: PropTypes.string, // The folder parent id
  onClose: PropTypes.func, // Whenever the component must be closed
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  resourceType: PropTypes.instanceOf(ResourceTypeEntity).isRequired, // The resource types entity
  t: PropTypes.func, // The translation function
};

export default  withResourceTypesLocalStorage(withTranslation('common')(CreateResource));

