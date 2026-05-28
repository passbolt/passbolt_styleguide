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
import { render } from "@testing-library/react";
import React from "react";
import GroupPermissionItem from "./GroupPermissionItem";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";

/**
 * The GroupPermissionItem component represented as a page
 */
export default class GroupPermissionItemPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ul>
          <GroupPermissionItem {...props} />
        </ul>
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the name element text (group name)
   */
  get name() {
    return this._page.container.querySelector(".aro-name .ellipsis").textContent;
  }

  /**
   * Returns the details element text ("Group")
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
   * Returns true if the item has the permission-updated CSS class
   */
  get isUpdated() {
    return Boolean(this._page.container.querySelector("li.permission-updated"));
  }

  /**
   * Returns the group member visibility toggle button element
   */
  get groupVisibilityToggle() {
    return this._page.container.querySelector(".group-visibility-toggle");
  }

  /**
   * Returns the attention icon element (present when variesDetails is set)
   */
  get attentionIcon() {
    return this._page.container.querySelector(".attention-required");
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
   * Click the group member visibility toggle button
   */
  async clickGroupVisibilityToggle() {
    await this.user.click(this.groupVisibilityToggle);
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
}
