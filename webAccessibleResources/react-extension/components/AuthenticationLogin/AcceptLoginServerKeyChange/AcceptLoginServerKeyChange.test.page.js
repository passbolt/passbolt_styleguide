/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AcceptLoginServerKeyChange from "./AcceptLoginServerKeyChange";

/**
 * The AcceptLoginServerKeyChange component represented as a page
 */
export default class AcceptLoginServerKeyChangePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AcceptLoginServerKeyChange {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the check input
   */
  get serverKeyFingerprint() {
    return this._page.container.querySelector('pre')?.textContent;
  }

  /**
   * Returns the input container
   */
  get inputContainer() {
    return this._page.container.querySelector('.input.checkbox');
  }

  /**
   * Returns the check input
   */
  get checkedInput() {
    return this._page.container.querySelector('#accept-new-key');
  }

  /**
   * Returns the accept button element
   */
  get acceptButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Toggle the checked flag value
   */
  async toggleChecked() {
    const leftClick = {button: 0};
    fireEvent.click(this.checkedInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Accept the new key
   * @param inProgressFn The function called while saving
   */
  async accept(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.acceptButton, leftClick);
    await waitFor(inProgressFn);
  }
}
