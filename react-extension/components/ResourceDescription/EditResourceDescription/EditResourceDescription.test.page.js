/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import EditResourceDescription from "./EditResourceDescription";
import {waitForTrue} from "../../../../../test/utils/waitFor";

/**
 * The EditResourceDescription component represented as a page
 */
export default class EditResourceDescriptionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <EditResourceDescription {...props} />
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the textarea input element
   */
  get description() {
    return this._page.container.querySelector('.input.textarea.required textarea');
  }

  /**
   * Returns the error message content
   */
  get errorMessage() {
    return this._page.container.querySelector('.feedbacks.error-message');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.description-editor-submit');
  }

  /**
   * Returns the "Lock" icon element
   * @returns {HTMLElement}
   */
  get lockIcon() {
    return this._page.container.querySelector("button.lock-toggle");
  }

  /**
   * Returns true if the description is set to be encrypted
   * @returns {boolean}
   */
  get isDescriptionEncrypted() {
    return Boolean(this._page.container.querySelector("button.lock-toggle .lock"));
  }

  /**
   * Returns true if the description is set to be encrypted
   * @returns {boolean}
   */
  get isProcessing() {
    return this.saveButton.hasAttribute("disabled");
  }

  /**
   * Simulates a click on the "Lock" icon
   * @returns {Promise<void>}
   */
  async clickOnLock() {
    fireEvent.click(this.lockIcon, {button: 0});
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the "Save" button
   * @returns {Promise<void>}
   */
  clickOnSave() {
    fireEvent.click(this.saveButton, {button: 0});
  }

  /**
   * Set the current form with the given data (only work with the inputs (not our Select component for instance))
   * @param {object} formData a key value pairs object that contains the field name as a key (must match a getter method on this page) and the desired value
   * @returns {Promise<void>}
   */
  async setFormWith(formData) {
    let key;
    for (key in formData) {
      fireEvent.input(this[key], {target: {value: formData[key]}});
    }
    await waitForTrue(() => this[key].value === formData[key].toString());
  }
}
