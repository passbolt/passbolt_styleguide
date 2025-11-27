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
 * @since         4.5.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayRbacItem from "./DisplayRbacItem";

/**
 * The DisplayRbacItem component represented as a page
 */
export default class DisplayRbacItemPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayRbacItem {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the rbac row parent class
   */
  get Rbac() {
    return this._page.container.querySelector('.rbac-row');
  }

  /**
   * Return the select admin component.
   * @returns {string}
   */
  get selectAdmin() {
    return this._page.container.querySelector('.admin');
  }

  /**
   * Return the select admin component.
   * @returns {string}
   */
  get selectedItemByRole() {
    return this.selectAdmin.querySelector('.selected-value');
  }

  /**
   * Return the select label.
   * @returns {string}
   */
  get label() {
    return this._page.container.querySelector('.flex-item.first');
  }

  /**
   * Return the select based on the role component.
   * @param roleName
   * @returns {string}
   */
  selectRole(roleName) {
    return this._page.container.querySelector(`.${roleName}`);
  }

  /**
   * Select the first item of the select
   * @returns {Element}
   */
  selectAdminOptions() {
    return this.selectAdmin?.querySelectorAll(`.option`);
  }

  /**
   * Select the option of the select
   * @param roleName
   * @returns {Element}
   */
  selectedRoleOption(roleName) {
    return this._page.container.querySelector(`.${roleName} .selected-value`);
  }

  /**
   * Select the option of the select
   * @param roleName
   * @param option
   * @returns {Element}
   */
  getRoleOption(roleName, option) {
    return this._page.container.querySelector(`.${roleName} .option.${option}`);
  }

  /**
   * click on select item to open/close it
   * @param roleName
   */
  async clickOnSelect(roleName) {
    await this.click(this.selectedRoleOption(roleName));
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
