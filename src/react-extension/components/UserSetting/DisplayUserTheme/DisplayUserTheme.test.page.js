/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayUserTheme from "./DisplayUserTheme";
import userEvent from "@testing-library/user-event";

/**
 * The DisplayUserThemePage component represented as a page
 */
export default class DisplayUserThemePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserTheme {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the number of displayed themes
   */
  get themesCount() {
    return this._page.container.querySelectorAll(".themes button").length;
  }

  /**
   * Returns the index-th theme
   * @index The resource index
   */
  theme(index) {
    const element = this._page.container.querySelectorAll(".themes button")[index - 1];
    const self = this;
    return {
      get name() {
        return element.querySelector(".theme-desc").textContent;
      },
      async select() {
        await self.user.click(element);
      },
    };
  }
}
