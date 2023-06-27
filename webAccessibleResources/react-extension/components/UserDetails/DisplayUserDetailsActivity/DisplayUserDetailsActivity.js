/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";

const LIMIT_ACTIVITIES_PER_PAGE = 5;

/**
 * This component display activity section of a user
 */
class DisplayUserDetailsActivity extends React.Component {
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
    if (prevProps.userWorkspaceContext.details) {
      await this.handleUserChange(prevProps.userWorkspaceContext.details.user);
    }
    if (prevProps.userWorkspaceContext.refresh) {
      await this.handleUserActivitiesRefresh(prevProps.userWorkspaceContext.refresh.activities);
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
   * Check if the user has changed and fetch
   * @param previousUser
   */
  async handleUserChange(previousUser) {
    // do nothing if the section is closed.
    if (!this.state.open) {
      return;
    }
    // do nothing if the user doesn't change.
    if (this.user.id === previousUser.id) {
      return;
    }

    // Reset the component, and fetch activities for the new user.
    const state = Object.assign({}, this.getDefaultState(), {open: true});
    await this.setState(state);
    await this.fetch();
    this.setState({loading: false});
  }

  /**
   * Handle the refresh of the activities
   * @param hasPreviouslyRefreshed True if one previously refreshed the activities
   */
  async handleUserActivitiesRefresh(hasPreviouslyRefreshed) {
    const mustRefresh = !hasPreviouslyRefreshed && this.props.userWorkspaceContext.refresh.activities;
    if (mustRefresh) {
      await this.fetch();
      await this.props.userWorkspaceContext.onUserActivitiesRefreshed();
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
   * Fetch the user activities
   * @returns {Promise<void>}
   */
  async fetch() {
    const limit = LIMIT_ACTIVITIES_PER_PAGE;
    const page = this.state.activitiesPage;
    const options = {limit, page};
    const newActivities = await this.props.context.port.request("passbolt.actionlogs.find-all-for", "User", this.user.id, options);

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
    return duration > -1000 && duration < 0 ? this.props.t('Just now') : dateTime.toRelative({locale: this.props.context.locale});
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
   * Render a requested account recovery activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderAccountRecoveryRequested(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> requested an account recovery
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
   * Render an account recovery request rejection activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderAccountRecoveryRequestRejected(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const userLink = `/app/users/view/${activity.creator.id}`;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <a target="_blank" rel="noopener noreferrer" href={userLink}><span className="creator">{{activityCreatorName}}</span></a> rejected the account recovery request
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
   * Render an account recovery request acceptation activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderAccountRecoveryRequestAccepted(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const userLink = `/app/users/view/${activity.creator.id}`;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <a target="_blank" rel="noopener noreferrer" href={userLink}><span className="creator">{{activityCreatorName}}</span></a> accepted the account recovery request
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
   * Render an account recovery policy rejection activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderAccountRecoveryPolicyRejected(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> rejected the account recovery policy
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
   * Render an account recovery policy acceptation activity.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderAccountRecoveryPolicyAccepted(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <span className="creator">{{activityCreatorName}}</span> accepted the account recovery policy
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
   * Render an activity about the creation of a user.
   * @param {object} activity The target activity
   * @returns {JSX}
   */
  renderUserCreated(activity) {
    const activityCreatorName = this.getActivityCreatorFullName(activity.creator);
    const userLink = `/app/users/view/${activity.creator.id}`;
    const activityFormattedDate = this.formatDateTimeAgo(activity.created);

    return (
      <li key={activity.id} className="usercard-detailed-col-2">
        <div className="content-wrapper">
          <div className="content">
            <div className="name">
              <Trans>
                <a target="_blank" rel="noopener noreferrer" href={userLink}><span className="creator">{{activityCreatorName}}</span></a> created the user account
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
      case "AccountRecovery.Requests.initiated": {
        render = this.renderAccountRecoveryRequested(activity);
        break;
      }
      case "AccountRecovery.Requests.accepted": {
        render = this.renderAccountRecoveryRequestAccepted(activity);
        break;
      }
      case "AccountRecovery.Requests.rejected": {
        render = this.renderAccountRecoveryRequestRejected(activity);
        break;
      }
      case "AccountRecovery.Policies.accepted": {
        render = this.renderAccountRecoveryPolicyAccepted(activity);
        break;
      }
      case "AccountRecovery.Policies.rejected": {
        render = this.renderAccountRecoveryPolicyRejected(activity);
        break;
      }
      case "Users.created": {
        render = this.renderUserCreated(activity);
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
    return !this.state.activities.some(activity => activity.type === "Users.created");
  }

  /**
   * Returns the current detailed user
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
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
            <button type="button" className="link no-border" onClick={this.handleTitleClickEvent}>
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
              <button type="button" disabled={this.state.loadingMore} onClick={this.handleMoreClickEvent} className={`action-logs-load-more ${this.state.loadingMore ? "processing" : ""}`}>
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

DisplayUserDetailsActivity.propTypes = {
  context: PropTypes.any, // The application context
  userWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withTranslation('common')(DisplayUserDetailsActivity)));
