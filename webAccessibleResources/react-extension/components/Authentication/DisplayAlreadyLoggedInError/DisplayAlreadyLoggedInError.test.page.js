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

import {fireEvent, render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAlreadyLoggedInError from "./DisplayAlreadyLoggedInError";

/**
 * The DisplayAlreadyLoggedInError component represented as a page
 */
export default class DisplayAlreadyLoggedInErrorPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props = {}) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayAlreadyLoggedInError {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title text
   */
  get title() {
    return this._page.container.querySelector('.setup-error h1').textContent;
  }

  /**
   * Returns the description text
   */
  get description() {
    return this._page.container.querySelector('.setup-error p').textContent;
  }

  /**
   * Returns the log out HTML element.
   */
  get logoutButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Clicks on the log out button in the page.
   */
  async logout() {
    const leftClick = {button: 0};
    fireEvent.click(this.logoutButton, leftClick);
  }
}
