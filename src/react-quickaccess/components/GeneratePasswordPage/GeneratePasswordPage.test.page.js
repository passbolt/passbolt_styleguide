
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
 * @since         3.3.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import GeneratePasswordPage from "./GeneratePasswordPage";

/**
 * The GeneratePasswordPage component represented as a page
 */
export default class GeneratePasswordTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <Router>
        <MockTranslationProvider>
          <GeneratePasswordPage.WrappedComponent {...props}/>
        </MockTranslationProvider>
      </Router>
    );
  }

  /**
   * Get the title
   */
  get title() {
    return this._page.container.querySelector('.primary-action-title').textContent;
  }

  /**
   * Returns the password value
   */
  get password() {
    return this._page.container.querySelector('.input.password input').value;
  }

  /**
   * Returns the generate password button
   */
  get generatePasswordButton() {
    return this._page.container.querySelector('.password-generate.button');
  }

  /**
   * Returns the toggle password button
   */
  get toggleViewPasswordButton() {
    return this._page.container.querySelector('.password-view.button');
  }

  /**
   * Returns the copy password button
   */
  get copyPasswordButton() {
    return this._page.container.querySelector('.copy-to-clipboard.button');
  }

  /**
   * Returns the complexity of a password
   */
  get complexityText() {
    return this._page.container.querySelector('.complexity-text').textContent;
  }

  /**
   * Returns the active tab
   */
  get activeTab() {
    return this._page.container.querySelector('.tab.active a').textContent;
  }

  /**
   * Returns the tab
   * @param index
   * @returns {*}
   */
  tab(index) {
    return this._page.container.querySelectorAll('.tab')[index - 1].querySelector('.tab-link');
  }

  /**
   * Returns true it one can submit the apply operation
   */
  get canSubmit() {
    return this._page.container.querySelector('button[type="submit"]').getAttribute('disabled') !== '';
  }

  /**
   * Returns the apply button element
   */
  get applyButton() {
    return this._page.container.querySelector('button[type=\"submit\"]');
  }

  /**
   * Generate a new password
   */
  async generatePassword() {
    const leftClick = {button: 0};
    fireEvent.click(this.generatePasswordButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Toggle to show or hide password
   */
  async toggleViewPassword() {
    const leftClick = {button: 0};
    fireEvent.click(this.toggleViewPasswordButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Copy password
   */
  async copyPassword() {
    const leftClick = {button: 0};
    fireEvent.click(this.copyPasswordButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * use password generator
   */
  async usePasswordGenerator() {
    const leftClick = {button: 0};
    fireEvent.click(this.tab(1), leftClick);
    await waitFor(() => {});
  }

  /**
   * Apply generate password
   * @param inProgressFn Function called while we wait for React stability
   */
  async applyGeneratePassword(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.applyButton, leftClick);
    await waitFor(inProgressFn);
  }
}
