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
import moment from "moment";
import Config from "../../../../legacy/config/config";
import UserAvatar from "../../../Common/UserAvatar/UserAvatar";
import GroupAvatar from "../../../Common/UserAvatar/GroupAvatar";

class FolderSidebarActivitySection extends React.Component {

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
    return {};
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
  }

  /**
   * handle when the users click on the section header.
   * Open/Close it.
   */
  handleTitleClickEvent() {
    if (this.props.open) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  }

  /**
   * handle when the users click on the more button.
   * Open/Close it.
   */
  handleMoreClickEvent() {
    this.props.onMore();
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
   * Get an activity creator full name
   * @param {object} user The creator
   * @return string
   */
  getActivityCreatorFullName(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Get a folder permalink
   * @param {object} folder The target folder
   * @returns {string}
   */
  getFolderPermalink(folder) {
    return `${APP_URL}app/folders/view/${folder.id}`;
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionAroName(permission) {
    if (permission.user) {
      let profile = permission.user.profile;
      return `${profile.first_name} ${profile.last_name}`;
    } else {
      return permission.group.name;
    }
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionLabel(permission) {
    switch (permission.type) {
      case 1:
        return "can read";
      case 7:
        return "can update";
      case 15:
        return "is owner";
    }
  }

  /**
   * Get permission change type label
   * @param {string} type The target change type
   */
  getPermissionChangeTypeLabel(type) {
    switch (type) {
      case "created":
        return "new";
      case "updated":
        return "updated";
      case "removed":
        return "deleted";
    }
  }

  /**
   * Render a created activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderCreatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.props.folder);
    const folderName = this.props.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> created the folder <a href={folderPermalink}>{folderName}</a>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator}/>
      </li>
    );
  }

  /**
   * Render an updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.props.folder);
    const folderName = activity.data.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> renamed the folder into <a href={folderPermalink}>{folderName}</a>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator}/>
      </li>
    );
  }

  /**
   * Render a shared activity permission change item.
   * @param {object} permission The target permission
   * @param {string} changeType The change type
   * @returns {JSX}
   */
  renderSharedActivityPermissionChangeItem(permission, changeType) {
    const permissionLabel = this.getPermissionLabel(permission);
    const permissionAroName = this.getPermissionAroName(permission);
    const changeTypeLabel = this.getPermissionChangeTypeLabel(changeType);

    return (
      <li key={permission.id} className="clearfix">
        {permission.user &&
        <UserAvatar user={permission.user}/>
        }
        {permission.group &&
        <GroupAvatar group={permission.group}/>
        }
        <div className="name">
          <span className="creator">{permissionAroName}</span>
          <span className="permission-type"> - {permissionLabel}</span>
        </div>
        <div className="type"><span className={changeType}>{changeTypeLabel}</span></div>
      </li>
    );
  }

  /**
   * Render a shared activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderSharedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.props.folder);
    const folderName = this.props.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> shared the folder <a href={folderPermalink}>{folderName}</a> with
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
            <ul className="permissions-list">
              {activity.data.permissions.added.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "created"))}
              {activity.data.permissions.updated.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "updated"))}
              {activity.data.permissions.removed.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "removed"))}
            </ul>
          </div>
        </div>
        <UserAvatar user={activity.creator}/>
      </li>
    );
  }

  /**
   * Render an unknown activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderUnknownActivity(activity) {
    return (
      <li className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            Unknown activity, please contact your administrator.
          </div>
        </div>
      </li>
    );
  }

  /**
   * Render an activity
   * @param {object} activity The activity to render
   */
  renderActivity(activity) {
    let render;

    switch (activity.type) {
      case "Folders.created": {
        render = this.renderCreatedActivity(activity);
        break;
      }
      case "Folders.updated": {
        render = this.renderUpdatedActivity(activity);
        break;
      }
      case "Permissions.updated": {
        render = this.renderSharedActivity(activity);
        break;
      }
      default: {
        render = this.renderUnknownActivity(activity);
        break;
      }
    }

    return render;
  }

  /**
   * Is the more button visible
   * @return {boolean}
   */
  isMoreButtonVisible() {
    return !this.props.activities.some(activity => activity.type === "Folders.created");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const loadingActivities = !this.props.activities.length;
    const isMoreButtonVisible = this.isMoreButtonVisible();

    return (
      <div className={`activity accordion sidebar-section ${this.props.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4><a onClick={this.handleTitleClickEvent} role="button">Activity</a></h4>
        </div>
        <div className="accordion-content">
          {loadingActivities &&
          <div className="processing-wrapper">
            <span className="processing-text">Retrieving activities</span>
          </div>
          }
          {!loadingActivities &&
          <React.Fragment>
            <ul className="ready">
              {this.props.activities.map(activity => this.renderActivity(activity))}
            </ul>
            {isMoreButtonVisible &&
            <div className="actions">
              <a onClick={this.handleMoreClickEvent} className={`button action-logs-load-more ${this.props.moreProcessing ? "processing disabled" : ""}`} role="button">
                <span>more</span>
              </a>
            </div>
            }
          </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

FolderSidebarActivitySection.propTypes = {
  activities: PropTypes.array,
  folder: PropTypes.object,
  moreProcessing: PropTypes.bool,
  onClose: PropTypes.func,
  onMore: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

export default FolderSidebarActivitySection;
