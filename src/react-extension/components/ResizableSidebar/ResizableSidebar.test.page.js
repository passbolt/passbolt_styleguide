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
 * @since         5.6.0
 */

import {render} from "@testing-library/react";
import React from "react";
import ResizableSidebar from "./ResizableSidebar";
import {ResizableSidebarContextProvider} from "../../contexts/ResizeSidebar/ResizeSidebarContext";

export default class ResizableSidebarPage {
  constructor(props) {
    const Wrapper = () => (
      <ResizableSidebarContextProvider>
        <ResizableSidebar {...props} />
      </ResizableSidebarContextProvider>
    );

    this._page = render(<Wrapper />);

    const container = this._page.container.querySelector('.resizable-sidebar-container');
    const sidebar = this._page.container.querySelector('.resizable-sidebar');
    Object.defineProperty(container, 'offsetWidth', {
      configurable: true,
      value: 1000
    });

    Object.defineProperty(sidebar, 'offsetWidth', {
      configurable: true,
      value: 200, // 20% of 1000 — matches initial minWidth: '20%'
    });
  }

  get gutter() {
    return this._page.container.querySelector('.gutter');
  }

  get container() {
    return this._page.container.querySelector('.resizable-sidebar');
  }

  getWidthOf(element) {
    if (!element) { return 0; }
    const style = getComputedStyle(element);
    return parseFloat(style.width || "0");
  }
}

