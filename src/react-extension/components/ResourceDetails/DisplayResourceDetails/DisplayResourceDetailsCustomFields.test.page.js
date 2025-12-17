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
import DisplayResourceDetailsCustomFields from "./DisplayResourceDetailsCustomFields";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayResourceDetailsCustomFields component represented as a page
 */
export default class DisplayResourceDetailsCustomFieldsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsCustomFields {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._page.container.querySelector('.accordion-header button');
  }

  /**
   * Returns the page object of custom fields section
   */
  get customFieldsSection() {
    return this._page.container.querySelector('.accordion-content');
  }

  /**
   * Returns the information labels container
   */
  get informationLabels() {
    return this._page.container.querySelector('.information-label');
  }

  /**
   * Returns the information values container
   */
  get informationValues() {
    return this._page.container.querySelector('.information-value');
  }

  /**
   * Returns all custom field labels
   */
  get customFieldLabels() {
    return this._page.container.querySelectorAll('.information-label .label');
  }

  /**
   * Returns all custom field values
   */
  get customFieldValues() {
    return this._page.container.querySelectorAll('.information-value .field-secret-value');
  }

  /**
   * Returns all preview buttons (eye icons)
   */
  get previewButtons() {
    return this._page.container.querySelectorAll('.password-view');
  }

  /**
   * Returns the "Show all" button
   */
  get showAllButton() {
    return this._page.container.querySelector('#show-all-button');
  }

  /**
   * Returns the "Hide all" button
   */
  get hideAllButton() {
    return this._page.container.querySelector('#hide-all-button');
  }

  /**
   * Returns a specific custom field label by index
   * @param {number} index
   */
  getCustomFieldLabel(index) {
    return this.customFieldLabels[index];
  }

  /**
   * Returns a specific custom field value by index
   * @param {number} index
   */
  getCustomFieldValue(index) {
    return this.customFieldValues[index];
  }

  /**
   * Returns a specific custom field value by index
   * @param {number} index
   */
  getCustomFieldValueButton(index) {
    const customFieldValue = this.customFieldValues[index];
    return customFieldValue.querySelector("button span");
  }
  /**
   * Returns a specific preview button by index
   * @param {number} index
   */
  getPreviewButton(index) {
    return this.previewButtons[index];
  }

  /**
   * Returns the number of custom fields
   */
  get customFieldsCount() {
    return this.customFieldLabels.length;
  }

  /**
   * Returns true if the accordion section is open
   */
  get isOpen() {
    return this.customFieldsSection !== null;
  }

  /** Click on the component */
  async clickOn(component) {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /** Hover over a specific custom field */
  async hover(element) {
    fireEvent.mouseEnter(element);
    await waitFor(() => {});
  }
}
