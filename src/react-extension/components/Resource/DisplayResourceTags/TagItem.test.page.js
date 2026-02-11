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
import TagItem from "./TagItem";

/**
 * The TagItem component represented as a page
 */
export default class TagItemTestPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(<TagItem {...props} />);
  }

  /**
   * Returns the tag button element
   * @returns {HTMLElement}
   */
  get tagButton() {
    return this._page.container.querySelector("button.tag");
  }

  /**
   * Returns the tag content text
   * @returns {string}
   */
  get tagContent() {
    const content = this._page.container.querySelector(".tag-content");
    return content ? content.textContent : null;
  }

  /**
   * Returns the button title attribute
   * @returns {string}
   */
  get title() {
    return this.tagButton ? this.tagButton.getAttribute("title") : null;
  }

  /**
   * Simulates clicking the tag
   * @returns {Event}
   */
  click() {
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    jest.spyOn(event, "stopPropagation");
    fireEvent(this.tagButton, event);
    return event;
  }
}
