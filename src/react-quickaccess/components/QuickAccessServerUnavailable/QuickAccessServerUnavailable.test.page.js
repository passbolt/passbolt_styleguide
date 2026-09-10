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
 * @since        5.13.0
 */

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import QuickAccessServerUnavailable from "./QuickAccessServerUnavailable";

/**
 * The QuickAccessServerUnavailable component represented as a page
 */
export default class QuickAccessServerUnavailablePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <QuickAccessServerUnavailable {...props} />
        </Router>
      </MockTranslationProvider>,
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the page root element
   * @returns {Element|null}
   */
  get component() {
    return this._page.container.querySelector(".quickaccess-server-unavailable");
  }

  /**
   * Returns the message element
   * @returns {Element|null}
   */
  get message() {
    return this._page.container.querySelector(".quickaccess-server-unavailable .form-container p");
  }

  /**
   * Returns the primary action button element. It is the sign out locally button when the user cannot
   * use the offline mode, the use offline mode button otherwise.
   * @returns {Element|null}
   */
  get primaryButton() {
    return this._page.container.querySelector('.quickaccess-server-unavailable .submit-wrapper button[type="button"]');
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.component !== null;
  }

  /**
   * Simulates a click on the primary action button
   * @returns {Promise<void>}
   */
  async clickPrimaryButton() {
    await this.user.click(this.primaryButton);
  }
}
