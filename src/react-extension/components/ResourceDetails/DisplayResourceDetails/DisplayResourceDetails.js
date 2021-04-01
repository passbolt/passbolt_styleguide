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
import DisplayResourceDetailsInformation from "./DisplayResourceDetailsInformation";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";
import DisplayResourceDetailsComment from "./DisplayResourceDetailsComment";
import DisplayResourceDetailsDescription from "./DisplayResourceDetailsDescription";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import DisplayResourceDetailsPermission from "./DisplayResourceDetailsPermission";
import AppContext from "../../../contexts/AppContext";
import DisplayResourceDetailsActivity from "./DisplayResourceDetailsActivity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withTranslation} from "react-i18next";

class DisplayResourceDetails extends React.Component {
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
    const defaultSubtitle = this.translate("Resource");
    const resource = this.props.resourceWorkspaceContext.details.resource;

    // Resources types might not be yet initialized at the moment this component is rendered.
    if (!this.context.resourceTypesSettings) {
      return "";
    }

    if (resource.resource_type_id) {
      const resourceType = this.context.resourceTypesSettings.findResourceTypeSlugById(resource.resource_type_id);
      switch (resourceType) {
        case this.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION:
          return this.translate("Resource with encrypted description");
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
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseTags = this.context.siteSettings.canIUse("tags");
    const canUseAuditLog = this.context.siteSettings.canIUse("auditLog") ||
      this.context.siteSettings.canIUse("audit_log"); // @deprecated remove with v4

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
                <a className="title-link" title={this.translate("Copy the link to this password")} onClick={this.handlePermalinkClick}>
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
          <DisplayResourceDetailsInformation/>
          <DisplayResourceDetailsDescription/>
          <DisplayResourceDetailsPermission/>
          {canUseTags &&
          <DisplayResourceDetailsTag/>
          }
          <DisplayResourceDetailsComment/>
          {canUseAuditLog &&
          <DisplayResourceDetailsActivity/>
          }
        </div>
      </div>
    );
  }
}

DisplayResourceDetails.contextType = AppContext;

DisplayResourceDetails.propTypes = {
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourceDetails)));
