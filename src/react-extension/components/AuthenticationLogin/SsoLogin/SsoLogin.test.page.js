/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.10.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import SsoLogin from "./SsoLogin";

/**
 * The Login component represented as a page
 */
export default class LoginPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <SsoLogin {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the secondary action link element
   */
  get secondaryActionLink() {
    return this._page.container.querySelector('.form-actions button.link');
  }

  /**
   * Returns the Azure SSO login button element
   */
  get azureLoginButton() {
    return this._page.container.querySelector('.sso-login-form .sso-login-button');
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.signInButton.getAttribute('class').indexOf('processing') > -1;
  }

  /**
   * Click on the secondary action link.
   */
  async clickSecondaryActionLink(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.secondaryActionLink, leftClick);
    await waitFor(inProgressFn);
  }

  /**
   * Click on the secondary action link.
   */
  async clickOnSsoLogin(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.azureLoginButton, leftClick);
    await waitFor(inProgressFn);
  }
}
