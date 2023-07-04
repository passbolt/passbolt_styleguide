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
import React, {Component} from "react";
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Tooltip from "../Tooltip/Tooltip";

const CREDITS_URL = "https://www.passbolt.com/credits";
const UNSAFE_URL = "https://help.passbolt.com/faq/hosting/why-unsafe";

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
    const versions = [];
    const serverVersion = this.props.context.siteSettings.version;
    if (serverVersion) {
      versions.push(serverVersion);
    }
    if (this.props.context.extensionVersion) {
      versions.push(this.props.context.extensionVersion);
    }

    return versions.join(' / ');
  }

  /**
   * Returns true if the application is in an unsafe mode
   */
  get isUnsafeMode() {
    const debug = this.props.context.siteSettings.debug;
    const isHttpMode = this.props.context.siteSettings.url.startsWith('http://');
    return debug || isHttpMode;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <footer>
        <div className="footer">
          <ul className="footer-links">
            {this.isUnsafeMode &&
            <li className="error-message">
              <a
                href={this.unsafeUrl}
                target="_blank" rel="noopener noreferrer">
                <Trans>Unsafe mode</Trans>
              </a>
            </li>
            }
            {this.termsUrl &&
            <li>
              <a href={this.termsUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Trans>Terms</Trans>
              </a>
            </li>
            }
            {this.privacyUrl &&
            <li>
              <a href={this.privacyUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Trans>Privacy</Trans>
              </a>
            </li>
            }
            <li>
              <a href={this.creditsUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Trans>Credits</Trans>
              </a>
            </li>
            <li>
              {this.versions &&
                <Tooltip message={this.versions} direction="left">
                  <a
                    href={this.creditsUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Icon name="heart-o"/>
                  </a>
                </Tooltip>
              }
              {!this.versions &&
                <a
                  href={this.creditsUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Icon name="heart-o"/>
                </a>
              }
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  context: PropTypes.any, // The app context‡
};

export default withAppContext(withTranslation("common")(Footer));
