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
 * @since         5.2.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AddResourceUris from "./AddResourceUris";

export default class AddResourceUrisPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AddResourceUris {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".title");
  }

  /**
   * Returns the uri input element
   */
  get mainUri() {
    return this._page.container.querySelector("#resource-main-uri");
  }

  /**
   * Returns the add uri button element
   */
  get addUri() {
    return this._page.container.querySelector(".uri-add button");
  }

  /**
   * Returns the additional uri input element
   */
  getAdditionalUri(index) {
    return this._page.container.querySelector(`#resource-additional-uri-${index}`);
  }

  /**
   * Returns the delete additional uri button element
   */
  getDeleteAdditionalUri(index) {
    return this._page.container.querySelector(`#resource-delete-additional-uri-${index}`);
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
    const dataInputEvent = { target: { value: data } };
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
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
