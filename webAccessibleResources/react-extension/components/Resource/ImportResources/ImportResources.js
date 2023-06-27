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
import {withDialog} from "../../../contexts/DialogContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import ImportResourcesKeyUnlock from "./ImportResourcesKeyUnlock";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import ImportResourcesResult from "./ImportResourcesResult";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";

const FILE_TYPE_KDBX = "kdbx";

class ImportResources extends Component {
  /**
   * Default constructor
   * @param props Component props
   * @param context Component context
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
    this.createReferences();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      // Dialog states
      processing: false,

      fileToImport: null, // The file to import
      options: {
        folders: this.canUseFolders, // Import all the folders specified in the CSV / KDBX file
        tags: this.canUseTags // Mark all resource with a unique tag
      }, // The current import options
      errors: {} // Validation errors
    };
  }

  /**
   * Check if the user can use folders.
   * @returns {boolean}
   */
  get canUseFolders() {
    return this.props.context.siteSettings.canIUse("folders")
      && this.props.rbacContext.canIUseUiAction(uiActions.FOLDERS_USE);
  }

  /**
   * Check if the user can use tags.
   * @returns {boolean}
   */
  get canUseTags() {
    return this.props.context.siteSettings.canIUse("tags")
      && this.props.rbacContext.canIUseUiAction(uiActions.TAGS_USE);
  }

  /**
   * Bind component handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleImportOptionFoldersChanged = this.handleImportOptionFoldersChanged.bind(this);
    this.handleImportOptionTagsChanged = this.handleImportOptionTagsChanged.bind(this);
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
  async handleImportOptionFoldersChanged() {
    const options = Object.assign({}, this.state.options, {folders: !this.state.options.folders});
    await this.setState({options});
  }

  /**
   * Handle the change of unique tag options
   */
  async handleImportOptionTagsChanged() {
    const options = Object.assign({}, this.state.options, {tags: !this.state.options.tags});
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
   * Convert a Unicode string to a string in which
   * each 16-bit unit occupies only one byte
   * @param string
   * @returns {string}
   */
  toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const concatenateStringFromByte = (data, byte) => data + String.fromCharCode(byte);
    return new Uint8Array(codeUnits.buffer).reduce(concatenateStringFromByte, '');
  }

  /**
   * Read the selected CSV file and returns its content in a base 64
   */
  readFileCsv() {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = event => {
        try {
          const file = this.toBinary(event.target.result);
          const fileBase64 = btoa(file);
          resolve(fileBase64);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(this.state.fileToImport);
    });
  }

  /**
   * Read the selected KDBX file and returns its content in a base 64
   * @return {Promise<string>}
   */
  readFileKdbx() {
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
    const fileType = this.selectedFileExtension;
    const b64FileContent = fileType === FILE_TYPE_KDBX ? await this.readFileKdbx() : await this.readFileCsv();
    const credentialsOptions = {credentials: {password: null, keyFile: null}};
    const options = Object.assign({}, this.state.options, credentialsOptions);

    await this.toggleProcessing();
    try {
      const importResult = await this.props.context.port.request("passbolt.import-resources.import-file", fileType, b64FileContent, options);
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
    await this.props.dialogContext.open(ImportResourcesResult);
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
    const isCsvError = error.name === "FileFormatError";

    this.toggleProcessing();
    if (isUserAbortsOperation) {
      // If the user aborts the operation, then do nothing. It happens when the users close the passphrase dialog
    } else if (isKdbxProtectedError) {
      // If the keepass file is protected
      this.importProtectedKeepassFile(b64FileContent, fileType);
      this.close();
    } else if (isKdbxBadSignatureError) {
      // If the keepass file cannot be read.
      this.setState({errors: {invalidKdbxFile: this.translate("Keepass file format not recognized")}});
    } else if (isCsvError) {
      // If the csv file cannot be read.
      this.setState({errors: {invalidCsvFile: error.message}});
    } else {
      // If an unexpected error occurred.
      const errorDialogProps = {
        error: error
      };
      this.props.dialogContext.open(NotifyError, errorDialogProps);
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
    this.props.dialogContext.open(ImportResourcesKeyUnlock);
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
    const errors = this.state.errors;
    const isInvalidCsvFile = errors && errors.invalidCsvFile;
    const isInvalidKdbxFile = errors && errors.invalidKdbxFile;
    const invalidFileClassName = isInvalidCsvFile || isInvalidKdbxFile ? 'errors' : '';

    return (
      <DialogWrapper
        title={this.translate("Import passwords")}
        className="import-password-dialog"
        disabled={this.hasAllInputDisabled()}
        onClose={this.handleCancel}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <div className={`input file ${this.hasAllInputDisabled() ? "disabled" : ""} ${invalidFileClassName}`}>
              <input
                type="file"
                id="dialog-import-passwords"
                ref={this.fileUploaderRef}
                onChange={this.handleFileSelected}
                accept=".csv, .kdbx, .kdb"/>
              <label htmlFor="dialog-import-passwords">
                <Trans>Select a file to import</Trans>&nbsp;
                <Tooltip message={this.translate("csv exports from browsers (safari, chrome, edge, brave, opera, vivaldi, firefox, waterfox), keepassx, logmeonce, lastpass, 1password, nordpass, dashlane and bitwarden are supported")}>
                  (<button type="button" className="link inline">csv</button>
                </Tooltip>
                &nbsp;{this.translate("or")}&nbsp;
                <Tooltip message={this.translate("kdbx files are files generated by keepass v2.x")}>
                  <button type="button" className="link inline">kdbx</button>)
                </Tooltip>
              </label>
              <div className="input-file-inline">
                <input
                  type="text"
                  disabled={true}
                  placeholder={this.translate("No file selected")}
                  defaultValue={this.selectedFilename}/>
                <button
                  className="button primary"
                  type="button"
                  disabled={this.hasAllInputDisabled()}
                  onClick={this.handleSelectFile}>
                  <span><Trans>Choose a file</Trans></span>
                </button>
              </div>
              {isInvalidCsvFile &&
                <div className="error-message">
                  {this.state.errors.invalidCsvFile}
                </div>
              }
              {isInvalidKdbxFile &&
                <div className="error-message">
                  {this.state.errors.invalidKdbxFile}
                </div>
              }
            </div>

            {this.canUseTags &&
            <div className="input checkbox">
              <input
                id="dialog-import-passwords-import-tags"
                type="checkbox"
                checked={this.state.options.tags}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleImportOptionTagsChanged}/>
              <label htmlFor="dialog-import-passwords-import-tags"><Trans>Add a unique import tag to passwords</Trans></label>
            </div>
            }

            {this.canUseFolders &&
            <div className="input checkbox">
              <input
                id="dialog-import-passwords-import-folders"
                type="checkbox"
                checked={this.state.options.folders}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleImportOptionFoldersChanged}/>
              <label htmlFor="dialog-import-passwords-import-folders"><Trans>Import folders</Trans></label>
            </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={this.hasAllInputDisabled()}
              onClick={this.handleCancel}/>
            <FormSubmitButton
              value={this.translate("Import")}
              disabled={this.hasSubmitButtonDisabled()}
              processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ImportResources.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(ImportResources))))));
