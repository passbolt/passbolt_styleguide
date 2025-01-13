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
import DisplayResourceFolderDetailsInformation from "./DisplayResourceFolderDetailsInformation";
import DisplayResourceFolderDetailsPermissions from "./DisplayResourceFolderDetailsPermissions";
import DisplayResourceFolderDetailsActivity from "./DisplayResourceFolderDetailsActivity";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import FolderSVG from "../../../../img/svg/folder.svg";
import LinkSVG from "../../../../img/svg/link.svg";

class DisplayResourceFolderDetails extends React.Component {
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
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/folders/view/${this.props.resourceWorkspaceContext.details.folder.id}`;
    await ClipBoard.copy(permalink, this.props.context.port);
    this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
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
    const canViewShare = this.props.rbacContext.canIUseUiAction(uiActions.SHARE_FOLDER);
    const canUseAuditLog = this.props.context.siteSettings.canIUse("auditLog");

    return (
      <div className="sidebar resource">
        <div className="sidebar-header">
          <div className="teaser-image">
            <FolderSVG/>
          </div>
          <div className="title-area">
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.folder.name}</span>
              </div>
              <span className="subtitle"><Trans>folder</Trans></span>
            </h3>
            <button type="button" className="title-link button-transparent inline" title={this.translate("Copy the link to this folder")} onClick={this.handlePermalinkClick}>
              <LinkSVG/>
              <span className="visuallyhidden"><Trans>Copy the link to this folder</Trans></span>
            </button>
          </div>
        </div>
        <div className="sidebar-content">
          <DisplayResourceFolderDetailsInformation/>
          {canViewShare &&
            <DisplayResourceFolderDetailsPermissions/>
          }
          {canUseAuditLog &&
            <DisplayResourceFolderDetailsActivity/>
          }
        </div>
      </div>
    );
  }
}

DisplayResourceFolderDetails.propTypes = {
  context: PropTypes.any, // The application context
  groups: PropTypes.array,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  onEditPermissions: PropTypes.func,
  users: PropTypes.array,
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
  rbacContext: PropTypes.any, // The role based access control context
};

export default withAppContext(withRbac(withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourceFolderDetails)))));
