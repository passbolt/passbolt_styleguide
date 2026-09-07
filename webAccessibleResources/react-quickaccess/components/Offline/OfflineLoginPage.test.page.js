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
 * @since         6.0.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React, { act } from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import OfflineLoginPage from "./OfflineLoginPage";

/**
 * The OfflineLoginPage component represented as a page
 */
export default class OfflineLoginPageTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <OfflineLoginPage {...props} />
        </Router>
      </MockTranslationProvider>,
    );
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {Element|null}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns the page root element
   * @returns {Element|null}
   */
  get component() {
    return this.select(".quickaccess-offline-login");
  }

  /**
   * Returns the username input element
   * @returns {Element|null}
   */
  get usernameInput() {
    return this.select("#username");
  }

  /**
   * Returns the passphrase input element
   * @returns {Element|null}
   */
  get passphraseInput() {
    return this.select("#passphrase");
  }

  /**
   * Returns the session duration select element
   * @returns {Element|null}
   */
  get sessionDurationSelect() {
    return this.select("#default-session-duration-select");
  }

  /**
   * Returns the selected session duration label
   * @returns {string}
   */
  get selectedSessionDuration() {
    return this.sessionDurationSelect.querySelector(".selected-value .value").textContent;
  }

  /**
   * Returns the session duration options available for selection, the selected one excluded.
   * @returns {string[]}
   */
  get sessionDurationOptions() {
    const options = this.sessionDurationSelect.querySelectorAll(".select-items ul.items li.option");
    return Array.from(options).map((option) => option.textContent);
  }

  /**
   * Returns the submit button element
   * @returns {Element|null}
   */
  get signInButton() {
    return this.select('.submit-wrapper button[type="submit"]');
  }

  /**
   * Returns the error message element
   * @returns {Element|null}
   */
  get errorMessage() {
    return this.select(".input.passphrase .error-message");
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.component !== null;
  }

  /**
   * Fill the passphrase input.
   *
   * The interactions of this page object are simulated with fireEvent and not with userEvent on purpose:
   * userEvent instruments the value setter of the focused element on setup, and this page focuses the
   * passphrase input on mount, which the component then clears by assigning null to its value.
   * @param {string} passphrase The passphrase
   * @returns {Promise<void>}
   */
  async fillPassphrase(passphrase) {
    fireEvent.change(this.passphraseInput, { target: { value: passphrase } });
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the sign in offline button. The click is awaited until the sign in settled,
   * successfully or not.
   * @returns {Promise<void>}
   */
  async signIn() {
    await act(async () => {
      fireEvent.click(this.signInButton, { button: 0 });
    });
  }
}
