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
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import DisplayResourceFolderDetailsInformation from "./DisplayResourceFolderDetailsInformation";
import DisplayResourceFolderDetailsPermissions from "./DisplayResourceFolderDetailsPermissions";
import DisplayResourceFolderDetailsActivity from "./DisplayResourceFolderDetailsActivity";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';

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
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
  }

  /**
   * Handle when the user closes the sidebar.
   */
  handleCloseClick() {
    this.props.resourceWorkspaceContext.onLockDetail();
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
    return (
      <div className="panel aside ready">
        <div className="sidebar resource">
          <div className="sidebar-header">
            <div className="teaser-image">
              <Icon name="folder"/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{this.props.resourceWorkspaceContext.details.folder.name}</span>
                <button type="button" className="title-link link no-border" title={this.translate("Copy the link to this folder")} onClick={this.handlePermalinkClick}>
                  <Icon name="link"/>
                  <span className="visuallyhidden"><Trans>Copy the link to this folder</Trans></span>
                </button>
              </div>
              <span className="subtitle"><Trans>folder</Trans></span>
            </h3>
            <button type="button" className="link no-border dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden"><Trans>Close</Trans></span>
            </button>
          </div>
          <DisplayResourceFolderDetailsInformation/>
          <DisplayResourceFolderDetailsPermissions/>
          <DisplayResourceFolderDetailsActivity/>
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
};

export default withAppContext(withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourceFolderDetails))));
