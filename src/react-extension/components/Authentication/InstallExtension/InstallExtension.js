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
 * @since         3.0.0
 */
import React, {Component} from "react";
import {BROWSER_NAMES, detectBrowserName} from "../../../../lib/Browser/detectBrowserName";
import {withAppContext} from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

const CHROME_STORE_BROWSER_EXTENSION_URL = "https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf";
const FIREFOX_STORE_BROWSER_EXTENSION_URL = "https://addons.mozilla.org/fr/firefox/addon/passbolt";

class InstallExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
      browserName: detectBrowserName()
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  /**
   * Get the browser store thumbnail url
   * By default if unknown, return the chrome image.
   * @todo handle unknown browser case
   * @returns {string}
   */
  get browserStoreThumbnailUrl() {
    switch (this.state.browserName) {
      case BROWSER_NAMES.CHROME:
        return `${this.props.context.trustedDomain}/img/third_party/ChromeWebStore_black.png`; // @todo _white if theme midgar
      case BROWSER_NAMES.FIREFOX:
        return `${this.props.context.trustedDomain}/img/third_party/FirefoxAMO_black.svg`; // @todo _white if theme midgar
      default:
        return `${this.props.context.trustedDomain}/img/third_party/ChromeWebStore_black.png`;
    }
  }

  /**
   * Get the browser store url.
   * By default if unknown, return the chrome webstore url.
   * @todo handle unknown browser case
   * @returns {string}
   */
  get storeUrl() {
    switch (this.state.browserName) {
      case BROWSER_NAMES.CHROME:
        return CHROME_STORE_BROWSER_EXTENSION_URL;
      case BROWSER_NAMES.FIREFOX:
        return FIREFOX_STORE_BROWSER_EXTENSION_URL;
      default:
        return CHROME_STORE_BROWSER_EXTENSION_URL;
    }
  }

  /**
   * Get the store classname
   * @returns {string}
   */
  get storeClassName() {
    return `browser-webstore ${this.state.browserName}`;
  }

  /**
   * Refresh the page
   */
  handleRefreshClick() {
    window.location.reload();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="install-extension">
        <h1><Trans>Please install the browser extension.</Trans></h1>
        <p><Trans>Please download the browser extension and refresh this page to continue.</Trans></p>
        {this.state.browserName &&
        <a href={this.storeUrl} className={this.storeClassName} target="_blank" rel="noopener noreferrer">
          <img src={this.browserStoreThumbnailUrl}/>
        </a>
        }
        <div className="form-actions">
          <a href={this.storeUrl} className="button primary big full-width" role="button" target="_blank" rel="noopener noreferrer"><Trans>Download extension</Trans></a>
          <a onClick={this.handleRefreshClick} role="button"><Trans>Refresh to detect extension</Trans></a>
        </div>
      </div>
    );
  }
}

InstallExtension.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation('common')(InstallExtension));
