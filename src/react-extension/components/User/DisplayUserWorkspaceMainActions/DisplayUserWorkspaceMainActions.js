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
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import CreateUser from "../CreateUser/CreateUser";
import { withDialog } from "../../../contexts/DialogContext";
import CreateUserGroup from "../../UserGroup/CreateUserGroup/CreateUserGroup";
import { Trans, withTranslation } from "react-i18next";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DropdownButton from "../../Common/Dropdown/DropdownButton";
import AddSVG from "../../../../img/svg/add.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import DropdownMenu from "../../Common/Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Common/Dropdown/DropdownMenuItem";
import UserAddSVG from "../../../../img/svg/user_add.svg";
import GroupAddSVG from "../../../../img/svg/users.svg";
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { actions } from "../../../../shared/services/rbacs/actionEnumeration";

/**
 * This component is a container of multiple actions applicable on user
 */
class DisplayUserWorkspaceMainActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCreateMenuUserClickEvent = this.handleCreateMenuUserClickEvent.bind(this);
    this.handleCreateMenuGroupClickEvent = this.handleCreateMenuGroupClickEvent.bind(this);
  }

  /**
   * Handle user click event
   */
  handleCreateMenuUserClickEvent() {
    this.openCreateUserDialog();
  }

  /**
   * Open create user dialog
   */
  openCreateUserDialog() {
    this.props.dialogContext.open(CreateUser);
  }

  /**
   * Handle group click event
   */
  handleCreateMenuGroupClickEvent() {
    this.openCreateGroupDialog();
  }

  /**
   * Open create group dialog
   */
  openCreateGroupDialog() {
    this.props.dialogContext.open(CreateUserGroup);
  }

  /**
   * Check if the user can use the create capability.
   * @returns {boolean}
   */
  canIUseCreate() {
    return this.isLoggedInUserAdmin() || this.canIUseCreateGroup();
  }

  /**
   * Can update the resource
   * @returns {boolean}
   */
  isLoggedInUserAdmin() {
    return this.props.context.loggedInUser && this.props.context.loggedInUser.role.name === "admin";
  }

  /**
   * Can I use create group
   * @return {boolean}
   */
  canIUseCreateGroup() {
    return this.props.rbacContext.canIUseAction(actions.GROUPS_ADD);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="main-action-wrapper">
        {this.canIUseCreate() && (
          <Dropdown>
            <DropdownButton className="create primary">
              <AddSVG />
              <Trans>Create</Trans>
              <CaretDownSVG />
            </DropdownButton>
            <DropdownMenu className="menu-create-primary">
              {this.isLoggedInUserAdmin() && (
                <DropdownMenuItem>
                  <button
                    id="user_action"
                    type="button"
                    className="no-border"
                    onClick={this.handleCreateMenuUserClickEvent}
                  >
                    <UserAddSVG />
                    <span>
                      <Trans>User</Trans>
                    </span>
                  </button>
                </DropdownMenuItem>
              )}
              {this.canIUseCreateGroup() && (
                <DropdownMenuItem>
                  <button
                    id="group_action"
                    type="button"
                    className="no-border"
                    onClick={this.handleCreateMenuGroupClickEvent}
                  >
                    <GroupAddSVG />
                    <span>
                      <Trans>Group</Trans>
                    </span>
                  </button>
                </DropdownMenuItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    );
  }
}

DisplayUserWorkspaceMainActions.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.any, // the dialog context
  rbacContext: PropTypes.any, // the rbac context
};

export default withAppContext(withDialog(withRbac(withTranslation("common")(DisplayUserWorkspaceMainActions))));
