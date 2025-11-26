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
 * @since         4.10.0
 */

import {render} from "@testing-library/react";
import React from "react";
import AppContext from "../../../shared/context/AppContext/AppContext";
import DisplayInFormMenu from "./DisplayInFormMenu";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayInFormMenuTestPage component represented as a page
 */
export default class DisplayInFormMenuTestPage {
  /**
   * Default constructor
   * @param props The props
   */
  constructor(props) {
    this._page = render(
      <AppContext.Provider value={props.context}>
        <MockTranslationProvider>
          <DisplayInFormMenu {...props}/>
        </MockTranslationProvider>
      </AppContext.Provider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns inform menu items component
   */
  get informMenuItems() {
    return this._page.container.querySelectorAll('.in-form-menu a');
  }
}
