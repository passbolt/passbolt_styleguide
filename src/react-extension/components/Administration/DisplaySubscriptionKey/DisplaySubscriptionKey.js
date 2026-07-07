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
 * @since         5.13.0
 */

import React from "react";
import { DateTime } from "luxon";
import { Trans, withTranslation } from "react-i18next";

import { withDialog } from "../../../contexts/DialogContext";
import { withNavigationContext } from "../../../contexts/NavigationContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withAdministrationWorkspace } from "../../../contexts/AdministrationWorkspaceContext";
import { withAdminSubscription } from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";

import SubscriptionActionService from "../../../../shared/services/actions/subscription/SubscriptionActionService";
import SubscriptionKeyServiceWorkerService from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";

import { createSafePortal } from "../../../../shared/utils/portals";
import { formatDateTimeAgo } from "../../../../shared/utils/dateUtils";

import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import ConfirmDowngradeSubscriptionDialog from "../ConfirmDowngradeSubscriptionDialog/ConfirmDowngradeSubscriptionDialog";

import EmailSVG from "../../../../img/svg/email.svg";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";

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
    this.subscriptionKeyService = new SubscriptionKeyServiceWorkerService(this.props.context.port);
  }

  /**
   * Get default state
   * @returns {{ activeUsers: number? }}
   */
  get defaultState() {
    return {
      activeUsers: null, // The number of active users
    };
  }

  async componentDidMount() {
    // There's no need to await for this promise, we let it run in the background
    this.props.adminSubscriptionContext.findSubscriptionKey();

    const activeUsers = await this.props.adminSubscriptionContext.getActiveUsers();
    this.setState({ activeUsers });
  }

  /**
   * Clear the data from the form in case the user put something that needs to be cleared
   */
  componentWillUnmount() {
    this.props.adminSubscriptionContext.clearContext();
    SubscriptionActionService.killInstance();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleRenewKey = this.handleRenewKey.bind(this);
    this.handleUpdateKey = this.handleUpdateKey.bind(this);
    this.handleDowngradeClick = this.handleOpenDowngradeDialog.bind(this);
    this.handleAddSubscriptionKey = this.handleAddSubscriptionKey.bind(this);
    this.handleSaveSubscriptionKey = this.handleSaveSubscriptionKey.bind(this);
  }

  /**
   * Save the subscription key
   * @param {string} subscriptionKey
   * @returns {Promise<SubscriptionEntity>}
   */
  handleSaveSubscriptionKey(subscriptionKey) {
    return this.subscriptionKeyService.createOrganizationSubscriptionKey(subscriptionKey);
  }

  /**
   * Open the EditSubscriptionKey dialog to upload a new subscription key (CE to PRO upgrade).
   */
  handleAddSubscriptionKey() {
    if (this.hasEditionPlugin()) {
      this.props.dialogContext.open(EditSubscriptionKey, {
        title: this.props.t("New subscription key"),
        onSave: this.handleSaveSubscriptionKey,
        warning: this.translate("You and your team will be disconnected at the end of the process."),
      });
    } else {
      // Backward compatibility with API < v5.13.0
      this.handleUpdateKey();
    }
  }

  /**
   * Open the downgrade confirmation dialog
   */
  handleOpenDowngradeDialog() {
    const dialogKey = this.props.dialogContext.open(ConfirmDowngradeSubscriptionDialog, {
      onClose: () => this.props.dialogContext.close(dialogKey),
      onSubmit: () => this.handleDowngrade(dialogKey),
    });
  }

  /**
   * Perform the downgrade
   * @param {string} dialogKey The dialog identifier
   * @returns {Promise<void>}
   */
  async handleDowngrade(dialogKey) {
    try {
      await this.subscriptionKeyService.deleteOrganizationSubscriptionKey();
      await this.props.actionFeedbackContext.displaySuccess(
        this.translate("Subscription has been removed successfully. The instance is now on Community Edition."),
      );
      this.props.dialogContext.close(dialogKey);
    } catch (error) {
      if (error?.name === "UserAbortsOperationError") {
        return;
      }

      this.props.dialogContext.open(NotifyError, { error });
    }
  }

  /**
   * Handle renew key click event
   */
  handleRenewKey() {
    const subscription = this.props.adminSubscriptionContext.getSubscription();
    if (this.hasLimitUsersExceeded()) {
      this.props.navigationContext.onGoToNewTab(
        `https://www.passbolt.com/subscription/ee/update/qty?subscription_id=${subscription.subscriptionId}&customer_id=${subscription.customerId}`,
      );
    } else if (this.hasSubscriptionKeyExpired() || this.hasSubscriptionKeyGoingToExpire()) {
      this.props.navigationContext.onGoToNewTab(
        `https://www.passbolt.com/subscription/ee/update/renew?subscription_id=${subscription.subscriptionId}&customer_id=${subscription.customerId}`,
      );
    }
  }

  /**
   * Handle update key click event
   */
  handleUpdateKey() {
    this.subscriptionActionService.editSubscription();
  }

  /**
   * Has edition plugin
   * @returns {boolean}
   */
  hasEditionPlugin() {
    return this.props.context.siteSettings.canIUse("edition");
  }

  /**
   * Has subscription key expired
   * @returns {boolean}
   */
  hasSubscriptionKeyExpired() {
    return DateTime.fromISO(this.props.adminSubscriptionContext.getSubscription().expiry) < DateTime.now();
  }

  /**
   * Has subscription key going to expire
   * @returns {boolean}
   */
  hasSubscriptionKeyGoingToExpire() {
    return (
      !this.hasSubscriptionKeyExpired() &&
      DateTime.fromISO(this.props.adminSubscriptionContext.getSubscription().expiry) < DateTime.now().plus({ days: 30 })
    );
  }

  /**
   * Should show the dedicated renew/downgrade section (only when the key is expiring or expired)
   * @returns {boolean}
   */
  shouldShowDowngradeSection() {
    return (
      this.hasEditionPlugin() &&
      !this.props.context.siteSettings.isCommunityEdition &&
      (this.hasSubscriptionKeyExpired() || this.hasSubscriptionKeyGoingToExpire())
    );
  }

  /**
   * Has limit of users exceeded
   * @returns {boolean}
   */
  hasLimitUsersExceeded() {
    const subscription = this.props.adminSubscriptionContext.getSubscription();
    return subscription.users < this.state.activeUsers;
  }

  /**
   * Has valid subscription
   * @returns {boolean}
   */
  hasValidSubscription() {
    return (
      !this.props.context.siteSettings.isCommunityEdition &&
      !this.hasLimitUsersExceeded() &&
      !this.hasSubscriptionKeyExpired()
    );
  }

  /**
   * Has invalid subscription
   * @returns {boolean}
   */
  hasInvalidSubscription() {
    return (
      !this.props.context.siteSettings.isCommunityEdition &&
      (!this.props.adminSubscriptionContext.getSubscription().data ||
        this.hasLimitUsersExceeded() ||
        this.hasSubscriptionKeyExpired())
    );
  }

  /**
   * Format a date
   * @string {string} date The date to format
   * @return {string}
   */
  formatDate(date) {
    try {
      return DateTime.fromISO(date).setLocale(this.props.context.locale).toLocaleString(DateTime.DATE_SHORT);
    } catch (error) {
      console.error(`Failed to format date "${date}":`, error);
      return "";
    }
  }

  /**
   * Get the translate function
   * @returns {function(...string): string}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    const subscription = this.props.adminSubscriptionContext.getSubscription();
    const isProcessing = this.props.adminSubscriptionContext.isProcessing();

    return (
      <div className="row">
        {!isProcessing && (
          <div className="subscription-key main-column">
            <div className="main-content">
              <h3 className="title">
                <Trans>Details</Trans>
              </h3>
              <div className="feedback-card">
                <div className="subscription-information">
                  {!this.props.context.siteSettings.isCommunityEdition &&
                    !this.props.adminSubscriptionContext.getSubscription().data && (
                      <>
                        <h4 className="subscription-information-subtitle">
                          <Trans>Your subscription key is either missing or not valid.</Trans>
                        </h4>
                        <p>
                          <Trans>Sorry your subscription is either missing or not readable.</Trans>
                          <br />
                          <Trans>Update the subscription key and try again.</Trans>{" "}
                          <Trans>If this does not work get in touch with support.</Trans>
                        </p>
                      </>
                    )}
                  {this.hasValidSubscription() && this.hasSubscriptionKeyGoingToExpire() && (
                    <h4 className="subscription-information-subtitle">
                      <Trans>Your subscription key is going to expire.</Trans>
                    </h4>
                  )}
                  {!this.props.context.siteSettings.isCommunityEdition && this.hasInvalidSubscription() && (
                    <h4 className="subscription-information-subtitle">
                      <Trans>Your subscription key is not valid.</Trans>
                    </h4>
                  )}
                  <div className="information">
                    <div className="information-label">
                      <span className="edition label">
                        <Trans>Edition:</Trans>
                      </span>
                      <span className="server-version label">
                        <Trans>Server version:</Trans>
                      </span>
                      <span className="client-version label">
                        <Trans>Client version:</Trans>
                      </span>
                      {!this.props.context.siteSettings.isCommunityEdition && (
                        <>
                          <span className="customer-id label">
                            <Trans>Customer id:</Trans>
                          </span>
                          <span className="subscription-id label">
                            <Trans>Subscription id:</Trans>
                          </span>
                          <span className="email label">
                            <Trans>Email:</Trans>
                          </span>
                          <span className="users label">
                            <Trans>Users limit:</Trans>
                          </span>
                          <span className="created label">
                            <Trans>Valid from:</Trans>
                          </span>
                          <span className="expiry label">
                            <Trans>Expires on:</Trans>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="information-value">
                      <span className="edition value">
                        {!this.props.context.siteSettings.isCommunityEdition && <Trans>Pro</Trans>}
                        {this.props.context.siteSettings.isCommunityEdition && (
                          <>
                            <Trans>Community</Trans>
                            <span className="subtitle">
                              <Trans>(Free forever)</Trans>
                            </span>
                          </>
                        )}
                      </span>
                      <span className="server-version value">{this.props.context.siteSettings.version}</span>
                      <span className="client-version value">{this.props.context.extensionVersion}</span>
                      {!this.props.context.siteSettings.isCommunityEdition && (
                        <>
                          <span className="customer-id value">{subscription.customerId}</span>
                          <span className="subscription-id value">{subscription.subscriptionId}</span>
                          <span className="email value">{subscription.email}</span>
                          <span className={`users value ${this.hasLimitUsersExceeded() ? "error" : ""}`}>
                            {subscription.users}{" "}
                            <span className="secondary-information">
                              (<Trans>currently:</Trans> {this.state.activeUsers})
                            </span>
                          </span>
                          <span className="created value">{this.formatDate(subscription.created)}</span>
                          <span
                            className={`expiry value ${this.hasSubscriptionKeyExpired() ? "error" : ""} ${this.hasSubscriptionKeyGoingToExpire() ? "warning" : ""}`}
                          >
                            {this.formatDate(subscription.expiry)}{" "}
                            <span className="secondary-information" title={subscription.expiry}>
                              (
                              {`${this.hasSubscriptionKeyExpired() ? this.translate("expired ") : ""}${formatDateTimeAgo(subscription.expiry, this.props.t, this.props.context.locale)}`}
                              )
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="subscription-actions">
                {!this.props.context.siteSettings.isCommunityEdition && (
                  <>
                    <button className="button primary form" type="button" onClick={this.handleUpdateKey}>
                      <Trans>Update key</Trans>
                    </button>
                    {(this.shouldShowDowngradeSection() || this.hasLimitUsersExceeded()) && (
                      <button className="button secondary" type="button" onClick={this.handleRenewKey}>
                        <Trans>Renew key</Trans>
                      </button>
                    )}
                  </>
                )}
                {this.props.context.siteSettings.isCommunityEdition && (
                  <>
                    <button className="button primary form" type="button" onClick={this.handleAddSubscriptionKey}>
                      <Trans>Upload subscription key</Trans>
                    </button>
                  </>
                )}
              </div>
              <h3>
                <Trans>Plans</Trans>
              </h3>
              <div className="subscription-editions">
                <div
                  className={`edition ${this.props.context.siteSettings.isCommunityEdition ? "current-edition" : ""}`}
                >
                  {this.props.context.siteSettings.isCommunityEdition && (
                    <div className="current-edition-indicator">
                      <Trans>Current plan</Trans>
                    </div>
                  )}
                  <h3>
                    <Trans>Community</Trans>
                    <span className="subtitle">
                      <Trans>(Free forever)</Trans>
                    </span>
                  </h3>
                  <div className="features">
                    <span className="subtitle">
                      <Trans>Features included:</Trans>
                    </span>
                    <ul>
                      <li>
                        <Trans>Open source under AGPLV3 license</Trans>
                      </li>
                      <li>
                        <Trans>Passwords management & sharing</Trans>
                      </li>
                      <li>
                        <Trans>Private and shared folders</Trans>
                      </li>
                      <li>
                        <Trans>Users and groups management</Trans>
                      </li>
                      <li>
                        <Trans>Secret key authentication (2FA)</Trans>
                      </li>
                      <li>
                        <Trans>Additional factor authentication (3-step verification)</Trans>
                      </li>
                      <li>
                        <Trans>Browser extensions & CLI</Trans>
                      </li>
                      <li>
                        <Trans>Open API</Trans>
                      </li>
                      <li>
                        <Trans>Role Based Access Control</Trans>
                      </li>
                      <li>
                        <Trans>Password expiry</Trans>
                      </li>
                      <li>
                        <Trans>Community support</Trans>
                      </li>
                    </ul>
                  </div>
                  {this.shouldShowDowngradeSection() && (
                    <div>
                      <button className="button secondary" type="button" onClick={this.handleDowngradeClick}>
                        <Trans>Downgrade to Community</Trans>
                      </button>
                    </div>
                  )}
                </div>
                <div
                  className={`edition ${!this.props.context.siteSettings.isCommunityEdition ? "current-edition" : ""}`}
                >
                  {!this.props.context.siteSettings.isCommunityEdition && (
                    <div className="current-edition-indicator">
                      <Trans>Current plan</Trans>
                    </div>
                  )}
                  <h3>
                    <Trans>Pro</Trans>
                  </h3>
                  <div className="features">
                    <span className="subtitle">
                      <Trans>Features include everything in Community, plus:</Trans>
                    </span>
                    <ul>
                      <li>
                        <Trans>Tags management</Trans>
                      </li>
                      <li>
                        <Trans>LDAP provisioning (AD / OpenLDAP)</Trans>
                      </li>
                      <li>
                        <Trans>Single Sign On (SSO) with Microsoft, Google & OpenID</Trans>
                      </li>
                      <li>
                        <Trans>Account recovery (Escrow)</Trans>
                      </li>
                      <li>
                        <Trans>Activity log (audit changes)</Trans>
                      </li>
                      <li>
                        <Trans>VM appliance</Trans>
                      </li>
                      <li>
                        <Trans>Next business day support</Trans>
                      </li>
                    </ul>
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.passbolt.com/pricing/pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product"
                      >
                        <Trans>See pricing page</Trans>
                      </a>
                    </div>
                    {this.props.context.siteSettings.isCommunityEdition && (
                      <div className="subscription-actions">
                        <a
                          className="button primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.passbolt.com/pricing/pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product"
                        >
                          <Trans>Buy now</Trans>
                        </a>
                        <a
                          className="button"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.passbolt.com/contact/pro/free-trial?utm_campaign=21060976-CE%20to%20Pro&utm_source=product"
                        >
                          <Trans>Start a free trial</Trans>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3>
              <Trans>Need help?</Trans>
            </h3>
            <p>
              <Trans>
                For any change or question related to your passbolt subscription, kindly contact our sales team.
              </Trans>
            </p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/contact">
              <EmailSVG />
              <span>
                <Trans>Contact Sales</Trans>
              </span>
            </a>
          </div>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

export default withAppContext(
  withNavigationContext(
    withAdminSubscription(
      withAdministrationWorkspace(withDialog(withActionFeedback(withTranslation("common")(DisplaySubscriptionKey)))),
    ),
  ),
);
