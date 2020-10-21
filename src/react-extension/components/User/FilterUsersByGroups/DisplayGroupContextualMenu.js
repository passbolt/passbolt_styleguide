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
import DeleteGroupWithConflictsDialog from "../../Group/DeleteGroup/DeleteGroupWithConflictsDialog";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import DeleteGroupDialog from "../../Group/DeleteGroup/DeleteGroupDialog";

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
  }

  /**
   * Handle delete click event
   */
  async handleDeleteClickEvent() {
    try {
      await this.context.port.request("passbolt.groups.delete-dry-run", this.group.id);
      this.displayDeleteGroupDialog();
    } catch (error) {
      if (error.name === "DeleteDryRunError") {
        this.displayDeleteGroupWithConflictsDialog(error.errors);
      } else {
        this.handleError(error);
      }
    }
    this.props.hide();
  }

  /**
   * Display delete user dialog when there is not conflict to solve
   */
  displayDeleteGroupDialog() {
    const deleteGroupDialogProps = {
      group: this.group
    };
    this.context.setContext({deleteGroupDialogProps});
    this.props.dialogContext.open(DeleteGroupDialog);
  }

  /**
   * Display delete user dialog when there is conflict to solve.
   */
  displayDeleteGroupWithConflictsDialog(errors) {
    const deleteGroupWithConflictsDialogProps = {
      group: this.group,
      errors
    };
    this.context.setContext({deleteGroupWithConflictsDialogProps});
    this.props.dialogContext.open(DeleteGroupWithConflictsDialog);
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
   * Get group
   * @returns {null|{deleted: boolean, created: string, name: string, modified_by: string, modified: string, id: string, created_by: string, groups_users: [{is_admin: boolean, group_id: string, user_id: string, created: string, id: string}, {is_admin: boolean, group_id: string, user_id: string, created: string, id: string}], my_group_user: {is_admin: boolean, group_id: string, user_id: string, created: string, id: string}}}
   */
  get group() {
    return this.props.group;
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
        <li key="option-delete-group" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="delete-group" onClick={this.handleDeleteClickEvent}><span>Delete Group</span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

DisplayGroupContextualMenu.contextType = AppContext;

DisplayGroupContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  group: PropTypes.object,
  dialogContext: PropTypes.any
};

export default withDialog(DisplayGroupContextualMenu);
