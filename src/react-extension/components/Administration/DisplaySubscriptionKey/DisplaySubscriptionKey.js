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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {DateTime} from "luxon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withDialog} from "../../../../react-extension/contexts/DialogContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";
import SubscriptionActionService from '../../../../shared/services/actions/subscription/SubscriptionActionService';
import DisplayAdministrationSubscriptionActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSubscriptionActions/DisplayAdministrationSubscriptionActions";
import {withAdminSubscription} from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import {createSafePortal} from "../../../../shared/utils/portals";
import EmailSVG from "../../../../img/svg/email.svg";

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
    this.subscriptionActionService = SubscriptionActionService.getInstance(this.props);
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // active users
      activeUsers: null // The number of active users
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationSubscriptionActions);
    this.findActiveUsers();
    await this.findSubscriptionKey();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminSubcriptionContext.clearContext();
    SubscriptionActionService.killInstance();
    this.mfaFormService = null;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleRenewKey = this.handleRenewKey.bind(this);
    this.handleUpdateKey = this.handleUpdateKey.bind(this);
  }

  /**
   * fetch the active users
   */
  async findActiveUsers() {
    const activeUsers = await this.props.adminSubcriptionContext.getActiveUsers();
    this.setState({activeUsers});
  }

  /**
   * fetch the subscription key
   */
  async findSubscriptionKey() {
    this.props.adminSubcriptionContext.findSubscriptionKey();
  }

  /**
   * Handle renew key click event
   */
  handleRenewKey() {
    const subscription = this.props.adminSubcriptionContext.getSubscription();
    if (this.hasLimitUsersExceeded()) {
      this.props.navigationContext.onGoToNewTab(`https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${subscription.subscriptionId}&customer_id=${subscription.customerId}`);
    } else if (this.hasSubscriptionKeyExpired() || this.hasSubscriptionKeyGoingToExpire()) {
      this.props.navigationContext.onGoToNewTab(`https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${subscription.subscriptionId}&customer_id=${subscription.customerId}`);
    }
  }

  /**
   * Handle update key click event
   */
  handleUpdateKey() {
    this.subscriptionActionService.editSubscription();
  }

  /**
   * Has subscription key expired
   * @returns {boolean}
   */
  hasSubscriptionKeyExpired() {
    return DateTime.fromISO(this.props.adminSubcriptionContext.getSubscription().expiry) < DateTime.now();
  }

  /**
   * Has subscription key going to expire
   * @returns {boolean}
   */
  hasSubscriptionKeyGoingToExpire() {
    return DateTime.fromISO(this.props.adminSubcriptionContext.getSubscription().expiry) < DateTime.now().plus({days: 30}) && !this.hasSubscriptionKeyExpired();
  }

  /**
   * Has no subscription key
   * @returns {boolean}
   */
  hasSubscriptionKey() {
    return Boolean(this.props.adminSubcriptionContext.getSubscription().data);
  }

  /**
   * Has limit of users exceeded
   * @returns {boolean}
   */
  hasLimitUsersExceeded() {
    const subscription = this.props.adminSubcriptionContext.getSubscription();
    return subscription.users < this.state.activeUsers;
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
    const subscription = this.props.adminSubcriptionContext.getSubscription();
    const isProcessing = this.props.adminSubcriptionContext.isProcessing();
    return (
      <div className="row">
        {!isProcessing &&
        <>
          <div className="subscription-key main-column">
            <div className="main-content">
              <h3 className="title"><Trans>Subscription key details</Trans></h3>
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
                    <h4 className="subscription-information-subtitle"><Trans>Your subscription key is either missing or not valid.</Trans></h4>
                    <p><Trans>Sorry your subscription is either missing or not readable.</Trans><br/>
                      <Trans>Update the subscription key and try again.</Trans> <Trans>If this does not work get in touch with support.</Trans>
                    </p>
                  </>
                  }
                  {this.hasValidSubscription() && this.hasSubscriptionKeyGoingToExpire() &&
                  <h4 className="subscription-information-subtitle"><Trans>Your subscription key is going to expire.</Trans></h4>
                  }
                  {this.hasSubscriptionKey() && this.hasInvalidSubscription() &&
                  <h4 className="subscription-information-subtitle"><Trans>Your subscription key is not valid.</Trans></h4>
                  }
                  {this.hasValidSubscription() && !this.hasSubscriptionKeyGoingToExpire() &&
                  <h4 className="subscription-information-subtitle"><Trans>Your subscription key is valid and up to date!</Trans></h4>
                  }
                  {this.hasSubscriptionKey() &&
                    <div className="information">
                      <div className="information-label">
                        <span className="customer-id label"><Trans>Customer id:</Trans></span>
                        <span className="subscription-id label"><Trans>Subscription id:</Trans></span>
                        <span className="email label"><Trans>Email:</Trans></span>
                        <span className="users label"><Trans>Users limit:</Trans></span>
                        <span className="created label"><Trans>Valid from:</Trans></span>
                        <span className="expiry label"><Trans>Expires on:</Trans></span>
                      </div>
                      <div className="information-value">
                        <span className="customer-id value">{subscription.customerId}</span>
                        <span className="subscription-id value">{subscription.subscriptionId}</span>
                        <span className="email value">{subscription.email}</span>
                        <span className={`users value ${this.hasLimitUsersExceeded() ? "error" : ""}`}>{subscription.users} <span className="secondary-information">(<Trans>currently:</Trans> {this.state.activeUsers})</span></span>
                        <span className="created value">{this.formatDate(subscription.created)}</span>
                        <span className={`expiry value ${this.hasSubscriptionKeyExpired() ? "error" : ""} ${this.hasSubscriptionKeyGoingToExpire() ? "warning" : ""}`}>{this.formatDate(subscription.expiry)} <span className="secondary-information">({`${this.hasSubscriptionKeyExpired() ? this.translate("expired ") : ""}${formatDateTimeAgo(subscription.expiry, this.props.t, this.props.context.locale)}`})</span></span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="actions-wrapper">
            {this.hasSubscriptionKey()
              ? <button className="button primary" type="button" onClick={this.handleRenewKey}><Trans>Renew key</Trans></button>
              : <button className="button primary" type="button" onClick={this.handleUpdateKey}><Trans>Update key</Trans></button>
            }
          </div>
        </>
        }
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For any change or question related to your passbolt subscription, kindly contact our sales team.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/contact">
              <EmailSVG />
              <span><Trans>Contact Sales</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplaySubscriptionKey.propTypes = {
  context: PropTypes.any, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminSubcriptionContext: PropTypes.object, // The administration subscription context
  dialogContext: PropTypes.any, // The dialog congtext
  t: PropTypes.func,
};

export default withAppContext(withNavigationContext(withAdminSubscription(withAdministrationWorkspace(withDialog(withTranslation('common')(DisplaySubscriptionKey))))));
