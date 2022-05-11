
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
 * @since         2.11.0
 */


import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import DisplayGroups from "./FilterUsersByGroup";
import DisplayGroupsFilterContextualMenuPageObject from "./FilterUsersByGroupContextualMenu.test.page";
import ManageContextualMenu from "../../Common/ContextualMenu/ManageContextualMenu";
import ContextualMenuContextProvider from "../../../contexts/ContextualMenuContext";
import DisplayGroupsContextualMenuPageObject from "./DisplayGroupContextualMenu.test.page";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The FilterUsersByGroups component represented as a page
 */
export default class FilterUsersByGroupPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <ContextualMenuContextProvider>
              <ManageContextualMenu/>
              <DisplayGroups {...props}/>
            </ContextualMenuContextProvider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._displayGroupList = new DisplayGroupPageObject(this._page.container);
    this._displayGroupFilterContextualMenu = new DisplayGroupsFilterContextualMenuPageObject(this._page.container);
    this._displayGroupContextualMenu = new DisplayGroupsContextualMenuPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display groups
   */
  get displayGroupList() {
    return this._displayGroupList;
  }

  /**
   * Returns the page object of display groups filter contextual menu
   */
  get displayFilterContextualMenu() {
    return this._displayGroupFilterContextualMenu;
  }

  /**
   * Returns the page object of display groups contextual menu
   */
  get displayGroupContextualMenu() {
    return this._displayGroupContextualMenu;
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddActivity Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get hyperlink() {
    return this._container.querySelector(".folders-label");
  }

  /**
   * Returns the clickable area of the filter
   */
  get filterButton() {
    return this._container.querySelector('.row.title .dropdown.right-cell.more-ctrl a');
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}

class DisplayGroupPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the list elements of activities
   */
  get list() {
    return this._container.querySelector('.accordion-content');
  }

  /**
   * Returns the loading element
   */
  get loadingMessage() {
    return this._container.querySelector('.processing-text');
  }

  /**
   * Returns the empty content element
   */
  get emptyContent() {
    return this._container.querySelector('.empty-content');
  }

  /**
   * Returns the clickable area of the more group
   */
  get moreButton() {
    return this._container.querySelector('.group-item .dropdown.right-cell.more-ctrl a');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.list !== null;
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving groups';
  }

  /**
   * Returns true
   */
  isEmpty() {
    return this.emptyContent !== null && this.emptyContent.innerHTML === 'empty';
  }

  /**
   * Returns the number of displayed groups
   */
  count() {
    return this.list.querySelectorAll('.group-item').length;
  }

  /**
   * return the group for the 'index' one
   * @param index
   */
  group(index) {
    return this.list.querySelectorAll('.group-item')[index - 1].querySelector('.row .main-cell-wrapper .main-cell a');
  }

  /**
   * Returns the displayed group name for the 'index' one
   * @param index The display rank of name's group
   */
  name(index) {
    return this.list.querySelectorAll('.group-item')[index - 1].querySelector('.ellipsis').textContent;
  }

  /**
   * Wait for the activities to be loaded while an in-progress function should be satisfied
   * @param inProgressFn An in-progress function
   * @returns {Promise<void>} The promise that the load operation is completed
   */
  async waitForLoading(inProgressFn) {
    await waitFor(inProgressFn);
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
