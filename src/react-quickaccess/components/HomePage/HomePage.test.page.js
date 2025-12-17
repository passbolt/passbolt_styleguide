/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import HomePage from "./HomePage";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import { createMemoryHistory } from "history";

/**
 * The HomePage component represented as a page
 */
export default class HomePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <HomePage {...props} />
        </Router>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the suggested resources if any
   * @returns {NodeListOf<HTLMElement>}
   */
  get suggestedResourcesContent() {
    return this._page.container.querySelectorAll(".list-section .list-items")[0];
  }

  /**
   * Returns the suggested resources if any
   * @returns {NodeListOf<HTLMElement>}
   */
  get suggestedResourcesEntries() {
    return this._page.container.querySelectorAll(".list-section .list-items .suggested-resource-entry");
  }

  /**
   * Returns a suggested resource if any
   * @returns {HTLMElement | null}
   */
  getSuggestedResourceItem(index) {
    return this.suggestedResourcesEntries?.[index] || null;
  }

  /**
   * Returns a browsed resource if any
   * @returns {HTLMElement | null}
   */
  getBrowsedResourceItem(index) {
    return this.browsedResources?.[index] || null;
  }

  /**
   * Returns the list section filter entries
   * @returns {NodeListOf<Element>}
   */
  get browsedResources() {
    return this._page.container.querySelectorAll(".list-section .list-items .browse-resource-entry");
  }

  /**
   * Returns the list section filter entries
   * @returns {NodeListOf<Element>}
   */
  get browsedResourcesContent() {
    return this._page.container.querySelectorAll(".list-section .list-items")[0];
  }

  /**
   * Returns the list section title
   * @returns {string}
   */
  get browseListTitle() {
    return this._page.container.querySelectorAll(".list-section .list-title")[1].textContent;
  }

  /**
   * Returns the list section filter entries
   * @returns {NodeListOf<Element>}
   */
  get browserEntries() {
    return this._page.container.querySelectorAll(".list-section .list-items")[1].querySelectorAll(".filter-entry");
  }

  /**
   * Has tag filter entry?
   * @returns {boolean}
   */
  get hasTagFilterEntry() {
    return this.browserEntries.length > 2;
  }

  /**
   * Returns the Filters section in the browse entries
   * @returns {HTMLElement}
   */
  get filtersSection() {
    return this.browserEntries[0].querySelector(".filter-title");
  }

  /**
   * Returns the Groups section in the browse entries
   * @returns {HTMLElement}
   */
  get groupsSection() {
    return this.browserEntries[1].querySelector(".filter-title");
  }

  /**
   * Returns the tag filter entry
   * @returns {HTMLElement}
   */
  get tagsSection() {
    return this.browserEntries[2].querySelector(".filter-title");
  }

  /**
   * Returns the create button
   * @returns {HTMLElement}
   */
  get createButton() {
    return this._page.container.querySelector(".submit-wrapper #popupAction");
  }

  /**
   * Returns error message if any
   * @returns {HTMLElement}
   */
  get useOnThisTabError() {
    return this._page.container.querySelector(".submit-wrapper .error-message");
  }

  /**
   * Simulates a click on the nth suggested resource given by the index
   * @returns {Promise<void>}
   */
  async clickOnSuggestedResource(index) {
    const element = this.getSuggestedResourceItem(index)?.querySelector("button");
    fireEvent.click(element, { button: 0 });
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the nth suggested resource given by the index
   * @returns {Promise<void>}
   */
  async clickOnBrowsedResource(index) {
    const element = this.getBrowsedResourceItem(index)?.querySelector(".inline-resource-entry");
    fireEvent.click(element, { button: 0 });
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
