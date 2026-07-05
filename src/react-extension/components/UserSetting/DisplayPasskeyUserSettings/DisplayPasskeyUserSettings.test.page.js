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
import DisplayPasskeyUserSettings from "./DisplayPasskeyUserSettings";

/**
 * The DisplayPasskeyUserSettings component represented as a page.
 */
export default class DisplayPasskeyUserSettingsPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayPasskeyUserSettings {...props} />
      </MockTranslationProvider>,
    );
  }

  get root() {
    return this._page.container.querySelector(".passkey-settings");
  }

  get title() {
    return this._page.container.querySelector("h3");
  }

  get descriptions() {
    return this._page.container.querySelectorAll(".description");
  }

  get rows() {
    return this._page.container.querySelectorAll("table.passkeys tbody tr");
  }

  get nameInput() {
    return this._page.container.querySelector("#passkey-name");
  }

  get enrollButton() {
    return this._page.container.querySelector(".actions-wrapper .button.primary");
  }

  get errorMessage() {
    return this._page.container.querySelector(".error-message");
  }

  get successMessage() {
    return this._page.container.querySelector(".message.success");
  }

  exists() {
    return this.root !== null;
  }

  rowName(index) {
    return this.rows[index].querySelector(".name").textContent;
  }

  rowDate(index) {
    return this.rows[index].querySelector(".date").textContent;
  }

  async clickDelete(index) {
    await this.click(this.rows[index].querySelector("button"));
  }

  async fillName(value) {
    fireEvent.change(this.nameInput, { target: { name: "name", value } });
    await waitFor(() => {});
  }

  async clickEnroll() {
    await this.click(this.enrollButton);
  }

  async click(element) {
    fireEvent.click(element, { button: 0 });
    await waitFor(() => {});
  }
}
