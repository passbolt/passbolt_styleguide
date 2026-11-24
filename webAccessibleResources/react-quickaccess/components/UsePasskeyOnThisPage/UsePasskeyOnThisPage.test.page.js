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
import UsePasskeyOnThisPage from "./UsePasskeyOnThisPage";

/**
 * The UsePasskeyOnThisPage component represented as a page
 */
export default class UsePasskeyOnThisPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <UsePasskeyOnThisPage {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the "Use on this page" button
   */
  get useButton() {
    return this._page.container.querySelector("#popupAction");
  }

  /**
   * Returns whether the "Use on this page" button is disabled
   */
  get isUseButtonDisabled() {
    return this.useButton.classList.contains("disabled");
  }

  /**
   * Returns the hint telling why the button is disabled
   */
  get hint() {
    return this._page.container.querySelector(".use-passkey-hint");
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector(".error-message");
  }

  /**
   * Click on the "Use on this page" button
   */
  async clickUseButton() {
    await this.user.click(this.useButton);
  }
}
