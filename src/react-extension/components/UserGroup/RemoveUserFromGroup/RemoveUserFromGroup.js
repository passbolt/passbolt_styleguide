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
 * @since         5.7.0
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
 * This component allows the removal of a user from a group
 */
class RemoveUserFromGroup extends Component {
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
      await this.remove();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
    this.props.context.setContext({removeUserFromGroupDialogProps: null});
  }

  /**
   * Save the changes.
   */
  async remove() {
    this.setState({processing: true});
    const group = this.props.context.removeUserFromGroupDialogProps.group;
    const groupUsers = group.groups_users;

    const groupDto = {
      id: group.id,
      name: group.name,
      groups_users: groupUsers
        // Filter out the user with the matching user_id
        .filter(user => user.user_id !== this.props.context.removeUserFromGroupDialogProps.user.id)
        .map(groupUser => ({
          id: groupUser.id || undefined,
          user_id: groupUser.user_id,
          is_admin: groupUser.is_admin,
          delete: groupUser.delete
        }))
    };

    try {
      this.props.loadingContext.add();
      await this.props.context.port.request('passbolt.groups.update', groupDto);
      this.props.loadingContext.remove();
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The user has been removed successfully"));
      this.props.onClose();
      this.props.context.setContext({removeUserFromGroupDialogProps: null});
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
    const first_name = this.props.context.removeUserFromGroupDialogProps.user.profile.first_name;
    const last_name = this.props.context.removeUserFromGroupDialogProps.user.profile.last_name;
    const username = this.props.context.removeUserFromGroupDialogProps.user.username;

    return `${first_name} ${last_name} (${username})`;
  }

  /**
   * Get the group name
   * @returns {string}
   */
  getGroup() {
    return this.props.context.removeUserFromGroupDialogProps.group.name;
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
        title={this.translate("Remove user?")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="remove-user-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to remove <strong className="dialog-variable">{{user: this.getUser()}}</strong> from <strong className="dialog-variable">{{group: this.getGroup()}}</strong>?
              </Trans>
            </p>
            <p><Trans>The user will lose access to the resources shared with the group.</Trans></p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Remove")} warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

RemoveUserFromGroup.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  loadingContext: PropTypes.any, // The loading context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withLoading(withActionFeedback(withDialog(withTranslation('common')(RemoveUserFromGroup)))));
