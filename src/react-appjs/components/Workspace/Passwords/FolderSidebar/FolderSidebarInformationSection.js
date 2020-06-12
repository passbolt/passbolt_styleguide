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
import Icon from "../../../Common/Icons/Icon";
import PropTypes from "prop-types";
import moment from "moment";
import Config from "../../../../legacy/config/config";

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
    if (!this.props.folders) {
      return;
    }
    if (!this.props.folder.folder_parent_id) {
      this.props.onSelectRoot();
    } else {
      const folderParent = this.props.folders.find(item => item.id === this.props.folder.folder_parent_id);
      this.props.onSelectFolderParent(folderParent);
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
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    return moment.tz(date, Config.read('app.server_timezone')).fromNow();
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

    if (this.props.folders) {
      const folder = this.props.folders.find(item => item.id === folderId);

      return folder.name;
    }

    return "";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const creatorUsername = this.getUserUsername(this.props.folder.created_by);
    const modifierUsername = this.getUserUsername(this.props.folder.modified_by);
    const createdDateTimeAgo = this.formatDateTimeAgo(this.props.folder.created);
    const modifiedDateTimeAgo = this.formatDateTimeAgo(this.props.folder.modified);
    const folderParentName = this.getFolderName(this.props.folder.folder_parent_id);

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Information</a></h4>
        </div>
        <ul className="accordion-content">
          <li className="username">
            <span className="label">Name</span>
            <span className="value">{this.props.folder.name}</span>
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
                <a onClick={this.handleFolderParentClickEvent} className={`folder-link ${!this.props.folders ? "disabled" : ""}`}>
                  <Icon name="folder"/> {folderParentName}
                </a>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

FolderSidebarInformationSection.propTypes = {
  folder: PropTypes.object,
  folders: PropTypes.array,
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  users: PropTypes.array,
};

export default FolderSidebarInformationSection;
