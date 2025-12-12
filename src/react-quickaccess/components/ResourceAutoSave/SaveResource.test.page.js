/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 *
 */
import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from '../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider';
import {fireEvent} from '@testing-library/react';
import SaveResource from "./SaveResource";
import {waitForTrue} from "../../../../test/utils/waitFor";
import userEvent from "@testing-library/user-event";

/**
 * The SaveResource component represented as a page
 */
export default class SaveResourcePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <SaveResource {...props}/>
        </Router>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._page.container.querySelector('#name');
  }

  /**
   * Returns the username input element
   */
  get username() {
    return this._page.container.querySelector('#username');
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._page.container.querySelector('#uri');
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#password');
  }

  /**
   * Returns the name input element
   */
  get nameError() {
    return this._page.container.querySelector('#name + .error-message');
  }

  /**
   * Returns the username input element
   */
  get usernameError() {
    return this._page.container.querySelector('#username + .error-message');
  }

  /**
   * Returns the uri input element
   */
  get uriError() {
    return this._page.container.querySelector('#uri + .error-message');
  }

  /**
   * Returns the password input element
   */
  get passwordError() {
    return this._page.container.querySelector('.input-password-wrapper .error-message');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /** Click on the element */
  async click(element)  {
    await this.user.click(element);
  }

  /** Submit teh form */
  async save()  {
    await this.click(this.saveButton);
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
}
