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
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import {Trans, withTranslation} from "react-i18next";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {withActionFeedback} from '../../../contexts/ActionFeedbackContext';
import ActivitiesServiceWorkerService from "./ActivitiesServiceWorkerService";
import DisplayAroName from "../../../../shared/components/Aro/DisplayAroName";

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
    this.state = this.defaultState;
    this.activitiesServiceWorkerService = new ActivitiesServiceWorkerService(props.context.port);
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      activities: [], // list of activities
      activitiesPage: 1, // pagination for activity
      loadingMore: false, // processing when the user want to see more activities
      loading: true,
    };
  }

  /**
   * Whenever the component has mounted
   */
  async componentDidMount() {
    await this.fetch(this.state.activitiesPage);
    this.setState({loading: false});
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
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
  }

  /**
   * Check if the resource has changed and fetch
   * @param previousResource
   */
  async handleResourceChange(previousResource) {
    // do nothing if the resource doesn't change.
    if (this.resource.id === previousResource.id) {
      return;
    }

    // Reset the component, and fetch activities for the new resource.
    this.setState(this.defaultState, async() => await this.fetch(this.state.activitiesPage));
    this.setState({loading: false});
  }

  /**
   * Handle the refresh of the activities
   * @param hasPreviouslyRefreshed True if one previously refreshed the activities
   */
  async handleResourceActivitiesRefresh(hasPreviouslyRefreshed) {
    const mustRefresh = !hasPreviouslyRefreshed && this.props.resourceWorkspaceContext.refresh.activities;
    if (mustRefresh) {
      await this.fetch(this.state.activitiesPage);
      await this.props.resourceWorkspaceContext.onResourceActivitiesRefreshed();
    }
  }

  /**
   * handle when the users click on the more button.
   * Open/Close it.
   */
  async handleMoreClickEvent() {
    // If initial load : page 1 is not successful, don't increment to page 2
    const activitiesPage = this.state?.activities?.length > 0 ? this.state.activitiesPage + 1 : this.state.activitiesPage;
    this.setState({activitiesPage, loadingMore: true});
    await this.fetch(activitiesPage);
    this.setState({loadingMore: false});
  }

  /**
   * Fetch the resource activitiesPage
   * @param {number} page the page to load
   * @returns {Promise<void>}
   */
  async fetch(page) {
    try {
      const newActivities = await this.activitiesServiceWorkerService.findAllFromResourceId(this.resource.id, {page}) || [];
      // For the first page need to reset activities state
      this.mergeActivities(newActivities);
    } catch (error) {
      console.error(error);
      this.props.actionFeedbackContext.displayError(error.message);
      // If fetch failed for page 2 or more, decrement page count to try the same page next
      if (this.state.activitiesPage > 1) {
        const activitiesPage = this.state.activitiesPage - 1;
        this.setState({activitiesPage});
      }
    }
  }

  /**
   * Merge current activities with newly fetched ones.
   * It avoids to have duplicated activities especially when a refresh is asked.
   * @param {array} fetchActivities
   */
  mergeActivities(fetchActivities) {
    const newActivities = fetchActivities.filter(activity => !this.state.activities.find(a => a.id === activity.id));
    const activities = [...this.state.activities, ...newActivities];
    activities.sort((a, b) => new Date(b.created) - new Date(a.created));
    this.setState({activities});
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
   * Get the base url
   * @return {string}
   */
  get baseUrl() {
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Render a resource created activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderResouceCreatedActivity(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const resourceName = this.resource.metadata.name;
    const activityFormattedDate = formatDateTimeAgo(activity.created, this.props.t, this.props.context.locale);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> created item <span className="item">{{resourceName}}</span>
              </Trans>
            </div>
            <div className="subinfo third-level light" title={activity.created}>{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.baseUrl}/>
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
    const resourceName = this.resource.metadata.name;
    const activityFormattedDate = formatDateTimeAgo(activity.created, this.props.t, this.props.context.locale);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> updated item <span className="item">{{resourceName}}</span>
              </Trans>
            </div>
            <div className="subinfo third-level light" title={activity.created}>{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.baseUrl}/>
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
    const resourceName = this.resource.metadata.name;
    const activityFormattedDate = formatDateTimeAgo(activity.created, this.props.t, this.props.context.locale);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> accessed secret of item <span className="item">{{resourceName}}</span>
              </Trans>
            </div>
            <div className="subinfo third-level light" title={activity.created}>{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.baseUrl}/>
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
    const resourceName = this.resource.metadata.name;
    const activityFormattedDate = formatDateTimeAgo(activity.created, this.props.t, this.props.context.locale);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> updated secret of item <span className="item">{{resourceName}}</span>
              </Trans>
            </div>
            <div className="subinfo third-level light" title={activity.created}>{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.baseUrl}/>
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
    const changeTypeLabel = this.getPermissionChangeTypeLabel(changeType);

    return (
      <li key={permission.id}>
        {permission.user &&
        <UserAvatar user={permission.user} baseUrl={this.baseUrl}/>
        }
        {permission.group &&
        <GroupAvatar group={permission.group}/>
        }
        <div className="name">
          <span className="creator"><DisplayAroName displayAs={permission.aro} user={permission.user} group={permission.group}/></span>
          <span className="permission-type"> {permissionLabel}</span>
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
    const resourceName = this.resource.metadata.name;
    const activityFormattedDate = formatDateTimeAgo(activity.created, this.props.t, this.props.context.locale);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> changed permissions of item <span className="item">{{resourceName}}</span> with
              </Trans>
            </div>
            <ul className="permissions-list">
              {activity.data.permissions.added.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "created"))}
              {activity.data.permissions.updated.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "updated"))}
              {activity.data.permissions.removed.map(permission => this.renderSharedActivityPermissionChangeItem(permission, "removed"))}
            </ul>
            <div className="subinfo third-level light" title={activity.created}>{activityFormattedDate}</div>
          </div>
        </div>
        <UserAvatar user={activity.creator} baseUrl={this.baseUrl}/>
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
      <div className={`activity accordion sidebar-section`}>
        <div className="accordion-content">
          {this.state.loading &&
          <div className="processing-wrapper">
            <SpinnerSVG/>
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
  actionFeedbackContext: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withActionFeedback(withTranslation('common')(DisplayResourceDetailsActivity))));
