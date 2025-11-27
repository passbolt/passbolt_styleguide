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
 * @since         5.7.0
 */

import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplaySecretHistoryAdministration from "./DisplaySecretHistoryAdministration";
import userEvent from "@testing-library/user-event";

export default class DisplaySecretHistoryAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplaySecretHistoryAdministration {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
    this.user = userEvent.setup();
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the page title element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select("#secret-history-settings-title");
  }

  /**
   * Returns the form banner element
   * @returns {HTMLElement}
   */
  get formBanner() {
    return this.select(".warning.message");
  }

  /**
   * Returns the form element
   * @returns {HTMLElement}
   */
  get form() {
    return this.select("form");
  }

  /**
   * Returns the toggle title element
   * @returns {HTMLElement}
   */
  get titleToggle() {
    return this.select("#secret-history-settings-title input[type='checkbox']");
  }

  /**
   * Returns the input number for the history length definition
   * @returns {HTMLElement}
   */
  get historyLengthInput() {
    return this._page.container.querySelector('#configure-secret-history-form-length');
  }

  /**
   * Returns the history length error element
   * @returns {HTMLElement}
   */
  get historyLengthError() {
    return this.select("#maxRevisions-error");
  }

  /**
   * Set the history length
   * @param {number} value the value
   * @returns {Promise<void>}
   */
  async setHistoryLength(value) {
    fireEvent.input(this.historyLengthInput, {target: {value: value}});
  }

  /**
   * Simulates a click on the given HTML element.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @returns {Promise<void>}
   */
  async clickOn(element) {
    await this.user.click(element);
  }

  /**
   * Returns the click on the title toggle
   * @returns {Promise<void>}
   */
  async clickOnFeature() {
    await this.user.click(this.titleToggle);
  }

  /**
   * Submit the form.
   * @returns {Promise<void>}
   */
  async save() {
    const saveButton = await screen.findByRole("button", {name: /save/i});
    await this.user.click(saveButton);
  }
}
