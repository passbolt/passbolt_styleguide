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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";

class DisplayResourceFolderDetailsInformation extends React.Component {
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
      const folderParent = this.props.context.folders.find(item => item.id === this.folder.folder_parent_id);
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
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.props.t('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get a user username
   * @param {string} userId The user id
   */
  getUserUsername(userId) {
    if (this.props.context.users) {
      const user = this.props.context.users.find(item => item.id === userId);
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
  getFolderName(folderId) {
    if (folderId === null) {
      return '/';
    }

    if (this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === folderId);
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
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <Trans>Information</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          <ul>
            <li className="username">
              <span className="label"><Trans>Name</Trans></span>
              <span className="value">{this.folder.name}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Modified</Trans></span>
              <span className="value" title={this.folder.modified}>{modifiedDateTimeAgo}</span>
            </li>
            <li className="modified-by">
              <span className="label"><Trans>Modified by</Trans></span>
              <span className="value">{modifierUsername}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Created</Trans></span>
              <span className="value" title={this.folder.created}>{createdDateTimeAgo}</span>
            </li>
            <li className="modified-by">
              <span className="label"><Trans>Created by</Trans></span>
              <span className="value">{creatorUsername}</span>
            </li>
            <li className="location">
              <span className="label"><Trans>Location</Trans></span>
              <span className="value">
                <button type="button" onClick={this.handleFolderParentClickEvent} disabled={!this.props.context.folders} className="link no-border folder-link">
                  <Icon name="folder"/>
                  <span>{folderParentName}</span>
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayResourceFolderDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourceWorkspace(withTranslation('common')(DisplayResourceFolderDetailsInformation))));
