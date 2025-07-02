
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
 * @since         5.3.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AddResourceCustomFields from "./AddResourceCustomFields";

export default class AddResourceCustomFieldsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AddResourceCustomFields {...props} />
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the add custom field button element
   */
  get addCustomField() {
    return this._page.container.querySelector('.custom-field-add button');
  }

  /**
   * Returns the custom field key input element
   */
  getCustomFieldKey(index) {
    return this._page.container.querySelector(`#resource-custom-fields-key-${index}`);
  }

  /**
   * Returns the custom field value textarea element
   */
  getCustomFieldValue(index) {
    return this._page.container.querySelector(`#resource-custom-fields-value-${index}`);
  }

  /**
   * Returns the delete custom field button element
   */
  getDeleteCustomField(index) {
    return this._page.container.querySelector(`#resource-delete-custom-field-${index}`);
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Fill the input element with data and trigger the change event.
   * @param {HTMLElement} element - The input element to fill with data.
   * @param {string} data - The data to fill the input element with.
   */
  async fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => {
      element.value === data;
    });
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }
}
