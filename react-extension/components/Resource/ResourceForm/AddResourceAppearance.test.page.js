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
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AddResourceAppearance from "./AddResourceAppearance";
/**
 * The Add resource appearance component represented as a page
 */
export default class AddResourceAppearancePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AddResourceAppearance {...props} />
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the main header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the Color section header
   */
  get colorTitle() {
    return this._page.container.querySelector(".color-section h3");
  }

  /**
   * Returns the Icons section header
   */
  get iconsTitle() {
    return this._page.container.querySelector(".icons-section h3");
  }

  /**
   * Returns the default color input toggle
   */
  get defaultColorToggle() {
    return this._page.container.querySelector(".color-section .toggle-switch input");
  }

  /**
   * Returns a color picker item given its index
   */
  colorPickerItem(index) {
    return this._page.container.querySelectorAll(".color-section .color-picker-item")[index];
  }

  /**
   * Returns true if the given colorPickerItem is selected
   */
  isColorPickerItemSelected(colorPickerItem) {
    return Boolean(colorPickerItem.querySelector("svg.checked"));
  }

  /**
   * Returns the default icon input toggle
   */
  get defaultIconToggle() {
    return this._page.container.querySelector(".icons-section .toggle-switch input");
  }

  /**
   * Returns an icon picker item given its index
   */
  iconPickerItem(index) {
    return this._page.container.querySelectorAll(".icons-section .icon-picker-item")[index];
  }

  /**
   * Returns true if the given iconPickerItem is selected
   */
  isIconPickerItemSelected(iconPickerItem) {
    return Boolean(iconPickerItem.classList.contains("selected"));
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
