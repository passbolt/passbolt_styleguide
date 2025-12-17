/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.8.0
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
import {getUserFormattedName} from "../../../../shared/utils/userUtils";

/**
 * This component allows the removal of a user from a group
 */
class AddUserToGroupDialog extends Component {
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
      await this.add();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
    this.props.context.setContext({addUserToGroupDialogProps: null});
  }

  /**
   * Save the changes.
   */
  async add() {
    this.setState({processing: true});
    const userToAdd = this.props.context.addUserToGroupDialogProps.user;
    const group = this.props.context.addUserToGroupDialogProps.group;
    const groupUsers = group.groups_users;
    const groupUsersDto = groupUsers
      .map(groupUser => ({
        id: groupUser.id || undefined,
        user_id: groupUser.user_id,
        is_admin: groupUser.is_admin,
        delete: false
      }));
    groupUsersDto.push({
      id: undefined,
      user_id: userToAdd.id,
      is_admin: false,
      delete: undefined
    });

    const groupDto = {
      id: group.id,
      name: group.name,
      groups_users: groupUsersDto
    };

    try {
      this.props.loadingContext.add();
      await this.props.context.port.request('passbolt.groups.update', groupDto);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been added successfully"));
      this.props.onClose();
      this.props.context.setContext({addUserToGroupDialogProps: null});
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

  /**
   * Get the user first name, last name and username
   * @returns {string}
   */
  getUser() {
    return getUserFormattedName(this.props.context.addUserToGroupDialogProps.user, this.props.t, {withUsername: true});
  }

  /**
   * Get the group name
   * @returns {string}
   */
  getGroup() {
    return this.props.context.addUserToGroupDialogProps.group.name;
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
        title={this.translate("Add user?")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="add-user-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to add <strong className="dialog-variable">{{user: this.getUser()}}</strong> to <strong className="dialog-variable">{{group: this.getGroup()}}</strong>?
              </Trans>
            </p>
            <p><Trans>The user will gain access to the resources shared with the group.</Trans></p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Add")} warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

AddUserToGroupDialog.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withDialog(withTranslation('common')(AddUserToGroupDialog)))));
