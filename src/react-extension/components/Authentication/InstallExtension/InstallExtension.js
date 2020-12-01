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

class InstallExtension extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      browser: this.isChrome ? 'chrome' : 'firefox',
      theme: 'default'
    };
  }

  /**
   * Check if the browser is chrome
   * @returns {boolean}
   */
  get isChrome() {
    return Boolean(window.chrome) && (Boolean(window.chrome.webstore) || Boolean(window.chrome.runtime));
  }

  get storeUrlImg() {
    if (this.state.browser === 'chrome') {
      return '../img/third-party/ChromeWebStore_black.png'; // _white if theme midgar...
    } else {
      return '../img/third-party/FirefoxAMO_black.svg'; // idem
    }
  }

  get storeUrl() {
    if (this.isChrome) {
      return 'https://chrome.google.com/webstore/detail/passbolt-extension/didegimhafipceonhjepacocaffmoppf';
    } else {
      return 'https://addons.mozilla.org/fr/firefox/addon/passbolt/';
    }
  }

  get storeClassName() {
    return `browser-webstore ${this.state.browser}`;
  }

  render() {
    return (
      <div className="install-extension">
        <h1>Please install the browser extension.</h1>
        <p>Please download the browser extension and refresh this page to continue.</p>
        {this.state.browser &&
          <a href={this.storeUrl} className={this.storeClassName}target="_blank" rel="noopener noreferrer">
            <img src={this.storeUrlImg} />
          </a>
        }
        <div className="form-actions">
          <a href={this.storeUrl} className="button primary big" role="button" target="_blank" rel="noopener noreferrer">Download extension</a>
          <a href="#" role="button">Refresh to detect extension</a>
        </div>
      </div>
    );
  }
}

export default InstallExtension;
