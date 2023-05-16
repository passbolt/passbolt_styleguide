/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import {render} from "@testing-library/react";
import React from "react";
import AskInFormMenuDisplay from "./AskInFormMenuDisplay";
import AppContext from "../../contexts/AppContext";

/**
 * The AskInFormMenuDisplayTest component represented as a page
 */
export default class AskInFormMenuDisplayTestPage {
  /**
   * Default constructor
   * @param appContext An app context
   */
  constructor(appContext) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <AskInFormMenuDisplay/>
      </AppContext.Provider>
    );
  }

  /**
   * Returns true if the in-form icon is in an active mode
   */
  get isActive() {
    return this._page.container.querySelector('.in-form-icon-logo--inactive') === null;
  }
}
