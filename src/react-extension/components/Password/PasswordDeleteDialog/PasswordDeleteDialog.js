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
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../contexts/Common/DialogContext";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";

/**
 * This component allows user to delete a tag of the resources
 */
class PasswordDeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  getDefaultState() {
    return {
      processing: false,
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * get the resources
   * @returns {[]|null}
   */
  get resources() {
    return this.context.passwordDeleteDialogProps.resources;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.delete();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The password has been deleted successfully");
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
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      const resourcesIds = this.resources.map(resource => resource.id);
      await this.context.port.request("passbolt.resources.delete-all", resourcesIds);
      await this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * handle error and display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * has multiple resources
   * @returns {boolean}
   */
  hasMultipleResources() {
    return this.resources.length > 1;
  }

  render() {
    return (
      <DialogWrapper
        title="Delete password?"
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-password-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            {!this.hasMultipleResources() &&
            <div>
              <p>Are you sure you want to delete the password <strong>{this.resources[0].name}</strong>?</p>
              <p>Warning: Once the password is deleted, it’ll be removed permanently and will not be recoverable.</p>
            </div>
            }
            {this.hasMultipleResources() &&
            <p>Please confirm you really want to delete the passwords. After clicking ok, the passwords will be deleted
              permanently.</p>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value="Delete"/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

PasswordDeleteDialog.contextType = AppContext;

PasswordDeleteDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any,
};

export default withActionFeedback(withDialog(PasswordDeleteDialog));
