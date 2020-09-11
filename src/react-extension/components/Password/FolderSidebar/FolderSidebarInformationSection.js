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
import moment from "moment";
import AppContext from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class FolderSidebarInformationSection extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFolderParentClickEvent = this.handleFolderParentClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }


  /**
   * Handle when the user selects the folder parent.
   */
  handleFolderParentClickEvent() {
    if (this.folder.folder_parent_id) { // Case of specific folder
      const folderParent = this.context.folders.find(item => item.id === this.folder.folder_parent_id);
      this.props.history.push(`/app/folders/view/${folderParent.id}`)
    } else { // Case of root folder
      this.props.history.push(`/app/passwords`);
    }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Returns the current detailed folder
   */
  get folder() {
    return this.props.resourceWorkspaceContext.details.folder;
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    return moment.tz(date, serverTimezone).fromNow();
  }

  /**
   * Get a user username
   * @param {string} userId The user id
   */
  getUserUsername(userId) {
    let username = "";

    if (this.props.users) {
      const user = this.props.users.find(item => item.id === userId);
      if (user) {
        username = user.username;
      }
    }

    return username;
  }

  /**
   * Get the folder name.
   * @param {string} folderId The folder id
   * @returns {string}
   */
  getFolderName(folderId) {
    if (folderId === null) {
      return '/';
    }

    if (this.context.folders) {
      const folder = this.context.folders.find(item => item.id === folderId);
      return folder.name;
    }

    return "";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const creatorUsername = this.getUserUsername(this.folder.created_by);
    const modifierUsername = this.getUserUsername(this.folder.modified_by);
    const createdDateTimeAgo = this.formatDateTimeAgo(this.folder.created);
    const modifiedDateTimeAgo = this.formatDateTimeAgo(this.folder.modified);
    const folderParentName = this.getFolderName(this.folder.folder_parent_id);

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Information</a></h4>
        </div>
        <ul className="accordion-content">
          <li className="username">
            <span className="label">Name</span>
            <span className="value">{this.folder.name}</span>
          </li>
          <li className="modified">
            <span className="label">Modified</span>
            <span className="value">{modifiedDateTimeAgo}</span>
          </li>
          <li className="modified-by">
            <span className="label">Modified by</span>
            <span className="value">{modifierUsername}</span>
          </li>
          <li className="modified">
            <span className="label">Created</span>
            <span className="value">{createdDateTimeAgo}</span>
          </li>
          <li className="modified-by">
            <span className="label">Created by</span>
            <span className="value">{creatorUsername}</span>
          </li>
          <li className="location">
            <span className="label">Location</span>
            <span className="value">
              <a onClick={this.handleFolderParentClickEvent} className={`folder-link ${!this.context.folders ? "disabled" : ""}`}>
                <Icon name="folder"/> {folderParentName}
              </a>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

FolderSidebarInformationSection.contextType = AppContext;

FolderSidebarInformationSection.propTypes = {
  users: PropTypes.array,
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object
};

export default withRouter(withResourceWorkspace(FolderSidebarInformationSection));
