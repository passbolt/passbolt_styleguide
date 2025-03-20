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
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayUsersWorkspaceFilterBar from "./DisplayUsersWorkspaceFilterBar";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUsersWorkspaceFilters component represented as a page
 */
export default class DisplayUsersWorkspaceFilterBarPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <Router>
        <MockTranslationProvider>
          <DisplayUsersWorkspaceFilterBar.WrappedComponent {...props}/>
        </MockTranslationProvider>
      </Router>
    );
  }

  /**
   * Returns the filter users
   */
  get filterUsers() {
    return this._page.container.querySelector('.actions-filter');
  }

  /**
   * Returns the filter selected element
   */
  get filterSelected() {
    return this._page.container.querySelector('.actions-filter div.button-action-filtered span')?.textContent;
  }

  /**
   * Returns the dropdown button
   * @returns {Element}
   */
  get dropdownFilterButton() {
    return this._page.container.querySelector('.dropdown .button-dropdown');
  }

  /**
   * Open the dropdown button
   * @returns {Promise<void>}
   */
  async openDropdownFilterButton() {
    const leftClick = {button: 0};
    fireEvent.click(this.dropdownFilterButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns the number of filter item element
   */
  get filterItemsLength() {
    return this._page.container.querySelectorAll('.dropdown .dropdown-content.menu button').length;
  }

  /**
   * Returns the filter element
   */
  async selectFilter(index) {
    const element = this._page.container.querySelectorAll('.dropdown .dropdown-content.menu button')[index - 1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Remove selected filter
   * @returns {Promise<void>}
   */
  async removeSelectedFilter() {
    const element = this._page.container.querySelector('.actions-filter div.button-action-filtered button.button-transparent');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.filterUsers !== null;
  }
}
