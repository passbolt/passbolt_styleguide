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
 * @since         2.12.0
 */
import React, {Component} from "react";
import LoginContext from "../../contexts/LoginContext";

class EnterUsernameForm extends Component {
  get privacyLink() {
    return this.context.siteSettings.termsLink;
  }

  get termsLink() {
    return this.context.siteSettings.privacyLink;
  }

  render() {
    return (
      <div className="enter-username">
        <h1>Please enter your email to continue.</h1>
        <form acceptCharset="utf-8">
          <div className="input text required">
            <label htmlFor="username">Email (username)</label>
            <input type="text" name="username" placeholder="you@organization.com" required="required"/>
          </div>
          {(this.privacyLink || this.termsLink) &&
          <div className="input checkbox">
            <input type="checkbox" name="checkbox-terms" value="agree" id="checkbox-terms"/>
            <label htmlFor="checkbox-terms">
              {(this.privacyLink && this.termsLink) &&
                <span>
                  I accept the&nbsp;
                  <a href={this.termsLink} target="_blank" rel="noopener noreferrer">terms</a>
                  &nbsp;and&nbsp;
                  <a href={this.privacyLink} target="_blank" rel="noopener noreferrer">privacy policy</a>.
                </span>
              }
              {(this.privacyLink && !this.termsLink) &&
              <span>
                  I accept the <a href={this.privacyLink} target="_blank" rel="noopener noreferrer">privacy policy</a>.
              </span>
              }
              {(!this.privacyLink && this.termsLink) &&
              <span>
                I accept the <a href={this.termsLink} target="_blank" rel="noopener noreferrer">terms</a>.
              </span>
              }
            </label>
          </div>
          }
          <div className="form-actions">
            <button type="submit" className="button primary big" role="button">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

EnterUsernameForm.contextType = LoginContext;

export default EnterUsernameForm;
