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
import Icon from "../../../../react/components/Common/Icons/Icon";
import {Link} from "react-router-dom";

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
      loadingMore: false, // processing when the user want to see more activities
      open: false,
      loading: true,
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
  async handleResourceChange(previousResource) {
    // do nothing if the section is closed.
    if (!this.state.open) {
      return;
    }
    // do nothing if the resource doesn't change.
    if (this.resource.id === previousResource.id) {
      return;
    }

    // Reset the component, and fetch activities for the new resource.
    const state = Object.assign({}, this.getDefaultState(), {open: true});
    await this.setState(state);
    await this.fetch();
    this.setState({loading: false});
  }

  /**
   * handle when the users click on the section header.
   * Open/Close it.
   */
  async handleTitleClickEvent() {
    // If the section is open, reset the component and close the section.
    if (this.state.open) {
      const defaultState = this.getDefaultState();
      this.setState(defaultState);
    } else {
      await this.setState({loading: true, open: true});
      await this.fetch();
      this.setState({loading: false});
    }
  }

  /**
   * handle when the users click on the more button.
   * Open/Close it.
   */
  async handleMoreClickEvent() {
    const activitiesPage = this.state.activitiesPage + 1;
    const loadingMore = true;
    await this.setState({activitiesPage, loadingMore});
    await this.fetch();
    this.setState({loadingMore: false});
  }

  /**
   * Fetch the resource activities
   * @returns {Promise<void>}
   */
  async fetch() {
    const newActivities = await this.context.port.request('passbolt.resources.action-log', this.resource.id, this.state.activitiesPage, LIMIT_ACTIVITIES_PER_PAGE);
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
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> created the item <Link to={resourceLink}>{resourceName}</Link>
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
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = activity.data.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> renamed the item into <Link to={resourceLink}>{resourceName}</Link>
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
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> accessed secret of item <Link to={resourceLink}>{resourceName}</Link>
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
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.action_log_id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <span className="creator">{activityCreatorName}</span> changed permissions of the item <Link to={resourceLink}>{resourceName}</Link> with
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
   * Check if the more button should be displayed.
   * @return {boolean}
   */
  mustDisplayMoreButton() {
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
    return (
      <div className={`activity accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <a onClick={this.handleTitleClickEvent} role="button">
              Activity
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
          {this.state.loading &&
          <div className="processing-wrapper">
            <span className="processing-text">Retrieving activities</span>
          </div>
          }
          {!this.state.loading &&
          <React.Fragment>
            <ul className="ready">
              {this.state.activities.map(activity => this.renderActivity(activity))}
            </ul>
            {this.mustDisplayMoreButton() &&
            <div className="actions">
              <a onClick={this.handleMoreClickEvent} className={`button action-logs-load-more ${this.state.loadingMore ? "processing disabled" : ""}`} role="button">
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
