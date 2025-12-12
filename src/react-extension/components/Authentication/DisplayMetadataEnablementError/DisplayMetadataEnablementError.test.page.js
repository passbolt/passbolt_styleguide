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
 * @since         5.4.0
 */

import {fireEvent, render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayMetadataEnablementError from "./DisplayMetadataEnablementError";

/**
 * The DisplayMetadataEnablementError component represented as a page
 */
export default class DisplayMetadataEnablementErrorPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props = {}) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayMetadataEnablementError {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.setup-error h1').textContent;
  }

  /**
   * Returns the main button
   */
  get redirectButton() {
    return this._page.container.querySelector(".form-actions button");
  }

  /**
   * Returns the more details cta element
   */
  get moreDetailsCta() {
    return this._page.container.querySelector('.error-details button');
  }

  /**
   * Returns the more details element
   */
  get errorDetails() {
    return this._page.container.querySelector('.error-details textarea');
  }

  /**
   * Show error details
   */
  async clickOn(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }
}
