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
import {DateTime} from "luxon";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import {withAppContext} from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

const LIMIT_ACTIVITIES_PER_PAGE = 5;

class DisplayResourceFolderDetailsActivity extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      activities: null, // list of activities
      activitiesPage: 1, // pagination for activity
      loadingMore: false, // processing when the user want to see more activities
      open: false,
      loading: true,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.folder);
  }

  /**
   * Check if the folder has changed and fetch
   * @param previousFolder
   */
  async handleResourceChange(previousFolder) {
    if (this.state.open && this.folder.id !== previousFolder.id) {
      // Reset the component, and fetch activities for the new folder.
      const state = Object.assign({}, this.defaultState, {open: true});
      await this.setState(state);
      await this.fetch();
      this.setState({loading: false});
    }
  }

  /**
   * handle when the users click on the section header.
   * Open/Close it.
   */
  async handleTitleClickEvent() {
    // If the section is open, reset the component and close the section.
    if (this.state.open) {
      const defaultState = this.defaultState;
      this.setState(defaultState);
    } else {
      await this.setState({loading: true, open: true});
      await this.fetch();
      this.setState({loading: false});
    }
  }

  /**
   * handle when the users click on the more button.
   */
  async handleMoreClickEvent() {
    const activitiesPage = this.state.activitiesPage + 1;
    const loadingMore = true;
    await this.setState({activitiesPage, loadingMore});
    await this.fetch();
    this.setState({loadingMore: false});
  }

  /**
   * Fetch the folder activities
   * @returns {Promise<void>}
   */
  async fetch() {
    const limit = LIMIT_ACTIVITIES_PER_PAGE;
    const page = this.state.activitiesPage;
    const options = {limit, page};
    const newActivities = await this.props.context.port.request("passbolt.actionlogs.find-all-for", "Folder", this.folder.id, options);

    let activities;
    // For the first page need to reset activities state
    if (this.state.activitiesPage > 1) {
      activities = [...(this.state.activities || []), ...newActivities];
    } else {
      activities = [...newActivities];
    }
    this.setState({activities});
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
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
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    return `${baseUrl}/app/folders/view/${folder.id}`;
  }

  /**
   * Get a permission aro name
   * @param {object} permission The permission
   */
  getPermissionAroName(permission) {
    if (permission.user) {
      const profile = permission.user.profile;
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
        return this.translate("can read");
      case 7:
        return this.translate("can update");
      case 15:
        return this.translate("is owner");
    }
  }

  /**
   * Get permission change type label
   * @param {string} type The target change type
   */
  getPermissionChangeTypeLabel(type) {
    switch (type) {
      case "created":
        return this.translate("new");
      case "updated":
        return this.translate("updated");
      case "removed":
        return this.translate("deleted");
    }
  }

  /**
   * Render a created activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderFolderCreatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.folder);
    const folderName = this.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> created folder <a target="_blank" rel="noopener noreferrer" href={folderPermalink}>{{folderName}}</a>
              </Trans>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
      </li>
    );
  }

  /**
   * Render an updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderFolderUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.folder);
    const folderName = this.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> updated folder <a target="_blank" rel="noopener noreferrer" href={folderPermalink}>{{folderName}}</a>
              </Trans>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
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
        <UserAvatar user={permission.user} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
        }
        {permission.group &&
        <GroupAvatar group={permission.group} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
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
   * Render a permissions updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderPermissionsUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const folderPermalink = this.getFolderPermalink(this.folder);
    const folderName = this.folder.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> changed permissions of folder <a target="_blank" rel="noopener noreferrer" href={folderPermalink}>{{folderName}}</a> with
              </Trans>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
            <ul className="permissions-list">
              {activity.data.permissions.added.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "created"))}
              {activity.data.permissions.updated.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "updated"))}
              {activity.data.permissions.removed.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "removed"))}
            </ul>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
      </li>
    );
  }

  /**
   * Render an unknown activity.
   * @returns {JSX}
   */
  renderUnknownActivity() {
    return (
      <li className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <Trans>Unknown activity, please contact your administrator.</Trans>
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
        render = this.renderFolderCreatedActivity(activity);
        break;
      }
      case "Folders.updated": {
        render = this.renderFolderUpdatedActivity(activity);
        break;
      }
      case "Permissions.updated": {
        render = this.renderPermissionsUpdatedActivity(activity);
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
    if (this.state.activities === null) {
      return false;
    }

    return !this.state.activities.some(activity => activity.type === "Folders.created");
  }

  /**
   * Returns the current detailed folder
   */
  get folder() {
    return this.props.resourceWorkspaceContext.details.folder;
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
    const loadingActivities = this.state.activities === null;
    const isMoreButtonVisible = this.isMoreButtonVisible();

    return (
      <div className={`activity accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              <Trans>Activity</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          {loadingActivities &&
          <div className="processing-wrapper">
            <Icon name="spinner"/>
            <span className="processing-text"><Trans>Retrieving activities</Trans></span>
          </div>
          }
          {!loadingActivities &&
          <React.Fragment>
            <ul className="ready">
              {this.state.activities.map(activity => this.renderActivity(activity))}
            </ul>
            {isMoreButtonVisible &&
            <div className="actions">
              <a onClick={this.handleMoreClickEvent} className={`button action-logs-load-more ${this.state.loadingMore ? "processing disabled" : ""}`} role="button">
                <span><Trans>More</Trans></span>
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

DisplayResourceFolderDetailsActivity.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withTranslation('common')(DisplayResourceFolderDetailsActivity)));
