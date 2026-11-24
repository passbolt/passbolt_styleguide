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
 * @since         5.19.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ResourceViewPageUsername from "./ResourceViewPageUsername";

/**
 * The ResourceViewPageUsername component represented as a page
 */
export default class ResourceViewPageUsernamePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(this.renderSection(props));
  }

  /**
   * Render the row in its list.
   * @param {object} props The row props
   * @returns {JSX}
   */
  renderSection(props) {
    return (
      <MockTranslationProvider>
        <ul className="properties">
          <ResourceViewPageUsername {...props} />
        </ul>
      </MockTranslationProvider>
    );
  }

  /**
   * Render the row again with other props.
   * @param {object} props The row props
   */
  rerender(props) {
    this._page.rerender(this.renderSection(props));
  }

  /**
   * The rows.
   * @returns {NodeListOf<Element>}
   */
  get rows() {
    return this._page.container.querySelectorAll("li.property");
  }

  /**
   * The row label.
   * @returns {Element}
   */
  get label() {
    return this._page.container.querySelector(".property .property-name");
  }

  /**
   * The username link.
   * @returns {Element}
   */
  get link() {
    return this._page.container.querySelector(".property a.property-value");
  }

  /**
   * The empty username text.
   * @returns {Element}
   */
  get empty() {
    return this._page.container.querySelector(".property .property-value.empty");
  }

  /**
   * The copy action.
   * @returns {Element}
   */
  get copyButton() {
    return this._page.container.querySelector(".property .property-action");
  }

  /**
   * The state displayed by the copy action, read from its visible icon.
   * @returns {string} "default", "processing" or "done"
   */
  get copyIconState() {
    const icons = Array.from(this.copyButton.querySelectorAll("span.transition"));
    return ["default", "processing", "done"][icons.findIndex((icon) => !icon.classList.contains("visually-hidden"))];
  }

  /**
   * Is the clipboard flush timer displayed next to the copy action.
   * @returns {boolean}
   */
  get hasTimer() {
    return this.copyButton.nextElementSibling !== null;
  }

  /**
   * Click on the given element.
   * @param {Element} element The element to click on.
   * @returns {Promise<void>}
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
