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
import {withAppContext} from "../../../contexts/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";

class CreateResourceFolder extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.createInputRefs();
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.setState({loading: false, name: ''}, () => {
      this.nameRef.current.focus();
    });
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,
      inlineValidation: false,

      // Fields and errors
      name: this.translate("loading..."),
      nameError: false
    };
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.nameRef = React.createRef();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    }, () => {
      if (this.state.inlineValidation) {
        this.validate();
      }
    });
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    // Do not re-submit an already processing form
    if (this.state.processing) {
      return;
    }

    // After first submit, inline validation is on
    this.setState({
      inlineValidation: this.state.inlineValidation || true
    });

    await this.toggleProcessing();
    await this.validate();
    if (this.hasValidationError()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const folder = await this.createFolder();
      await this.handleSaveSuccess(folder.id);
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(folderId) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The folder has been added successfully"));
    this.selectAndScrollToFolder(folderId);
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /**
   * Focus the first field of the form which is in error state.
   * @returns {void}
   */
  focusFirstFieldError() {
    this.nameRef.current.focus();
  }

  /**
   * Create the folder
   * @returns {Promise<Object>} Folder entity or Error
   */
  async createFolder() {
    const folderDto = {
      name: this.state.name,
      folder_parent_id: this.props.context.folderCreateDialogProps.folderParentId
    };
    return await this.props.context.port.request("passbolt.folders.create", folderDto);
  }

  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   * @returns {void}
   */
  selectAndScrollToFolder(id) {
    this.props.context.port.emit("passbolt.folders.select-and-scroll-to", id);
  }

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate() {
    await this.resetValidation();
    await this.validateNameInput();
    return this.hasValidationError();
  }

  /**
   * Reset validation errors
   * @returns {Promise<void>}
   */
  async resetValidation() {
    return new Promise(resolve => {
      this.setState({nameError: false}, resolve());
    });
  }

  /**
   * Validate the name input.
   * @returns {Promise<void>}
   */
  validateNameInput() {
    let nameError = false;
    const name = this.state.name.trim();
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }
    if (name.length > 64) {
      nameError = this.translate("A name can not be more than 64 char in length.");
    }
    return new Promise(resolve => {
      this.setState({nameError: nameError}, resolve);
    });
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return (this.state.nameError !== false);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing || this.state.loading;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper className='folder-create-dialog' title={this.translate("Create a new folder")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="folder-create-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="folder-name-input"><Trans>Name</Trans></label>
              <input id="folder-name-input" name="name"
                ref={this.nameRef}
                type="text" value={this.state.name} placeholder={this.translate("Untitled folder")}
                maxLength="64" required="required"
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {this.state.nameError &&
              <div className="error-message">{this.state.nameError}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateResourceFolder.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  onClose: PropTypes.func,
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(CreateResourceFolder))));
