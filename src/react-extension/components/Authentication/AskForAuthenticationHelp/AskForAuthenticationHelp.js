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
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";

/**
 * This component propose to help the use who lost his gpg key or passphrase
 */
class AskForAuthenticationHelp extends Component {
  /**
   * Default contrustor
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }


  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    // TODO
  }

  /**
   * Whenever the user wants to request a new account
   */
  handleRequestNewAccount() {
    this.requestNewAccount();
  }


  /**
   * Request a new account for the user
   */
  requestNewAccount() {
    // TODO
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="ask-for-authentication-help">
        <h1>Sorry... maybe an administrator can help?</h1>
        <p className="message">
          Both the private key and passphrase are required to perform an account recovery. If you do not access, you can request
          a new account to the administrator.
        </p>
        <div className="form-actions">
          <button
            type="submit"
            className={`button primary big`}
            onClick={this.handleRequestNewAccount}
            role="button">
            Request new account
          </button>
        </div>
      </div>
    );
  }
}

AskForAuthenticationHelp.contextType = AuthenticationContext;

export default AskForAuthenticationHelp;
