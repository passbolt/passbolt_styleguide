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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withDialog} from "../../../contexts/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import DeleteUserGroupWithConflicts from "../../UserGroup/DeleteUserGroup/DeleteUserGroupWithConflicts";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import DeleteUserGroup from "../../UserGroup/DeleteUserGroup/DeleteUserGroup";
import EditUserGroup from "../../UserGroup/EditUserGroup/EditUserGroup";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

class DisplayGroupContextualMenu extends React.Component {
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
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleEditGroup = this.handleEditGroup.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  /**
   * Get group
   * @returns {null|{deleted: boolean, created: string, name: string, modified_by: string, modified: string, id: string, created_by: string, groups_users: [{is_admin: boolean, group_id: string, user_id: string, created: string, id: string}, {is_admin: boolean, group_id: string, user_id: string, created: string, id: string}], my_group_user: {is_admin: boolean, group_id: string, user_id: string, created: string, id: string}}}
   */
  get group() {
    return this.props.group;
  }

  /**
   * Returns true if the current user is admin
   */
  get isCurrentUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === 'admin';
  }

  /**
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.props.context.port.request("passbolt.groups.delete-dry-run", this.group.id);
      this.displayDeleteGroupDialog();
    } catch (error) {
      if (error.name === "DeleteDryRunError") {
        this.displayDeleteGroupWithConflictsDialog(error.errors);
      } else {
        this.handleError(error);
      }
    }
    this.handleHide();
  }

  /**
   * Display delete user dialog when there is not conflict to solve
   */
  displayDeleteGroupDialog() {
    const deleteGroupDialogProps = {
      group: this.group
    };
    this.props.context.setContext({deleteGroupDialogProps});
    this.props.dialogContext.open(DeleteUserGroup);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteGroupWithConflictsDialog(errors) {
    const deleteGroupWithConflictsDialogProps = {
      group: this.group,
      errors
    };
    this.props.context.setContext({deleteGroupWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteUserGroupWithConflicts);
  }

  /**
   * Display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }



  /**
   * Handle the will of edit a group
   */
  async handleEditGroup() {
    await this.props.userWorkspaceContext.onGroupToEdit(this.props.group);
    this.props.dialogContext.open(EditUserGroup);
    this.handleHide();
  }

  /**
   * Handle hide contextual menu
   */
  handleHide() {
    if (typeof this.props.onBeforeHide === 'function') {
      this.props.onBeforeHide(this.props.group.id);
    }
    this.props.hide();
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.handleHide}
        left={this.props.left}
        top={this.props.top}
        className={this.props.className}>
        <li key="option-filter-all-groups" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  className="link no-border"
                  id="edit-group"
                  onClick={this.handleEditGroup}>
                  <span><Trans>Edit group</Trans></span>
                </button>
              </div>
            </div>
          </div>
        </li>
        {this.isCurrentUserAdmin &&
          <li key="option-delete-group" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button
                    type="button"
                    className="link no-border"
                    id="delete-group"
                    onClick={this.handleDeleteClickEvent}>
                    <span><Trans>Delete Group</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        }
      </ContextualMenuWrapper>
    );
  }
}

DisplayGroupContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  hide: PropTypes.func, // Hide the contextual menu
  onBeforeHide: PropTypes.func, // On before hide callback
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  group: PropTypes.object, // The group
  className: PropTypes.string, // Class name to add
  dialogContext: PropTypes.any, // The dialog context
  userWorkspaceContext: PropTypes.object, // The user workspace context
};

export default withAppContext(withUserWorkspace(withDialog(withTranslation("common")(DisplayGroupContextualMenu))));
