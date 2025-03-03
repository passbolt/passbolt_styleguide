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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import {withRouter} from "react-router-dom";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withTranslation} from "react-i18next";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import {withPasswordPolicies} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {withWorkflow} from "../../../contexts/WorkflowContext";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import SelectResourceForm from "../ResourceForm/SelectResourceForm";
import {SECRET_DATA_OBJECT_TYPE} from "../../../../shared/models/entity/secretData/secretDataEntity";
import ResourceFormEntity from "../../../../shared/models/entity/resource/resourceFormEntity";
import AddResourceName from "../ResourceForm/AddResourceName";

class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  get defaultState() {
    return {
      resourceFormEntity: null, // The resource to create
      resourceFormSelected: null,
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    this.initResourceFormEntity();
  }

  /**
   * Initialize the resource view model
   */
  initResourceFormEntity() {
    // @Todo update this part to have the resource according to the props and secret initialisation should be in the entity
    const secret = {password: ""};
    if (this.props.resourceType.isV5()) {
      secret.object_type = SECRET_DATA_OBJECT_TYPE;
    }
    const resourceFormSelected = this.props.resourceFormType;
    const resourceFormEntity = new ResourceFormEntity({resource_type_id: this.props.resourceType.id, secret}, {validate: false, resourceTypes: this.props.resourceTypes});
    this.setState({resourceFormEntity, resourceFormSelected});
  }

  /**
   * Handle close
   * @returns {Promise<void>}
   */
  async handleClose() {
    this.props.onClose();
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
        <SelectResourceForm/>
        <form className="grid-and-footer" noValidate>
          <div className="grid">
            <AddResourceName folderParentId={this.props.folderParentId}/>
            <div className="create-workspace">
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
  context: PropTypes.any, // The application context
  history: PropTypes.object, // Router history
  folderParentId: PropTypes.string, // The folder parent id
  resourceFormType: PropTypes.string, // The selected form to start the creation
  onClose: PropTypes.func, // Whenever the component must be closed
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource types entity
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  workflowContext: PropTypes.any, // The workflow context
};

export default  withRouter(withAppContext(withPasswordPolicies(withResourceTypesLocalStorage(withPasswordExpiry(withActionFeedback(withResourcePasswordGeneratorContext(withDialog(withWorkflow(withTranslation('common')(CreateResource))))))))));

