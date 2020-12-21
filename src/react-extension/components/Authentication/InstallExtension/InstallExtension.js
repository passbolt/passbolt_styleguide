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

const CHROME_STORE_BROWSER_EXTENSION_URL = "https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf";
const FIREFOX_STORE_BROWSER_EXTENSION_URL = "https://addons.mozilla.org/fr/firefox/addon/passbolt";

const CHROME_BROWSER_NAME = "chrome";
const EDGE_BROWSER_NAME = "edge";
const FIREFOX_BROWSER_NAME = "firefox";
const INTERNET_EXPLORER_BROWSER_NAME = "internet-explorer";
const OPERA_BROWSER_NAME = "opera";
const SAFARI_BROWSER_NAME = "safari";
const SAMSUNG_BROWSER_NAME = "samsung";
const UNKNOWN_BROWSER_NAME = "unknown";

class InstallExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  getDefaultState() {
    return {
      browser: this.browserName,
      theme: 'default'
    };
  }

  initEventHandlers() {
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  /**
   * Retrieve the browser name.
   * Code based on: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator#Example_1_Browser_detect_and_return_a_string
   * @returns {string}
   */
  get browserName() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    let browser;

    if (userAgent.indexOf("firefox") > -1) {
      browser = FIREFOX_BROWSER_NAME;
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (userAgent.indexOf("samsungbrowser") > -1) {
      browser = SAMSUNG_BROWSER_NAME;
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1) {
      browser = OPERA_BROWSER_NAME;
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (userAgent.indexOf("trident") > -1) {
      browser = INTERNET_EXPLORER_BROWSER_NAME;
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (userAgent.indexOf("edge") > -1) {
      browser = EDGE_BROWSER_NAME;
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (userAgent.indexOf("chrome") > -1) {
      browser = CHROME_BROWSER_NAME;
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (userAgent.indexOf("safari") > -1) {
      browser = SAFARI_BROWSER_NAME;
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      browser = UNKNOWN_BROWSER_NAME;
    }

    return browser;
  }

  /**
   * Get the browser store thumbnail url
   * By default if unknown, return the chrome image.
   * @todo handle unknown browser case
   * @returns {string}
   */
  get storeThumbnailUrl() {
    switch (this.state.browser) {
      case CHROME_BROWSER_NAME:
        return `${window.location.origin}/img/third_party/ChromeWebStore_black.png`; // @todo _white if theme midgar
      case FIREFOX_BROWSER_NAME:
        return `${window.location.origin}/img/third_party/FirefoxAMO_black.svg`; // @todo _white if theme midgar
      default:
        return `${window.location.origin}/img/third_party/ChromeWebStore_black.png`;
    }
  }

  /**
   * Get the browser store url.
   * By default if unknown, return the chrome webstore url.
   * @todo handle unknown browser case
   * @returns {string}
   */
  get storeUrl() {
    switch (this.state.browser) {
      case CHROME_BROWSER_NAME:
        return CHROME_STORE_BROWSER_EXTENSION_URL;
      case FIREFOX_BROWSER_NAME:
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
