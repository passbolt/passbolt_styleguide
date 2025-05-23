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
import PropTypes from "prop-types";
import Dropdown from "../../Dropdown/Dropdown";
import DropdownMenu from "../../Dropdown/DropdownMenu";
import DropdownMenuItem from "../../Dropdown/DropdownMenuItem";
import {withNavigationContext} from "../../../../contexts/NavigationContext";
import CogSVG from "../../../../../img/svg/cog.svg";
import HelpSVG from "../../../../../img/svg/help.svg";

export const WORKSPACE_ENUM = {
  RESOURCE: "RESOURCE",
  ORGANISATION_SETTINGS: "ORGANISATION_SETTINGS",
  USER_AND_GROUPS: "USER_AND_GROUPS",
  USER_PROFILE: "USER_PROFILE",
};

class WorkspaceSwitcher extends React.PureComponent {
  render() {
    if (!this.props.isUserAdmin && !this.props.isUserWorkspaceVisible) {
      return null;
    }

    return (
      <div id="workspace-switcher">
        <Dropdown>
          <DropdownButton className="button-transparent switcher">
            <CogSVG className="cog"/>
          </DropdownButton>
          <DropdownMenu direction="left" className="menu-switcher">
            {this.props.isUserAdmin &&
              <DropdownMenuItem>
                <button type="button" className={`no-border ${this.props.currentWorkspace === WORKSPACE_ENUM.ORGANISATION_SETTINGS ? "active" : ""}`} onClick={this.props.navigationContext.onGoToAdministrationRequested}>
                  <SettingsSVG/>
                  <span><Trans>Organisation Settings</Trans></span>
                </button>
              </DropdownMenuItem>
            }
            <DropdownMenuItem>
              <button type="button" className={`no-border ${this.props.currentWorkspace === WORKSPACE_ENUM.USER_AND_GROUPS ? "active" : ""}`} onClick={this.props.navigationContext.onGoToUsersRequested}>
                <UsersSVG/>
                <span><Trans>Manage Users & Groups</Trans></span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button type="button" className="no-border" onClick={this.props.navigationContext.onGoToHelpRequested}>
                <HelpSVG/>
                <span><Trans>Help</Trans></span>
              </button>
            </DropdownMenuItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}


WorkspaceSwitcher.propTypes = {
  isUserAdmin: PropTypes.bool, // true if the current user is an admin
  isUserWorkspaceVisible: PropTypes.bool, // true if the user is not admin but access to the user workspace
  currentWorkspace: PropTypes.string, // the current visible workspace
  navigationContext: PropTypes.object, // the navigation context
};

export default withNavigationContext(WorkspaceSwitcher);
