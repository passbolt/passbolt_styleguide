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
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import FilterResourcesByFolders from "../FilterResourcesByFolders/FilterResourcesByFolders";
import DisplayResourceFolderDetails from "../../ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetails";
import DisplayResourceDetails from "../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetails";
import {withAppContext} from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByTags from "../FilterResourcesByTags/FilterResourcesByTags";
import PropTypes from "prop-types";
import FilterResourcesByText from "../FilterResourcesByText/FilterResourcesByText";
import FilterResourcesByShortcuts from "../FilterResourcesByShortcuts/FilterResourcesByShortcuts";
import FilterResourcesByBreadcrumb from "../FilterResourcesByBreadcrumb/FilterResourcesByBreadcrumb";
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";
import Logo from "../../Common/Navigation/Header/Logo";
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";
import {withTranslation} from "react-i18next";
import FilterResourcesByGroups from "../FilterResourcesByGroups/FilterResourcesByGroups";
import DisplayResourcesList from "../DisplayResourcesList/DisplayResourcesList";

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
    const canUseFolders = this.props.context.siteSettings.canIUse("folders");
    const canUseTags = this.props.context.siteSettings.canIUse("tags");

    return (
      <div>
        <div className="header second">
          <Logo/>
          <FilterResourcesByText
            placeholder={this.props.t("Search passwords")}/>
          <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
            <DisplayResourcesWorkspaceMainMenu/>
          </div>
          <DisplayResourcesWorkspaceMenu/>
        </div>
        <div className="panel main">
          <div className="panel left">
            <FilterResourcesByShortcuts/>
            {canUseFolders &&
            <FilterResourcesByFolders/>
            }
            <FilterResourcesByGroups/>
            {canUseTags &&
            <FilterResourcesByTags/>
            }
          </div>
          <div className="panel middle">
            <FilterResourcesByBreadcrumb/>
            <DisplayResourcesList/>
            {this.props.resourceWorkspaceContext.details.folder && this.hasLockDetail() &&
              <DisplayResourceFolderDetails/>
            }
            {this.props.resourceWorkspaceContext.details.resource && this.hasLockDetail() &&
              <DisplayResourceDetails/>
            }
          </div>
        </div>
      </div>
    );
  }
}

Workspace.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withTranslation('common')(Workspace)));
