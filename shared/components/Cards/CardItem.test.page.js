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
import CardItem from "./CardItem";
import { fireEvent, render } from "@testing-library/react";

/**
 * The ResourceWorkspaceContextPage component represented as a page
 */
export default class ResourceWorkspaceContextPage {
  /**
   * @constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(<CardItem {...props} />, { legacyRoot: true });
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get button() {
    return this._page.container.querySelector("button");
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get icon() {
    return this._page.container.querySelector("button #icon");
  }

  /**
   * Return the pro teasing icon element
   * @returns {{select: select}}
   */
  get proTeasingIcon() {
    return this._page.queryByTestId("frame-svg");
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get title() {
    return this._page.container.querySelector("button .title");
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get description() {
    return this._page.container.querySelector("button .info") || null;
  }

  /**
   * Simulates a click on the button.
   */
  click() {
    fireEvent.click(this.button, { button: 0 });
  }
}
