/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.9.4
 */

import {fireEvent, render} from "@testing-library/react";
import React from "react";
import {Router} from "react-router-dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ResourceCreatePage from "./ResourceCreatePage";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";

/**
 * The ResourceCreatePage component represented as a page
 */
export default class ResourceCreatePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          {/*<PrepareResourceContextProvider context={context} passwordPoliciesContext={props.passwordPoliciesContext}>*/}
          <ResourceCreatePage {...props} debug/>
          {/*</PrepareResourceContextProvider>*/}
        </Router>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );

    this.user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
  }

  /**
   * Returns the name input
   * @returns {HTLMElement}
   */
  get name() {
    return this._page.container.querySelector('.resource-create-form [name="name"]');
  }

  /**
   * Returns the uri input
   * @returns {HTLMElement}
   */
  get uri() {
    return this._page.container.querySelector('.resource-create-form [name="uri"]');
  }

  /**
   * Returns the username input
   * @returns {HTLMElement}
   */
  get username() {
    return this._page.container.querySelector('.resource-create-form [name="username"]');
  }

  /**
   * Returns the password input
   * @returns {HTLMElement}
   */
  get password() {
    return this._page.container.querySelector('.resource-create-form [name="password"]');
  }

  /**
   * Returns the error associated to the name input
   * @returns {HTLMElement}
   */
  get nameError() {
    return this._page.container.querySelector('.resource-create-form [name="name"] + .error-message');
  }

  /**
   * Returns the error associated to the uri input
   * @returns {HTLMElement}
   */
  get uriError() {
    return this._page.container.querySelector('.resource-create-form [name="uri"] + .error-message');
  }

  /**
   * Returns the error associated to the username input
   * @returns {HTLMElement}
   */
  get usernameError() {
    return this._page.container.querySelector('.resource-create-form [name="username"] + .error-message');
  }

  /**
   * Returns the error associated to the password input
   * @returns {HTLMElement}
   */
  get passwordError() {
    return this._page.container.querySelector('.resource-create-form .input-password-wrapper .error-message');
  }

  /**
   * Returns text from the password complexity bar
   * @returns {string}
   */
  get complexityText() {
    return this._page.container.querySelector('.complexity-text')?.textContent;
  }

  /**
   * Returns the unexpected error test if any
   * @returns {string}
   */
  get unexpectedError() {
    return this._page.container.querySelector('[type="submit"] + .error-message')?.textContent;
  }

  /**
   * Returns the submit button of the form
   * @returns {HTLMElement}
   */
  get submitButton() {
    return this._page.container.querySelector('[type="submit"]');
  }
  /**
   * Returns true if the form is under submission
   * @returns {boolean}
   */
  get isSubmitting() {
    return this.submitButton.classList.contains("processing");
  }

  /**
   * Returns the back button element
   * @returns {HTLMElement}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link a");
  }

  /**
   * Set the current form with the given data (only work with the inputs (not our Select component for instance))
   * @param {object} formData a key value pairs object that contains the field name as a key (must match a getter method on this page) and the desired value
   * @returns {Promise<void>}
   */
  async setFormWith(formData) {
    let key;
    for (key in formData) {
      fireEvent.input(this[key], {target: {value: formData[key]}});
      await waitForTrue(() => this[key].value === formData[key].toString());
    }
  }

  /**
   * Simulates a click on the submit button that should trigger a form submission.
   * @returns {Promise<void>}
   */
  async submitForm() {
    await this.user.click(this.submitButton);
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async clickOnBackButton() {
    await this.user.click(this.backButton);
  }
}
