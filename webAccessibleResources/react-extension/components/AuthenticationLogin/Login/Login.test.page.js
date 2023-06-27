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
 * @since         3.6.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import Login from "./Login";

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
          <Login {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the passphrase value
   */
  get passphrase() {
    return this.passphraseInput.value;
  }

  /**
   * REturns passphrase input
   */
  get passphraseInput() {
    return  this._page.container.querySelector('#passphrase');
  }

  /**
   * Returns the token code value
   */
  get rememberMe() {
    return this.rememberMeInput.value;
  }

  /**
   * Returns remember me input
   */
  get rememberMeInput() {
    return  this._page.container.querySelector('#remember-me');
  }

  /**
   * Return the can remember me element
   * @returns {boolean}
   */
  get canRememberMe() {
    return Boolean(this.rememberMeInput);
  }

  /**
   * Returns the sign in button element
   */
  get signInButton() {
    return this._page.container.querySelector('.button.primary');
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
   * Returns true if the user can change something like the token code
   */
  get canChange() {
    const cannotChangePassphrase = this.passphraseInput.hasAttribute('disabled');
    const cannotChangeRememberMer = this.rememberMeInput?.hasAttribute('disabled');
    return !cannotChangePassphrase && !cannotChangeRememberMer;
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.signInButton.getAttribute('class').indexOf('processing') > -1;
  }

  /**
   * Returns true if the empty error message is displayed
   */
  get hasEmptyPassphraseError() {
    return Boolean(this._page.container.querySelector('.empty-passphrase'));
  }

  /**
   * Returns true if the invalid passphrase error is displayed
   */
  hasInvalidPassphraseError() {
    return Boolean(this._page.container.querySelector('.invalid-passphrase'));
  }

  /**
   * Toggle the remember me value
   */
  async toggleRememberMe() {
    const leftClick = {button: 0};
    fireEvent.click(this.rememberMeInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Fill the passphrase with the given value
   * @param passphrase A passphrase
   */
  async fillPassphrase(passphrase) {
    fireEvent.change(this.passphraseInput, {target: {value: passphrase}});
    await waitFor(() => {});
  }

  /**
   * Sign in
   * @param inProgressFn The function called while processing the operation
   */
  async signIn(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.signInButton, leftClick);
    await waitFor(inProgressFn);
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
