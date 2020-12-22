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
 * @since         2.13.0
 */
import React, {Component} from "react";
import UserBadgeMenu from "../../Header/UserBadgeMenu";
import FoldersTree from "../FoldersTree/FoldersTree";
import Grid from "../Grid/Grid";
import FolderSidebar from "../FolderSidebar/FolderSidebar";
import PasswordSidebar from "../PasswordSidebar/PasswordSidebar";
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import SidebarTagFilterSection from "../../Tag/SidebarTagFilterSection/SidebarTagFilterSection";
import PropTypes from "prop-types";
import PasswordSearchBar from "../PasswordSearchBar/PasswordSearchBar";
import FilterResourcesByShortcuts from "../FilterResourcesByShortcuts/FilterResourcesByShortcuts";
import PasswordBreadcrumb from "../PasswordBreadcrumb/PasswordBreadcrumb";
import PasswordWorkspaceMenu from "./PasswordWorkspaceMenu";
import Logo from "../../../../react/components/Common/Navigation/Header/Logo";
import PasswordWorkspaceMainMenu from "./PasswordWorkspaceMainMenu";
import SidebarGroupFilterSection from "../Group/SidebarGroupFilterSection/SidebarGroupFilterSection";

class Workspace extends Component {
  /**
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasLockDetail() {
    return this.props.resourceWorkspaceContext.lockDisplayDetail;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const canUseFolders = this.context.siteSettings.canIUse("folders");
    const canUseTags = this.context.siteSettings.canIUse("tags");

    return (
      <div>
        <div className="header second">
          <Logo/>
          <PasswordSearchBar
            placeholder="Search passwords"/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.loggedInUser}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
            <PasswordWorkspaceMainMenu/>
          </div>
          <PasswordWorkspaceMenu/>
        </div>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <FilterResourcesByShortcuts/>
                  {canUseFolders &&
                  <FoldersTree/>
                  }
                  <SidebarGroupFilterSection/>
                  {canUseTags &&
                  <SidebarTagFilterSection/>
                  }
                </div>
                <div className="panel middle">
                  <PasswordBreadcrumb/>
                  <Grid/>
                  {this.props.resourceWorkspaceContext.details.folder && this.hasLockDetail() &&
                    <FolderSidebar/>
                  }
                  {this.props.resourceWorkspaceContext.details.resource && this.hasLockDetail() &&
                    <PasswordSidebar/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Workspace.contextType = AppContext;
Workspace.propTypes = {
  resourceWorkspaceContext: PropTypes.any
};

export default withResourceWorkspace(Workspace);
