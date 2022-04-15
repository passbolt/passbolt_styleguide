
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
import {withAppContext} from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";

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
    this.createReferences();
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
      errors: { // The list of errors
        message: null // error message
      },
      validation: {
        hasAlreadyBeenValidated: false // True if the form has been already validated once
      }
    };
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.props.context.loggedInUser;
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
   * Returns true if the an error message is set
   */
  get hasValidationError() {
    return this.state.errors.message !== null;
  }

  /**
   * Bind the components handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleAvatarFileSelected = this.handleAvatarFileSelected.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Whenever the user selects a profile picture file
   * @param event A dom event
   */
  async handleAvatarFileSelected(event) {
    const [avatarFile] = event.target.files;
    await this.select(avatarFile);
    if (this.state.validation.hasAlreadyBeenValidated) {
      const state = this.validateAvatarInput();
      this.setState(state);
    }
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
   * Upload the new profile avatar
   */
  async upload() {
    // If the upload is already processing
    if (this.state.actions.processing) {
      return;
    }

    await this.setState({validation: {hasAlreadyBeenValidated: true}});

    await this.toggleProcessing();
    await this.validateAvatarInput();

    if (this.hasValidationError) {
      await this.toggleProcessing();
      return;
    }
    const avatarDto = await this.createAvatarDto();
    await this.props.context.port.request("passbolt.users.update-avatar", this.user.id, avatarDto)
      .then(this.onUploadSuccess.bind(this))
      .catch(this.onUploadFailure.bind(this));
  }

  /**
   * Create the avatar Dto
   * @returns {{filename: string, mimeType, fileBase64}}
   */
  async createAvatarDto() {
    const {fileBase64, mimeType} = await this.readFile();
    const filename = this.selectedFilename;
    return {fileBase64, mimeType, filename};
  }

  /**
   * Validate the avatar input.
   * @returns {Promise<void>}
   */
  async validateAvatarInput() {
    let message = null;
    const avatarFile = this.state.avatarFile;
    if (!avatarFile) {
      message = this.translate("A file is required.");
    }
    return this.setState({errors: {message}});
  }

  /**
   * Whenever the upload succeeded
   */
  async onUploadSuccess() {
    await this.toggleProcessing();
    await this.refreshUserProfile();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been updated successfully"));
    this.props.onClose();
  }

  /**
   * Whenever the upload failed
   */
  async onUploadFailure(error) {
    console.error(error);
    await this.toggleProcessing();
    if (this.hasFileError(error.data)) {
      this.setState({errors: {message: error.data.body.profile.avatar.file.validMimeType}});
    } else {
      const errorDialogProps = {
        error: error
      };
      this.props.dialogContext.open(NotifyError, errorDialogProps);
    }
  }

  /**
   * has file error
   * @param errorData the error data received
   * @returns {*}
   */
  hasFileError(errorData) {
    return errorData && errorData.body && errorData.body.profile && errorData.body.profile.avatar && errorData.body.profile.avatar.file && errorData.body.profile.avatar.file.validMimeType;
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
          const mimeType = base64Url.split(',')[0].split(':')[1].split(';')[0];
          resolve({fileBase64, mimeType});
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
    const loggedInUser = await this.props.context.port.request("passbolt.users.find-logged-in-user");
    this.props.context.setContext({loggedInUser});
  }

  /**
   * Returns the selected file's name
   * @return {string}
   */
  get selectedFilename() {
    return this.state.avatarFile ? this.state.avatarFile.name : '';
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
   */
  render() {
    return (
      <DialogWrapper
        className="update-avatar-dialog"
        onClose={this.handleClose}
        disabled={!this.areActionsAllowed}
        title={this.translate("Edit Avatar")}>
        <form
          onSubmit={this.handleUpload} noValidate>

          <div className="form-content">
            <div className={`input file required ${this.areActionsAllowed ? "" : "disabled"} ${this.hasValidationError ? "error" : ""}`}>
              <input
                id="dialog-upload-avatar-input"
                type="file"
                ref={this.fileUploaderRef}
                onChange={this.handleAvatarFileSelected}
                accept="image/*"/>
              <label htmlFor="dialog-upload-avatar-input">
                <Trans>Avatar</Trans>
              </label>
              <div className="input-file-inline">
                <input
                  type="text"
                  disabled={true}
                  placeholder={this.translate("No file selected")}
                  defaultValue={this.selectedFilename}/>
                <a
                  className={`button primary ${this.areActionsAllowed ? "" : "disabled"}`}
                  onClick={this.handleSelectFile}>
                  <span className='ellipsis'><Trans>Choose a file</Trans></span>
                </a>
              </div>
              {this.state.errors.message &&
              <div className="error-message">{this.state.errors.message}</div>
              }
            </div>
          </div>

          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              onClick={this.handleCancel}/>
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value={this.translate("Save")}/>
          </div>

        </form>
      </DialogWrapper>
    );
  }
}

UploadUserProfileAvatar.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // The close callback
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(UploadUserProfileAvatar))));
