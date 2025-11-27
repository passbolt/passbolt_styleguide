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
 * @since         4.5.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import PasswordExpiryDialog from "./PasswordExpiryDialog";

/**
 * The PasswordExpiryDialog component represented as a page
 */
export default class PasswordExpiryDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this.props = props;
    this.render(props);
  }

  /**
   * Do a rendering of the page.
   * @param {object} props the props of the components
   */
  render(props) {
    this._page = render(<MockTranslationProvider>
      <PasswordExpiryDialog {...props}/>
    </MockTranslationProvider>,
    {legacyRoot: true});
  }

  /**
   * Shortcut method for the container querySelector.
   * @param {string} stringSelector
   * @returns {HTMLElement}
   */
  select(stringSelector) {
    return this._page.container.querySelector(stringSelector);
  }

  /**
   * Returns true if the page exists.
   * This means that it's loaded and the title text content is non empty.
   * @returns {boolean}
   */
  exists() {
    const title = this.title;
    return title && title.textContent !== "";
  }

  /**
   * Simulates a click on the given HTML element.
   * The clicks is consider done when the callback returns {true}.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @returns {Promise<void>}
   */
  async clickOn(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /**
   * Set the current form with the given data.
   * It can set the input from text value.
   * It can also set value for Select elements, but due to React internal stuff, the label needs to be passed as value.
   * @param {object} formData a key value pairs object that contains the field name as a key (must match a getter method on this page) and the desired value
   * @returns {Promise<void>}
   */
  async setFormWith(formData) {
    for (const key in formData) {
      const element = this[key];
      const value = formData[key];
      await this.setInputField(element, value);
    }
  }

  /**
   * Set the current input field value with the given data
   * @param {HTMLElement} element the input element on which to set the value
   * @param {string} value the value to set
   * @returns {Promise<void>}
   */
  async setInputField(element, value) {
    fireEvent.input(element, {target: {value: value}});
    await waitFor(() => {
      if (element.value !== value) {
        throw new Error("The value is not set yet");
      }
    });
  }

  /**
   * Returns the title page HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select(".password-expiry-dialog h2");
  }

  /**
   * Returns the input number corresponding to the automatic expiry date period
   * @returns {HTMLElement}
   */
  get durationInDayInput() {
    return this.select("#passwordExpiryDateAutomatic");
  }

  /**
   * Returns the error associated to the automatic expiry date
   * @returns {HTMLElement}
   */
  get durationInDayInputError() {
    return this.select("label[for=passwordExpiryOptionAutomatic] .error-message");
  }

  /**
   * Returns the input number corresponding to the manual expiry date
   * @returns {HTMLElement}
   */
  get dateInput() {
    return this.select("#passwordExpiryDateManual");
  }

  /**
   * Returns the error associated to the manual expiry date
   * @returns {HTMLElement}
   */
  get dateInputError() {
    return this.select("label[for=passwordExpiryOptionManual] .error-message");
  }

  /**
   * Returns the input radio corresponding to the "automatic expiry date"
   * @returns {HTMLElement}
   */
  get optionAutomatic() {
    return this.select("#passwordExpiryOptionAutomatic");
  }

  /**
   * Returns the input radio corresponding to the "manual expiry date"
   * @returns {HTMLElement}
   */
  get optionManual() {
    return this.select("#passwordExpiryOptionManual");
  }

  /**
   * Returns the input radio corresponding to the "never expires"
   * @returns {HTMLElement}
   */
  get optionNever() {
    return this.select("#passwordExpiryOptionNever");
  }

  /**
   * Returns the Cancel button of the dialog
   * @returns {HTMLElement}
   */
  get cancelButton() {
    return this.select("button.cancel");
  }

  /**
   * Returns the Save button of the dialog
   * @returns {HTMLElement}
   */
  get saveButton() {
    return this.select("button[type='submit']");
  }

  /**
   * Returns the Cross button that close the dialog
   * @returns {HTMLElement}
   */
  get cancelCrossButton() {
    return this.select("button.dialog-close");
  }

  /**
   * Returns the currently select radio button
   * @return {HTMLElement}
   */
  get selectedOptionRadio() {
    return this.select("input[type='radio']:checked");
  }
}
