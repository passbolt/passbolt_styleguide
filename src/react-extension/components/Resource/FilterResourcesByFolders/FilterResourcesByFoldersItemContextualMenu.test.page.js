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
import AppContext from "../../../contexts/AppContext";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";

/**
 * The FilterResourcesByFoldersItemContextualMenuPage component represented as a page
 */
export default class FilterResourcesByFoldersItemContextualMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <FilterResourcesByFoldersItemContextualMenu {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._filterResourcesByFoldersItemContextualMenuPageObject = new FilterResourcesByFoldersItemContextualMenuPageObject(this._page.container);
  }

  /**
   * Returns the page object of display folders tree item contextual menu
   */
  get filterResourcesByFoldersItemContextualMenu() {
    return this._filterResourcesByFoldersItemContextualMenuPageObject;
  }
}

export class FilterResourcesByFoldersItemContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the FoldersTreeItemContextualMenu Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu item clickable for the index one
   */
  menuItem(index) {
    return this._container.querySelectorAll('li .row .main-cell-wrapper .main-cell a')[index - 1];
  }

  /**
   * Returns the name for the index one
   */
  name(index) {
    return this._container.querySelectorAll('li .row .main-cell-wrapper .main-cell a')[index - 1].textContent;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the menu create folder
   */
  async createFolder() {
    await this.click(this.menuItem(1));
  }

  /**
   * Click on the menu rename folder
   */
  async renameFolder() {
    await this.click(this.menuItem(2));
  }

  /**
   * Click on the menu share folder
   */
  async shareFolder() {
    await this.click(this.menuItem(3));
  }

  /**
   * Click on the menu export folder
   */
  async exportFolder() {
    await this.click(this.menuItem(4));
  }

  /**
   * Click on the menu delete folder
   */
  async deleteFolder() {
    await this.click(this.menuItem(5));
  }
}
