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

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import CellTag from "./CellTag";

export default class CellTagTestPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(<CellTag {...props} />);
  }

  /**
   * Rerenders the component with new props
   * @param {object} props New props
   */
  rerender(props) {
    this._page.rerender(<CellTag {...props} />);
  }

  /**
   * Returns the container element
   * @return {HTMLElement}
   */
  get container() {
    return this._page.container.querySelector(".tags-list.cell-tag");
  }

  /**
   * Returns all visible tag elements
   * @return {NodeListOf<HTMLElement>}
   */
  get visibleTagElements() {
    return this._page.container.querySelectorAll(".tag-list-item[style*='visibility: visible']");
  }

  /**
   * Returns all tag-list-item elements (visible or hidden)
   * @return {NodeListOf<HTMLElement>}
   */
  get allTagElements() {
    return this._page.container.querySelectorAll(".tag-list-item");
  }

  /**
   * Returns the badge element if present
   * @return {HTMLElement|null}
   */
  get badge() {
    return this._page.container.querySelector(".badge");
  }

  /**
   * Returns the badge count text
   * @return {string|null}
   */
  get badgeCount() {
    const countElement = this._page.container.querySelector(".badge .count");
    return countElement ? countElement.textContent : null;
  }

  /**
   * Returns the tag slugs from visible tags
   * @return {string[]}
   */
  get visibleTagSlugs() {
    const tags = this.visibleTagElements;
    return Array.from(tags).map((tag) => tag.querySelector(".tag-content").textContent);
  }

  /**
   * Returns all tag slugs (including hidden ones)
   * @return {string[]}
   */
  get allTagSlugs() {
    const tags = this.allTagElements;
    return Array.from(tags).map((tag) => tag.querySelector(".tag-content").textContent);
  }

  /**
   * Check if a tag has ellipsis class
   * @param {number} index Tag index
   * @return {boolean}
   */
  hasEllipsisClass(index) {
    const tags = this.allTagElements;
    return tags[index]?.classList.contains("ellipsis-tag") || false;
  }

  /**
   * Returns whether the component has any tags rendered
   * @return {boolean}
   */
  get hasTags() {
    return this.allTagElements.length > 0;
  }

  /**
   * Returns whether the badge is visible
   * @return {boolean}
   */
  get hasBadge() {
    return this.badge !== null;
  }

  /**
   * Click a tag by index
   * @param {number} index Tag index
   */
  clickTag(index) {
    const tags = this.allTagElements;
    if (tags[index]) {
      const button = tags[index].querySelector("button.tag");
      fireEvent.click(button);
    }
  }
}
