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
 * @since         5.18.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ResourceViewPagePinCode from "./ResourceViewPagePinCode";

/**
 * The ResourceViewPagePinCode component represented as a page
 */
export default class ResourceViewPagePinCodePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(this.renderSection(props));
  }

  /**
   * Render the section in its list.
   * @param {object} props The section props
   * @returns {JSX}
   */
  renderSection(props) {
    return (
      <MockTranslationProvider>
        <ul className="properties">
          <ResourceViewPagePinCode {...props} />
        </ul>
      </MockTranslationProvider>
    );
  }

  /**
   * Render the section again with other props.
   * @param {object} props The section props
   */
  rerender(props) {
    this._page.rerender(this.renderSection(props));
  }

  /**
   * The row label.
   * @returns {Element}
   */
  get label() {
    return this._page.container.querySelector(".property-name");
  }

  /**
   * The PIN code secret element.
   * @returns {Element}
   */
  get secret() {
    return this._page.container.querySelector(".secret.secret-pin-code");
  }

  /**
   * The value button.
   * @returns {Element}
   */
  get valueButton() {
    return this._page.container.querySelector(".secret.secret-pin-code button");
  }

  /**
   * The value text, when masked.
   * @returns {string}
   */
  get valueText() {
    return this._page.container.querySelector(".secret.secret-pin-code button span")?.textContent;
  }

  /**
   * The revealed PIN code typography text.
   * @returns {string}
   */
  get revealedPinCodeText() {
    return this._page.container.querySelector(".secret.secret-pin-code .password-typography")?.textContent;
  }

  /**
   * The preview button.
   * @returns {Element}
   */
  get previewButton() {
    return this._page.container.querySelector(".password-view");
  }

  /**
   * The copy action.
   * @returns {Element}
   */
  get copyButton() {
    return this._page.container.querySelector(".copy-pin-code");
  }

  /**
   * The state displayed by the preview button, read from its visible icon.
   * @returns {string} "idle", "revealed" or "decrypting"
   */
  get previewIconState() {
    return this.iconState(this.previewButton, ["idle", "revealed", "decrypting"]);
  }

  /**
   * The state displayed by the copy action, read from its visible icon.
   * @returns {string} "default", "processing" or "done"
   */
  get copyIconState() {
    return this.iconState(this.copyButton, ["default", "processing", "done"]);
  }

  /**
   * Is the clipboard flush timer displayed next to the copy action.
   * @returns {boolean}
   */
  get hasTimer() {
    return this.copyButton.nextElementSibling !== null;
  }

  /**
   * The state of an action, given by the index of its visible icon.
   * @param {Element} action The action element
   * @param {Array<string>} states The states, in the order of the icons
   * @returns {string}
   */
  iconState(action, states) {
    const icons = Array.from(action.querySelectorAll("span.transition"));
    return states[icons.findIndex((icon) => !icon.classList.contains("visually-hidden"))];
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
