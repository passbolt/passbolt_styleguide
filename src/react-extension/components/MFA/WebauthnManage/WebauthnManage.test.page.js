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
import WebauthnManage from "./WebauthnManage";

/**
 * The WebauthnManage component represented as a page.
 */
export default class WebauthnManagePage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <WebauthnManage {...props} />
      </MockTranslationProvider>,
    );
  }

  get root() {
    return this._page.container.querySelector(".webauthn-manage");
  }

  get title() {
    return this._page.container.querySelector("h3");
  }

  get rows() {
    return this._page.container.querySelectorAll("table.webauthn-credentials tbody tr");
  }

  get description() {
    return this._page.container.querySelector(".description");
  }

  get backButton() {
    return this._page.container.querySelector(".actions-wrapper .button.secondary");
  }

  get registerButton() {
    return this._page.container.querySelector(".actions-wrapper .button.primary");
  }

  exists() {
    return this.root !== null;
  }

  rowName(index) {
    return this.rows[index].querySelector(".name").textContent;
  }

  async clickRemove(index) {
    await this.click(this.rows[index].querySelector("button"));
  }

  async clickBack() {
    await this.click(this.backButton);
  }

  async clickRegister() {
    await this.click(this.registerButton);
  }

  async click(element) {
    fireEvent.click(element, { button: 0 });
    await waitFor(() => {});
  }
}
