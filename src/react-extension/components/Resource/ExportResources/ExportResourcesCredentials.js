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
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component is the second step of the export dialog when the file to import is KDB(X) file
 */
class ExportResourcesCredentials extends Component {
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
      showPassword: false, // True if the password should be textually displayed
      keyFile: null, // The optional key file
      actions: {
        processing: false // Actions flag about processing
      }
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
    return this.state.keyFile ? this.state.keyFile.name : "";
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
    this.close();
  }

  /**
   * Handle the export submit event
   * @param event A dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({actions: {processing: true}});
    await this.export()
      .then(this.onExportSuccess.bind(this))
      .catch(this.onExportFailure.bind(this));
  }

  /**
   * Export the resource file
   */
  async export() {
    const password = this.passwordInputRef.current.value;
    const keyfile = await this.readFile();
    const options = {credentials: {password, keyfile}};
    const foldersIds = this.props.resourceWorkspaceContext.resourcesToExport.foldersIds;
    const resourcesIds = this.props.resourceWorkspaceContext.resourcesToExport.resourcesIds;
    const exportDto = {
      format: "kdbx",
      folders_ids: foldersIds,
      resources_ids: resourcesIds,
      options: options
    };
    await this.context.port.request("passbolt.export-resources.export-to-file", exportDto);
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
   * Whenever the export has been performed succesfully
   */
  async onExportSuccess() {
    await this.props.resourceWorkspaceContext.onResourcesToExport({resourcesIds: null, foldersIds: null});
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The passwords have been exported successfully"));
    this.close();
  }

  /**
   * Whenever the export has been performed with failure
   */
  async onExportFailure(error) {
    const isUserAbortsOperation = error.name === "UserAbortsOperationError";
    if (isUserAbortsOperation) {
      await this.setState({actions: {processing: false}});
      return;
    }

    const errorDialogProps = {
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    await this.setState({actions: {processing: false}});
    await this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(NotifyError);
  }

  /**
   * Close the dialog
   */
  close() {
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
   */
  render() {
    return (
      <DialogWrapper
        title={this.translate("Enter the password and/or key file")}
        className="export-password-dialog"
        onClose={this.handleCancel}
        disabled={!this.areActionsAllowed}>
        <form onSubmit={this.handleSubmit}>

          <div className="form-content">

            <div className="input-password-wrapper">
              <label htmlFor="password"><Trans>Keepass password</Trans></label>
              <div className="input text password">
                <input id="password"
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder={this.translate("Passphrase")}
                  ref={this.passwordInputRef}
                  disabled={!this.areActionsAllowed}/>
              </div>
              <ul className="actions inline">
                <li>
                  <a
                    onClick={this.handlePasswordViewToggled}
                    className={`password-view button button-icon toggle ${this.state.showPassword ? "selected" : ""} ${!this.areActionsAllowed ? "disabled" : ""}`}>
                    <Icon name="eye-open" big={true}/>
                    <span className="visually-hidden">view</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="input-file-chooser-wrapper">
              <div className="input text">
                <input type="file"
                  ref={this.fileUploaderRef}
                  onChange={this.handleFileSelected}/>
                <label><Trans>Keepass key file (optional)</Trans></label>
                <input type="text"
                  placeholder={this.translate("No key file selected")}
                  disabled
                  value={this.selectedFilename}/>
                <a className={`button primary ${!this.areActionsAllowed ? "disabled" : ""}`}
                  onClick={this.handleSelectFile}>
                  <Icon name="upload-a"/> <Trans>Choose a file</Trans>
                </a>
              </div>
            </div>
          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              disabled={!this.areActionsAllowed}
              processing={this.isProcessing}
              value={this.translate("Export")}/>
            <FormCancelButton
              disabled={!this.areActionsAllowed}
              onClick={this.handleCancel}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ExportResourcesCredentials.contextType = AppContext;

ExportResourcesCredentials.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  t: PropTypes.func, // The translation function
};

export default withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(ExportResourcesCredentials))));

