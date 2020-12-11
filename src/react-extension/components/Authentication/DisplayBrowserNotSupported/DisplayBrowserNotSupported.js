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

const DOWNLOAD_FIREFOX_URL = "https://www.mozilla.org/firefox/download/thanks/";

class DisplayBrowserNotSupported extends Component {
  render() {
    return (
      <div className="browser-not-supported">
        <h1>Sorry, your browser is not supported.</h1>
        <p>Please download chrome or firefox to get started with passbolt.</p>
        <a href={`${DOWNLOAD_FIREFOX_URL}`} className="browser" target="_blank" rel="noopener noreferrer">
          <img src={`${window.location.origin}/img/third_party/firefox_logo.png`} />
        </a>
        <div className="form-actions">
          <a href={`${DOWNLOAD_FIREFOX_URL}`} className="button primary big" role="button" target="_blank" rel="noopener noreferrer">Download firefox</a>
          {/*<a role="button">Why is my browser not supported?</a>*/}
        </div>
      </div>
    );
  }
}

export default DisplayBrowserNotSupported;
