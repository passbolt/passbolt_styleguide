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
 * @since         5.5.0
 */
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayMfaPolicyAdministrationTeasing from "./DisplayMfaPolicyAdministrationTeasing";

/**
 * The DisplayMfaPolicyAdministrationTeasing component represented as a page
 */
export default class DisplayMfaPolicyAdministrationTeasingPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayMfaPolicyAdministrationTeasing {...props} />
        </AppContext.Provider>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the mfa policy settings parent class
   * @returns {HTMLElement}
   */
  get mfaPolicy() {
    return this._page.container.querySelector(".mfa-settings-teasing");
  }

  /**
   * Returns the title
   * @returns {HTMLElement}
   */
  get title() {
    return this._page.container.querySelector("#mfa-settings-title").textContent;
  }

  /**
   * Returns the MFA settings First Line element
   * @returns {HTMLElement}
   */
  get mfaSettingsFirstLine() {
    return this._page.container.querySelector(".mfa-settings-teasing .main-content > p").textContent;
  }

  /**
   * Returns the help box element
   * @returns {HTMLElement}
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help-section");
  }

  /**
   * Returns the help box title
   * @returns {HTMLElement}
   */
  get helpBoxTitle() {
    return this.helpBox.querySelector("h3").textContent;
  }

  /**
   * Returns the help box description
   * @returns {HTMLElement}
   */
  get helpBoxDescription() {
    return this.helpBox.querySelector("p").textContent;
  }

  /**
   * Returns the help box button
   * @returns {HTMLElement}
   */
  get helpBoxButton() {
    return this.helpBox.querySelector(".button");
  }

  /**
   * Returns the 'Upgrade to Passbolt' Pro button
   * @returns {NodeList}
   */
  get upgradeButton() {
    return this._page.container.querySelector(".mfa-settings-info > div > a.button.primary");
  }

  /**
   * Returns all li elements
   */
  get mfaSettingsDescription() {
    return this._page.container.querySelectorAll(".mfa-settings-info > .mfa-settings-description > li");
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.mfaPolicy !== null;
  }

  /**
   * click on save settings button
   * @returns {Promise<void>}
   */
  async clickOnUpgrade() {
    return this.click(this.upgradeButton);
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
