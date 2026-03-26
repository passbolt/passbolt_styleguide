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
 * @since         5.11.0
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DisplayInFormMenuItem from "./DisplayInFormMenuItem";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

export default class DisplayInFormMenuItemTestPage {
  /**
   * Default constructor
   * @param props The props
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayInFormMenuItem {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the menu item element
   */
  get menuItem() {
    return this._page.container.querySelector(".in-form-menu-item");
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector(".in-form-menu-item-content-header strong");
  }

  /**
   * Returns the subtitle element
   */
  get subtitle() {
    return this._page.container.querySelector(".in-form-menu-item-content-subheader");
  }

  /**
   * Returns the description element
   */
  get description() {
    return this._page.container.querySelector(".in-form-menu-item-content-description");
  }

  /**
   * Returns the icon container element
   */
  get iconContainer() {
    return this._page.container.querySelector(".in-form-menu-item-icon");
  }

  /**
   * Returns the timer element
   */
  get timer() {
    return this._page.container.querySelector(".in-form-menu-item-timer");
  }

  /**
   * Simulates a click on the menu item
   */
  click() {
    fireEvent.click(this.menuItem);
  }
}
