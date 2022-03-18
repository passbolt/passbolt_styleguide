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
import DisplayUnexpectedError from "./DisplayUnexpectedError";

/**
 * The DisplayUnexpectedError component represented as a page
 */
export default class DisplayUnexpectedErrorTestPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props = {}) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUnexpectedError {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.setup-error h1').textContent;
  }

  /**
   * Returns the try again element
   */
  get tryAgainButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the more details cta element
   */
  get moreDetailsCta() {
    return this._page.container.querySelector('.error-details a');
  }

  /**
   * Returns the more details element
   */
  get errorDetails() {
    return this._page.container.querySelector('.error-details textarea');
  }

  /**
   * Request new account
   */
  async tryAgain() {
    const leftClick = {button: 0};
    fireEvent.click(this.tryAgainButton, leftClick);
  }

  /**
   * Show error details
   */
  async showErrorDetails() {
    const leftClick = {button: 0};
    fireEvent.click(this.moreDetailsCta, leftClick);
  }
}
