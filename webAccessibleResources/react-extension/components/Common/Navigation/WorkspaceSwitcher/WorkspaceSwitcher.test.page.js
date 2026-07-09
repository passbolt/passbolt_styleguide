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
 * @since         5.14.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The WorkspaceSwitcher component represented as a page
 */
export default class WorkspaceSwitcherPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <WorkspaceSwitcher {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the root workspace switcher element
   * @returns {HTMLElement|null}
   */
  get workspaceSwitcher() {
    return this._page.container.querySelector("#workspace-switcher");
  }

  /**
   * Returns the button that toggles the dropdown menu
   * @returns {HTMLElement}
   */
  get switcherButton() {
    return this._page.container.querySelector("#workspace-switcher button.switcher");
  }

  /**
   * Returns the dropdown menu element, or null when the menu is closed
   * @returns {HTMLElement|null}
   */
  get menu() {
    return this._page.container.querySelector(".menu-switcher");
  }

  /**
   * Returns the menu item button matching the given label, or null
   * @param {string} label The button label to look for
   * @returns {HTMLElement|null}
   */
  menuItem(label) {
    const buttons = [...this._page.container.querySelectorAll(".menu-switcher button")];
    return buttons.find((button) => button.textContent.trim() === label) ?? null;
  }

  /**
   * Returns the "Organisation Settings" menu item button.
   * @returns {HTMLElement|null}
   */
  get organisationSettingsButton() {
    return this.menuItem("Organisation Settings");
  }

  /**
   * Returns the "Manage Users & Groups" menu item button.
   * @returns {HTMLElement|null}
   */
  get usersButton() {
    return this.menuItem("Manage Users & Groups");
  }

  /**
   * Returns the "Help" menu item button.
   * @returns {HTMLElement|null}
   */
  get helpButton() {
    return this.menuItem("Help");
  }

  /**
   * Returns the "Terms & Credits" menu item button.
   * @returns {HTMLElement|null}
   */
  get termsCreditsButton() {
    return this.menuItem("Terms & Credits");
  }

  /**
   * Returns true if the workspace switcher exists
   * @returns {boolean}
   */
  exists() {
    return this.workspaceSwitcher !== null;
  }

  /**
   * Opens the dropdown menu
   * @returns {Promise<void>}
   */
  async open() {
    await this.click(this.switcherButton);
  }

  /**
   * Click on the given element
   * @param {HTMLElement} element The element to click
   * @returns {Promise<void>}
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
