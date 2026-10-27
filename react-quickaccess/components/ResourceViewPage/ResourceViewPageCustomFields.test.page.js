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
import ResourceViewPageCustomFields from "./ResourceViewPageCustomFields";

/**
 * The ResourceViewPageCustomFields component represented as a page
 */
export default class ResourceViewPageCustomFieldsPage {
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
          <ResourceViewPageCustomFields {...props} />
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
   * The section title.
   * @returns {Element}
   */
  get title() {
    return this._page.container.querySelector(".custom-fields > .property-name");
  }

  /**
   * The custom field rows.
   * @returns {Array<Element>}
   */
  get rows() {
    return Array.from(this._page.container.querySelectorAll("li.custom-field"));
  }

  /**
   * The labels of the rows.
   * @returns {Array<string>}
   */
  get labels() {
    return this.rows.map((row) => row.querySelector(".property-name").textContent);
  }

  /**
   * The empty custom fields message.
   * @returns {Element}
   */
  get emptyCustomFields() {
    return this._page.container.querySelector(".property-value.empty");
  }

  /**
   * The label element of the row at the given index.
   * @param {number} index The row index
   * @returns {Element}
   */
  label(index) {
    return this.rows[index].querySelector(".property-name");
  }

  /**
   * The secret element of the row at the given index.
   * @param {number} index The row index
   * @returns {Element}
   */
  secret(index) {
    return this.rows[index].querySelector(".secret.secret-custom-fields");
  }

  /**
   * The value button of the row at the given index.
   * @param {number} index The row index
   * @returns {Element}
   */
  valueButton(index) {
    return this.rows[index].querySelector(".secret.secret-custom-fields button");
  }

  /**
   * The value text of the row at the given index.
   * @param {number} index The row index
   * @returns {string}
   */
  valueText(index) {
    return this.rows[index].querySelector(".secret.secret-custom-fields button span")?.textContent;
  }

  /**
   * The preview button of the row at the given index.
   * @param {number} index The row index
   * @returns {Element}
   */
  previewButton(index) {
    return this.rows[index].querySelector(".password-view");
  }

  /**
   * The copy action of the row at the given index.
   * @param {number} index The row index
   * @returns {Element}
   */
  copyButton(index) {
    return this.rows[index].querySelector(".copy-custom-field");
  }

  /**
   * The state displayed by the preview button of the row at the given index.
   * @param {number} index The row index
   * @returns {string} "idle", "revealed" or "decrypting"
   */
  previewIconState(index) {
    return this.iconState(this.previewButton(index), ["idle", "revealed", "decrypting"]);
  }

  /**
   * The state displayed by the copy action of the row at the given index.
   * @param {number} index The row index
   * @returns {string} "default", "processing" or "done"
   */
  copyIconState(index) {
    return this.iconState(this.copyButton(index), ["default", "processing", "done"]);
  }

  /**
   * Is the clipboard flush timer displayed on the row at the given index.
   * @param {number} index The row index
   * @returns {boolean}
   */
  hasTimer(index) {
    return this.copyButton(index).nextElementSibling !== null;
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
