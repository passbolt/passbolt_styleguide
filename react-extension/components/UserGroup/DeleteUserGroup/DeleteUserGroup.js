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
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withLoading} from "../../../contexts/LoadingContext";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component allows user to delete a user
 */
class DeleteUserGroup extends Component {
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
    this.props.context.setContext({deleteGroupDialogProps: null});
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      this.props.loadingContext.add();
      await this.props.context.port.request("passbolt.groups.delete", this.group.id);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The group has been deleted successfully"));
      this.props.onClose();
      this.props.context.setContext({deleteGroupDialogProps: null});
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
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  get group() {
    return this.props.context.deleteGroupDialogProps.group;
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
        title={this.translate("Delete group?")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-group-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to delete the group <strong className="dialog-variable">{{groupName: this.group.name}}</strong>?
              </Trans>
            </p>
            <p><Trans>This action can’t be undone. Users in this group may lose access to the content shared with it.</Trans></p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Delete")} warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteUserGroup.propTypes = {
  context: PropTypes.any, // The app context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withDialog(withTranslation('common')(DeleteUserGroup)))));
