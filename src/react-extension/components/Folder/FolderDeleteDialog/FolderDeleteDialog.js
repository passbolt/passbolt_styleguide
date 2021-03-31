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
import ErrorDialog from "../../Common/Dialog/ErrorDialog/ErrorDialog";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withLoading} from "../../../contexts/LoadingContext";
import {Trans, withTranslation} from "react-i18next";

class FolderDeleteDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.getStateBasedOnContext(context, props,  this.getDefaultState());
    this.bindEventHandlers();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.setState({loading: false});
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {
      // Dialog states
      loading: true,
      processing: false,

      // Cascade checkbox
      cascade: false
    };
  }

  /**
   * Bind callbacks methods
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Return default state based on context and props
   * For example if folder doesn't exist then we show an error message
   * Otherwise set the input name value
   *
   * @param context
   * @param props
   * @param defaultState
   * @returns {*}
   */
  getStateBasedOnContext(context, props, defaultState) {
    const folders = context.folders;
    const error = {
      message: this.translate("The folder could not be found. Maybe it was deleted or you lost access.")
    };
    if (!folders) {
      console.error(`No folders context defined.`);
      this.handleError(error);
    }
    const folder = context.folders.find(item => item.id === context.folder.id) || false;
    if (!folder) {
      console.error(`Folder ${context.folder.id} not found in context.`);
      this.handleError(error);
    } else {
      defaultState.name = folder.name;
    }
    return defaultState;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.processing) {
      return;
    }

    await this.toggleProcessing();

    try {
      this.props.loadingContext.add();
      await this.context.port.request("passbolt.folders.delete", this.context.folder.id, this.state.cascade);
      await this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    this.props.loadingContext.remove();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The folder was deleted successfully"));
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    this.props.loadingContext.remove();
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
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
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
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    if (this.state.processing) {
      return;
    }
    this.props.onClose();
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

  render() {
    return (
      <DialogWrapper className='folder-create-dialog' title={this.translate("Delete folder?")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="folder-create-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to delete the folder <strong>{{folderName: this.state.name}}</strong>?
              </Trans>
            </p>
            <p><Trans>Warning: This action can’t be undone. Other users may lose access.</Trans></p>
            <div className="input checkbox">
              <input id="delete-cascade" type="checkbox" name="cascade" onChange={this.handleInputChange}
                autoFocus={true} disabled={this.hasAllInputDisabled()} />&nbsp;
              <label htmlFor="delete-cascade"><Trans>Also delete items inside this folder.</Trans></label>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Delete")} warning={true}/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

FolderDeleteDialog.contextType = AppContext;

FolderDeleteDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withLoading(withDialog(withActionFeedback(withTranslation('common')(FolderDeleteDialog))));
