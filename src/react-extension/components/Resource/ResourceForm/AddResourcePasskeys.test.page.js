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
import AddResourcePasskeys from "./AddResourcePasskeys";

/**
 * The AddResourcePasskeys component represented as a page.
 */
export default class AddResourcePasskeysPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AddResourcePasskeys {...props} />
      </MockTranslationProvider>,
    );
  }

  get title() {
    return this._page.container.querySelector(".title h2");
  }

  get fields() {
    return this._page.container.querySelectorAll(".passkeys-fields .input.text");
  }

  get emptyDescription() {
    return this._page.container.querySelector(".passkeys-fields .description");
  }

  fieldLabel(index) {
    return this.fields[index].querySelector("label").textContent;
  }

  async clickDelete(index) {
    fireEvent.click(this.fields[index].querySelector("button.button-icon"), { button: 0 });
    await waitFor(() => {});
  }
}
