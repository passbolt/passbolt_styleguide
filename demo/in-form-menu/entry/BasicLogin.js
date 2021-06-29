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
 * @since         3.4.0
 */
import React, {Component} from "react";

/**
 * This component allows the user to log in with his account
 */
class BasicLogin extends Component {
  /**
   * Render the component
   */
  render() {
    return (
      <form acceptCharset="utf-8" className="login-form" style={{margin: "auto", width:"50rem"}}>
        <div className="input text required">
          <label htmlFor="username">
            Username
          </label>
          <div className="username">
            <input
              id="username"
              type="text"
              name="username"
              className="login-username-input"
              autoFocus={true}/>
          </div>
        </div>
        <div className="input text required">
          <label htmlFor="password">
            Password
          </label>
          <div className="password with-token">
            <input
              id="passphrase"
              type="password"
              name="passphrase"
              className="login-passphrase-input"/>
          </div>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="button primary big full-width"
            role="button">
            Sign in
          </button>
        </div>
      </form>
    );
  }
}

BasicLogin.propTypes = {
};
export default BasicLogin;
