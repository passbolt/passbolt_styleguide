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
 * @since         3.9.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ApiError from "./ApiError";

/**
 * The ApiErrorPage component represented as a page
 */
export default class ApiErrorPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiError {...props}/>
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
   * Returns true if the page exists.
   * This means that it's loaded and the title text content is non empty.
   * @returns {boolean}
   */
  exists() {
    return this.panel !== null;
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
   * Returns the main panel
   * @return {HTMLElement}
   */
  get panel() {
    return this.select('.api-feedback-card');
  }

  /**
   * Returns the main panel
   * @return {HTMLElement}
   */
  get logToggle() {
    return this.select('.api-feedback-card .accordion-header button');
  }

  /**
   * Returns the textarea containing the log details
   * @return {HTMLElement}
   */
  get logDetails() {
    return this.select('.api-feedback-card .accordion-content textarea');
  }

  /**
   * Simulates a click on the Log button toggle
   * @return {Promise<void>}
   */
  clickOnLogToggle() {
    const isLogDetailsPresent = Boolean(this.logDetails);
    return this.clickOn(this.logToggle, () => isLogDetailsPresent !== Boolean(this.logDetails));
  }
}
