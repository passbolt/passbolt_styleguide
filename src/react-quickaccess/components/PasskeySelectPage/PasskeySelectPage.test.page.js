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
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import PasskeySelectPage from "./PasskeySelectPage";

/**
 * The PasskeySelectPage component represented as a page
 */
export default class PasskeySelectPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <PasskeySelectPage {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the rp id of the title
   */
  get rpId() {
    return this._page.container.querySelector("#rp-id");
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the passkey entries
   */
  get passkeys() {
    return this._page.container.querySelectorAll(".passkeys .passkey");
  }

  /**
   * Returns the name of the passkey at the given index
   * @param {number} index The index of the passkey.
   */
  passkeyName(index) {
    return this.passkeys[index].querySelector(".passkey-name");
  }

  /**
   * Returns the username of the passkey at the given index
   * @param {number} index The index of the passkey.
   */
  passkeyUsername(index) {
    return this.passkeys[index].querySelector(".passkey-username");
  }

  /**
   * Returns the button of the passkey at the given index
   * @param {number} index The index of the passkey.
   */
  passkeyButton(index) {
    return this.passkeys[index].querySelector("button");
  }

  /**
   * Returns true if the site is being signed in with the passkey at the given index
   * @param {number} index The index of the passkey.
   */
  isPasskeyProcessing(index) {
    return this.passkeyButton(index).classList.contains("processing");
  }

  /**
   * Returns the instruction to pick a passkey
   */
  get instruction() {
    return this._page.container.querySelector(".passkey-message.instruction");
  }

  /**
   * Returns the hint telling how to use another authenticator
   */
  get hint() {
    return this._page.container.querySelector(".passkey-message.hint");
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector(".passkey-message.error-message");
  }

  /**
   * Returns the close button the page offers once the request ended
   */
  get closeButton() {
    return this._page.container.querySelector(".submit-wrapper .button.primary.close");
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Click on the passkey at the given index
   * @param {number} index The index of the passkey.
   */
  async clickOnPasskey(index) {
    await this.user.click(this.passkeyButton(index));
  }

  /**
   * Unmount the page, as when the user navigates away from it
   */
  unmount() {
    this._page.unmount();
  }

  /**
   * Click on the cancel button
   */
  async clickOnCancel() {
    await this.user.click(this.cancelButton);
  }
}
