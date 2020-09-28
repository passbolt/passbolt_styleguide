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
import moment from "moment-timezone";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import AppContext from "../../../contexts/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

const LIMIT_ACTIVITIES_PER_PAGE = 5;

/**
 * This component display activity section of a resource
 */
class PasswordSidebarActivitySection extends React.Component {
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
      activities: null, // list of activities
      activitiesPage: 1, // pagination for activity
      activitySectionMoreProcessing: true, // processing when the user want to see more activities
      open: false,
    };
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  handleResourceChange(previousResource) {
    const hasResourceChanged = this.resource.id !== previousResource.id;
    if (hasResourceChanged && this.state.open) {
      this.fetch();
    }
  }

  /**
   * handle when the users click on the section header.
   * Open/Close it.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    if (open) {
      this.fetch();
    }
    this.setState({open});
  }

  /**
   * handle when the users click on the more button.
   * Open/Close it.
   */
  handleMoreClickEvent() {
    const activitiesPage = this.state.activitiesPage + 1;
    this.setState({activitiesPage, activitySectionMoreProcessing: true}, this.fetch.bind(this));
    this.setState({activitySectionMoreProcessing: false});
  }

  /**
   * Fetch the resource activities
   * @returns {Promise<void>}
   */
  async fetch() {
    const newActivities = await this.context.port.request('passbolt.resources.action-log', this.resource.id, this.state.activitiesPage, LIMIT_ACTIVITIES_PER_PAGE);
    const activities = [...(this.state.activities || []), ...newActivities];
    this.setState({activities});
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
   * Get an activity creator full name
   * @param {object} user The creator
   * @return string
   */
  getActivityCreatorFullName(user) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }

  /**
   * Get a resource permalink
   * @param {object} resource The target resource
   * @returns {string}
   */
  getResourcePermalink(resource) {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    return `${baseUrl}/app/passwords/view/${resource.id}`;
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
    const resourcePermalink = this.getResourcePermalink(this.resource);
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> created the item <a href={resourcePermalink}>{resourceName}</a>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.context.userSettings.getTrustedDomain()}/>
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
    const resourcePermalink = this.getResourcePermalink(this.resource);
    const resourceName = activity.data.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> renamed the item into <a href={resourcePermalink}>{resourceName}</a>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.context.userSettings.getTrustedDomain()}/>
      </li>
    );
  }

  /**
   * Render a created activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderReadActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourcePermalink = this.getResourcePermalink(this.resource);
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> accessed secret of item <a href={resourcePermalink}>{resourceName}</a>
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.context.userSettings.getTrustedDomain()}/>
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
        <UserAvatar user={permission.user} baseUrl={this.context.userSettings.getTrustedDomain()}/>
        }
        {permission.group &&
        <GroupAvatar group={permission.group} baseUrl={this.context.userSettings.getTrustedDomain()}/>
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
    const resourcePermalink = this.getResourcePermalink(this.resource);
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> changed permissions of the item <a href={resourcePermalink}>{resourceName}</a> with
            </div>
            <div className="subinfo light">{activityFormattedDate}</div>
            <ul className="permissions-list">
              {activity.data.permissions.added.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "created"))}
              {activity.data.permissions.updated.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "updated"))}
              {activity.data.permissions.removed.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "removed"))}
            </ul>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.context.userSettings.getTrustedDomain()}/>
      </li>
    );
  }

  /**
   * Render an unknown activity.
   * @returns {JSX}
   */
  renderUnknownActivity(activity) {
    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
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
      case "Resources.created": {
        render = this.renderCreatedActivity(activity);
        break;
      }
      case "Resources.updated": {
        render = this.renderUpdatedActivity(activity);
        break;
      }
      case "Permissions.updated": {
        render = this.renderSharedActivity(activity);
        break;
      }
      case "Resource.Secrets.read": {
        render = this.renderReadActivity(activity);
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

    return !this.state.activities.some(activity => activity.type === "Resources.created");
  }

  /**
   * Returns the current detailed resource
   */
  get resource() {
    return this.props.resourceWorkspaceContext.details.resource;
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
              {this.state.activities.map(activity => this.renderActivity(activity))}
            </ul>
            {isMoreButtonVisible &&
            <div className="actions">
              <a onClick={this.handleMoreClickEvent} className={`button action-logs-load-more ${this.state.moreProcessing ? "processing disabled" : ""}`} role="button">
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

PasswordSidebarActivitySection.contextType = AppContext;

PasswordSidebarActivitySection.propTypes = {
  resourceWorkspaceContext: PropTypes.any
};

export default withResourceWorkspace(PasswordSidebarActivitySection);
