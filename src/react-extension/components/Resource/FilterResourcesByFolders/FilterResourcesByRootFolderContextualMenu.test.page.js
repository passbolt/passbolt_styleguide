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
import FilterResourcesByRootFolderContextualMenu from "./FilterResourcesByRootFolderContextualMenu";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The FoldersTreeRootFolderContextualMenu component represented as a page
 */
export default class FoldersTreeRootFolderContextualMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <FilterResourcesByRootFolderContextualMenu {...props}/>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._foldersTreeRootFolderContextualMenu = new FoldersTreeRootFolderContextualMenuPageObject(this._page.container);
  }

  /**
   * Returns the page object of display folders tree root folder contextual menu
   */
  get foldersTreeRootFolderContextualMenu() {
    return this._foldersTreeRootFolderContextualMenu;
  }
}

export class FoldersTreeRootFolderContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the FoldersTreeRootFolderContextualMenu Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu RootFolder clickable for the index one
   */
  menuRootFolder(index) {
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
   * Click on the menu create folder
   */
  async createFolder() {
    await this.click(this.menuRootFolder(1));
  }

  /**
   * Click on the menu export folder
   */
  async exportFolder() {
    await this.click(this.menuRootFolder(2));
  }
}
