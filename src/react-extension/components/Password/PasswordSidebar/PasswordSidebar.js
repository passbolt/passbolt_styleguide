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
import Icon from "../../Common/Icons/Icon";
import PropTypes from "prop-types";
import PasswordSidebarInformationSection from "./PasswordSidebarInformationSection";
import PasswordSidebarTagSection from "./PasswordSidebarTagSection";
import PasswordSidebarCommentSection from "./PasswordSidebarCommentSection";
import PasswordSidebarDescriptionSection from "./PasswordSidebarDescriptionSection";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PasswordSidebarPermissionsSection from "./PasswordSidebarPermissionsSection";
import AppContext from "../../../contexts/AppContext";

class PasswordSidebar extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="panel aside ready">
        <div className="sidebar resource">
          <div className="sidebar-header">
            <div className="logo">
              <Icon name="folder"/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.resource.name}</span>
                <a className="title-link" title="Copy the link to this password">
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this password</span>
                </a>
              </div>
              <span className="type">resource</span>
            </h3>
            <a className="dialog-close">
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <PasswordSidebarInformationSection users={this.props.users}/>
          <PasswordSidebarDescriptionSection/>
          <PasswordSidebarPermissionsSection />
          <PasswordSidebarTagSection/>
          <PasswordSidebarCommentSection/>
        </div>
      </div>
    );
  }
}

PasswordSidebar.contextType = AppContext;

PasswordSidebar.propTypes = {
  groups: PropTypes.array,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array,
  resourceWorkspaceContext: PropTypes.object
};

export default withResourceWorkspace(PasswordSidebar);
