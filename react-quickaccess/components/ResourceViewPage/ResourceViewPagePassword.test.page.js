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
import ResourceViewPagePassword from "./ResourceViewPagePassword";

/**
 * The ResourceViewPagePassword component represented as a page
 */
export default class ResourceViewPagePasswordPage {
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
          <ResourceViewPagePassword {...props} />
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
   * The rows.
   * @returns {NodeListOf<Element>}
   */
  get rows() {
    return this._page.container.querySelectorAll("li.property");
  }

  /**
   * The username row label.
   * @returns {Element}
   */
  get usernameLabel() {
    return this._page.container.querySelector(".property:first-child .property-name");
  }

  /**
   * The username link.
   * @returns {Element}
   */
  get usernameLink() {
    return this._page.container.querySelector(".property:first-child a.property-value");
  }

  /**
   * The empty username text.
   * @returns {Element}
   */
  get usernameEmpty() {
    return this._page.container.querySelector(".property:first-child .property-value.empty");
  }

  /**
   * The username copy action.
   * @returns {Element}
   */
  get usernameCopyButton() {
    return this._page.container.querySelector(".property:first-child .property-action");
  }

  /**
   * The password row label.
   * @returns {Element}
   */
  get passwordLabel() {
    return this._page.container.querySelector(".property:last-child .property-name");
  }

  /**
   * The password secret element.
   * @returns {Element}
   */
  get secret() {
    return this._page.container.querySelector(".secret.secret-password");
  }

  /**
   * The password value button.
   * @returns {Element}
   */
  get valueButton() {
    return this._page.container.querySelector(".secret.secret-password button");
  }

  /**
   * The password value text, when masked.
   * @returns {string}
   */
  get valueText() {
    return this._page.container.querySelector(".secret.secret-password button span")?.textContent;
  }

  /**
   * The revealed password typography text.
   * @returns {string}
   */
  get revealedPasswordText() {
    return this._page.container.querySelector(".secret.secret-password .password-typography")?.textContent;
  }

  /**
   * The preview button.
   * @returns {Element}
   */
  get previewButton() {
    return this._page.container.querySelector(".password-view");
  }

  /**
   * The password copy action.
   * @returns {Element}
   */
  get copyButton() {
    return this._page.container.querySelector(".copy-password");
  }

  /**
   * The state displayed by the preview button, read from its visible icon.
   * @returns {string} "idle", "revealed" or "decrypting"
   */
  get previewIconState() {
    return this.iconState(this.previewButton, ["idle", "revealed", "decrypting"]);
  }

  /**
   * The state displayed by the password copy action, read from its visible icon.
   * @returns {string} "default", "processing" or "done"
   */
  get copyIconState() {
    return this.iconState(this.copyButton, ["default", "processing", "done"]);
  }

  /**
   * The state displayed by the username copy action, read from its visible icon.
   * @returns {string} "default", "processing" or "done"
   */
  get usernameCopyIconState() {
    return this.iconState(this.usernameCopyButton, ["default", "processing", "done"]);
  }

  /**
   * Is the clipboard flush timer displayed next to the given copy action.
   * @param {Element} copyAction The copy action element
   * @returns {boolean}
   */
  hasTimer(copyAction) {
    return copyAction.nextElementSibling !== null;
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
