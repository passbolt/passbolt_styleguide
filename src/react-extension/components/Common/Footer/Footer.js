/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, { Component } from "react";
import HeartSVG from "../../../../img/svg/heart.svg";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import Tooltip from "../Tooltip/Tooltip";
import {
  CLOUD,
  COMMUNITY_EDITION,
  PRO_EDITION,
} from "../../Administration/DisplaySubscriptionKey/DisplaySubscriptionKey";

const CREDITS_URL = "https://www.passbolt.com/terms";
const UNSAFE_URL = "https://www.passbolt.com/docs/hosting/faq/why-I-see-unsafe-mode-banner/";

/**
 * The application footer
 */
class Footer extends Component {
  /**
   * Returns the terms link url
   */
  get privacyUrl() {
    return this.props.context.siteSettings.privacyLink;
  }

  /**
   * Returns the credits link url
   */
  get creditsUrl() {
    return CREDITS_URL;
  }

  /**
   * Returns the unsafe url.
   */
  get unsafeUrl() {
    return UNSAFE_URL;
  }

  /**
   * Returns the privacy link url
   */
  get termsUrl() {
    return this.props.context.siteSettings.termsLink;
  }

  /**
   * Return the server (if available) and browser extension version.
   * i.e. SERVER_VERSION / BROWSER_EXTENSION_VERSION
   */
  get versions() {
    const clientVersion = this.props.context.extensionVersion;
    const serverVersion = this.props.context.siteSettings.version;

    return (
      <div>
        {clientVersion && (
          <div>
            {this.props.t("Client")} {clientVersion}
          </div>
        )}
        {serverVersion && (
          <>
            {clientVersion && <hr />}
            <div>
              {this.props.t("Server")} {serverVersion}
            </div>
          </>
        )}
      </div>
    );
  }

  /**
   * Returns true if the application is in an unsafe mode
   */
  get isUnsafeMode() {
    if (!this.props.context.siteSettings) {
      return false;
    }
    const debug = this.props.context.siteSettings.debug;
    const isHttpMode = this.props.context.siteSettings.url.startsWith("http://");
    return debug || isHttpMode;
  }

  /**
   * Returns true if the application is served on Passbolt's cloud
   */
  get isCloud() {
    const currentURL = new URL(this.props.context.siteSettings.url);
    return currentURL.protocol === "https:" && Boolean(currentURL.hostname.match(/cloud.passbolt.com$/));
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <footer className="footer">
        <ul className="footer-links">
          {this.isUnsafeMode && (
            <li className="error-message">
              <a href={this.unsafeUrl} target="_blank" rel="noopener noreferrer">
                <Trans>Unsafe mode</Trans>
              </a>
            </li>
          )}
          {!this.isCloud && (
            <>
              {this.props.context.siteSettings.isCommunityEdition && (
                <li>
                  {COMMUNITY_EDITION}
                  <span className="edition-suffix">
                    <Trans>&nbsp;(free)</Trans>
                  </span>
                </li>
              )}
              {!this.props.context.siteSettings.isCommunityEdition && <li>{PRO_EDITION}</li>}
            </>
          )}
          {this.isCloud && <li>{CLOUD}</li>}
          <li>
            {this.versions && (
              <Tooltip message={this.versions} direction="top-left">
                <a
                  className="button button-transparent inline"
                  href={this.creditsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeartSVG />
                </a>
              </Tooltip>
            )}
            {!this.versions && (
              <a
                className="button button-transparent inline"
                href={this.creditsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeartSVG />
              </a>
            )}
          </li>
        </ul>
      </footer>
    );
  }
}

Footer.propTypes = {
  context: PropTypes.any, // The app context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(Footer));
