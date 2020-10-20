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
 * @since         2.14.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import Icon from "../../Common/Icons/Icon";
import PasswordUnlockKeypassDialog from "./PasswordUnlockKeypassDialog";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PasswordImportResultDialog from "./PasswordImportResultDialog";
import AppContext from "../../../contexts/AppContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";

class PasswordImportDialog extends Component {
  /**
   * Default constructor
   * @param props Component props
   * @param context Component context
   */
  constructor(props, context) {
    super(props);
    this.state = this.geDefaultState(context);
    this.bindHandlers();
    this.createReferences();
  }

  /**
   * Returns the default state
   */
  geDefaultState(context) {
    const canUseTags = context.siteSettings.canIUse("tags");
    const canUseFolders = context.siteSettings.canIUse("folders");

    return {
      // Dialog states
      processing: false,

      fileToImport: null, // The file to import
      options: {
        importFolders: canUseFolders, // Import all the folders specified in the CSV / KDBX file
        importTags: canUseTags // Use unique tags for this import
      }, // The current import options
      errors: {} // Validation errors
    };
  }

  /**
   * Bind component handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleImportFoldersOptionChanged = this.handleImportFoldersOptionChanged.bind(this);
    this.handleImportTagsOptionChanged = this.handleImportTagsOptionChanged.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Whenever the component updated
   * @param previousProps The component previous props
   */
  async componentDidUpdate(previousProps) {
    await this.handleFileToImportChange(previousProps.resourceWorkspaceContext.resourceFileToImport);
  }

  /**
   * Returns true if the submit button should be disabled
   */
  hasSubmitButtonDisabled() {
    return !this.state.fileToImport || this.state.processing;
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns the selected file's name
   */
  get selectedFilename() {
    return this.state.fileToImport ? this.state.fileToImport.name : '';
  }

  /**
   * Returns the extension of the selected file
   */
  get selectedFileExtension() {
    const splitFilename = this.state.fileToImport.name.split('.');
    return splitFilename[splitFilename.length - 1];
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Handle the event that a file has been selected
   * @param event A dom event
   */
  async handleFileSelected(event) {
    const [fileToImport] = event.target.files;
    await this.resetValidation();
    this.setState({fileToImport});
  }

  /**
   * Handle the change of import folders option
   */
  async handleImportFoldersOptionChanged() {
    const options = Object.assign({}, this.state.options, {importFolders: !this.state.options.importFolders});
    await this.setState({options});
  }

  /**
   * Handle the change of unique tag options
   */
  async handleImportTagsOptionChanged() {
    const options = Object.assign({}, this.state.options, {importTags: !this.state.options.importTags});
    await this.setState({options});
  }

  /**
   * Whenever the contextual file to import has changed
   * @param previousFileToImport The previous file to import
   */
  async handleFileToImportChange(previousFileToImport) {
    // This is a way to tell that the KDBX file has been imported and then there's nothing to import anymore
    const isFileToImportNullNow = previousFileToImport && !this.props.resourceWorkspaceContext.resourceFileToImport;
    if (isFileToImportNullNow) {
      this.close();
    }
  }

  /**
   * Handle the cancellation of the import
   */
  handleCancel() {
    this.props.resourceWorkspaceContext.onResourceFileToImport(null);
    this.close();
  }

  /**
   * Handle the import submit event
   * @param event A dom event
   */
  handleSubmit(event) {
    // Prevent the form to be submitted.
    event.preventDefault();

    if (!this.state.processing) {
      this.import();
    }
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return this.setState({processing: !prev});
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
      reader.readAsDataURL(this.state.fileToImport);
    });
  }

  /**
   * Import the selected file with its given base 64 content
   */
  async import() {
    const b64FileContent = await this.readFile();
    const fileType = this.selectedFileExtension;
    const credentialsOptions = {credentials: {password: null, keyFile: null}};
    const options = Object.assign({}, this.state.options, credentialsOptions);

    await this.toggleProcessing();
    try {
      const importResult = await this.context.port.request("passbolt.import-passwords.import-file", b64FileContent, fileType, options);
      this.handleImportSuccess(importResult);
    } catch (error) {
      this.handleImportError(error, b64FileContent, fileType);
    }
  }

  /**
   * Handle import success
   * @param {Object} importResult The import restult
   */
  async handleImportSuccess(importResult) {
    await this.props.resourceWorkspaceContext.onResourceFileImportResult(importResult);
    await this.props.resourceWorkspaceContext.onResourceFileToImport(null);
    await this.props.dialogContext.open(PasswordImportResultDialog);
    this.toggleProcessing();
    this.close();
  }

  /**
   * Handle import error.
   * @param {Object} error The error returned by the background page
   * @param {string} b64FileContent The base 64 file content
   * @param {string} fileType The file type
   */
  handleImportError(error, b64FileContent, fileType) {
    const isUserAbortsOperation = error.name === "UserAbortsOperationError";
    const isKdbxBadSignatureError = error.name === "KdbxError" && error.code === "BadSignature";
    const isKdbxProtectedError = error.name === "KdbxError" && (error.code === "InvalidKey" || error.code === "InvalidArg");
    const isCsvError = error.name === "ImportCsvError";

    this.toggleProcessing();
    if (isUserAbortsOperation) {
      // If the user aborts the operation, then do nothing. It happens when the users close the passphrase dialog
    } else if (isKdbxProtectedError) {
      // If the keepass file is protected
      this.importProtectedKeepassFile(b64FileContent, fileType);
      this.close();
    } else if (isKdbxBadSignatureError) {
      // If the keepass file cannot be read.
      this.setState({errors: {invalidKdbxFile: "Keepass file format not recognized"}});
    } else if (isCsvError) {
      // If the csv file cannot be read.
      this.setState({errors: {invalidCsvFile: error.message}});
    } else {
      // If an unexpected error occurred.
      const errorDialogProps = {
        title: "There was an unexpected error...",
        message: error.message
      };
      this.context.setContext({errorDialogProps});
      this.props.dialogContext.open(ErrorDialog);
    }
  }

  /**
   * Import a KDBX file
   * @param {string} b64FileContent The base 64 file content
   * @param {string} fileType The file type
   * @return {Promise}
   */
  async importProtectedKeepassFile(b64FileContent, fileType) {
    const resourceFileToImport = {
      b64FileContent: b64FileContent,
      fileType: fileType,
      options: this.state.options
    };
    await this.props.resourceWorkspaceContext.onResourceFileToImport(resourceFileToImport);
    this.props.dialogContext.open(PasswordUnlockKeypassDialog);
  }

  /**
   * Invalidate the selected file as possible file to import
   * @param {Object} error The error returned by the backround page
   */
  async invalidate(error) {
    await this.setState({errors: {invalidCsvFile: error.message}});
  }

  /**
   * Reset the validation process
   */
  async resetValidation() {
    await this.setState({errors: {}});
  }

  /**
   * Render the component
   */
  render() {
    const errors = this.state.errors;
    const isInvalidCsvFile = errors && errors.invalidCsvFile;
    const isInvalidKdbxFile = errors && errors.invalidKdbxFile;
    const invalidFileClassName = isInvalidCsvFile || isInvalidKdbxFile ? 'errors' : '';
    const canUseTags = this.context.siteSettings.canIUse("tags");
    const canUseFolders = this.context.siteSettings.canIUse("folders");

    return (
      <DialogWrapper
        title="Import passwords"
        className="import-password-dialog"
        disabled={this.hasAllInputDisabled()}
        onClose={this.handleCancel}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <div className="input-file-chooser-wrapper">
              <input
                type="file"
                ref={this.fileUploaderRef}
                onChange={this.handleFileSelected}
                accept=".csv, .kdbx, .kdb"/>

              <div className={`input text required ${invalidFileClassName}`}>
                <label htmlFor="dialog-import-passwords">
                  Select a file to import
                  (<a role="link" data-tooltip="csv exports from keepassx, lastpass and 1password are supported">csv</a> or <a role="link" data-tooltip="kdbx files are files generated by keepass v2.x">kdbx</a>)
                </label>

                <input
                  type="text"
                  disabled={true}
                  placeholder="No file selected"
                  defaultValue={this.selectedFilename}/>
                <a
                  id="dialog-import-passwords-choose-file"
                  className={`button primary ${this.hasAllInputDisabled() ? "disabled" : ""}`}
                  onClick={this.handleSelectFile}>
                  <Icon name="upload-a"/> Choose a file
                </a>

                {isInvalidCsvFile &&
                  <div className="message ready error">
                    {this.state.errors.invalidCsvFile}
                  </div>
                }
                {isInvalidKdbxFile &&
                  <div className="message ready error">
                    {this.state.errors.invalidKdbxFile}
                  </div>
                }
              </div>
            </div>

            {canUseTags &&
            <div className="input text">
              <input
                id="dialog-import-passwords-import-tags"
                type="checkbox"
                checked={this.state.options.importTags}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleImportTagsOptionChanged}/>
              <label htmlFor="dialog-import-passwords-import-tags"> Add a unique import tag to passwords</label>
            </div>
            }

            {canUseFolders &&
            <div className="input text">
              <input
                id="dialog-import-passwords-import-folders"
                type="checkbox"
                checked={this.state.options.importFolders}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleImportFoldersOptionChanged}/>
              <label htmlFor="dialog-import-passwords-import-folders"> Import folders</label>
            </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="Import"
              disabled={this.hasSubmitButtonDisabled()}
              processing={this.state.processing}/>
            <FormCancelButton
              disabled={this.hasAllInputDisabled()}
              onClick={this.handleCancel}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

PasswordImportDialog.contextType = AppContext;

PasswordImportDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any // The resource context
};

export default withResourceWorkspace(withActionFeedback(withDialog(PasswordImportDialog)));
