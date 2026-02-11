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
 * @since         5.10.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import DisplayResourceTagsBadge from "./DisplayResourceTagsBadge";

/**
 * The DisplayResourceTagsBadge component represented as a page
 */
export default class DisplayResourceTagsBadgePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(<DisplayResourceTagsBadge {...props} />, { legacyRoot: true });
  }

  /**
   * Returns the badge element
   */
  get badge() {
    return this._page.container.querySelector(".badge");
  }

  /**
   * Returns the count element
   */
  get count() {
    return this._page.container.querySelector(".count");
  }

  /**
   * Returns the tooltip trigger element
   */
  get tooltip() {
    return this._page.container.querySelector(".tooltip-portal span");
  }

  /**
   * Returns the tags list element in the tooltip
   */
  get tagsList() {
    return document.body.querySelector(".tags-list");
  }

  /**
   * Returns all tag items in the tooltip
   */
  get tagItems() {
    return document.body.querySelectorAll(".tag-list-item");
  }

  /**
   * Returns true if the badge exists
   */
  get exists() {
    return this.badge !== null;
  }

  /**
   * Hover on an element to trigger tooltip
   * @param {Element} element
   */
  async hover(element) {
    fireEvent.mouseEnter(element);
    await waitFor(() => {});
  }

  /**
   * Click a tag in the tooltip by index
   * @param {number} index Tag index
   */
  clickTag(index) {
    const tagItems = this.tagItems;
    if (tagItems[index]) {
      const button = tagItems[index].querySelector("button.tag");
      fireEvent.click(button);
    }
  }
}
