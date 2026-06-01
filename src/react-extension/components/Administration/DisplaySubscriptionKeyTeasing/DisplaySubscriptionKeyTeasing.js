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
 * @since         5.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

import { createSafePortal } from "../../../../shared/utils/portals";
import { withDialog } from "../../../contexts/DialogContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withNavigationContext } from "../../../contexts/NavigationContext";
import SubscriptionKeyServiceWorkerService from "../../../../shared/services/api/subscriptionKey/SubscriptionKeyServiceWorkerService";
import EditSubscriptionKey from "../EditSubscriptionKey/EditSubscriptionKey";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";
import EmailSVG from "../../../../img/svg/email.svg";
import ProIllustrationSVG from "../../../../img/svg/pro_illustration.svg";

/**
 * This component allows to display the subscription key for the administration
 */
class DisplaySubscriptionKeyTeasing extends React.Component {
  constructor(props) {
    super(props);

    this.subscriptionKeyService = new SubscriptionKeyServiceWorkerService(props.context.port);

    this.bindCallbacks();
  }

  bindCallbacks() {
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
    this.props.dialogContext.open(EditSubscriptionKey, {
      title: this.props.t("New subscription key"),
      onSave: this.handleSaveSubscriptionKey,
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <>
          {/* Details header with edition, server version and client version */}
          <div className="subscription-key-teasing main-column">
            <div className="main-content">
              <h3 className="title">
                <Trans>Subscription</Trans>
              </h3>
              <h4>
                <Trans>Details</Trans>
              </h4>
              <div className="subscription-information">
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
                  </div>
                  <div className="information-value">
                    <span className="edition value">
                      {this.props.context.siteSettings.isCommunityEdition ? (
                        <Trans>Community Edition</Trans>
                      ) : (
                        <Trans>Pro Edition</Trans>
                      )}
                    </span>
                    <span className="server-version value">{this.props.context.siteSettings.version}</span>
                    <span className="client-version value">{this.props.context.extensionVersion}</span>
                  </div>
                </div>
              </div>
              <h4>
                <Trans>Passbolt Community Edition</Trans>
              </h4>
              <div className="subscription-key-teasing-info">
                <AnimatedFeedback name="infinity_illustration" />
                <div>
                  <div className="title-text">
                    <Trans>Passbolt CE is free forever!</Trans>
                  </div>
                  <p>
                    <Trans>
                      Passbolt Community Edition (CE) includes all essential features for team collaboration at no cost.
                    </Trans>
                    {/* &nbsp; FIXME: CLEAN THIS UP BEFORE MERGING
                    <Trans>
                      For advanced needs such as Single Sign-On (SSO), AD or SCIM integration, consider upgrading to
                      Passbolt Pro.
                    </Trans>
                    &nbsp;
                    <Trans>
                      The Pro version also offers premium technical support from our engineering team to ensure smooth
                      operation and expert assistance.
                    </Trans> */}
                  </p>
                </div>
              </div>
              <h4>
                <Trans>Passbolt Pro Edition</Trans>
              </h4>
              <div className="subscription-key-teasing-info">
                <div className="illustration icon-feedback">
                  <ProIllustrationSVG />
                </div>
                <div className="subscription-information">
                  <div className="title-text">
                    <Trans>Take your team to the next level with Passbolt Pro!</Trans>
                  </div>
                  <p>
                    <Trans>
                      Unlock enterprise-grade capabilities such as Single Sign-On (SSO), Active Directory and SCIM
                      provisioning, advanced password and access policies, detailed audit logs, and high-availability
                      deployment options.
                    </Trans>
                    &nbsp;
                    <Trans>
                      Passbolt Pro Edition also comes with premium technical support from our engineering team, with
                      guaranteed response times so you can keep your team productive and secure.
                    </Trans>
                  </p>
                  <div className="subscription-key-teasing-info">
                    <button type="button" className="button secondary" onClick={this.handleAddSubscriptionKey}>
                      <Trans>Add a new subscription key</Trans>
                    </button>
                    <a
                      className="button primary"
                      href="https://www.passbolt.com/ce-to-pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Trans>Learn more about Passbolt Pro Edition</Trans>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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

DisplaySubscriptionKeyTeasing.propTypes = {
  context: PropTypes.any, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func,
};

export default withAppContext(
  withDialog(withNavigationContext(withTranslation("common")(DisplaySubscriptionKeyTeasing))),
);
