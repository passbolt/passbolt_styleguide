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
 * @since         5.18.0
 */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import PasskeyVerificationPreferencePage from "./PasskeyVerificationPreferencePage";

/**
 * The PasskeyVerificationPreferencePage component represented as a page
 */
export default class PasskeyVerificationPreferencePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <PasskeyVerificationPreferencePage {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the page title
   */
  get title() {
    return this._page.container.querySelector(".primary-action-title");
  }

  /**
   * Returns the rp id the page names
   */
  get rpId() {
    return this._page.container.querySelector("#rp-id");
  }

  /**
   * Returns the strict option radio
   */
  get strictOption() {
    return this._page.container.querySelector("#passkey-verification-strict");
  }

  /**
   * Returns the non strict option radio
   */
  get nonStrictOption() {
    return this._page.container.querySelector("#passkey-verification-non_strict");
  }

  /**
   * Returns the submit button
   */
  get submitButton() {
    return this._page.container.querySelector("button[type='submit']");
  }

  /**
   * Select the non strict option
   * @returns {Promise<void>}
   */
  async selectNonStrict() {
    await this.user.click(this.nonStrictOption);
  }

  /**
   * Submit the form
   * @returns {Promise<void>}
   */
  async submit() {
    await this.user.click(this.submitButton);
  }

  /**
   * Close the page with the close button
   * @returns {Promise<void>}
   */
  async close() {
    await this.user.click(this._page.container.querySelector("a.secondary-action"));
  }

  /**
   * Close the page with the escape key
   * @returns {Promise<void>}
   */
  pressEscape() {
    // The page reads keyCode, which userEvent does not set.
    fireEvent.keyDown(this._page.container.querySelector(".passkey-verification-preference"), { keyCode: 27 });
  }
}
