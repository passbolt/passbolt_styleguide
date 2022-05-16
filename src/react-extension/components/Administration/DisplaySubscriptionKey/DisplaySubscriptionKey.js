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
 * @since         3.2.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {DateTime} from "luxon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withDialog} from "../../../../react-extension/contexts/DialogContext";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import Icon from "../../../../shared/components/Icons/Icon";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";

/**
 * This component allows to display the subscription key for the administration
 */
class DisplaySubscriptionKey extends React.Component {
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
      loading: true, // component is loading or not

      // Subscription Key
      customerId: "", // Chargebee customer id
      subscriptionId: "", // Chargebee subscription id
      users: null, // The number of users the subscription is valid for
      email: "", // The email used to manage the subscription
      expiry: null, // The date when the license key expires
      created: null, // The date when the license key was created
      data: null, // Base64 encoded subscription, the original subscription key

      // active users
      activeUsers: null // The number of active users
    };
  }

  async componentDidMount() {
    this.findActiveUsers();
    this.findSubscriptionKey();
  }

  /**
   * Whenever the component has updated in terms of props or state
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleMustRefreshSubscriptionKey(prevProps.administrationWorkspaceContext.must.refreshSubscriptionKey);
    await this.handleMustEditSubscriptionKey(prevProps.administrationWorkspaceContext.must.editSubscriptionKey);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleRenewKey = this.handleRenewKey.bind(this);
    this.handleUpdateKey = this.handleUpdateKey.bind(this);
  }

  /**
   * Handle the must refresh subscription key
   * @param previousRefreshSubscriptionKey Previous refresh subscription key
   */
  async handleMustRefreshSubscriptionKey(previousRefreshSubscriptionKey) {
    const hasRefreshSubscriptionKeyChanged = this.props.administrationWorkspaceContext.must.refreshSubscriptionKey !== previousRefreshSubscriptionKey;
    if (hasRefreshSubscriptionKeyChanged && this.props.administrationWorkspaceContext.must.refreshSubscriptionKey) {
      await this.findActiveUsers();
      await this.findSubscriptionKey();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  /**
   * Handle the must edit subscription key
   * @param previousEditSubscriptionKey Previous edit subscription key
   */
  async handleMustEditSubscriptionKey(previousEditSubscriptionKey) {
    const hasEditSubscriptionKeyChanged = this.props.administrationWorkspaceContext.must.editSubscriptionKey !== previousEditSubscriptionKey;
    if (hasEditSubscriptionKeyChanged && this.props.administrationWorkspaceContext.must.editSubscriptionKey) {
      this.openEditSubscriptionKey();
      this.props.administrationWorkspaceContext.onResetActionsSettings();
    }
  }

  openEditSubscriptionKey() {
    const editSubscriptionKey = {
      key: this.state.data
    };
    this.props.context.setContext({editSubscriptionKey});
    this.props.dialogContext.open(EditSubscriptionKey);
  }

  /**
   * fetch the active users
   */
  async findActiveUsers() {
    const activeUsers = await this.getActiveUsers();
    this.setState({activeUsers});
  }

  /**
   * fetch the subscription key
   */
  async findSubscriptionKey() {
    try {
      const subscription = await this.props.context.onGetSubscriptionKeyRequested();
      const customerId = subscription.customer_id;
      const subscriptionId = subscription.subscription_id;
      const users = subscription.users;
      const email = subscription.email;
      const expiry = subscription.expiry;
      const created = subscription.created;
      const data = subscription.data;

      this.setState({
        loading: false,
        customerId,
        subscriptionId,
        users,
        email,
        expiry,
        created,
        data
      });
    } catch (error) {
      this.handleSubscriptionError(error);
    }
  }

  /**
   * Handle subscription error
   * @param error
   */
  handleSubscriptionError(error) {
    if (error.name === "PassboltSubscriptionError") {
      const subscription = error.subscription;
      const customerId = subscription.customer_id || "N/A";
      const subscriptionId = subscription.subscription_id;
      const users = subscription.users;
      const email = subscription.email || "N/A";
      const expiry = subscription.expiry;
      const created = subscription.created;
      const data = subscription.data;

      this.setState({
        loading: false,
        customerId,
        subscriptionId,
        users,
        email,
        expiry,
        created,
        data,
      });
    } else {
      this.setState({loading: false});
    }
  }

  /**
   * Handle renew key click event
   */
  handleRenewKey() {
    if (this.hasLimitUsersExceeded()) {
      this.props.navigationContext.onGoToNewTab(`https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${this.state.subscriptionId}&customer_id=${this.state.customerId}`);
    } else if (this.hasSubscriptionKeyExpired() || this.hasSubscriptionKeyGoingToExpire()) {
      this.props.navigationContext.onGoToNewTab(`https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${this.state.subscriptionId}&customer_id=${this.state.customerId}`);
    }
  }

  /**
   * Handle update key click event
   */
  handleUpdateKey() {
    this.openEditSubscriptionKey();
  }

  /**
   * True if state is loading
   * @returns {boolean}
   */
  isLoading() {
    return this.state.loading;
  }

  /**
   * Has subscription key expired
   * @returns {boolean}
   */
  hasSubscriptionKeyExpired() {
    return DateTime.fromISO(this.state.expiry) < DateTime.now();
  }

  /**
   * Has subscription key going to expire
   * @returns {boolean}
   */
  hasSubscriptionKeyGoingToExpire() {
    return DateTime.fromISO(this.state.expiry) < DateTime.now().plus({days: 30}) && !this.hasSubscriptionKeyExpired();
  }

  /**
   * Has no subscription key
   * @returns {boolean}
   */
  hasSubscriptionKey() {
    return Boolean(this.state.data);
  }

  /**
   * Has limit of users exceeded
   * @returns {boolean}
   */
  hasLimitUsersExceeded() {
    return this.state.users < this.state.activeUsers;
  }

  /**
   * Has subscription to renew
   * @returns {boolean}
   */
  hasSubscriptionToRenew() {
    return this.hasInvalidSubscription() || this.hasSubscriptionKeyGoingToExpire();
  }

  /**
   * Has valid subscription
   * @returns {boolean}
   */
  hasValidSubscription() {
    return this.hasSubscriptionKey() && !this.hasLimitUsersExceeded()
      && !this.hasSubscriptionKeyExpired();
  }

  /**
   * Has invalid subscription
   * @returns {boolean}
   */
  hasInvalidSubscription() {
    return !this.hasSubscriptionKey() || this.hasLimitUsersExceeded() || this.hasSubscriptionKeyExpired();
  }

  /**
   * Format a date.
   * @string {string} date The date to format
   * @return {string}
   */
  formatDate(date) {
    try {
      return DateTime.fromISO(date).setLocale(this.props.context.locale).toLocaleString(DateTime.DATE_SHORT);
    } catch (error) {
      return "";
    }
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
   * Get active users
   * @returns {*}
   * @constructor
   */
  async getActiveUsers() {
    const users = await this.props.context.port.request("passbolt.users.get-all");
    const filterActiveUsers = user => user.active;
    return users.filter(filterActiveUsers).length;
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
      <div className="row">
        {!this.isLoading() &&
        <div className="subscription-key col8 main-column">
          <h3><Trans>Subscription key details</Trans></h3>
          <div className="feedback-card">
            {this.hasValidSubscription() && !this.hasSubscriptionKeyGoingToExpire() &&
            <AnimatedFeedback name="success" />
            }
            {this.hasInvalidSubscription() &&
            <AnimatedFeedback name="error" />
            }
            {this.hasValidSubscription() && this.hasSubscriptionKeyGoingToExpire() &&
            <AnimatedFeedback name="warning" />
            }
            <div className="subscription-information">
              {!this.hasSubscriptionKey() &&
              <>
                <h4 className="no-border"><Trans>Your subscription key is either missing or not valid.</Trans></h4>
                <p><Trans>Sorry your subscription is either missing or not readable.</Trans><br/>
                  <Trans>Update the subscription key and try again.</Trans> <Trans>If this does not work get in touch with support.</Trans>
                </p>
              </>
              }
              {this.hasValidSubscription() && this.hasSubscriptionKeyGoingToExpire() &&
              <h4 className="no-border"><Trans>Your subscription key is going to expire.</Trans></h4>
              }
              {this.hasSubscriptionKey() && this.hasInvalidSubscription() &&
              <h4 className="no-border"><Trans>Your subscription key is not valid.</Trans></h4>
              }
              {this.hasValidSubscription() && !this.hasSubscriptionKeyGoingToExpire() &&
              <h4 className="no-border"><Trans>Your subscription key is valid and up to date!</Trans></h4>
              }
              {this.hasSubscriptionKey() &&
              <ul>
                <li className="customer-id">
                  <span className="label"><Trans>Customer id:</Trans></span>
                  <span className="value">{this.state.customerId}</span>
                </li>
                <li className="subscription-id">
                  <span className="label"><Trans>Subscription id:</Trans></span>
                  <span className="value">{this.state.subscriptionId}</span>
                </li>
                <li className="email">
                  <span className="label"><Trans>Email:</Trans></span>
                  <span className="value">{this.state.email}</span>
                </li>
                <li className="users">
                  <span
                    className={`label ${this.hasLimitUsersExceeded() ? "error" : ""}`}><Trans>Users limit:</Trans></span>
                  <span
                    className={`value ${this.hasLimitUsersExceeded() ? "error" : ""}`}>{this.state.users} (<Trans>currently:</Trans> {this.state.activeUsers})</span>
                </li>
                <li className="created">
                  <span className="label"><Trans>Valid from:</Trans></span>
                  <span className="value">{this.formatDate(this.state.created)}</span>
                </li>
                <li className="expiry">
                  <span
                    className={`label ${this.hasSubscriptionKeyExpired() ? "error" : ""} ${this.hasSubscriptionKeyGoingToExpire() ? "warning" : ""}`}><Trans>Expires on:</Trans></span>
                  <span
                    className={`value ${this.hasSubscriptionKeyExpired() ? "error" : ""} ${this.hasSubscriptionKeyGoingToExpire() ? "warning" : ""}`}>{this.formatDate(this.state.expiry)} ({`${this.hasSubscriptionKeyExpired() ? this.translate("expired ") : ""}${this.formatDateTimeAgo(this.state.expiry)}`})</span>
                </li>
              </ul>
              }
              {this.hasSubscriptionToRenew() &&
              <div className="actions-wrapper">
                {this.hasSubscriptionKey() &&
                <button className="button primary" type="button" onClick={this.handleRenewKey}>
                  <Trans>Renew key</Trans>
                </button>
                }
                {!this.hasSubscriptionKey() &&
                <button className="button primary" type="button" onClick={this.handleUpdateKey}>
                  <Trans>Update key</Trans>
                </button>
                }
                <a target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/contact"><Trans>or, contact us</Trans></a>
              </div>
              }
            </div>
          </div>
        </div>
        }
        {!this.isLoading() &&
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For any change or question related to your passbolt subscription, kindly contact our sales team.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/contact">
              <Icon name="envelope"/>
              <span><Trans>Contact Sales</Trans></span>
            </a>
          </div>
        </div>
        }
      </div>
    );
  }
}

DisplaySubscriptionKey.propTypes = {
  context: PropTypes.any, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  dialogContext: PropTypes.any, // The dialog congtext
  t: PropTypes.func,
};

export default withAppContext(withNavigationContext(withAdministrationWorkspace(withDialog(withTranslation('common')(DisplaySubscriptionKey)))));
