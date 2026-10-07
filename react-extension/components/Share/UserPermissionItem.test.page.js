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
import { render, waitFor } from "@testing-library/react";
import React from "react";
import UserPermissionItem from "./UserPermissionItem";
import AppContext from "../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";

/**
 * The UserPermissionItem component represented as a page
 */
export default class UserPermissionItemPage {
  /**
   * Default constructor
   * @param {object} appContext An app context
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <ul>
            <UserPermissionItem {...props} />
          </ul>
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the name element text (first + last name, plus "(suspended)" if applicable)
   */
  get name() {
    return this._page.container.querySelector(".aro-name .ellipsis").textContent;
  }

  /**
   * Returns the details element text (username/email)
   */
  get details() {
    return this._page.container.querySelector(".aro-details .ellipsis").textContent;
  }

  /**
   * Returns the selected-value element of the permission select (used to open the dropdown)
   */
  get permissionSelect() {
    return this._page.container.querySelector(".selected-value");
  }

  /**
   * Returns the current permission label text
   */
  get permissionSelectValue() {
    return this._page.container.querySelector(".selected-value .value").textContent;
  }

  /**
   * Returns the delete button element
   */
  get deleteButton() {
    return this._page.container.querySelector(".remove-item");
  }

  /**
   * Returns the change status chip element (present when changeStatus is set)
   */
  get changeChip() {
    return this._page.container.querySelector(".chips");
  }

  /**
   * Returns the revert button element (present when the permission is removed)
   */
  get revertButton() {
    return this._page.container.querySelector(".revert-item");
  }

  /**
   * Returns true if the item has the permission-removed CSS class
   */
  get isRemoved() {
    return Boolean(this._page.container.querySelector("li.permission-removed"));
  }

  /**
   * Returns true if the item has the suspended CSS class
   */
  get isSuspended() {
    return Boolean(this._page.container.querySelector("li.suspended"));
  }

  /**
   * Returns the varies info icon element (present when variesDetails is set)
   */
  get variesIcon() {
    return this._page.container.querySelector(".varies-icon");
  }

  /**
   * Returns the fingerprint SVG trigger element inside the aro-name
   */
  get fingerprintIcon() {
    return this._page.container.querySelector(".aro-name .tooltip-portal");
  }

  /**
   * Returns true if the permission select is disabled
   */
  get isPermissionSelectDisabled() {
    return this.permissionSelect.classList.contains("disabled");
  }

  /**
   * Returns true if the delete button is disabled
   */
  get isDeleteButtonDisabled() {
    return this.deleteButton.classList.contains("disabled");
  }

  /**
   * Click the delete button
   */
  async clickDelete() {
    await this.user.click(this.deleteButton);
  }

  /**
   * Click the revert button
   */
  async clickRevert() {
    await this.user.click(this.revertButton);
  }

  /**
   * Open the permission select and return the labels of the offered options.
   * The select excludes its current value from the rendered options.
   * @returns {Promise<Array<string>>}
   */
  async getPermissionSelectOptions() {
    await this.user.click(this.permissionSelect);
    const options = this._page.container.querySelectorAll(".option");
    return Array.from(options).map((option) => option.textContent.trim());
  }

  /**
   * Change the permission by clicking the select and choosing an option by label text
   * @param {string} labelText The option label to select (e.g., "can update")
   */
  async changePermission(labelText) {
    await this.user.click(this.permissionSelect);
    const options = this._page.container.querySelectorAll(".option");
    const target = Array.from(options).find((option) => option.textContent.trim() === labelText);
    await this.user.click(target);
  }

  /**
   * Hover over the fingerprint icon to trigger the tooltip loading
   */
  async hoverFingerprint() {
    await this.user.hover(this.fingerprintIcon);
    await waitFor(() => {});
  }
}
