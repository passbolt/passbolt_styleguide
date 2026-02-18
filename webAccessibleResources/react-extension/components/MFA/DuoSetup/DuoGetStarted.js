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
 * @since         5.0.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation, Trans } from "react-i18next";
import { withMfa } from "../../../contexts/MFAContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import DuoLoginSuccessIllustration from "./DuoLoginSuccessIllustration";
import DuoSignInIllustration from "./DuoSignInIllustration";
import DuoPushNotificationIllustration from "./DuoPushNotificationIllustration";
import CsrfTokenServiceWorkerService from "../../../../shared/services/serviceWorker/auth/csrfTokenServiceWorkerService";

/**
 * This component will display the get started DUO setup
 */
class DuoGetStarted extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
    this.csrfTokenServiceWorkerService =
      props.csrfTokenServiceWorkerService ?? new CsrfTokenServiceWorkerService(props.context.port);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.getCsrfToken();
  }

  /**
   * Get the csrf for the hidden input
   * @returns {Promise<void>}
   */
  async getCsrfToken() {
    const csrf = await this.csrfTokenServiceWorkerService.getCsrfToken();
    this.setState({ csrf });
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      csrf: null, // Csrf token
    };
  }

  /**
   * Get trusted domain for the form action
   * @returns {String}
   */
  get trustedDomain() {
    return this.props.context.userSettings.getTrustedDomain();
  }
  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  /**
   * handle the cancelation when setup the provider
   */
  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="mfa-setup duo-get-started main-column">
          <div className="main-content how-it-works">
            <h3>
              <Trans>Getting started with Duo</Trans>
            </h3>
            <h4 className="no-border">
              <Trans>How does it work?</Trans>
            </h4>
            <div className="instruction">
              <div className="step sign-in-illustration">
                <DuoSignInIllustration />
                <p>
                  <Trans>You sign in to passbolt just like you normally do.</Trans>
                </p>
              </div>
              <div className="step push-notifcation">
                <DuoPushNotificationIllustration />
                <p>
                  <Trans>Use you 2FA device to authenticate.</Trans>
                </p>
              </div>
              <div className="step success-login">
                <DuoLoginSuccessIllustration />
                <p>
                  <Trans>Follow the procedure to login.</Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button secondary cancel" type="button" onClick={this.handleCancelClick}>
            <span>
              <Trans>Cancel</Trans>
            </span>
          </button>
          <form
            action={`${this.trustedDomain}/mfa/setup/duo/prompt?redirect=/app/settings/mfa/duo`}
            method="post"
            target="_top"
          >
            <input type="hidden" name="_csrfToken" value={this.state.csrf} />
            <button className="button primary" type="submit">
              <span>
                <Trans>Get started</Trans>
              </span>
            </button>
          </form>
        </div>
      </>
    );
  }
}

DuoGetStarted.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
  csrfTokenServiceWorkerService: PropTypes.object, // The Bext service that handle csrf token requests.
};

export default withAppContext(withMfa(withTranslation("common")(DuoGetStarted)));
