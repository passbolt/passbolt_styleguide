
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

import React from 'react';
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";

/**
 * This component displays the user profile information
 */
class UploadUserProfileAvatar extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      avatarFile: null, // The avatar to upload
      actions: {
        processing: false // Actions flag about processing
      },
      errors: { // The list of errrors
        noFile: true // True if no picture file has been selected
      },
      validation: {
        hasAlreadyBeenValidated: false // True if the form has been already validated once
      }
    };
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.context.loggedInUser;
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
   * Returns true if the no file error must be flagged as true
   */
  get hasNoFileError() {
    return this.state.validation.hasAlreadyBeenValidated && this.state.errors.noFile;
  }

  /**
   * Bind the components handlers
   */
  bindHandlers() {
    this.handleAvatarFileSelected = this.handleAvatarFileSelected.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Whenever the user selects a profile picture file
   * @param event A dom event
   */
  handleAvatarFileSelected(event) {
    const [avatarFile] = event.target.files;
    this.select(avatarFile);
  }

  /**
   * Whenever the user wants to upload a new picture
   * @param event A DOM event
   */
  handleUpload(event) {
    event.preventDefault();
    this.upload();
  }

  /**
   * Whenever the user wants to cancel the operation
   */
  handleCancel() {
    this.close();
  }

  /**
   * Whenever the user wants to close the dialog
   */
  handleClose() {
    this.close();
  }

  /**
   * Select the next avatar profile
   * @param avatarFile
   */
  async select(avatarFile) {
    await this.setState({avatarFile});
  }

  /**
   * Uplaod the new profile avatar
   */
  async upload() {
    const avatarFileInBase64 = await this.readFile();
    await this.toggleProcessing();
    await this.context.port.request("passbolt.users.update-avatar", this.user.id, avatarFileInBase64)
      .then(this.onUploadSuccess.bind(this))
      .catch(this.onUploadFailure.bind(this));
  }

  /**
   * Whenever the upload succeeded
   */
  async onUploadSuccess() {
    await this.toggleProcessing();
    await this.refreshUserProfile();
    await this.props.actionFeedbackContext.displaySuccess("The user has been updates successfully");
    this.props.onClose();
  }

  /**
   * Whenever the upload failed
   */
  async onUploadFailure(error) {
    await this.toggleProcessing();
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
   * Read the selected file and returns its content in a base 64
   */
  readFile() {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = event => {
        try {
          const base64Url = event.target.result;
          const fileBase64 = base64Url.split(",")[1];
          resolve(fileBase64);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsDataURL(this.state.avatarFile);
    });
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const previousValue = this.state.actions.processing;
    await this.setState({actions: Object.assign(this.state.actions, {processing: !previousValue})});
  }

  /**
   * Refresh the user profile
   */
  async refreshUserProfile() {
    const loggedInUser = await this.context.port.request("passbolt.users.find-logged-in-user");
    this.context.setContext({loggedInUser});
  }

  /**
   * Render the component
   */
  render() {
    return (
      <DialogWrapper
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}
        title="Edit Avatar">
        <form
          onSubmit={this.handleUpload} noValidate>

          <div className="form-content">
            <div className={`input required ${this.hasNoFileError ? "error" : ""}`}>
              <label htmlFor="upload-input">
                Avatar
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={this.handleAvatarFileSelected}/>
            </div>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value="Save"/>
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              onClick={this.handleCancel}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}


UploadUserProfileAvatar.contextType = AppContext;
UploadUserProfileAvatar.propTypes = {
  onClose: PropTypes.func, // The close callback
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object // The action feedback context
};

export default withActionFeedback(withDialog(UploadUserProfileAvatar));
