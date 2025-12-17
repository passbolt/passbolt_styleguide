/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import Totp from "./Totp";

export default class TotpTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Totp {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the button element
   * @return {HTMLElement}
   */
  get button() {
    return this._page.container.querySelector("button");
  }

  /**
   * Returns the code span element
   * @return {HTMLElement}
   */
  get codeElement() {
    return this._page.container.querySelector(".totp-code");
  }

  /**
   * Return the totp code
   * @retutn {string}
   */
  get code() {
    return this.codeElement.textContent.match(/\d/g).join("");
  }

  /** Click on the element */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
