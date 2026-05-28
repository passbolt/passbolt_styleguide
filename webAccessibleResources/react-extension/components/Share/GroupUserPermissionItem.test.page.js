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
import GroupUserPermissionItem from "./GroupUserPermissionItem";
import AppContext from "../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";

/**
 * The GroupUserPermissionItem component represented as a page
 */
export default class GroupUserPermissionItemPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <ul>
            <GroupUserPermissionItem {...props} />
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
   * Returns true if the item has the suspended CSS class
   */
  get isSuspended() {
    return Boolean(this._page.container.querySelector("li.suspended"));
  }

  /**
   * Returns the fingerprint tooltip trigger element inside the aro-name
   */
  get fingerprintIcon() {
    return this._page.container.querySelector(".aro-name .tooltip-portal");
  }

  /**
   * Returns the permission select element, or null if not present
   */
  get permissionSelect() {
    return this._page.container.querySelector(".selected-value");
  }

  /**
   * Returns the delete button element, or null if not present
   */
  get deleteButton() {
    return this._page.container.querySelector(".remove-item");
  }

  /**
   * Hover over the fingerprint icon to trigger the tooltip loading
   */
  async hoverFingerprint() {
    await this.user.hover(this.fingerprintIcon);
    await waitFor(() => {});
  }
}
