/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import SendTestMailDialog from "./SendTestMailDialog";

/**
 * The ManageSmtpAdministrationSettings component represented as a page
 */
export default class SendTestMailDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <SendTestMailDialog {...props}/>
      </MockTranslationProvider>
    );
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
   * Simulates a click on the submit button in order to send a test email.
   * @returns {Promise<void>}
   */
  async sendTestEmail() {
    await this.clickOn(this.submitButton, () => this.submitButton.disabled);
  }

  /**
   * Simulates a click on the "Logs" toggle button.
   * @returns {Promise<void>}
   */
  async clickOnLogs() {
    const isLogDetailsAvailable = Boolean(this.logDetails);
    await this.clickOn(this.logs, () => !isLogDetailsAvailable);
  }

  /**
   * Simulates a click on the "Retry" button.
   * To work, the button must be present, so the state should be in ERROR or SUCCESS state.
   * @returns {Promise<void>}
   */
  async retry() {
    const currentTitle = this.title.textContent;
    await this.clickOn(this.retryButton, () => this.title.textContent !== currentTitle);
  }

  /**
   * Simulates a click on the given HTML element.
   * The clicks is consider done when the callback returns {true}.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @param {function} callback The callback to be used in the waitFor method to ensure the click is done (returns true when it's done)
   * @returns {Promise<void>}
   */
  async clickOn(element, callback) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
      if (!callback()) {
        throw new Error("Page didn't react yet on the event.");
      }
    });
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
    await waitFor(() => {
      if (this[key].value !== formData[key].toString()) {
        throw new Error("Form is not udpated yet.");
      }
    });
  }

  /**
   * Returns the title dialog HTMLElement
   * @returns {HTMLElement}
   */
  get title() {
    return this.select(".send-test-email-dialog h2");
  }

  /**
   * Returns the recipient input
   * @returns {HTMLElement}
   */
  get recipient() {
    return this.select(".send-test-email-dialog #recipient");
  }

  /**
   * Returns the recipient error HTMLElement
   * @returns {HTMLElement}
   */
  get recipient_error() {
    return this.select(".send-test-email-dialog .recipient.error-message");
  }

  /**
   * Returns the faq link.
   * @returns {HTMLElement}
   */
  get faqButton() {
    return this.select(".send-test-email-dialog a.faq-link");
  }

  /**
   * Returns the submit button.
   * @returns {HTMLElement}
   */
  get submitButton() {
    return this.select(".send-test-email-dialog button[type='submit']");
  }

  /**
   * Returns the logs toggle button.
   * @returns {HTMLElement}
   */
  get logs() {
    return this.select(".send-test-email-dialog .accordion-header button");
  }

  /**
   * Returns the logs details textarea
   * @returns {HTMLElement}
   */
  get logDetails() {
    return this.select(".send-test-email-dialog .accordion-content textarea");
  }

  /**
   * Returns the retry button
   * @returns {HTMLElement}
   */
  get retryButton() {
    return this.select(".send-test-email-dialog button.cancel");
  }
}
