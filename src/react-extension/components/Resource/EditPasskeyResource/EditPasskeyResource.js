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
 * @since         5.18.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import AddResourceName from "../ResourceForm/AddResourceName";
import { withResourceTypesLocalStorage } from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceMetadataEntity from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity";

/**
 * Edit a passkey resource. Only the name is editable and the secret is never decrypted: the form submits the
 * resource with its updated metadata only.
 */
class EditPasskeyResource extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: props.resource.metadata.name,
      isProcessing: false,
    };
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * The resource as displayed by the form, with the name being edited.
   * @returns {object}
   */
  get resource() {
    return { ...this.props.resource, metadata: { ...this.props.resource.metadata, name: this.state.name } };
  }

  /**
   * Handle the name input change.
   * @param {Event} event The input event
   */
  handleInputChange(event) {
    this.setState({ name: event.target.value });
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

    this.setState({ isProcessing: true });
    await this.props.onSubmit(this.toResourceDto());
  }

  /**
   * The resource DTO to update: the resource properties with the metadata carrying the new name, "no name" when
   * empty. The other metadata properties, such as the credential id, are kept as is.
   * @returns {object}
   */
  toResourceDto() {
    const { id, resource_type_id, folder_parent_id, expired } = this.props.resource;
    const name = this.state.name || "no name";
    const metadata = new ResourceMetadataEntity({ ...this.props.resource.metadata, name });
    return {
      id,
      resource_type_id,
      folder_parent_id,
      expired,
      metadata: metadata.toDto(ResourceMetadataEntity.DEFAULT_CONTAIN),
    };
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.translate("Edit a passkey")}
        className="edit-resource edit-passkey-resource"
        disabled={this.state.isProcessing}
        onClose={this.handleClose}
      >
        <form className="grid-and-footer" onSubmit={this.handleFormSubmit} noValidate>
          <div className="grid">
            <AddResourceName
              resource={this.resource}
              resourceType={this.props.resourceTypes.getFirstById(this.props.resource.resource_type_id)}
              onChange={this.handleInputChange}
              disabled={this.state.isProcessing}
            />
          </div>
          <div className="submit-wrapper">
            <FormCancelButton disabled={this.state.isProcessing} onClick={this.handleClose} />
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.state.isProcessing}
              processing={this.state.isProcessing}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditPasskeyResource.propTypes = {
  resource: PropTypes.object.isRequired, // The passkey resource to edit
  onSubmit: PropTypes.func.isRequired, // Receives the resource DTO to update
  onClose: PropTypes.func,
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  t: PropTypes.func, // The translation function
};

export default withResourceTypesLocalStorage(withTranslation("common")(EditPasskeyResource));
