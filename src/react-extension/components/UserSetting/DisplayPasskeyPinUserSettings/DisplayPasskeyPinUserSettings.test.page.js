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
 * @since         5.14.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayPasskeyPinUserSettings from "./DisplayPasskeyPinUserSettings";

/**
 * The DisplayPasskeyPinUserSettings component represented as a page.
 */
export default class DisplayPasskeyPinUserSettingsPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayPasskeyPinUserSettings {...props} />
      </MockTranslationProvider>,
    );
  }

  get title() {
    return this._page.container.querySelector("h3");
  }

  get pinInput() {
    return this._page.container.querySelector("#passkey-pin");
  }

  get confirmInput() {
    return this._page.container.querySelector("#passkey-pin-confirm");
  }

  get saveButton() {
    return this._page.container.querySelector(".actions-wrapper .button.primary");
  }

  get removeButton() {
    return [...this._page.container.querySelectorAll(".actions-wrapper button")].find(
      (b) => !b.classList.contains("primary"),
    );
  }

  get errorMessage() {
    return this._page.container.querySelector(".error-message");
  }

  get successMessage() {
    return this._page.container.querySelector(".success-message");
  }

  async fill(field, value) {
    const input = field === "pin" ? this.pinInput : this.confirmInput;
    fireEvent.change(input, { target: { name: field === "pin" ? "pin" : "confirmPin", value } });
    await waitFor(() => {});
  }

  async clickSave() {
    fireEvent.click(this.saveButton, { button: 0 });
    await waitFor(() => {});
  }

  async clickRemove() {
    fireEvent.click(this.removeButton, { button: 0 });
    await waitFor(() => {});
  }
}
