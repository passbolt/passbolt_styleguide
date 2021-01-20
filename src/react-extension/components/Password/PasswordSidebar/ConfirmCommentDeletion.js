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
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withLoading} from "../../../../react/contexts/Common/LoadingContext";

class ConfirmDeleteDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props, context);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  get defaultState() {
    return {
      actions: { // The ongoing action
        processing: false, // An action is processing
      },
    };
  }

  /**
   * Bind callbacks methods
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  /**
   * Handle the confirm event
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleConfirm(event) {
    // Avoid the form to be submitted.
    event.preventDefault();

    try {
      await this.setState({actions: {processing: true}});

      // Start loading bar
      this.props.loadingContext.add();

      // Persist
      await this.context.port.request("passbolt.comments.delete", this.context.resourceCommentId);

      // Complete loading bar
      this.props.loadingContext.remove();

      // Asks for a success  message
      await this.props.actionFeedbackContext.displaySuccess("The comment has been deleted successfully");

      // Stop processing
      await this.setState({actions: {processing: false}});

      // Update the context
      this.context.setContext({resourceCommentId: null, mustRefreshComments: true});

      // Hides the dialog
      this.props.onClose();
    } catch (error) {
      await this.setState({actions: {processing: false}});

      // Show the error
      await this.props.actionFeedbackContext.displayError(error);

      // Update the context
      this.context.setContext({resourceCommentId: null, mustRefreshComments: false});

      // Hides the dialog
      this.props.onClose();
    }
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.context.setContext({resourceCommentId: null});
    this.props.onClose();
  }

  render() {
    return (
      <div>
        <DialogWrapper
          className='comment-delete-dialog'
          title="Delete comment?"
          onClose={this.handleClose}
          disabled={this.state.actions.processing}>
          <form
            className="comment-delete-form"
            onSubmit={this.handleConfirm}
            noValidate>
            <div className="form-content">
              <p>Are you sure you want to delete the comment?</p>
              <p>Warning: Once the comment is deleted, it’ll be removed permanently and will not be recoverable.</p>
            </div>
            <div className="submit-wrapper clearfix">
              <FormSubmitButton
                disabled={this.state.actions.processing}
                processing={this.state.processing}
                value="Delete"
                warning={true}/>
              <FormCancelButton
                disabled={this.state.actions.processing}
                onClick={this.handleClose} />
            </div>
          </form>
        </DialogWrapper>
      </div>
    );
  }
}

ConfirmDeleteDialog.contextType = AppContext;

ConfirmDeleteDialog.propTypes = {
  actionFeedbackContext: PropTypes.object, // The action feedback context
  loadingContext: PropTypes.object, // The loading context
  onClose: PropTypes.func // Whenever the dialog is clsoed
};

export default withLoading(withActionFeedback(ConfirmDeleteDialog));
