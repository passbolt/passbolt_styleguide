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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {createSafePortal} from "../../../../shared/utils/portals";
import EmailSVG from "../../../../img/svg/email.svg";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";

/**
 * This component allows to display the subscription key for the administration
 */
class DisplaySubscriptionKeyTeasing extends React.Component {
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
              <h3 className="title"><Trans>Subscription</Trans></h3>
              <h4 className=""><Trans>Details</Trans></h4>
              <div className="subscription-information">
                <div className="information">
                  <div className="information-label">
                    <span className="edition label"><Trans>Edition:</Trans></span>
                    <span className="server-version label"><Trans>Server version:</Trans></span>
                    <span className="client-version label"><Trans>Client version:</Trans></span>
                  </div>
                  <div className="information-value">
                    <span className="edition value">{this.props.context.siteSettings.isCeEdition ? <Trans>Community Edition</Trans> :  <Trans>Pro Edition</Trans>}</span>
                    <span className="server-version value">{this.props.context.siteSettings.version}</span>
                    <span className="client-version value">{this.props.context.extensionVersion}</span>
                  </div>
                </div>
              </div>
              <h4 className=""><Trans>Subscription Key</Trans></h4>
              <div className="subscription-key-teasing-info">
                <AnimatedFeedback name="infinity_illustration" />
                <div>
                  <div className="title-text"><Trans>Passbolt CE is free forever!</Trans></div>
                  <span><Trans>Passbolt Community Edition (CE) includes all essential features for team collaboration at no cost.</Trans>&nbsp;
                    <Trans>For advanced needs such as Single Sign-On (SSO), AD or SCIM
                                    integration, consider upgrading to Passbolt Pro.</Trans>&nbsp;
                    <Trans>The Pro version also offers premium technical support from our engineering team to ensure smooth operation and expert assistance.</Trans></span>
                </div>
              </div>
            </div>
          </div>
          <div className="actions-wrapper">
            <a className="button primary" href="https://www.passbolt.com/contact/sales?utm_campaign=21060976-CE%20to%20Pro&utm_source=product" target="_blank" rel="noopener noreferrer"><Trans>Upgrade to Passbolt Pro</Trans></a>
          </div>
        </>
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

DisplaySubscriptionKeyTeasing.propTypes = {
  context: PropTypes.any, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  t: PropTypes.func,
};

export default withAppContext(withNavigationContext(withTranslation('common')(DisplaySubscriptionKeyTeasing)));
