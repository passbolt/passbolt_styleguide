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
import LoginContext from "../../contexts/LoginContext";

class EnterNameForm extends Component {
  render() {
    return (
      <div className="enter-username">
        <h1>New here? Enter your email to get started.</h1>
        <form acceptCharset="utf-8">
          <div className="input text required">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" placeholder="first name" required="required"/>
          </div>
          <div className="input text required error">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" placeholder="last name" required="required" value="🔥"/>
            <div className="error-message">Sorry the last name cannot contain emoji!</div>
          </div>
          <div className="form-actions">
            <button type="submit" className="button primary big" role="button">Register</button>
            <a href="#">I already have an account</a>
          </div>
        </form>
      </div>
    );
  }
}

EnterNameForm.contextType = LoginContext;

export default EnterNameForm;
