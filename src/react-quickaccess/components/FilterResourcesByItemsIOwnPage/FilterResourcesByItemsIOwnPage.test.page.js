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
 * @since         4.9.4
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import { createMemoryHistory } from "history";
import FilterResourcesByItemsIOwnPage from "./FilterResourcesByItemsIOwnPage";

/**
 * The FilterResourcesByItemsIOwnPage component represented as a page
 */
export default class FilterResourcesByItemsIOwnPagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <FilterResourcesByItemsIOwnPage {...props} />
        </Router>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the displayed resources if any
   * @returns {NodeListOf<HTLMElement>}
   */
  get resources() {
    return this._page.container.querySelectorAll(".list-items .browse-resource-entry");
  }

  /**
   * Returns a resource by its index if any
   * @param {number} index
   * @returns {HTLMElement|null}
   */
  getResource(index) {
    return this.resources[index] ?? null;
  }

  /**
   * Returns the back button element
   * @returns {HTLMElement}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link a");
  }

  /**
   * Returns the create button
   * @returns {HTMLElement}
   */
  get createButton() {
    return this._page.container.querySelector(".submit-wrapper #popupAction");
  }

  /**
   * Returns the main message currently displayed
   * @returns {string|null}
   */
  get displayedMainMessage() {
    return this._page.container.querySelector(".empty-entry")?.textContent || null;
  }

  /**
   * Simulates a click on the nth resource given by the index
   * @returns {Promise<void>}
   */
  async clickOnResource(index) {
    const element = this.getResource(index)?.querySelector(".inline-resource-entry");
    fireEvent.click(element, { button: 0 });
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async clickOnBackButton() {
    fireEvent.click(this.backButton, { button: 0 });
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the create button
   * @returns {Promise<void>}
   */
  async clickOnCreateButton() {
    fireEvent.click(this.createButton, { button: 0 });
    await waitFor(() => {});
  }
}
