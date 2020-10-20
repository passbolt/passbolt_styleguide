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
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import {withDialog} from "../../../contexts/Common/DialogContext";
import EditUserGroup from "../EditUserGroup/EditUserGroup";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";


/**
 * The contextual menu for a specific group in the list of filter groups
 */
class FilterUsersByGroupItemContextualMenu extends React.Component {
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
    this.handleEditGroup = this.handleEditGroup.bind(this);
  }


  /**
   * Handle the will of edit a group
   */
  async handleEditGroup() {
    await this.props.userWorkspaceContext.onGroupToEdit(this.props.group);
    this.props.dialogContext.open(EditUserGroup);
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
        <li key="option-filter-all-groups" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a
                  id="edit-group"
                  onClick={this.handleEditGroup}>
                  <span>Edit group</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FilterUsersByGroupItemContextualMenu.propTypes = {
  group: PropTypes.object, // Group related to the contextual menu
  onFilterSelected: PropTypes.func,
  left: PropTypes.number, // left position in px of the menu
  hide: PropTypes.func, // Hide the contextual menu
  top: PropTypes.number, // top position in px of the menu,
  userWorkspaceContext: PropTypes.object // The user group context
};

export default withUserWorkspace(withDialog(FilterUsersByGroupItemContextualMenu));
