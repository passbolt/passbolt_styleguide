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
 * @since         3.10.0
 */
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {fireEvent, render, waitFor} from "@testing-library/react";
import LoginPage from "./LoginPage";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ConfigurePassphraseGenerator component represented as a page
 */
export default class LoginPageTest {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <LoginPage {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Shortcut method for the container querySelector.
   * @param {string} stringSelector
   * @returns {HTMLElement}
   */
  select(stringSelector) {
    return this._page.container.querySelector(stringSelector);
  }

  /**
   * Wait for the page to be ready
   * @returns {Promise<void>}
   */
  async isReady() {
    await waitFor(() => {
      const isReady = this.select(".form-container") !== null || this.select(".sso-login-form") !== null;
      if (!isReady) {
        throw new Error("Page is not ready yet");
      }
    });
  }

  /**
   * Simulates a click on the given HTML element.
   * The clicks is consider done when the callback returns {true}.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @param {function} callback The callback to be used in the waitFor method to ensure the click is done (returns true when it's done)
   * @returns {Promise<void>}
   */
  async clickOn(element, callback) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
      if (!callback()) {
        throw new Error("Page didn't react yet on the event.");
      }
    });
  }

  /**
   * Returns the HTMLElement button of the SSO Login button
   * @returns {HTMLElement}
   */
  get ssoLoginButton() {
    return this.select(".sso-login-form .sso-login-button");
  }

  /**
   * Returns the HTMLElement of the passphrase input
   * @returns {HTMLElement}
   */
  get passphraseInput() {
    return this.select(".login-form #passphrase");
  }

  /**
   * Returns the HTMLElement button used to switch to passphrase form
   * @returns {HTMLElement}
   */
  get switchToPassphraseFormButton() {
    return this.select("a.show-passphrase-form-button");
  }

  /**
   * Returns the HTMLElement button used to switch to SSO form
   * @returns {HTMLElement}
   */
  get switchToSsoFormButton() {
    return this.select("a.show-sso-form-button");
  }

  /**
   * Returns the HTMLElement of the SSO error message
   * @returns {HTMLElement}
   */
  get ssoErrorMessage() {
    return this.select('.sso-login-form .error-message');
  }

  /**
   * Simulates a click on the SSO login button
   * @returns {Promise<void>}
   */
  async clickOnSsoLoginButton() {
    await this.clickOn(this.ssoLoginButton, () => true);
  }

  /**
   * Simulates a click on the switch to SSO form button
   * @returns {Promise<void>}
   */
  async clickOnSwitchToSsoForm() {
    await this.clickOn(this.switchToSsoFormButton, () => true);
  }

  /**
   * Simulates a click on the switch to passphrase form button
   * @returns {Promise<void>}
   */
  async clickOnSwitchToPassphraseForm() {
    await this.clickOn(this.switchToPassphraseFormButton, () => true);
  }
}
