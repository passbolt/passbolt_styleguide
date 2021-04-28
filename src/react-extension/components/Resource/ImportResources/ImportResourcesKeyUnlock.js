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
import AppContext from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import Icon from "../../Common/Icons/Icon";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import ImportResourcesResult from "./ImportResourcesResult";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";

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

      showPassword: false, // True if the password should be textually displayed
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
    this.handlePasswordViewToggled = this.handlePasswordViewToggled.bind(this);
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
   * Handle the password view mode toggle
   */
  async handlePasswordViewToggled() {
    await this.setState({showPassword: !this.state.showPassword});
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
    const password = this.passwordInputRef.current.value;
    const keyfile = await this.readFile();
    const options = Object.assign({}, resourceFileToImport.options, {credentials: {password, keyfile}});

    this.toggleProcessing();
    await this.resetValidation();
    try {
      const result = await this.context.port.request("passbolt.import-resources.import-file", fileType, b64FileContent, options);
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
  async handleImportError(error) {
    const userAbortsOperation = error.name === "UserAbortsOperationError";
    const isInvalidPasswordOrKeyFile = error.code === "InvalidKey" || error.code === "InvalidArg";

    this.toggleProcessing();

    if (userAbortsOperation) {
      // If the user aborts the operation, then do nothing. It happens when the users close the passphrase dialog
    } else if (isInvalidPasswordOrKeyFile) {
      // If the credentials are invalid.
      await this.setState({errors: {invalidPasswordOrKeyfile: true}});
    } else {
      // If an unexpected error occurred.
      const errorDialogProps = {
        title: this.translate("There was an unexpected error..."),
        message: error.message
      };
      this.context.setContext({errorDialogProps});
      this.props.dialogContext.open(NotifyError);
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

            <div className="input-password-wrapper">
              <label htmlFor="import-password-dialog-password"><Trans>Keepass password</Trans></label>
              <div className="input password">
                <input
                  id="import-password-dialog-password"
                  type={this.state.showPassword ? "text" : "password"}
                  disabled={this.hasAllInputDisabled()}
                  placeholder={this.translate('Passphrase')}
                  ref={this.passwordInputRef}/>
              </div>
              <ul className="actions inline">
                <li>
                  <a
                    onClick={this.handlePasswordViewToggled}
                    className={`password-view button button-icon toggle ${this.state.showPassword ? "selected" : ""} ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <Icon name='eye-open' big={true}/>
                    <span className="visually-hidden">view</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="input-file-chooser-wrapper">
              <input
                type="file"
                ref={this.fileUploaderRef}
                onChange={this.handleFileSelected}/>
              <div className="input text">
                <label><Trans>Keepass key file (optional)</Trans></label>
                <div className="input-file-inline">
                  <input
                    type="text"
                    placeholder={this.translate('No key file selected')}
                    disabled
                    value={this.selectedFilename}/>
                  <a
                    className={`button primary ${this.hasAllInputDisabled() ? "disabled" : ""}`}
                    onClick={this.handleSelectFile}>
                    <Icon name="upload-a"/> <Trans>Choose a file</Trans>
                  </a>
                </div>
              </div>
            </div>

            {isInvalidPasswordOrKeyFile &&
            <div className="message ready error">
              <Trans>Cannot decrypt the file, invalid credentials.</Trans>
            </div>
            }
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value={this.translate("Continue import")}
              disabled={this.hasAllInputDisabled()}
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

ImportResourcesKeyUnlock.contextType = AppContext;

ImportResourcesKeyUnlock.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  t: PropTypes.func, // The translation function
};

export default  withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(ImportResourcesKeyUnlock))));
