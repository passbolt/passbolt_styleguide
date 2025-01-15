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
 * @since         v5.0.0
 */

import React from "react";
import SettingsSVG from "../../../../../img/svg/settings.svg";
import UsersSVG from "../../../../../img/svg/users.svg";
import {Trans} from "react-i18next";
import DropdownButton from "../../Dropdown/DropdownButton";
import {withRbac} from "../../../../../shared/context/Rbac/RbacContext";
import PropTypes from "prop-types";
import Dropdown from "../../Dropdown/Dropdown";
import DropdownMenu from "../../Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Dropdown/DropdownMenuItem";
import {withNavigationContext} from "../../../../contexts/NavigationContext";

class WorkspaceSwitcher extends React.PureComponent {
  render() {
    if (!this.props.isUserAdmin && !this.props.isUserWorkspaceVisible) {
      return null;
    }

    return (
      <div id="workspace-switcher">
        {this.props.isUserAdmin ?
          <Dropdown>
            <DropdownButton className="button-transparent">
              <SettingsSVG/>
            </DropdownButton>
            <DropdownMenu direction="over">
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.props.navigationContext.onGoToAdministrationRequested}>
                  <span><Trans>Organisation Settings</Trans></span>
                  <SettingsSVG/>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button type="button" className="no-border" onClick={this.props.navigationContext.onGoToUsersRequested}>
                  <span><Trans>Manage Users & Groups</Trans></span>
                  <UsersSVG/>
                </button>
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
          :
          <button type="button" className="button-transparent" onClick={this.props.navigationContext.onGoToUsersRequested}>
            <UsersSVG/>
          </button>
        }
      </div>
    );
  }
}


WorkspaceSwitcher.propTypes = {
  isUserAdmin: PropTypes.bool, // true if the current user is an admin
  isUserWorkspaceVisible: PropTypes.bool, // true if the user is not admin but access to the user workspace
  navigationContext: PropTypes.object, // the navigation context
};

export default withNavigationContext(withRbac(WorkspaceSwitcher));
