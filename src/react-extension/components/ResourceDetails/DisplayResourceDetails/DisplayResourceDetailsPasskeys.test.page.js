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
import DisplayResourceDetailsPasskeys from "./DisplayResourceDetailsPasskeys";

/**
 * The DisplayResourceDetailsPasskeys component represented as a page.
 */
export default class DisplayResourceDetailsPasskeysPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsPasskeys {...props} />
      </MockTranslationProvider>,
    );
  }

  get root() {
    return this._page.container.querySelector(".detailed-passkeys");
  }

  get titleButton() {
    return this._page.container.querySelector(".accordion-header button");
  }

  get rows() {
    return this._page.container.querySelectorAll(".passkey-row");
  }

  rowName(index) {
    return this.rows[index].querySelector(".passkey-name").textContent;
  }

  async clickTitle() {
    fireEvent.click(this.titleButton, { button: 0 });
    await waitFor(() => {});
  }
}
