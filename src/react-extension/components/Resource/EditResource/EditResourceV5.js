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
    this.handleConvertToDescription = this.handleConvertToDescription.bind(this);
    this.handleConvertToNote = this.handleConvertToNote.bind(this);
    this.consumePasswordEntropyError = this.consumePasswordEntropyError.bind(this);
  }

  /**
   * Initialize resource form
   * @returns {Promise<void>}
   */
  async initializeResourceForm() {
    const resourceDto = {...this.props.resource};
    const secret = await this.getDecryptedSecret();
    resourceDto.secret = secret;
    this.resourceFormEntity = new ResourceFormEntity(resourceDto, {validate: false, resourceTypes: this.props.resourceTypes});

    this.setState({
      isSecretDecrypting: false,
      originalSecret: secret,
      resource: this.resourceFormEntity.toDto(),
      resourceType: this.props.resourceTypes.getFirstById(this.props.resource.resource_type_id),
      resourceFormSelected: this.selectResourceFormByResourceSecretData()
    });
  }

  /**
   * Get the decrypted secret associated to the resource
   * @returns {Promise<void>}
   */
  async getDecryptedSecret() {
    try {
      return await this.props.context.port.request("passbolt.secret.find-by-resource-id", this.props.resource.id);
    } catch (error) {
      this.handleClose();
    }
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
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  get hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Should input be disabled? True if state secret is decrypting
   * @returns {boolean}
   */
  get hasSecretDecrypting() {
    return this.state.isSecretDecrypting;
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
    return (
      <DialogWrapper title={this.translate("Edit a resource")} className="edit-resource"
        disabled={this.hasAllInputDisabled || this.hasSecretDecrypting} onClose={this.handleClose}>
        <SelectResourceForm
          resourceType={this.state.resourceType}
          resourceFormSelected={this.state.resourceFormSelected}
          resource={this.state.resource}
          onAddSecret={this.onAddSecret}
          onDeleteSecret={this.onDeleteSecret}
          onSelectForm={this.onSelectForm}
          disabled={this.hasAllInputDisabled || this.hasSecretDecrypting}
        />
        <form className="grid-and-footer" noValidate>
          <div className="grid">
            <AddResourceName
              resource={this.state.resource} onChange={this.handleInputChange}/>
            <div className="edit-workspace">
              <OrchestrateResourceForm
                resourceFormSelected={this.state.resourceFormSelected}
                resource={this.state.resource}
                resourceType={this.state.resourceType}
                onChange={this.handleInputChange}
                onConvertToDescription={this.handleConvertToDescription}
                onConvertToNote={this.handleConvertToNote}
                passwordEntropy={this.state.passwordEntropy}
                consumePasswordEntropyError={this.consumePasswordEntropyError}
                disabled={this.hasAllInputDisabled || this.hasSecretDecrypting}/>
            </div>
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.hasAllInputDisabled || this.hasSecretDecrypting} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled || this.hasSecretDecrypting} processing={this.hasAllInputDisabled}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditResource.propTypes = {
  context: PropTypes.any, // The application context
  resource: PropTypes.object, // The resource to edit
  onClose: PropTypes.func,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceTypesLocalStorage(withTranslation('common')(EditResource)));
