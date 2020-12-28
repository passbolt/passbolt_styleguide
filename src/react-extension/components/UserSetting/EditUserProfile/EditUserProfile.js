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
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

class EditUserProfile extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
    this.createReferences();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.populate();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      profile: { // The editing user profile data
        first_name: "",
        last_name: "",
        username: ""
      },
      actions: {
        processing: false // True if one is processing the edit
      },
      errors: {
        isFirstnameEmpty: false, // True if the firstname is empty
        isLastnameEmpty: false // True if the lastname is empty
      },
      hasAlreadyBeenValidated: false // True if the data have already been validated once
    };
  }

  /**
   * Return trus if the export is processing
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Returns true if actions can be performed
   */
  get areActionsAllowed() {
    return !this.isProcessing;
  }

  /**
   * True if the edit has validation errors
   */
  get hasErrors() {
    return Object.values(this.state.errors).some(value => value);
  }

  /**
   * Bind  handlers
   */
  bindHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /**
   * Create references
   */
  createReferences() {
    this.firstnameRef = React.createRef();
    this.lastnameRef = React.createRef();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({profile: Object.assign(this.state.profile, {[name]: value})});
    if (this.state.hasAlreadyBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Whenever the user wants to close
   */
  handleClose() {
    this.close();
  }

  /**
   * Whenever the user wants to save the changes on his profile
   * @param event A DOM event
   */
  async handleSave(event) {
    // Avoid the form to be submitted.
    event.preventDefault();
    await this.save();
  }

  /**
   * Populates the component with data
   */
  populate() {
    const {first_name, last_name} = this.context.loggedInUser.profile;
    this.setState({profile: {first_name, last_name}});
  }

  /**
   * Saves the change on the user profile
   */
  async save() {
    await this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();
    await this.validate();
    if (this.hasErrors) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }
    const {id, role_id, username} = this.context.loggedInUser;
    const {profile} = this.state;
    const userToUpdate = {id, role_id, username, profile};
    await this.context.port.request("passbolt.users.update", userToUpdate)
      .then(this.onSaveSuccess.bind(this))
      .catch(this.onSaveError.bind(this));
  }

  /**
   * Whenever the save has been successful
   */
  async onSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The user has been updated successfully");
    const loggedInUser = await this.context.port.request("passbolt.users.find-logged-in-user");
    this.context.setContext({loggedInUser});
    this.props.onClose();
  }

  /**
   * Whenever the save has failed
   * @param error The error
   */
  async onSaveError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Close the component
   */
  close() {
    this.props.onClose();
  }

  /**
   * Validates the edit data
   */
  async validate() {
    const isEmpty = s => s.trim().length === 0;
    const errors = {
      isFirstnameEmpty: isEmpty(this.state.profile.first_name),
      isLastnameEmpty: isEmpty(this.state.profile.last_name)
    };
    await this.setState({errors});
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.errors.isFirstnameEmpty) {
      this.firstnameRef.current.focus();
    } else if (this.state.errors.isLastnameEmpty) {
      this.lastnameRef.current.focus();
    }
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.actions.processing;
    return this.setState({actions: Object.assign(this.state.actions, {processing: !prev})});
  }

  /**
   * Render the component
   */
  render() {
    const firstnameErrorSelector = this.state.errors.isFirstnameEmpty ? "error" : "";
    const lasttnameErrorSelector = this.state.errors.isLastnameEmpty ? "error" : "";
    return (
      <DialogWrapper
        title="Edit profile"
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}>

        <form
          className="user-edit-form"
          onSubmit={this.handleSave}
          noValidate>

          <div className="form-content">

            <div className={`input text required ${firstnameErrorSelector}`}>
              <label htmlFor="user-profile-firstname-input">First Name</label>
              <input
                id="user-profile-firstname-input"
                name="first_name"
                type="text"
                placeholder="first name"
                required="required"
                autoComplete="off"
                autoFocus={true}
                ref={this.firstnameRef}
                value={this.state.profile.first_name}
                onChange={this.handleInputChange}
                disabled={!this.areActionsAllowed}/>
              {this.state.errors.isFirstnameEmpty &&
              <div className="first_name error message">
                A first name is required
              </div>
              }
            </div>

            <div className={`input text required ${lasttnameErrorSelector}`}>
              <label htmlFor="user-profile-lastname-input">Last Name</label>
              <input
                id="user-profile-lastname-input"
                name="last_name"
                type="text"
                placeholder="last name"
                required="required"
                autoComplete="off"
                ref={this.lastnameRef}
                value={this.state.profile.last_name}
                onChange={this.handleInputChange}
                disabled={!this.areActionsAllowed}/>
              {this.state.errors.isLastnameEmpty &&
              <div className="last_name error message">
                A last name is required
              </div>
              }
            </div>

            <div className="input text required">
              <label htmlFor="user-profile-username-input">Username / Email</label>
              <input
                id="user-profile-username-input"
                name="username"
                type="text"
                disabled={true}
                value={this.context.loggedInUser.username}/>
            </div>

          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value="Save"/>
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              onClick={this.handleClose}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}

EditUserProfile.contextType = AppContext;
EditUserProfile.propTypes = {
  onClose: PropTypes.func, // Whenever the dialog must be closed
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withActionFeedback(withDialog(EditUserProfile));
