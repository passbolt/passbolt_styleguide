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
import PasskeyCreatePage from "./PasskeyCreatePage";

/**
 * The PasskeyCreatePage component represented as a page
 */
export default class PasskeyCreatePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <PasskeyCreatePage {...props} />
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
   * Returns the name the passkey is saved with
   */
  get name() {
    return this._page.container.querySelector("#name");
  }

  /**
   * Returns the user name
   */
  get userName() {
    return this._page.container.querySelector("#user-name");
  }

  /**
   * Returns the user display name
   */
  get userDisplayName() {
    return this._page.container.querySelector("#user-display-name");
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the hint telling how to use another authenticator
   */
  get hint() {
    return this._page.container.querySelector(".passkey-create-message.hint");
  }

  /**
   * Returns the message telling the passkey is already saved
   */
  get alreadySavedMessage() {
    return this._page.container.querySelector(".passkey-create-message.already-saved");
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector(".passkey-create-message.error-message");
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector(".submit-wrapper .button.primary.save");
  }

  /**
   * Returns the close button the page offers once the request ended
   */
  get closeButton() {
    return this._page.container.querySelector(".submit-wrapper .button.primary.close");
  }

  /**
   * Returns the use another authenticator button
   */
  get useAnotherAuthenticatorButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Click on the save button
   */
  async clickOnSave() {
    await this.user.click(this.saveButton);
  }

  /**
   * Click on the use another authenticator button
   */
  async clickOnUseAnotherAuthenticator() {
    await this.user.click(this.useAnotherAuthenticatorButton);
  }
}
