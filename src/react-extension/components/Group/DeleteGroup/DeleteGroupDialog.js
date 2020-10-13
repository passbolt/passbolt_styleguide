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
import {withLoading} from "../../../contexts/Common/LoadingContext";

/**
 * This component allows user to delete a user
 */
class DeleteGroupDialog extends Component {
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
    this.context.setContext({deleteGroupDialogProps: null});
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      this.props.loadingContext.add();
      await this.context.port.request("passbolt.groups.delete", this.group.id);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess("The group has been deleted successfully");
      this.props.onClose();
      this.context.setContext({deleteGroupDialogProps: null});
    } catch (error) {
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
  }

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

  get group() {
    return this.context.deleteGroupDialogProps.group;
  }

  get numberResourcesOwnedByGroup() {
    return this.context.deleteGroupDialogProps.numberResourcesOwned;
  }

  render() {
    return (
      <DialogWrapper
        title="Are you sure ?"
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-user-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p><strong>You are about to delete the group {this.group.name}!</strong></p>
            {this.numberResourcesOwnedByGroup > 0 &&
            <p>This group is associated with {this.numberResourcesOwnedByGroup} passwords. All users in this group will lose access to these passwords.</p>
            }
            {this.numberResourcesOwnedByGroup === 0 &&
            <p>This group is not associated with any password. You are good to go!</p>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value="Delete" warning={true}/>
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteGroupDialog.contextType = AppContext;

DeleteGroupDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any // The loading context
};

export default withLoading(withActionFeedback(withDialog(DeleteGroupDialog)));
