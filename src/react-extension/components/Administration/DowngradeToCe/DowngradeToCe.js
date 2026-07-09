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
 * @since         5.14.0
 */

import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { Trans, withTranslation } from "react-i18next";

import { withDialog } from "../../../contexts/DialogContext";
import { withNavigationContext } from "../../../contexts/NavigationContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withAdminSubscription } from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";

import SubscriptionKeyServiceWorkerService from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";

import { createSafePortal } from "../../../../shared/utils/portals";

import CardItem from "../../../../shared/components/Cards/CardItem";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

import AccountRecoverySVG from "../../../../img/svg/account_recovery.svg";
import BuoySVG from "../../../../img/svg/buoy.svg";
import FileClockSVG from "../../../../img/svg/file_clock.svg";
import HeartHandshakeSVG from "../../../../img/svg/heart_handshake.svg";
import LDAPSVG from "../../../../img/svg/ldap.svg";
import ScimSVG from "../../../../img/svg/scim.svg";
import ScrollTextSVG from "../../../../img/svg/scroll_text.svg";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import SSOSVG from "../../../../img/svg/sso.svg";
import TagsSVG from "../../../../img/svg/tags.svg";

export const LEARN_MORE_URL = "https://www.passbolt.com/docs";

class DowngradeToCe extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = this.defaultState;

    this.bindCallbacks();

    this.subscriptionKeyService = new SubscriptionKeyServiceWorkerService(this.props.context.port);
  }

  /**
   * Get default state
   * @returns {{ processing: boolean, confirmed: boolean, confirmError: boolean }}
   */
  get defaultState() {
    return {
      processing: false, // Is the downgrade being processed
      confirmed: false, // Has the user checked the confirmation checkbox
      confirmError: false, // Whether to show error state on the confirmation checkbox
    };
  }

  componentDidMount() {
    this.props.adminSubscriptionContext.findSubscriptionKey();
  }

  componentDidUpdate() {
    // After we got the subscription key, check if the downgrade is allowed
    if (!this.props.adminSubscriptionContext.isProcessing() && !this.isDowngradeAllowed()) {
      this.props.navigationContext.onGoToAdministrationSubscriptionRequested();
    }
  }

  /**
   * Clear the subscription context data when the component is unmounted
   */
  componentWillUnmount() {
    this.props.adminSubscriptionContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.handleDowngradeClick = this.handleDowngradeClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
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
   * Is the downgrade allowed (only when the subscription key is expiring or expired)
   * @returns {boolean}
   */
  isDowngradeAllowed() {
    return (
      this.hasEditionPlugin() &&
      !this.props.context.siteSettings.isCommunityEdition &&
      (this.hasSubscriptionKeyExpired() || this.hasSubscriptionKeyGoingToExpire())
    );
  }

  /**
   * The list of features impacted by the downgrade.
   * @returns {array<object>}
   */
  get cardItemsData() {
    return [
      {
        icon: <SSOSVG />,
        title: this.translate("Single Sign-On"),
        warningText: this.translate("Configuration and data will be deleted."),
        description: this.translate("Users will need to use their passphrase to sign in."),
      },
      {
        icon: <AccountRecoverySVG />,
        title: this.translate("Account recovery"),
        warningText: this.translate("Configuration will be deleted."),
        description: this.translate(
          "Users who lose their passphrase or account kit will lose access to their account.",
        ),
      },
      {
        icon: <LDAPSVG />,
        title: this.translate("Users directory"),
        warningText: this.translate("Configuration will be deleted."),
        description: this.translate("Users will be managed manually."),
      },
      {
        icon: <ScimSVG />,
        title: this.translate("SCIM"),
        warningText: this.translate("Configuration will be deleted."),
        description: this.translate("Users will be managed manually."),
      },
      {
        icon: <TagsSVG />,
        title: this.translate("Tags"),
        warningText: this.translate("All tags will be deleted."),
      },
      {
        icon: <ScrollTextSVG />,
        title: this.translate("Advanced Policies"),
        warningText: this.translate("Configuration will be deleted."),
        description: this.translate("Administrators won't be able to enforce custom company security policies."),
      },
      {
        icon: <FileClockSVG />,
        title: this.translate("Advanced logs"),
        warningText: this.translate("Not visible."),
        description: this.translate("Users won't have access to activity logs."),
      },
      {
        icon: <HeartHandshakeSVG />,
        title: this.translate("Premium support"),
        warningText: this.translate("Reverting to community support."),
      },
    ];
  }

  /**
   * Handle the confirmation checkbox change
   * @param {Event} event
   */
  handleConfirmChange(event) {
    this.setState({ confirmed: event.target.checked, confirmError: false });
  }

  /**
   * Navigate back to the subscription page without downgrading
   */
  handleGoBackClick() {
    this.props.navigationContext.onGoToAdministrationSubscriptionRequested();
  }

  /**
   * Downgrade the instance to community edition
   * @returns {Promise<void>}
   */
  async handleDowngradeClick() {
    if (this.state.processing) {
      return;
    }

    if (!this.state.confirmed) {
      this.setState({ confirmError: true });
    } else {
      this.setState({ processing: true, confirmError: false });

      try {
        await this.subscriptionKeyService.deleteOrganizationSubscriptionKey();
        await this.props.actionFeedbackContext.displaySuccess(
          this.translate("Subscription has been removed successfully. The instance is now on Community Edition."),
        );
        this.props.navigationContext.onGoToAdministrationSubscriptionRequested();
      } catch (error) {
        if (error?.name !== "UserAbortsOperationError") {
          this.props.dialogContext.open(NotifyError, { error });
        }
      }

      this.setState({ processing: false });
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
    return (
      <div className="row">
        <div className="ce-downgrade main-column">
          <div className="main-content">
            <h3>
              <Trans>Downgrade to Community Edition</Trans>
            </h3>
            <p className="description">
              <Trans>
                Before you downgrade, please review what will change. Your resources, users, groups and folders will
                remain intact.
              </Trans>
            </p>
            <h4 className="section">
              <Trans>What will change</Trans>
            </h4>
            <div className="features">
              {this.cardItemsData.map((cardItemData) => (
                <CardItem
                  key={cardItemData.title}
                  icon={cardItemData.icon}
                  title={cardItemData.title}
                  warningText={cardItemData.warningText}
                  description={cardItemData.description}
                />
              ))}
            </div>
            <div className={`input checkbox required${this.state.confirmError ? " error" : ""}`}>
              <input
                id="confirm-downgrade"
                type="checkbox"
                name="confirmed"
                checked={this.state.confirmed}
                disabled={this.state.processing}
                onChange={this.handleConfirmChange}
              />
              <label htmlFor="confirm-downgrade">
                <Trans>
                  I understand how downgrading will impact my team and that some data will not be recoverable.
                </Trans>
              </label>
            </div>
          </div>
          <div className="warning message">
            <div>
              <Trans>
                <strong>Warning:</strong> All users will be logged out during the downgrade. This process may take a few
                minutes.
              </Trans>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            type="button"
            className="button secondary"
            disabled={this.state.processing}
            onClick={this.handleGoBackClick}
          >
            <Trans>Cancel</Trans>
          </button>
          <button
            type="button"
            className={`button warning ${this.state.processing ? "processing" : ""}`}
            disabled={this.state.processing}
            onClick={this.handleDowngradeClick}
          >
            <Trans>Downgrade</Trans>
            {this.state.processing && <SpinnerSVG />}
          </button>
        </div>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3>
              <Trans>Are you sure?</Trans>
            </h3>
            <p>
              <Trans>Learn more about the impact of downgrading.</Trans>
            </p>
            <a className="button" target="_blank" rel="noopener noreferrer" href={LEARN_MORE_URL}>
              <BuoySVG />
              <span>
                <Trans>Learn more</Trans>
              </span>
            </a>
          </div>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

DowngradeToCe.propTypes = {
  context: PropTypes.object, // the app context
  navigationContext: PropTypes.object, // the application navigation context
  adminSubscriptionContext: PropTypes.object, // the administration subscription context
  dialogContext: PropTypes.object, // the dialog context
  actionFeedbackContext: PropTypes.object, // the action feedback context
  t: PropTypes.func, // the translation function
};

export default withAppContext(
  withNavigationContext(
    withAdminSubscription(withDialog(withActionFeedback(withTranslation("common")(DowngradeToCe)))),
  ),
);
