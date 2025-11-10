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
 * @since         5.7.0
 */

import React from "react";
import {render} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplaySecretHistoryAdministrationHelp from "./DisplaySecretHistoryAdministrationHelp";

export default class DisplaySecretHistoryAdministrationPage {
  /**
   * Default constructor
   */
  constructor() {
    this._page = render(
      <MockTranslationProvider>
        <DisplaySecretHistoryAdministrationHelp/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the page title element
   * @returns {HTMLElement}
   */
  get title() {
    return this._page.container.querySelector(".sidebar-help-section h3");
  }

  /**
   * Returns the read documentation button
   * @returns {HTMLElement}
   */
  get readDocumentation() {
    return this._page.container.querySelector('a.button');
  }
}
