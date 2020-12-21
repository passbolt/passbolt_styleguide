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
import XRegExp from "xregexp";

const CHROME_STORE_BROWSER_EXTENSION_URL = "https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf";
const FIREFOX_STORE_BROWSER_EXTENSION_URL = "https://addons.mozilla.org/fr/firefox/addon/passbolt";
const CHROME_BROWSER_NAME = "chrome";
const FIREFOX_BROWSER_NAME = "firefox";

class InstallExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  getDefaultState() {
    return {
      browser: this.isChrome ? CHROME_BROWSER_NAME : FIREFOX_BROWSER_NAME,
      theme: 'default'
    };
  }

  initEventHandlers() {
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  /**
   * Check if the browser is chrome
   * @returns {boolean}
   */
  get isChrome() {
    const browser = XRegExp('chrome|chromium|crios', 'i');
    return browser.test(window.navigator.userAgent);
  }

  /**
   * Get the browser store thumbnail url
   * @returns {string}
   */
  get storeThumbnailUrl() {
    if (this.state.browser === 'chrome') {
      return `${window.location.origin}/img/third_party/ChromeWebStore_black.png`; // @todo _white if theme midgar
    } else {
      return `${window.location.origin}/img/third_party/FirefoxAMO_black.svg`; // @todo _white if theme midgar
    }
  }

  /**
   * Get the browser store url
   * @returns {string}
   */
  get storeUrl() {
    if (this.isChrome) {
      return CHROME_STORE_BROWSER_EXTENSION_URL;
    } else {
      return FIREFOX_STORE_BROWSER_EXTENSION_URL;
    }
  }

  /**
   * Get the store classname
   * @returns {string}
   */
  get storeClassName() {
    return `browser-webstore ${this.state.browser}`;
  }

  /**
   * Refresh the page
   */
  handleRefreshClick() {
    window.location.reload();
  }

  render() {
    return (
      <div className="install-extension">
        <h1>Please install the browser extension.</h1>
        <p>Please download the browser extension and refresh this page to continue.</p>
        {this.state.browser &&
        <a href={this.storeUrl} className={this.storeClassName} target="_blank" rel="noopener noreferrer">
          <img src={this.storeThumbnailUrl}/>
        </a>
        }
        <div className="form-actions">
          <a href={this.storeUrl} className="button primary big" role="button" target="_blank" rel="noopener noreferrer">Download extension</a>
          <a onClick={this.handleRefreshClick} role="button">Refresh to detect extension</a>
        </div>
      </div>
    );
  }
}

export default InstallExtension;
