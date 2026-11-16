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
 * @since         5.19.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import { createMemoryHistory } from "history";
import UnsavedPasswordsPage from "./UnsavedPasswordsPage";

/**
 * The UnsavedPasswordsPage component represented as a page
 */
export default class UnsavedPasswordsPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <UnsavedPasswordsPage {...props} />
        </Router>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the displayed password drafts
   * @returns {NodeListOf<HTMLElement>}
   */
  get passwordDrafts() {
    return this._page.container.querySelectorAll(".list-items .browse-resource-entry");
  }

  /**
   * Returns a password draft by its index if any
   * @param {number} index
   * @returns {HTMLElement|null}
   */
  getPasswordDraft(index) {
    return this.passwordDrafts[index] ?? null;
  }

  /**
   * Returns the back button element
   * @returns {HTMLElement}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link a");
  }

  /**
   * Returns the main message currently displayed
   * @returns {string|null}
   */
  get displayedMainMessage() {
    return this._page.container.querySelector(".empty-entry")?.textContent || null;
  }

  /**
   * Simulates a click on the nth password draft given by the index
   * @returns {Promise<void>}
   */
  async clickOnPasswordDraft(index) {
    fireEvent.click(this.getPasswordDraft(index).querySelector("a"), { button: 0 });
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async clickOnBackButton() {
    fireEvent.click(this.backButton, { button: 0 });
    await waitFor(() => {});
  }
}
