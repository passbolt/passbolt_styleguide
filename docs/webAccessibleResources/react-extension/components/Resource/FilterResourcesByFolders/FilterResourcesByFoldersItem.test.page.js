
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
import FilterResourcesByFoldersItem from "./FilterResourcesByFoldersItem";
import {BrowserRouter as Router} from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {DragContext} from "../../../contexts/DragContext";

/**
 * The FilterResourcesByFolders component represented as a page
 */
export default class FilterResourcesByFoldersItemPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <Router>
          <DragContext.Provider value={props.dragContext}>
            <FilterResourcesByFoldersItem.WrappedComponent {...props}/>
          </DragContext.Provider>
        </Router>
      </AppContext.Provider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._filterResourcesByFoldersItem = new FilterResourcesByFoldersItemPageObject(this._page.container);
  }

  /**
   * Returns the page object of display folders tree item
   */
  get filterResourcesByFoldersItem() {
    return this._filterResourcesByFoldersItem;
  }
}

/**
 * The FoldersTreeItem component represented as a page
 */
export class FilterResourcesByFoldersItemPageObject {
  /**
   * Default constructor
   * @param container The container which includes the FoldersTreeItem Component
   */
  constructor(container) {
    this._container = container;
  }

  get component() {
    return this._container.querySelector('.folder-item');
  }

  /**
   * Returns the folder item for the index one
   */
  item(index) {
    return this._container.querySelectorAll('.folder-name')[index - 1];
  }

  /**
   * Returns the folder item caret for the index one
   */
  itemCaret(index) {
    return this._container.querySelectorAll('li.folder-item .row .main-cell-wrapper .main-cell button')[index - 1].querySelector('span svg');
  }

  /**
   * Returns the name of the folder selected
   */
  get selectedFolderName() {
    return this._container.querySelector('li.folder-item .row.selected').textContent;
  }

  /**
   * Returns the folder item name for the index one
   */
  name(index) {
    return this.item(index).textContent;
  }

  /**
   * Returns the number of folders
   */
  get count() {
    return this._container.querySelectorAll('.folder-name').length;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.component !== null;
  }

  /**
   * Returns the folder item for the index one
   */
  moreButton(index) {
    return this._container.querySelectorAll('li.folder-item .row .right-cell.more-ctrl')[index - 1].querySelector('button');
  }

  /**
   * Filter by the folder item for the index one
   */
  async filter(index) {
    await this.click(this.item(index));
  }

  /**
   * Open the contextual menu with the button
   */
  openContextualMenuWithButton(index) {
    return this.click(this.moreButton(index));
  }

  /**
   * Open the contextual menu with the button
   */
  openContextualMenuWithRightClick(index) {
    return this.rightClick(this.item(index));
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

  /** Drag start on the component */
  async dragStart(component)  {
    const dataTransfer = {setDragImage: jest.fn()};
    fireEvent.dragStart(component, {dataTransfer});
    await waitFor(() => {});
  }

  /** Drag end on the component */
  async dragEnd(component)  {
    fireEvent.dragEnd(component);
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
   * Drag start on the folder for the index one
   */
  async dragStartOnFolder(index) {
    await this.dragStart(this.item(index));
  }

  /**
   * Drag end on the folder for the index one
   */
  async dragEndOnFolder(index) {
    await this.dragEnd(this.item(index));
  }

  /**
   * Drag end on the folder for the index one
   */
  async dragOverOnFolder(index) {
    await this.dragOver(this.item(index));
  }

  /**
   * Drag end on the folder for the index one
   */
  async dragLeaveOnFolder(index) {
    await this.dragLeave(this.item(index));
  }

  /**
   * Drag end on the folder for the index one
   */
  async onDropFolder(index) {
    await this.drop(this.item(index));
  }

  /**
   * Toggle the display of the child folders
   */
  async toggleDisplayChildFolders(index) {
    await this.click(this.itemCaret(index));
  }
}
