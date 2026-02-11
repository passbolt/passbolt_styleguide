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
import { fireEvent, render, waitFor } from "@testing-library/react";
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
        <DisplayRbacAdministration {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the self registration parent class
   */
  get Rbac() {
    return this._page.container.querySelector(".rbac-settings");
  }

  /**
   * Format action name in class name.
   * @param {string} actionName the action name to format
   * @returns {string}
   */
  formatActionNameInClassName(actionName) {
    return actionName.toLowerCase().replaceAll(/\W/g, "-");
  }

  /**
   * Get all the select by role
   */
  getAllSelectsByRole(roleIndex) {
    return this._page.container.querySelectorAll(`.rbac-row .flex-item:nth-child(${roleIndex}) .select-container`);
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
   * @param roleIndex
   * @param actionName
   * @returns {Element}
   */
  select(roleIndex, actionName) {
    return this.row(actionName)?.querySelector(
      `.rbac-row .flex-item:nth-child(${roleIndex}) .select-container .selected-value`,
    );
  }

  /**
   * Select the first item of the select
   * @param roleIndex
   * @param actionName
   * @returns {Element}
   */
  selectFirstItem(roleIndex, actionName) {
    return this.row(actionName)?.querySelector(
      `.rbac-row .flex-item:nth-child(${roleIndex}) .select-container .option`,
    );
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help-section");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector(".sidebar-help-section .button");
  }

  /**
   * Returns the opened item list
   * @param roleIndex
   * @param actionName
   */
  selectItems(roleIndex, actionName) {
    return this.row(actionName)?.querySelector(`.rbac-row .flex-item:nth-child(${roleIndex}) .select-container .items`);
  }

  /**
   * Returns the first item from the option list
   * @param roleIndex
   * @param actionName
   */
  selectFirstItemList(roleIndex, actionName) {
    return this.row(actionName)?.querySelector(
      `.rbac-row .flex-item:nth-child(${roleIndex}) .select-container .option[tabindex = "0"]`,
    );
  }

  /**
   * Returns the more button of a role given its index or null if there is no button
   * @param roleIndex
   */
  getMoreButton(roleIndex) {
    return this._page.container.querySelector(`.header-flex .flex-item:nth-child(${roleIndex}) .dropdown > button`);
  }

  /**
   * Returns the delete role button of a role given its index or null if there is no button
   * @param roleIndex
   */
  getDeleteRoleButton(roleIndex) {
    return this._page.container.querySelector(
      `.header-flex .flex-item:nth-child(${roleIndex}) .dropdown #delete_role_action`,
    );
  }

  /**
   * Returns the rename role button of a role given its index or null if there is no button
   * @param roleIndex
   */
  getRenameRoleButton(roleIndex) {
    return this._page.container.querySelector(
      `.header-flex .flex-item:nth-child(${roleIndex}) .dropdown #rename_role_action`,
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.Rbac !== null;
  }

  /**
   * Returns the create role button.
   * @returns {HTMLElement}
   */
  get createRoleButton() {
    return this._page.container.querySelector(".main-content button");
  }

  /**
   * Returns the count of roles displayed on screen
   */
  get displayedRoleCount() {
    return this._page.container.querySelectorAll(".flex-container.header-flex .flex-item.centered").length;
  }

  /**
   * Click on the element
   * @param {HTMLElement} element
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click to select the first item from the list
   */
  async clickToSelectFirstItem(roleName, actionName) {
    await this.click(this.selectFirstItemList(roleName, actionName));
  }
}
