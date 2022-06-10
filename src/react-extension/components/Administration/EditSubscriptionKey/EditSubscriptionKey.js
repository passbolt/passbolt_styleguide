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
 * @since         3.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import DialogWrapper from "../../../../react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormSubmitButton from "../../../../react-extension/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react-extension/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

/**
 * Component allows the user to edit the subscription key from a dialog
 */
class EditSubscriptionKey extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  getDefaultState() {
    return {
      selectedFile: null, // the file to import
      key: "", // The subscription key
      keyError: "", // The error subscription key
      processing: false,
      hasBeenValidated: false, // true if the form has already validated once
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyInputKeyUp = this.handleKeyInputKeyUp.bind(this);
    this.handleSelectSubscriptionKeyFile = this.handleSelectSubscriptionKeyFile.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.keyInputRef = React.createRef();
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.setState({key:  this.props.context.editSubscriptionKey.key || ""});
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.save();
    }
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
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
   * Handle key input keyUp event.
   */
  handleKeyInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateNameInput();
      this.setState(state);
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.context.setContext({editSubscriptionKey: null});
    this.props.onClose();
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Returns the selected file's name
   */
  get selectedFilename() {
    return this.state.selectedFile ? this.state.selectedFile.name : "";
  }

  /**
   * Whenever the user select a subscription key file
   * @param event The file dom event
   */
  async handleSelectSubscriptionKeyFile(event) {
    const [subscriptionFile] = event.target.files;
    const subscriptionKey = await this.readSubscriptionKeyFile(subscriptionFile);
    this.setState({key: subscriptionKey, selectedFile: subscriptionFile});
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Read the selected subscription key file and returns its content in a base 64
   * @param subscriptionFile A subscription key file
   */
  readSubscriptionKeyFile(subscriptionFile) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        try {
          resolve(reader.result);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(subscriptionFile);
    });
  }

  /**
   * Save the changes.
   */
  async save() {
    if (this.state.processing) {
      return;
    }

    await this.setState({hasBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      this.handleValidateError();
      await this.toggleProcessing();
      return;
    }

    const keyDto = {
      data: this.state.key,
    };

    try {
      await this.props.administrationWorkspaceContext.onUpdateSubscriptionKeyRequested(keyDto);
      await this.handleSaveSuccess();
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
      this.focusFieldError();
    }
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    this.focusFieldError();
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The subscription key has been updated successfully."));
    this.props.administrationWorkspaceContext.onMustRefreshSubscriptionKey();
    this.props.context.setContext({editSubscriptionKey: null, refreshSubscriptionAnnouncement: true});
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    if (error.name === "PassboltSubscriptionError") {
      this.setState({keyError: error.message});
    } else if (error.name === "EntityValidationError") {
      this.setState({keyError: this.translate("The subscription key is invalid.")});
    } else if (error.name === "PassboltApiFetchError" && error.data && error.data.code === 400) {
      this.setState({keyError: error.message});
    } else {
      // Unexpected error occurred.
      console.error(error);
      const errorDialogProps = {
        error: error
      };
      this.props.dialogContext.open(NotifyError, errorDialogProps);
    }
  }

  /**
   * Focus the field of the form which is in error state.
   */
  focusFieldError() {
    if (this.state.keyError) {
      this.keyInputRef.current.focus();
    }
  }

  /**
   * Validate the key input.
   * @return {Promise}
   */
  validateKeyInput() {
    const key = this.state.key.trim();
    let keyError = "";
    if (!key.length) {
      keyError = this.translate("A subscription key is required.");
    }

    return new Promise(resolve => {
      this.setState({keyError}, resolve);
    });
  }

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      keyError: "",
    });

    // Validate the form inputs.
    await this.validateKeyInput();

    return this.state.keyError === "";
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
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

  render() {
    return (
      <DialogWrapper
        title={this.translate("Edit subscription key")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="edit-subscription-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input textarea required ${this.state.keyError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-tag-form-name"><Trans>Subscription key</Trans></label>
              <textarea id="edit-subscription-form-key" name="key" value={this.state.key}
                onKeyUp={this.handleKeyInputKeyUp} onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled()} ref={this.keyInputRef} className="required full_report"
                required="required" autoComplete="off" autoFocus={true}/>
            </div>
            <div className={`input file ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
              <input type="file" ref={this.fileUploaderRef}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleSelectSubscriptionKeyFile}/>
              <div className="input-file-inline">
                <input type="text" disabled={true} placeholder={this.translate("No key file selected")} value={this.selectedFilename}/>
                <button type='button' className="button primary" onClick={this.handleSelectFile} disabled={this.hasAllInputDisabled()}>
                  <span><Trans>Choose a file</Trans></span>
                </button>
              </div>
              {this.state.keyError &&
                <div className="key error-message">{this.state.keyError}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick} />
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditSubscriptionKey.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog congtext
  administrationWorkspaceContext: PropTypes.any, // The administration workspace context
  t: PropTypes.func
};

export default withAppContext(withAdministrationWorkspace(withActionFeedback(withDialog(withTranslation('common')(EditSubscriptionKey)))));
