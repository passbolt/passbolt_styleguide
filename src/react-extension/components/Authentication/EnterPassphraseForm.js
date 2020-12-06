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

class EnterPassphraseForm extends Component {
  render() {
    return (
      <div className="enter-passphrase">
        <h1>Please enter your passphrase to continue.</h1>
        <form acceptCharset="utf-8">
          <div className="input text required">
            <label htmlFor="passphrase">Passphrase</label>
            <input type="password" name="passphrase" placeholder="passphrase" required="required"/>
          </div>
          <div className="input checkbox">
            <input type="checkbox" name="remember-me" value="remember-me" id="remember-me"/>
            <label htmlFor="remember-me">
              Remember until I logout, or session timeout.
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary big" role="button">Verify</button>
            <a href="#">Help, I don&apos;t remember my passphrase.</a>
          </div>
        </form>
      </div>
    );
  }
}

export default EnterPassphraseForm;
