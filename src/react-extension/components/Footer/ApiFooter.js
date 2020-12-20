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
import Icon from "../Common/Icons/Icon";
import PropTypes from "prop-types";

const CREDITS_URL = "https://www.passbolt.com/credits";
const UNSAFE_URL = "https://help.passbolt.com/faq/hosting/why-unsafe";

/**
 * The api application footer
 */
class ApiFooter extends Component {
  /**
   * Returns true if the component is ready to be displayed
   */
  get isReady() {
    return this.props.siteSettings;
  }

  /**
   * Returns the terms link url
   */
  get privacyUrl() {
    return this.props.siteSettings.privacyLink;
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
    return this.props.siteSettings.termsLink;
  }

  /**
   * Returns the server version label to display
   */
  get version() {
    return this.props.siteSettings.version;
  }

  /**
   * Returns true if the application is in an unsafe mode
   */
  get isUnsafeMode() {
    const debug = this.props.siteSettings.debug;
    const isHttpMode = this.props.siteSettings.url.startsWith('http://');
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
          {this.isReady &&
          <ul className="footer-links">
            {this.isUnsafeMode &&
            <li className="error message">
              <a
                title="terms of service"
                href={this.unsafeUrl}
                target="_blank" rel="noopener noreferrer">
                Unsafe mode
              </a>
            </li>
            }
            {this.termsUrl &&
            <li>
              <a href={this.termsUrl}
                target="_blank"
                rel="noopener noreferrer">
                Terms
              </a>
            </li>
            }
            {this.privacyUrl &&
            <li>
              <a href={this.privacyUrl}
                target="_blank"
                rel="noopener noreferrer">
                Privacy
              </a>
            </li>
            }
            <li>
              <a href={this.creditsUrl}
                target="_blank"
                rel="noopener noreferrer">
                Credits
              </a>
            </li>
            <li>
              <a
                href={this.creditsUrl}
                className="tooltip-left"
                // data-tooltip={this.version}
                target="_blank"
                rel="noopener noreferrer">
                <Icon name="heart-o"/>
              </a>
            </li>
          </ul>
          }
        </div>
      </footer>
    );
  }
}


ApiFooter.propTypes = {
  siteSettings: PropTypes.object // The site settings
};

export default ApiFooter;
