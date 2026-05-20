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
 * @since         5.13.0
 */

import { render } from "@testing-library/react";
import React from "react";
import CellOffline from "./CellOffline";

export default class CellOfflineTestPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(<CellOffline {...props} />);
  }

  /**
   * Rerenders the component with new props
   * @param {object} props New props
   */
  rerender(props) {
    this._page.rerender(<CellOffline {...props} />);
  }

  /**
   * Returns the span element containing the offline label
   * @return {HTMLElement|null}
   */
  get container() {
    return this._page.container.querySelector("span");
  }

  /**
   * Returns the label text content
   * @return {string|null}
   */
  get label() {
    return this.container ? this.container.textContent : null;
  }
}
