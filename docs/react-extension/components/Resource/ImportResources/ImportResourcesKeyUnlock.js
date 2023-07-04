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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import ImportResourcesResult from "./ImportResourcesResult";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";
import Password from "../../../../shared/components/Password/Password";

/**
 * This component is the second step of the import dialog when the file to import is KDB(X) file
 */
class ImportResourcesKeyUnlock extends Component {
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
   * Returns the default component state
   */
  get defaultState() {
    return {
      // Dialog states
      processing: false,

      password: '', // The current password
      keyFile: null, // The optional key file
      errors: {} // The import errors
    };
  }

  /**
   * Bind component handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  /**
   * Returns the selected file's name
   */
  get selectedFilename() {
    return this.state.keyFile ? this.state.keyFile.name : '';
  }

  /**
   * Returns the current file to import
   */
  get fileToImport() {
    return this.props.resourceWorkspaceContext.resourceFileToImport;
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
    const [keyFile] = event.target.files;
    await this.setState({keyFile});
  }

  /**
   * Handle input change
   * @param event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
  async handleSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      this.import();
    }
  }

  /**
   * Read the selected file and returns its content in a base 64
   * @return {Promise<string>}
   */
  readFile() {
    if (!this.state.keyFile) {
      return;
    }

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
      reader.readAsDataURL(this.state.keyFile);
    });
  }

  /**
   * Import the resource file
   */
  async import() {
    const resourceFileToImport = this.fileToImport;
    const b64FileContent = resourceFileToImport.b64FileContent;
    const fileType = resourceFileToImport.fileType;
    const password = this.state.password;
    const keyfile = await this.readFile();
    const options = Object.assign({}, resourceFileToImport.options, {credentials: {password, keyfile}});

    this.toggleProcessing();
    await this.resetValidation();
    try {
      const result = await this.props.context.port.request("passbolt.import-resources.import-file", fileType, b64FileContent, options);
      this.handleImportSuccess(result);
    } catch (error) {
      this.handleImportError(error);
    }
  }

  /**
   * Reset the validation process
   */
  async resetValidation() {
    await this.setState({errors: {}});
  }

  /**
   * Handle the success of the KDBX import
   * @parama importResult The import result
   */
  async handleImportSuccess(importResult) {
    await this.props.resourceWorkspaceContext.onResourceFileImportResult(importResult);
    await this.props.resourceWorkspaceContext.onResourceFileToImport(null);
    await this.props.dialogContext.open(ImportResourcesResult);
    this.close();
  }

  /**
   * Handle the failure of the KDBX import
   * @param error The import error
   */
  handleImportError(error) {
    const userAbortsOperation = error.name === "UserAbortsOperationError";
    const isInvalidPasswordOrKeyFile = error.code === "InvalidKey" || error.code === "InvalidArg";

    this.toggleProcessing();

    if (userAbortsOperation) {
      // If the user aborts the operation, then do nothing. It happens when the users close the passphrase dialog
    } else if (isInvalidPasswordOrKeyFile) {
      // If the credentials are invalid.
      this.setState({errors: {invalidPasswordOrKeyfile: true}});
    } else {
      // If an unexpected error occurred.
      const errorDialogProps = {
        error: error
      };
      this.props.dialogContext.open(NotifyError, errorDialogProps);
    }
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
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
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
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
    const isInvalidPasswordOrKeyFile = errors && errors.invalidPasswordOrKeyfile;
    return (
      <DialogWrapper
        title={this.translate("Enter the password and/or key file")}
        className="import-password-dialog"
        disabled={this.hasAllInputDisabled()}
        onClose={this.handleCancel}>
        <form onSubmit={this.handleSubmit}>

          <div className="form-content">

            <div className={`input-password-wrapper input ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="import-password-dialog-password"><Trans>Keepass password</Trans></label>
              <Password
                id="import-password-dialog-password"
                name="password"
                autoComplete="off"
                value={this.state.password}
                onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled()}
                placeholder={this.translate('Passphrase')}
                preview={true}
                inputRef={this.passwordInputRef}/>
            </div>

            <div className={`input file ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
              <input
                type="file"
                id="dialog-import-passwords"
                ref={this.fileUploaderRef}
                onChange={this.handleFileSelected}/>
              <label htmlFor="dialog-import-passwords"><Trans>Keepass key file (optional)</Trans></label>
              <div className="input-file-inline">
                <input
                  type="text"
                  placeholder={this.translate('No key file selected')}
                  disabled
                  value={this.selectedFilename}/>
                <button
                  className="button primary"
                  type="button"
                  disabled={this.hasAllInputDisabled()}
                  onClick={this.handleSelectFile}>
                  <span><Trans>Choose a file</Trans></span>
                </button>
              </div>
              {isInvalidPasswordOrKeyFile &&
                <div className="error-message">
                  <Trans>Cannot decrypt the file, invalid credentials.</Trans>
                </div>
              }
            </div>
          </div>

          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={this.hasAllInputDisabled()}
              onClick={this.handleCancel}/>
            <FormSubmitButton
              value={this.translate("Continue import")}
              disabled={this.hasAllInputDisabled()}
              processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ImportResourcesKeyUnlock.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  t: PropTypes.func, // The translation function
};

export default  withAppContext(withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(ImportResourcesKeyUnlock)))));
