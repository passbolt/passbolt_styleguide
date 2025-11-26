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
 * @since         4.3.0
 */

import React from "react";
import {render} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationUserPassphrasePoliciesActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserPassphrasePoliciesActions/DisplayAdministrationUserPassphrasePoliciesActions";
import AdministrationUserPassphrasePoliciesContextProvider from "../../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import DisplayAdministrationUserPassphrasePolicies from "./DisplayAdministrationUserPassphrasePolicies";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import userEvent from "@testing-library/user-event";

/**
 * The DisplayPasswordPoliciesAdministration component represented as a page
 */
export default class DisplayAdministrationUserPassphrasePoliciesPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdministrationUserPassphrasePoliciesContextProvider {...props}>
            <DisplayAdministrationUserPassphrasePoliciesActions {...props}/>
            <DisplayAdministrationUserPassphrasePolicies {...props}/>
          </AdministrationUserPassphrasePoliciesContextProvider>
        </AppContext.Provider>
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
   * Shortcut for selecting all matching element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  selectAll(cssSelector) {
    return this._page.container.querySelectorAll(cssSelector);
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the main title of the page
   * @returns {HTMLElement}
   */
  get title() {
    return this.select('#user-passphrase-policies-title');
  }

  /**
   * Returns the help page link button
   * @returns {HTMLElement}
   */
  get helpPageLink() {
    return this.select('.sidebar-help-section a.button');
  }

  /**
   * Returns the main title of the page
   * @returns {HTMLElement}
   */
  get saveSettingsButton() {
    return this.select("#save-settings");
  }

  /**
   * Returns an entropy label element given its index
   * @returns {HTMLElement}
   */
  entropyLabel(index) {
    const elements = this.selectAll("#entropy_minimum + .range-options .range-option");
    return elements[index];
  }

  /**
   * Returns the external dictionary check checkbox element
   * @returns {HTMLElement}
   */
  get externalDictionaryCheck() {
    return this.select("#user-passphrase-policies-external-services-toggle-button");
  }

  /**
   * Returns the save warning banner element
   * @returns {HTMLElement}
   */
  get saveWarningBanner() {
    return this.select("#user-passphrase-policies-save-banner");
  }

  /**
   * Returns the weak settings warning banner element
   * @returns {HTMLElement}
   */
  get weakSettingsWarningBanner() {
    return this.select("#user-passphrase-policies-weak-settings-banner");
  }

  /**
   * Returns the select entropy minimum label option
   * @returns {string}
   */
  getSelectedEntropyMinimumValue() {
    const element = this.select(".range-options .range-option--active");
    return element.textContent;
  }

  /**
   * Simulates a click on the "external dictionary check" checkbox
   * @returns {Promise<void>}
   */
  async clickOnExternalDictionaryCheck() {
    const isChecked = this.externalDictionaryCheck.checked;
    await this.clickOn(this.externalDictionaryCheck);
    await waitForTrue(() => isChecked !== this.externalDictionaryCheck.checked);
  }

  /**
   * Simulates a click on an entropy_minimum label matching the given index
   * @param {number} elementIndex
   * @returns {Promise<void>}
   */
  async clickOnEntropyLabel(elementIndex) {
    const entropyLabel = this.entropyLabel(elementIndex);
    await this.clickOn(entropyLabel);
    await waitForTrue(() => entropyLabel.classList.contains('range-option--active'));
  }

  /**
   * Simulates a click on the save settings button
   * @returns {Promise<void>}
   */
  async clickOnSave() {
    await this.clickOn(this.saveSettingsButton);
    await waitForTrue(() => !this.saveSettingsButton.getAttribute('disabled'));
  }

  /**
   * Simulates a click on the given HTML element.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @returns {Promise<void>}
   */
  async clickOn(element) {
    await this.user.click(element);
  }
}
