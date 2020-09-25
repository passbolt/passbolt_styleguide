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
import AppContext from "../../contexts/AppContext";

/**
 * The application footer
 */
class Footer extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Whenever the componen is mounted
   */
  componentDidMount() {
    this.populate();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      extensionVersion: '' // The Passbolt extension version
    };
  }

  /**
   * Returns true if the component is ready to be displayed
   */
  get isReady() {
    return this.context.siteSettings && this.state.extensionVersion;
  }

  /**
   * Returns the terms link url
   */
  get privacyUrl() {
    return this.context.siteSettings.settings.app.legal.terms;
  }

  /**
   * Returns the privacy link url
   */
  get termsUrl() {
    return this.context.siteSettings.settings.app.legal.privacy;
  }

  /**
   * Returns the server and extension versions label to display
   */
  get versions() {
    const serverVersion = this.context.siteSettings.settings.app.version.number;
    return `${serverVersion} / ${this.state.extensionVersion}`;
  }

  /**
   * Returns true if the application is in an unsafe mode
   */
  get isUnsafeMode() {
    const isDebugMode = this.context.siteSettings.settings.app.debug;
    const isHttpMode = this.context.siteSettings.settings.app.url.trim().startsWith('http://');
    return isDebugMode || isHttpMode; // TODO
  }

  /**
   * Populates the component with initial date
   */
  async populate() {
    const extensionVersion = await this.context.port.request('passbolt.addon.get-version');
    this.setState({extensionVersion});
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <footer>
        <div className="footer">
          { this.isReady &&
            <ul className="footer-links">
              {this.isUnsafeMode &&
              <li className="error message">
                <a
                  title="terms of service"
                  href="https://help.passbolt.com/faq/hosting/why-unsafe">
                  Unsafe mode
                </a>
              </li>
              }
              <li>
                <a href={this.termsUrl}>
                  Terms
                </a>
              </li>
              <li>
                <a href={this.privacyUrl}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://www.passbolt.com/credits">
                  Credits
                </a>
              </li>
              <li>
                <a
                  href="https://www.passbolt.com/credits"
                  className="tooltip-left"
                  data-tooltip={this.versions}>
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

Footer.contextType = AppContext;

Footer.propTypes = {};

export default Footer;
