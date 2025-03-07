
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
 * @since         5.0.0
 */
import React from "react";
import {render} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayEmptyDetails from "./DisplayEmptyDetails";

/**
 * The DisplayEmptyDetails component represented as a page
 */
export default class DisplayEmptyDetailsPage {
  /**
   * @constructor
   */
  constructor() {
    this._page = render(
      <MockTranslationProvider>
        <DisplayEmptyDetails/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the resource sidebar
   * @returns {boolean}
   */
  exists() {
    return Boolean(this._page.container.querySelector('.sidebar.empty'));
  }

  /**
   * Returns the text content of the component.
   * @returns {string|null}
   */
  get content() {
    return this._page.container.querySelector('p')?.textContent || null;
  }
}





