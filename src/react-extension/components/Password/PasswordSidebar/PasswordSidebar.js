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
import Icon from "../../../../react/components/Common/Icons/Icon";
import PropTypes from "prop-types";
import PasswordSidebarInformationSection from "./PasswordSidebarInformationSection";
import PasswordSidebarTagSection from "./PasswordSidebarTagSection";
import PasswordSidebarCommentSection from "./PasswordSidebarCommentSection";
import PasswordSidebarDescriptionSection from "./PasswordSidebarDescriptionSection";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PasswordSidebarPermissionsSection from "./PasswordSidebarPermissionsSection";
import AppContext from "../../../contexts/AppContext";
import PasswordSidebarActivitySection from "./PasswordSidebarActivitySection";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

class PasswordSidebar extends React.Component {
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
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Get the sidebar subtitle
   */
  get subtitle() {
    const defaultSubtitle = "Resource";
    const resource = this.props.resourceWorkspaceContext.details.resource;

    // Resources types might not be yet initialized at the moment this component is rendered.
    if (!this.context.resourceTypesSettings) {
      return "";
    }

    if (resource.resource_type_id) {
      const resourceType = this.context.resourceTypesSettings.findResourceTypeSlugById(resource.resource_type_id);
      switch (resourceType) {
        case this.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION:
          return "Resource with encrypted description";
      }
    }

    return defaultSubtitle;
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.props.resourceWorkspaceContext.details.resource.id}`;
    await this.context.port.request("passbolt.clipboard.copy", permalink);
    this.props.actionFeedbackContext.displaySuccess("The permalink has been copied to clipboard");
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseTags = this.context.siteSettings.canIUse("tags");
    const canUseAuditLog = this.context.siteSettings.canIUse("audit_log");

    return (
      <div className="panel aside ready">
        <div className="sidebar resource">
          <div className="sidebar-header">
            <div className="teaser-image">
              <Icon name="key"/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.resource.name}</span>
                <a className="title-link" title="Copy the link to this password" onClick={this.handlePermalinkClick}>
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this password</span>
                </a>
              </div>
              <span className="subtitle">{this.subtitle}</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <PasswordSidebarInformationSection/>
          <PasswordSidebarDescriptionSection/>
          <PasswordSidebarPermissionsSection/>
          {canUseTags &&
          <PasswordSidebarTagSection/>
          }
          <PasswordSidebarCommentSection/>
          {canUseAuditLog &&
          <PasswordSidebarActivitySection/>
          }
        </div>
      </div>
    );
  }
}

PasswordSidebar.contextType = AppContext;

PasswordSidebar.propTypes = {
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withResourceWorkspace(withActionFeedback(PasswordSidebar));
