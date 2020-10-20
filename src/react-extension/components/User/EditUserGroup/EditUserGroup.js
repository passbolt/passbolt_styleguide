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
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";

class EditUserGroup extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
    this.bindHandlers();
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      groupToEdit: { // The group to edit
        groupName: ''
      },
      actions: {
        processing: false // True if one process some operation
      },
      errors: {
        emptyGroupName: false // True if the group's name is empty
      },
      validation: {
        hasAlreadyBeenValidated: false // True when the form has already been submitted
      }
    }
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.populate();
  }

  /**
   * Creates references
   */
  createRefs() {
    this.references = {
      groupName:  React.createRef()
    };
  }

  /**
   * Binds the component handers
   */
  bindHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
  }

  /**
   * The group to edit at component initialization
   */
  get groupToEdit() {
    return this.props.userWorkspaceContext.groupToEdit;
  }

  /**
   * Returns true if the component is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if the current user can perform actions
   */
  get areActionsAllowed() {
    return this.isProcessing;
  }

  /**
   * Return true if there are some errors
   */
  get hasErrors() {
    return this.state.errors.emptyGroupName;
  }

  /**
   * Whenever the group name change
   */
  async handleGroupNameChange(event) {
    await this.updateGroupName(event.target.value);
  }

  /**
   * Whenever the user wants to submit the changes
   * @param event The dom event
   */
  async handleSubmit(event) {
    event.preventDefault();

    await this.validate();
    if (!this.hasErrors) {
      await this.edit()
        .then(this.onEditSuccess.bind(this))
        .catch(this.onEditFailure.bind(this));
    }
  }

  /**
   * Whenever the user will to close the dialog
   */
  handleClose() {
    this.close();
  }

  /**
   * Populate the component with initial data
   */
  async populate() {
    await this.setState({
      groupToEdit: {
        groupName: this.groupToEdit.name
      }
    })
  }

  /**
   * Populates the component with initial data
   */

  /**
   * Changes the group name
   * @param groupName The new name
   */
  async updateGroupName(groupName) {
    await this.setState({groupToEdit: Object.assign({}, this.state.groupToEdit, {groupName})});
  }

  /**
   * Validate the form
   */
  async validate() {
    await this.validateGroupName();
    await this.setState({validation: {...this.state.validation, hasAlreadyBeenValidated: true}});
  }

  /**
   * Validates the group name
   */
  async validateGroupName() {
    const groupName = this.state.groupToEdit.groupName;
    if (groupName.trim() === '') {
      console.log('TOP')
      await this.setState({errors: {...this.state.errors, emptyGroupName: true}});
    }
  }

  /**
   * Edits the current group
   */
  async edit() {
    const payload = {name:  this.state.groupToEdit.groupName};
    await this.context.port.request('passbolt.groups.edit', payload);
  }

  /**
   * Whenever the group has been updated successfully
   * @returns {Promise<void>}
   */
  async onEditSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The group has been updated successfully");
    this.props.onClose();
  }

  /**
   * Whenever the group has been updated successfully
   */
  async onEditFailure(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.onError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  onError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Render the component
   */
  render() {
    const mustRaiseEmptyGroupNameError = this.state.errors.emptyGroupName && this.state.validation.hasAlreadyBeenValidated;
    return (
      <DialogWrapper
        className='user-create-dialog'
        title="Edit group"
        onClose={this.handleClose}
        disabled={this.areActionsAllowed}>

        <form
          className="edit-user-group"
          onSubmit={this.handleSubmit}
          noValidate>

          <div className="form-content">
            <div className={`input text required ${mustRaiseEmptyGroupNameError ? "error" : ""}`}>
              <label htmlFor="js_field_name">Group name</label>
              <input
                id="js_field_name"
                ref={this.references.groupName}
                value={this.state.groupToEdit.groupName}
                maxLength="50"
                type="text"
                placeholder="group name"
                onChange={this.handleGroupNameChange}/>
                {mustRaiseEmptyGroupNameError &&
                  <div className="error message">
                    A name is required
                  </div>
                }
            </div>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="save"
              disabled={this.areActionsAllowed}
              processing={this.isProcessing}/>
            <FormCancelButton
              onClick={this.handleClose}
              disabled={this.areActionsAllowed}/>
          </div>

        </form>

      </DialogWrapper>
    );
  }
}



EditUserGroup.contextType = AppContext;

EditUserGroup.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  userWorkspaceContext: PropTypes.object // The user workspace context
};

export default withUserWorkspace(withActionFeedback(withDialog(EditUserGroup)));
