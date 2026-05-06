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
 * @since         5.12.0
 */

import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddResourcePinCode from "./AddResourcePinCode";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The Add resource pin code component represented as a page
 */
export default class AddResourcePinCodePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AddResourcePinCode {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Allows rerendering with new props
   * @param {Object} props New props
   */
  rerender(props) {
    this._page.rerender(
      <MockTranslationProvider>
        <AddResourcePinCode {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the pin code input element
   */
  get pinCode() {
    return this._page.container.querySelector("#resource-pin-code");
  }

  /**
   * Returns the pin code view button element
   */
  get pinCodeViewButton() {
    return this._page.container.querySelector(".password-view .svg-icon");
  }

  /**
   * Returns the pin code generate button element
   */
  get pinCodeGenerateButton() {
    return this._page.container.querySelector(".pin-code-generate");
  }

  /**
   * Returns the advanced settings toggle element
   */
  get advancedSettingsToggle() {
    return this._page.container.querySelector(".additional-information .section-header");
  }

  /**
   * Returns the pin code length number input element
   */
  get pinCodeLengthNumber() {
    return this._page.container.querySelector("#resource-pin-code-length");
  }

  /**
   * Returns the pin code length range input element
   */
  get pinCodeLengthRange() {
    return this._page.container.querySelector('.pin-code-length .slider input[type="range"]');
  }

  /**
   * Returns the pin code error message element
   */
  get pinCodeErrorMessage() {
    return this._page.container.querySelector(".pin-code.error-message");
  }

  /**
   * Returns the pin code warning message element
   */
  get pinCodeWarningMessage() {
    return this._page.container.querySelector(".pin-code.warning-message");
  }

  /**
   * Returns the attention icon element
   */
  get attentionIcon() {
    return this._page.container.querySelector(".attention-required");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Click on the element
   * @param {HTMLElement} element The element to click on
   */
  async click(element) {
    await this.user.click(element);
  }

  /**
   * Fill the input element with data by replacing its current value.
   * @param {HTMLElement} element - The input element to fill with data.
   * @param {string} data - The data to fill the input element with.
   */
  async fill(element, data) {
    await this.user.type(element, data, {
      initialSelectionStart: 0,
      initialSelectionEnd: element.value?.length ?? 0,
    });
  }
}
