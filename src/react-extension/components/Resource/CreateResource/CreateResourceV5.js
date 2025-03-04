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
import {SECRET_DATA_OBJECT_TYPE} from "../../../../shared/models/entity/secretData/secretDataEntity";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import AddResourceName from "../ResourceForm/AddResourceName";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import TotpEntity from "../../../../shared/models/entity/totp/totpEntity";

class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.resourceFormEntity = this.createResourceFromProps;
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
      resourceFormSelected: this.selectResourceFormByResourceType, // The selected form to display
      resourceType: this.props.resourceType // The resource type
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
  }

  /**
   * Initialize the resource form entity and return the DTO
   * @returns {*}
   */
  get createResourceFromProps() {
    // @Todo update this part to have the resource according to the props and secret initialisation should be in the entity
    const secret = {};
    if (this.props.resourceType.hasPassword()) {
      secret.password = "";
    } else if (this.props.resourceType.hasTotp()) {
      secret.totp = TotpEntity.createFromDefault({}, {validate: false});
    }
    if (this.props.resourceType.isV5()) {
      secret.object_type = SECRET_DATA_OBJECT_TYPE;
    }

    return new ResourceFormEntity({resource_type_id: this.props.resourceType.id, secret}, {validate: false, resourceTypes: this.props.resourceTypes});
  }

  /**
   * Initialize the selected resource form
   */
  get selectResourceFormByResourceType() {
    if (this.props.resourceType.hasPassword()) {
      return ResourceEditCreateFormEnumerationTypes.PASSWORD;
    } else if (this.props.resourceType.hasTotp()) {
      return ResourceEditCreateFormEnumerationTypes.TOTP;
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
    const value = target.value || null;

    this.resourceFormEntity.set(name, value, {validate: false});

    this.setState({resource: this.resourceFormEntity.toDto()});
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
   * @param {*} value The secret value to add
   */
  onAddSecret(secret, value) {
    this.resourceFormEntity.addSecret(secret, value, {validate: false});
    const resourceType = this.props.resourceTypes.getFirstById(this.resourceFormEntity.resourceTypeId);
    this.setState({resource: this.resourceFormEntity.toDto(), resourceFormSelected: secret, resourceType});
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
      <DialogWrapper title={this.translate("Create a resource")} className="create-resource"
        disabled={this.state.processing} onClose={this.handleClose}>
        <SelectResourceForm resourceType={this.state.resourceType} resourceFormSelected={this.state.resourceFormSelected}
          resource={this.state.resource} onAddSecret={this.onAddSecret} onSelectForm={this.onSelectForm}/>
        <form className="grid-and-footer" noValidate>
          <div className="grid">
            <AddResourceName resource={this.state.resource} folderParentId={this.props.folderParentId} onChange={this.handleInputChange}/>
            <div className="create-workspace">
              <OrchestrateResourceForm resourceFormSelected={this.state.resourceFormSelected} resource={this.state.resource}/>
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

