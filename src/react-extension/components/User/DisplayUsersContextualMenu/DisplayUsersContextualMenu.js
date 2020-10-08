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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import EditUserDialog from "../EditUser/EditUserDialog";
import ConfirmDisableUserMFA from "../DisableUserMFA/ConfirmDisableUserMFA";
import DeleteUserWithConflictsDialog from "../DeleteUser/DeleteUserWithConflictsDialog";
import DeleteUserDialog from "../DeleteUser/DeleteUserDialog";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";

class DisplayUsersContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkCopy = this.handlePermalinkCopy.bind(this);
    this.handleUsernameCopy = this.handleUsernameCopy.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleDisableMfaEvent = this.handleDisableMfaEvent.bind(this);
  }

  /**
   * Returns true if the currrent user can disable the MFA of a user
   */
  get canIDisableMfa() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Returns true if the current user has the plugin capability to disable MFA
   */
  get haveDisableMfaCapability() {
    return this.context.siteSettings.settings.passbolt.plugins.multiFactorAuthentication;
  }

  /**
   * the resource selected
   * @returns {*}
   */
  get user() {
    return this.props.user;
  }

  /**
   * Handle the copy of user permalink
   */
  async handlePermalinkCopy() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.user.id}`;
    await this.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess("The permalink has been copied to clipboard");
    this.props.hide();
  }

  /**
   * Handle the copy of the username
   */
  async handleUsernameCopy() {
    const username = `${this.user.username}`;
    await this.context.port.request("passbolt.clipboard.copy", username);
    this.props.actionFeedbackContext.displaySuccess("The email has been copied to clipboard");
    this.props.hide();
  }

  /**
   * Handle the copy of public key
   */
  async handlePublicKeyCopy() {
    this.props.hide();
    const gpgkeyInfo = await this.context.port.request('passbolt.keyring.get-public-key-info-by-user', this.user.id);
    await this.context.port.request("passbolt.clipboard.copy", gpgkeyInfo.key);
    this.props.actionFeedbackContext.displaySuccess("The public key has been copied to clipboard");
  }

  /**
   * handle edit user
   */
  handleEditClickEvent() {
    const editUserDialogProps = {
      id: this.user.id
    };
    this.context.setContext({editUserDialogProps});
    this.props.dialogContext.open(EditUserDialog);
    this.props.hide();
  }

  /**
   * Handle the will of disable MFA for a user
   */
  handleDisableMfaEvent() {
    this.disableMFA();
  }

  /**
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.context.port.request("passbolt.users.delete-dry-run", this.user.id);
      this.displayDeleteUserDialog();
    } catch (error) {
      if (error.name === 'DryRunDeleteError') {
        this.displayDeleteUserWithConflictsDialog(error.errors);
      } else {
        this.handleError(error);
      }
    }
    this.props.hide();
  }

  /**
   * Display delete user dialog when there is not conflict to solve
   */
  displayDeleteUserDialog() {
    const deleteUserDialogProps = {
      user: this.user
    };
    this.context.setContext({deleteUserDialogProps});
    this.props.dialogContext.open(DeleteUserDialog);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteUserWithConflictsDialog(errors) {
    const deleteUserWithConflictsDialogProps = {
      user: this.user,
      folders: errors.folders && errors.folders.sole_owner,
      resources: errors.resources && errors.resources.sole_owner,
      groups: errors.groups && errors.groups.sole_manager,
    };
    this.context.setContext({deleteUserWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteUserWithConflictsDialog);
  }

  /**
   * Display error dialog
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
   * Check if the user can use the edit capability.
   * @returns {boolean}
   */
  canIUseEdit() {
    return this.isLoggedInUserAdmin();
  }

  /**
   * Can update the resource
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.context.loggedInUser && this.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Disable the selected user's MFA
   */
  disableMFA() {
    this.props.dialogContext.open(ConfirmDisableUserMFA);
    this.props.hide();
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li
          key="copy-user-permalink"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handlePermalinkCopy}>
                  <span>Copy permalink</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-public-key"
          className="opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handlePublicKeyCopy}>
                  <span>Copy public key</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li
          key="copy-username"
          className="separator-after opened">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleUsernameCopy}>
                  <span>Copy email address</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        {this.canIDisableMfa &&
        <li key="disable-user-mfa" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  id="disable-mfa"
                  onClick={this.handleDisableMfaEvent}
                  className={this.haveDisableMfaCapability ? '' : 'disabled'}>
                  <span>Disable MFA</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.canIUseEdit() &&
        <li key="edit-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="edit" onClick={this.handleEditClickEvent}><span>Edit</span></a>
              </div>
            </div>
          </div>
        </li>
        }
        {this.isLoggedInUserAdmin() &&
        <li key="delete-user" className="ready">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="delete" onClick={this.handleDeleteClickEvent}><span>Delete</span></a>
              </div>
            </div>
          </div>
        </li>
        }
      </ContextualMenuWrapper>
    );
  }
}

DisplayUsersContextualMenu.contextType = AppContext;

DisplayUsersContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  dialogContext: PropTypes.any, // the dialog context
  user: PropTypes.object, // user selected
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withDialog(withActionFeedback(DisplayUsersContextualMenu));

