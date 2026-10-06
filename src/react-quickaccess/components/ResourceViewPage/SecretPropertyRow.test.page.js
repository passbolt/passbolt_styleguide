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
 * @since         5.17.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import SecretPropertyRow from "./SecretPropertyRow";

/**
 * The SecretPropertyRow component represented as a page
 */
export default class SecretPropertyRowPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(this.renderRow(props));
  }

  /**
   * Render the row in its list.
   * @param {object} props The row props
   * @returns {JSX}
   */
  renderRow(props) {
    return (
      <MockTranslationProvider>
        <ul className="properties">
          <SecretPropertyRow {...props} />
        </ul>
      </MockTranslationProvider>
    );
  }

  /**
   * Render the row again with other props.
   * @param {object} props The row props
   */
  rerender(props) {
    this._page.rerender(this.renderRow(props));
  }

  /**
   * The row element.
   * @returns {Element}
   */
  get row() {
    return this._page.container.querySelector("li.property");
  }

  /**
   * The property name element.
   * @returns {Element}
   */
  get label() {
    return this._page.container.querySelector(".property-name");
  }

  /**
   * The secret value element.
   * @returns {Element}
   */
  get secret() {
    return this._page.container.querySelector(".property-value.secret");
  }

  /**
   * The value button, when the value is masked or a hidden password.
   * @returns {Element}
   */
  get valueButton() {
    return this._page.container.querySelector(".property-value.secret button");
  }

  /**
   * The value text, when the value is masked or a hidden password.
   * @returns {string}
   */
  get valueText() {
    return this._page.container.querySelector(".property-value.secret button span")?.textContent;
  }

  /**
   * The revealed password typography text.
   * @returns {string}
   */
  get revealedPasswordText() {
    return this._page.container.querySelector(".property-value.secret .password-typography")?.textContent;
  }

  /**
   * The encrypted note placeholder.
   * @returns {Element}
   */
  get encryptedNote() {
    return this._page.container.querySelector(".encrypted-description");
  }

  /**
   * The revealed note block.
   * @returns {Element}
   */
  get notePreviewed() {
    return this._page.container.querySelector(".note-previewed");
  }

  /**
   * The revealed TOTP code element.
   * @returns {Element}
   */
  get totpCode() {
    return this._page.container.querySelector(".totp-code");
  }

  /**
   * The preview button.
   * @returns {Element}
   */
  get previewButton() {
    return this._page.container.querySelector(".password-view, .totp-view");
  }

  /**
   * The copy action.
   * @returns {Element}
   */
  get copyButton() {
    return this._page.container.querySelector(".property-action");
  }

  /**
   * The state displayed by the preview button, read from its visible icon.
   * @returns {string} "idle" or "decrypting"
   */
  get previewIconState() {
    return this.iconState(this.previewButton, ["idle", "decrypting"]);
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
