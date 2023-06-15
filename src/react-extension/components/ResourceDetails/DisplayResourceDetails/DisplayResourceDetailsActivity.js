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
import UserAvatar from "../../Common/Avatar/UserAvatar";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";

const LIMIT_ACTIVITIES_PER_PAGE = 5;

/**
 * This component display activity section of a resource
 */
class DisplayResourceDetailsActivity extends React.Component {
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
    if (prevProps.resourceWorkspaceContext.details) {
      await this.handleResourceChange(prevProps.resourceWorkspaceContext.details.resource);
    }
    if (prevProps.resourceWorkspaceContext.refresh) {
      await this.handleResourceActivitiesRefresh(prevProps.resourceWorkspaceContext.refresh.activities);
    }
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
   * Handle the refresh of the activities
   * @param hasPreviouslyRefreshed True if one previously refreshed the activities
   */
  async handleResourceActivitiesRefresh(hasPreviouslyRefreshed) {
    const mustRefresh = !hasPreviouslyRefreshed && this.props.resourceWorkspaceContext.refresh.activities;
    if (mustRefresh) {
      await this.fetch();
      await this.props.resourceWorkspaceContext.onResourceActivitiesRefreshed();
    }
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
    const limit = LIMIT_ACTIVITIES_PER_PAGE;
    const page = this.state.activitiesPage;
    const options = {limit, page};
    const newActivities = await this.props.context.port.request("passbolt.actionlogs.find-all-for", "Resource", this.resource.id, options);

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
   * Render a resource created activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderResouceCreatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> created item <a target="_blank" rel="noopener noreferrer" href={resourceLink}>{{resourceName}}</a>
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
   * Render a resource updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderResourceUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> updated item <a target="_blank" rel="noopener noreferrer" href={resourceLink}>{{resourceName}}</a>
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
   * Render a secret read activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderSecretReadActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> accessed secret of item <a target="_blank" rel="noopener noreferrer" href={resourceLink}>{{resourceName}}</a>
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
   * Render a secret updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderSecretUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> updated secret of item <a target="_blank" rel="noopener noreferrer" href={resourceLink}>{{resourceName}}</a>
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
   * Render a permissions updated activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderPermissionsUpdatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceLink = `/app/passwords/view/${this.resource.id}`;
    const resourceName = this.resource.name;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> changed permissions of item <a target="_blank" rel="noopener noreferrer" href={resourceLink}>{{resourceName}}</a> with
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
  renderUnknownActivity(activity) {
    return (
      <li key={activity.id} className="usercard-detailed-col-2">
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
      case "Resources.created": {
        render = this.renderResouceCreatedActivity(activity);
        break;
      }
      case "Resources.updated": {
        render = this.renderResourceUpdatedActivity(activity);
        break;
      }
      case "Permissions.updated": {
        render = this.renderPermissionsUpdatedActivity(activity);
        break;
      }
      case "Resource.Secrets.read": {
        render = this.renderSecretReadActivity(activity);
        break;
      }
      case "Resource.Secrets.updated": {
        render = this.renderSecretUpdatedActivity(activity);
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
      <div className={`activity accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <Trans>Activity</Trans>
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
          {this.state.loading &&
          <div className="processing-wrapper">
            <Icon name="spinner"/>
            <span className="processing-text"><Trans>Retrieving activities</Trans></span>
          </div>
          }
          {!this.state.loading &&
          <React.Fragment>
            <ul className="ready">
              {this.state.activities.map(activity => this.renderActivity(activity))}
            </ul>
            {this.mustDisplayMoreButton() &&
            <div className="actions">
              <button type="button" onClick={this.handleMoreClickEvent} disabled={this.state.loadingMore} className={`link no-border action-logs-load-more ${this.state.loadingMore ? "processing" : ""}`}>
                <span><Trans>More</Trans></span>
              </button>
            </div>
            }
          </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

DisplayResourceDetailsActivity.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withTranslation('common')(DisplayResourceDetailsActivity)));
