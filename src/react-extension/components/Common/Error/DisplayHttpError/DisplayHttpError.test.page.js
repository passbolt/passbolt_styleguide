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
 * @since         4.5.3
 */

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayHttpError from "./DisplayHttpError";

/**
 * The DisplayHttpError component represented as a page
 */
export default class DisplayHttpErrorPage {
  /**
   * Default constructor
   * @param {number} errorCode the HTTP error code the page should render
   * @param props Props to attach
   */
  constructor(errorCode) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayHttpError errorCode={errorCode} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the page error code
   * @returns {string}
   */
  get errorCode() {
    return this._page.container.querySelector("h3").textContent;
  }

  /**
   * Returns the page error code title
   * @returns {string}
   */
  get title() {
    return this._page.container.querySelector("h4").textContent;
  }

  /**
   * Returns the page error code description
   * @returns {string}
   */
  get description() {
    return this._page.container.querySelector("p").textContent;
  }
}
