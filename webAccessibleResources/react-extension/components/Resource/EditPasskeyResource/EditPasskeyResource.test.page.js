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
 * @since         5.18.0
 */

import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import { ResourceTypesLocalStorageContext } from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import EditPasskeyResource from "./EditPasskeyResource";

/**
 * The EditPasskeyResource component represented as a page
 */
export default class EditPasskeyResourcePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <ResourceTypesLocalStorageContext.Provider
            value={{ get: () => props.resourceTypes, resourceTypes: props.resourceTypes }}
          >
            <EditPasskeyResource {...props} />
          </ResourceTypesLocalStorageContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the dialog title
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title");
  }

  /**
   * Returns the name input
   */
  get name() {
    return this._page.container.querySelector("#resource-name");
  }

  /**
   * Returns the resource icon button opening the appearance form
   */
  get iconButton() {
    return this._page.container.querySelector(".resource-icon button");
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type="submit"]');
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Replace the name input value
   * @param {string} name The new name
   */
  async typeName(name) {
    await this.user.clear(this.name);
    await this.user.type(this.name, name);
  }

  /**
   * Clear the name input
   */
  async clearName() {
    await this.user.clear(this.name);
  }

  /**
   * Click on the element
   * @param {HTMLElement} element The element to click on
   */
  async click(element) {
    await this.user.click(element);
  }
}
