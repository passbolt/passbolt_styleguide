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
import DisplayPasskeyAdministration from "./DisplayPasskeyAdministration";

/**
 * The DisplayPasskeyAdministration component represented as a page.
 */
export default class DisplayPasskeyAdministrationPage {
  constructor(props) {
    // The help section is portalled into #administration-help-panel; provide it so the safe portal
    // has a mount target.
    if (!document.getElementById("administration-help-panel")) {
      const panel = document.createElement("div");
      panel.id = "administration-help-panel";
      document.body.appendChild(panel);
    }
    this._page = render(
      <MockTranslationProvider>
        <DisplayPasskeyAdministration {...props} />
      </MockTranslationProvider>,
    );
  }

  get title() {
    return this._page.container.querySelector("h3.title");
  }

  get toggle() {
    return this._page.container.querySelector("#passkey-org-enabled");
  }

  get saveButton() {
    return this._page.container.querySelector("#save-settings");
  }

  get successMessage() {
    return this._page.container.querySelector(".message.success");
  }

  get errorMessage() {
    return this._page.container.querySelector(".error-message");
  }

  async toggleEnabled() {
    fireEvent.click(this.toggle, { button: 0 });
    await waitFor(() => {});
  }

  async clickSave() {
    fireEvent.click(this.saveButton, { button: 0 });
    await waitFor(() => {});
  }
}
