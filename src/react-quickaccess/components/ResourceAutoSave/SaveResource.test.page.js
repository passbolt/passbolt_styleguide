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
import {render, waitFor} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from '../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider';
import {fireEvent} from '@testing-library/react';
import SaveResource from "./SaveResource";

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
      </MockTranslationProvider>
    );
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
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Submit teh form */
  async save()  {
    await this.click(this.saveButton);
  }
}
