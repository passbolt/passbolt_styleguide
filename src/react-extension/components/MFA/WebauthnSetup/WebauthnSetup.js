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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation, Trans } from "react-i18next";
import { withMfa } from "../../../contexts/MFAContext";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { BROWSER_NAMES, detectBrowserName } from "../../../../shared/lib/Browser/detectBrowserName";

/**
 * This component displays the "get started" screen for the WebAuthn (security key) setup.
 *
 * The registration ceremony (navigator.credentials.create) cannot run inside the extension origin
 * iframe: it must run on a top-level page served by the passbolt origin so the relying party id
 * matches. Like the Duo provider, the primary action therefore navigates the top window to the
 * passbolt served setup page (target="_top"); Safari, which handles this differently, goes through
 * the background page instead.
 */
class WebauthnSetup extends Component {
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
   * @returns {Object}
   */
  get defaultState() {
    return {
      isSafari: detectBrowserName() === BROWSER_NAMES.SAFARI,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleGetStartedClick = this.handleGetStartedClick.bind(this);
  }

  /**
   * Get the trusted domain (passbolt origin) used to build the setup page url.
   * @returns {string}
   */
  get trustedDomain() {
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Get the top-level setup page url served by the passbolt origin.
   * @returns {string}
   */
  get setupUrl() {
    return `${this.trustedDomain}/mfa/setup/webauthn`;
  }

  /**
   * Handle the cancellation of the setup.
   */
  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Handle the "Get started" button click (Safari only).
   */
  handleGetStartedClick() {
    this.props.onGetStartedWithWebauthn();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="mfa-setup webauthn-get-started main-column">
          <div className="main-content how-it-works">
            <h3>
              <Trans>Getting started with security keys</Trans>
            </h3>
            <h4 className="no-border">
              <Trans>How does it work?</Trans>
            </h4>
            <p className="description">
              <Trans>
                Register a FIDO2 security key (such as a hardware key or a passkey). You will be asked to use it as a
                second factor every time you sign in to passbolt.
              </Trans>
            </p>
            <p className="description">
              <Trans>
                You will be redirected to a passbolt page and your browser will prompt you to use your security key. You
                can register more than one key.
              </Trans>
            </p>
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button secondary cancel" type="button" onClick={this.handleCancelClick}>
            <span>
              <Trans>Cancel</Trans>
            </span>
          </button>
          {this.state.isSafari ? (
            <button className="button primary" type="button" onClick={this.handleGetStartedClick}>
              <span>
                <Trans>Get started</Trans>
              </span>
            </button>
          ) : (
            <a className="button primary" role="button" href={this.setupUrl} target="_top">
              <span>
                <Trans>Get started</Trans>
              </span>
            </a>
          )}
        </div>
      </>
    );
  }
}

WebauthnSetup.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
  onGetStartedWithWebauthn: PropTypes.func, // The "Get Started" button callback (Safari)
};

export default withAppContext(withMfa(withTranslation("common")(WebauthnSetup)));
