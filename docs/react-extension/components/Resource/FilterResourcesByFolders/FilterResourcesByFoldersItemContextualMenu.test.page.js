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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";

/**
 * The FilterResourcesByFoldersItemContextualMenuPage component represented as a page
 */
export default class FilterResourcesByFoldersItemContextualMenuPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <FilterResourcesByFoldersItemContextualMenu {...props}/>
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
    return this._container.querySelectorAll('li .row .main-cell-wrapper .main-cell button')[index - 1];
  }

  /**
   * Returns the name for the index one
   */
  name(index) {
    return this._container.querySelectorAll('li .row .main-cell-wrapper .main-cell button')[index - 1].textContent;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get createItem() {
    return this._container.querySelector('button.create');
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get renameItem() {
    return this._container.querySelector('button.rename');
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get shareItem() {
    return this._container.querySelector('button.share');
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get exportItem() {
    return this._container.querySelector('button.export');
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get deleteItem() {
    return this._container.querySelector('button.delete');
  }

  /**
   * Click on the menu create folder
   */
  async createFolder() {
    await this.click(this.createItem);
  }

  /**
   * Click on the menu rename folder
   */
  async renameFolder() {
    await this.click(this.renameItem);
  }

  /**
   * Click on the menu share folder
   */
  async shareFolder() {
    await this.click(this.shareItem);
  }

  /**
   * Click on the menu export folder
   */
  async exportFolder() {
    await this.click(this.exportItem);
  }

  /**
   * Click on the menu delete folder
   */
  async deleteFolder() {
    await this.click(this.deleteItem);
  }
}
