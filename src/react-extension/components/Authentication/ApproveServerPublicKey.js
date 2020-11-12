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

class ApproveServerPublicKey extends Component {
  render() {
    return (
      <div className="invitation-required-feedback">
        <h1>Sorry, the server key has changed.</h1>
        <p>
          For security reasons please check with your administrator
          that this is a change that they initiated.
          The new fingerprint:
          <pre>9FDC 781B E555 39D4 CB50 <br/>FF42 86DB 2BDD 17D3 34B1</pre>
        </p>
        <div className="input checkbox">
          <input type="checkbox" name="remember-me" value="remember-me" id="remember-me"/>
          <label htmlFor="remember-me">
            Yes, I checked and it is all fine.
          </label>
        </div>
        <div className="form-actions">
          <a href="#" className="button primary big" role="button">
            Accept new key
          </a>
        </div>
      </div>
    );
  }
}

export default ApproveServerPublicKey;
