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
import moment from "moment-timezone";
import AppContext from "../../../contexts/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";

class PasswordSidebarInformationSection extends React.Component {
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
    this.handleUsernameClickEvent = this.handleUsernameClickEvent.bind(this);
    this.handlePasswordClickEvent = this.handlePasswordClickEvent.bind(this);
  }

  /**
   * Get the currently selected resource from workspace context
   * @returns {object} resource dto
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleFolderParentClickEvent() {
    if (this.resource.folder_parent_id) { // Case of specific folder
      const folderParent = this.context.folders.find(item => item.id === this.resource.folder_parent_id);
      this.props.history.push(`/app/folders/view/${folderParent.id}`);
    } else { // Case of root folder
      const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
      this.props.history.push(`/app/passwords`, {filter});
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
   * Handle when the user select the username of the resource
   */
  async handleUsernameClickEvent() {
    await this.context.port.request("passbolt.clipboard.copy", this.resource.username);
    this.displaySuccessNotification("The username has been copied to clipboard");
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
    if (this.context.users) {
      const user = this.context.users.find(item => item.id === userId);
      if (user) {
        return user.username;
      }
    }

    return "";
  }

  /**
   * Get the folder name.
   * @param {string} folderId The folder id
   * @returns {string}
   */
  getFolderName(folderParentId) {
    if (folderParentId === null) {
      return 'root';
    }

    if (this.context.folders) {
      const folder = this.context.folders.find(item => item.id === folderParentId);

      return folder.name;
    }

    return "";
  }

  /**
   * Sanitize uri.
   *
   * @param {string} uri The uri to sanitize.
   * @returns {string|boolean}
   */
  sanitizeResourceUri(uri) {
    // Wrong format.
    if (uri == undefined || typeof uri != "string" || !uri.length) {
      return false;
    }

    // Absolute url are not valid url.
    if (uri[0] == "/") {
      return false;
    }

    // If no protocol defined, use http.
    if (!/^((?!:\/\/).)*:\/\//.test(uri)) {
      uri = `http://${uri}`;
    }

    try {
      const url = new URL(uri);
      if (url.protocol === "javascript") {
        throw new Error("The protocol javascript is forbidden.");
      }
      return url.href;
    } catch (error) {
      return false;
    }
  }

  /**
   * Copy password from dto to clipboard
   * Support original password (a simple string) and composed objects)
   *
   * @param {string|object} plaintextDto
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard(plaintextDto) {
    if (!plaintextDto) {
      throw new TypeError(__('The password is empty.'));
    }
    if (typeof plaintextDto === 'string') {
      await this.context.port.request("passbolt.clipboard.copy", plaintextDto);
    } else {
      if (Object.prototype.hasOwnProperty.call(plaintextDto, 'password')) {
        await this.context.port.request("passbolt.clipboard.copy", plaintextDto.password);
      } else {
        throw new TypeError(__('The password field is not defined.'));
      }
    }
  }

  async handlePasswordClickEvent() {
    try {
      const plaintextDto = await this.context.port.request("passbolt.secret.decrypt", this.resource.id, {showProgress: true});
      await this.copyPasswordToClipboard(plaintextDto);
      this.displaySuccessNotification("The secret has been copied to clipboard");
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const canUseFolders = this.context.siteSettings.canIUse("folders");
    const creatorUsername = this.getUserUsername(this.resource.created_by);
    const modifierUsername = this.getUserUsername(this.resource.modified_by);
    const createdDateTimeAgo = this.formatDateTimeAgo(this.resource.created);
    const modifiedDateTimeAgo = this.formatDateTimeAgo(this.resource.modified);
    const safeUri = this.sanitizeResourceUri(this.resource.uri) || "";

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              Information
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </a>
          </h4>
        </div>
        <ul className="accordion-content">
          <li className="username">
            <span className="label">Username</span>
            <span className="value"><a onClick={this.handleUsernameClickEvent}>{this.resource.username}</a></span>
          </li>
          <li className="password">
            <span className="label">Password</span>
            <div className="value">
              <div className="secret-copy">
                <a onClick={this.handlePasswordClickEvent}><span>copy password to clipboard</span></a>
              </div>
            </div>
          </li>
          <li className="uri">
            <span className="label">URI</span>
            <span className="value"><a href={safeUri} target="_blank" rel="noopener noreferrer">{this.resource.uri}</a></span>
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
          {canUseFolders &&
          <li className="location">
            <span className="label">Location</span>
            <span className="value">
              <a onClick={this.handleFolderParentClickEvent} className={`folder-link ${!this.context.folders ? "disabled" : ""}`}>
                <Icon name="folder"/> {this.getFolderName(this.resource.folder_parent_id)}
              </a>
            </span>
          </li>
          }
        </ul>
      </div>
    );
  }
}

PasswordSidebarInformationSection.contextType = AppContext;

PasswordSidebarInformationSection.propTypes = {
  onSelectFolderParent: PropTypes.func,
  onSelectRoot: PropTypes.func,
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withRouter(withActionFeedback(withResourceWorkspace(PasswordSidebarInformationSection)));
