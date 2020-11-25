
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
import {BrowserRouter as Router} from 'react-router-dom';
import FoldersTree from "./FoldersTree";
import {FoldersTreeItemPageObject} from "./FoldersTreeItem.test.page";

/**
 * The FolderTree component represented as a page
 */
export default class FoldersTreePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <Router>
          <FoldersTree.WrappedComponent {...props}/>
        </Router>
      </AppContext.Provider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._foldersTree = new FoldersTreePageObject(this._page.container);
    this._foldersTreeItem = new FoldersTreeItemPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display folders tree
   */
  get foldersTree() {
    return this._foldersTree;
  }

  /**
   * Returns the page object of display folders tree item
   */
  get foldersTreeItem() {
    return this._foldersTreeItem;
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the FolderTree Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get hyperlink() {
    return this._container.querySelectorAll(".folders-label span")[1];
  }

  /** Click on the component */
  async click()  {
    const leftClick = {button: 0};
    fireEvent.click(this.hyperlink, leftClick);
    await waitFor(() => {});
  }
}

class FoldersTreePageObject {
  /**
   * Default constructor
   * @param container The container which includes the FolderTree Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the folder tree component
   */
  get component() {
    return this._container.querySelector('.folders.navigation.first.accordion');
  }

  /**
   * Returns the root folder
   */
  get rootFolder() {
    return this._container.querySelectorAll('.folders-label span')[1];
  }

  /**
   * Returns the root folder caret
   */
  get rootFolderCaret() {
    return this._container.querySelector('.folders-label span svg');
  }

  /**
   * Returns the root folder
   */
  get rootFolderName() {
    return this.rootFolder.textContent;
  }

  /**
   * Returns the more button root folder
   */
  get moreButton() {
    return this._container.querySelector('.accordion-header .node.root .row.title .main-cell-wrapper .right-cell.more-ctrl a');
  }

  /**
   * Returns the list of folders
   */
  get displayFolderList() {
    return this._container.querySelector('.folders-tree') !== null;
  }

  /**
   * Returns the empty content element
   */
  get emptyContent() {
    return this._container.querySelector('.empty-content');
  }

  /**
   * Returns true
   */
  isEmpty() {
    return this.emptyContent !== null && this.emptyContent.innerHTML === 'empty';
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.component !== null;
  }

  /**
   * Expand or collapse the folders list
   */
  async toggleExpanded() {
    await this.click(this.rootFolderCaret);
  }

  /**
   * Open the contextual menu with the button
   */
  get openContextualMenuWithButton() {
    return this.click(this.moreButton);
  }

  /**
   * Open the contextual menu with the button
   */
  get openContextualMenuWithRightClick() {
    return this.rightClick(this.rootFolder);
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /** Right click on the component */
  async rightClick(component)  {
    fireEvent.contextMenu(component);
    await waitFor(() => {});
  }

  /** Drop on the component */
  async drop(component)  {
    fireEvent.drop(component);
    await waitFor(() => {});
  }

  /** Drag over on the component */
  async dragOver(component)  {
    fireEvent.dragOver(component);
    await waitFor(() => {});
  }

  /** Drag over on the component */
  async dragLeave(component)  {
    fireEvent.dragLeave(component);
    await waitFor(() => {});
  }

  /**
   * Drop on the root folder
   */
  get onDrop() {
    return this.drop(this.rootFolder);
  }

  /**
   * Drop on the root folder
   */
  get onDragOver() {
    return this.dragOver(this.rootFolder);
  }

  /**
   * Drop on the root folder
   */
  get onDragLeave() {
    return this.dragLeave(this.rootFolder);
  }
}





