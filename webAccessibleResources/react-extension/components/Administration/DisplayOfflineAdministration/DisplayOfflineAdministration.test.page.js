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
 * @since         5.13.0
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayOfflineAdministration from "./DisplayOfflineAdministration";
import userEvent from "@testing-library/user-event";

export default class DisplayOfflineAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayOfflineAdministration {...props} />
      </MockTranslationProvider>,
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
    return this.select("#offline-settings-title");
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
   * Returns the title toggle input
   * @returns {HTMLElement}
   */
  get titleToggle() {
    return this.select("#offlineSettingsToggle");
  }

  /**
   * Returns the session duration select element
   * @returns {HTMLElement}
   */
  get sessionDurationSelect() {
    return this.select("#offline-settings-session-duration");
  }

  /**
   * Returns the maximum data retention period select element
   * @returns {HTMLElement}
   */
  get maximumRetentionPeriodSelect() {
    return this.select("#offline-settings-maximum-retention-period");
  }

  /**
   * Returns the label of the value currently selected in the given select element.
   * @param {HTMLElement} selectElement The select container
   * @returns {string}
   */
  selectedValueOf(selectElement) {
    return selectElement.querySelector(".selected-value .value").textContent;
  }

  /**
   * Returns true if the given select element is disabled.
   * @param {HTMLElement} selectElement The select container
   * @returns {boolean}
   */
  isDisabled(selectElement) {
    return selectElement.querySelector(".selected-value.disabled") !== null;
  }

  /**
   * Returns the labels of the options the given select element offers. The select filters the
   * selected value out of its list, so these are the values the user could switch to.
   * @param {HTMLElement} selectElement The select container
   * @returns {string[]}
   */
  optionsOf(selectElement) {
    return [...selectElement.querySelectorAll(".items li")].map((option) => option.textContent);
  }

  /**
   * Returns the session duration error element
   * @returns {HTMLElement}
   */
  get sessionDurationError() {
    return this.select("#session-duration-error");
  }

  /**
   * Returns the maximum retention period error element
   * @returns {HTMLElement}
   */
  get maximumRetentionPeriodError() {
    return this.select("#maximum-retention-period-error");
  }

  /**
   * Toggle the offline mode feature.
   * @returns {Promise<void>}
   */
  async clickOnFeature() {
    await this.user.click(this.titleToggle);
  }

  /**
   * Select an option in the given select element by label.
   * @param {HTMLElement} selectElement The select container
   * @param {string} optionLabel The visible label of the option to pick
   * @returns {Promise<void>}
   */
  async selectOption(selectElement, optionLabel) {
    const trigger = selectElement.querySelector(".selected-value");
    await this.user.click(trigger);
    const option = await screen.findByText(optionLabel);
    await this.user.click(option);
  }

  /**
   * Set the session duration by selecting the matching option label.
   * @param {string} optionLabel
   * @returns {Promise<void>}
   */
  async setSessionDuration(optionLabel) {
    await this.selectOption(this.sessionDurationSelect, optionLabel);
  }

  /**
   * Set the maximum retention period by selecting the matching option label.
   * @param {string} optionLabel
   * @returns {Promise<void>}
   */
  async setMaximumRetentionPeriod(optionLabel) {
    await this.selectOption(this.maximumRetentionPeriodSelect, optionLabel);
  }

  /**
   * Submit the form.
   * @returns {Promise<void>}
   */
  async save() {
    const saveButton = await screen.findByRole("button", { name: /save/i });
    await this.user.click(saveButton);
  }
}
