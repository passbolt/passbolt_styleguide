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
 * @since         4.4.0
 */

import React from "react";
import {render} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import AdministrationPasswordExpiryContextProvider from "../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import DisplayAdministrationPasswordExpiryActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationPasswordExpiryActions/DisplayAdministrationPasswordExpiryActions";
import DisplayAdministrationPasswordExpiry from "./DisplayAdministrationPasswordExpiry";
import userEvent from "@testing-library/user-event";

/**
 * The DisplayAdministrationPasswordExpirySettings component represented as a page
 */
export default class DisplayAdministrationPasswordExpirySettingsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdministrationPasswordExpiryContextProvider {...props}>
            <DisplayAdministrationPasswordExpiryActions {...props}/>
            <DisplayAdministrationPasswordExpiry {...props}/>
            <div id="administration-help-panel"></div>
          </AdministrationPasswordExpiryContextProvider>
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
    return this.select('#password-expiry-settings-title');
  }

  /**
   * Returns the main feature toggle on the page
   * @returns {HTMLElement}
   */
  get featureToggle() {
    return this.select('#passwordExpirySettingsToggle');
  }

  /**
   * Returns the help page link button
   * @returns {HTMLElement}
   */
  get helpPageLink() {
    return this.select('#administration-help-panel a.button');
  }

  /**
   * Returns password expired setting form
   * @returns {HTMLElement}
   */
  get passwordExpirySettingsForm() {
    return this.select('.password-expiry-settings-form');
  }

  /**
   * Returns the main title of the page
   * @returns {HTMLElement}
   */
  get saveSettingsButton() {
    return this.select("#save-settings");
  }

  /**
   * Returns the save warning banner element
   * @returns {HTMLElement}
   */
  get saveWarningBanner() {
    return this.select("#password-expiry-settings-save-banner");
  }

  /**
   * Returns the advanced forms
   * @returns {HTMLElement}
   */
  get passwordExpiryFormAdvanced() {
    return this.select("#password-expiry-form-advanced");
  }

  /**
   * Simulates a click on the main feature toggle
   * @returns {Promise<void>}
   */
  async clickOnFeatureToggle() {
    const isChecked = this.featureToggle.checked;
    await this.clickOn(this.featureToggle);
    await waitForTrue(() => isChecked !== this.featureToggle.checked);
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
