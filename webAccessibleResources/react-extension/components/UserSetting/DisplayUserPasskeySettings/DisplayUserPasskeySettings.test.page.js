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
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserPasskeySettings from "./DisplayUserPasskeySettings";

/**
 * The DisplayUserPasskeySettings component represented as a page
 */
export default class DisplayUserPasskeySettingsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserPasskeySettings {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
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
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector(".actions-wrapper button");
  }

  /**
   * Wait until the saved preference is loaded
   * @returns {Promise<void>}
   */
  async waitForLoaded() {
    await waitFor(() => {
      if (this.saveButton.disabled) {
        throw new Error("The preference is still loading.");
      }
    });
  }

  /**
   * Select the non strict option
   * @returns {Promise<void>}
   */
  async selectNonStrict() {
    await this.user.click(this.nonStrictOption);
  }

  /**
   * Save
   * @returns {Promise<void>}
   */
  async save() {
    await this.user.click(this.saveButton);
  }
}
