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
 * @since         4.1.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayRbacAdministration from "./DisplayRbacAdministration";

/**
 * The DisplayRbacAdministration component represented as a page
 */
export default class DisplayRbacAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayRbacAdministration {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the self registration parent class
   */
  get Rbac() {
    return this._page.container.querySelector('.rbac-settings');
  }

  /**
   * Format action name in class name.
   * @param {string} actionName the action name to format
   * @returns {string}
   */
  formatActionNameInClassName(actionName) {
    return actionName.toLowerCase().replaceAll(/[^\w]/g, '-');
  }

  /**
   * Get all the select by role
   */
  getAllSelectsByRole(roleName) {
    return this._page.container.querySelectorAll(`.select-container.${roleName}`);
  }

  /**
   * Return the row corresponding to the action name
   * @param actionName
   * @returns {Element}
   */
  row(actionName) {
    return this._page.container.querySelector(`.rbac-row.${this.formatActionNameInClassName(actionName)}`);
  }

  /**
   * Returns the toggle settings
   * @param roleName
   * @param actionName
   * @returns {Element}
   */
  select(roleName, actionName) {
    return this.row(actionName)?.querySelector(`.select-container.${roleName} .selected-value`);
  }

  /**
   * Select the first item of the select
   * @param roleName
   * @param actionName
   * @returns {Element}
   */
  selectFirstItem(roleName, actionName) {
    return this.row(actionName)?.querySelector(`.select-container.${roleName} .option`);
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector('.sidebar-help');
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector('.sidebar-help .button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.Rbac !== null;
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
