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
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import Icon from "../../../../react/components/Common/Icons/Icon";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";


/**
 * This component is the second step of the import dialog when the file to import is KDB(X) file
 */
class PasswordUnlockKeypassDialog extends Component {
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
   * Returns the CSS style of the choose file addon button
   */
  get chooseFileStyle() {
    return {
      width: "35%",
      padding: "11px 0px 5px 0px",
      display: "inline-block",
      marginLeft: "-2px",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    };
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
    this.close();
  }

  /**
   * Handle the import submit event
   * @param event A dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.import()
      .then(this.onImportSuccess.bind(this))
      .catch(this.onImportFailed.bind(this));
  }

  /**
   * Import the resource file
   */
  async import() {
    const password = this.passwordInputRef.current.value;
    const keyFile = this.state.keyFile;
    const fileToImport = Object.assign({}, this.fileToImport, {credentials: {password, keyFile}});
    await this.context.port.emit("passbolt.import-passwords.import-file", fileToImport);
    await this.props.resourceWorkspaceContext.onResourceFileToImport(null);
  }

  /**
   * Handle the success of the KDBX import
   */
  async onImportSuccess() {
    await this.setState({errors: {}});
    this.close();
  }

  /**
   * Handle the failure of the KDBX import
   * @param error The import error
   */
  async onImportFailed(error) {
    const isInvalidPasswordOrKeyFile = error.code == 'InvalidKey' || error.code == 'InvalidArg';
    if (isInvalidPasswordOrKeyFile) {
      await this.setState({errors: {invalidPasswordOrKeyfile: true}});
    } else {
      this.props.resourceWorkspaceContext.onKDBXFileImportError(error);
      this.close();
    }
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
    const errors = this.state.errors;
    const isInvalidPasswordOrKeyFile = errors && errors.invalidPasswordOrKeyfile;
    return (
      <DialogWrapper
        title="Enter the password and/or key file"
        onClose={this.handleCancel}>
        <form onSubmit={this.handleSubmit}>

          <div className="form-content">

            <div className="input-password-wrapper required">
              <label htmlFor="password">
                Keepass password
              </label>
              <div
                className="input text password"
                style={{width: "83%"}}>
                <input
                  id="password"
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder="Passphrase"
                  ref={this.passwordInputRef}
                  style={{width: "100%"}}/>
                {isInvalidPasswordOrKeyFile &&
                  <div className="message ready error">
                    This file is invalid and cannot be imported.
                  </div>
                }
              </div>
              <ul
                className="actions inline"
                style={{width: "17%", lineHeight: "24px"}}>
                <li>
                  <a
                    onClick={this.handlePasswordViewToggled}
                    className={`password-view button button-icon toggle ${this.state.showPassword ? "selected" : ""}`}>
                    <Icon name='eye-open' big={true}/>
                    <span className="visually-hidden">view</span>
                  </a>
                </li>
              </ul>

            </div>

            <div className="input text">
              <input
                type="file"
                ref={this.fileUploaderRef}
                style={{display: "None"}}
                onChange={this.handleFileSelected}/>
              <label>
                Keepass key file (optional)
              </label>

              <input
                type="text"
                style={{width: "60%", textOverflow: "ellipsis"}}
                placeholder="No key file selected"
                disabled
                value={this.selectedFilename}/>
              <a
                style={this.chooseFileStyle}
                className="button primary"
                onClick={this.handleSelectFile}>
                <Icon name="upload-a" />
                <strong  style={{marginLeft: "7px"}}>
                  Choose a file
                </strong>
              </a>

            </div>

          </div>

          <div className="submit-wrapper clearfix">
            <FormSubmitButton
              value="Continue import"/>
            <FormCancelButton onClick={this.handleCancel}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}


PasswordUnlockKeypassDialog.contextType = AppContext;

PasswordUnlockKeypassDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any // The resource workspace context
};

export default withResourceWorkspace(withActionFeedback(withDialog(PasswordUnlockKeypassDialog)));
