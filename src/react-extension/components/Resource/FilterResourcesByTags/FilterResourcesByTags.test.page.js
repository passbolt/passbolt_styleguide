
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
import ManageContextualMenu from "../../Common/ContextualMenu/ManageContextualMenu";
import ContextualMenuContextProvider from "../../../contexts/ContextualMenuContext";
import FilterResourcesByTagsContextualMenuPageObject from "./FilterResourcesByTagsContextualMenu.test.page";
import FilterResourcesByTagsListContextualMenuPageObject from "./FilterResourcesByTagsListContextualMenu.test.page";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import FilterResourcesByTags from "./FilterResourcesByTags";
import {DragContext} from "../../../contexts/DragContext";
import DialogContextProvider from "../../../contexts/DialogContext";
import ManageDialogs from "../../../components/Common/Dialog/ManageDialogs/ManageDialogs";

/**
 * The FilterResourcesByTags component represented as a page
 */
export default class FilterResourcesByTagsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props, resourceWorkspaceContext) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DialogContextProvider>
            <Router>
              <ManageDialogs/>
              <ResourceWorkspaceContext.Provider value={resourceWorkspaceContext}>
                <ContextualMenuContextProvider>
                  <ManageContextualMenu/>
                  <DragContext.Provider value={props.dragContext}>
                    <FilterResourcesByTags.WrappedComponent {...props}/>
                  </DragContext.Provider>
                </ContextualMenuContextProvider>
              </ResourceWorkspaceContext.Provider>
            </Router>
          </DialogContextProvider>
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
    this._sidebarTagFilterSection = new SidebarTagFilterSectionPageObject(this._page.container);
    this._sidebarTagFilterSectionsContextualMenu = new FilterResourcesByTagsContextualMenuPageObject(this._page.container);
    this._displayTagListContextualMenu = new FilterResourcesByTagsListContextualMenuPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display tags
   */
  get sidebarTagFilterSection() {
    return this._sidebarTagFilterSection;
  }

  /**
   * Returns the page object of display tags filter contextual menu
   */
  get sidebarTagFilterSectionsContextualMenu() {
    return this._sidebarTagFilterSectionsContextualMenu;
  }

  /**
   * Returns the page object of display tags contextual menu
   */
  get displayTagListContextualMenu() {
    return this._displayTagListContextualMenu;
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

class SidebarTagFilterSectionPageObject {
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
   * Returns the clickable area of the more tag
   */
  get moreButton() {
    return this._container.querySelector('.tag-item .dropdown.right-cell.more-ctrl a');
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
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving tags';
  }

  /**
   * Returns true
   */
  isEmpty() {
    return this.emptyContent !== null && this.emptyContent.innerHTML === 'empty';
  }

  /**
   * Returns the number of displayed tags
   */
  count() {
    return this.list.querySelectorAll('.tag-item').length;
  }

  /**
   * return the tag for the 'index' one
   * @param index
   */
  get tagSelected() {
    return this.list.querySelector('.tag-item .row.selected .main-cell-wrapper .main-cell a');
  }

  /**
   * return the tag for the 'index' one
   * @param index
   */
  tag(index) {
    return this.list.querySelectorAll('.tag-item')[index - 1].querySelector('.row .main-cell-wrapper .main-cell a');
  }

  /**
   * return the tag classname for the 'index' one
   * @param index
   */
  tagClassname(index) {
    return this.list.querySelectorAll('.tag-item')[index - 1].querySelector('.row').className.trim();
  }

  /**
   * Returns the displayed tag name for the 'index' one
   * @param index The display rank of name's tag
   */
  name(index) {
    return this.list.querySelectorAll('.tag-item')[index - 1].querySelector('.tag-name').textContent;
  }

  get errorDialogExist() {
    return this._container.querySelector('.error-dialog') !== null;
  }

  get errorDialogMessageExist() {
    return this._container.querySelector('.error-dialog .dialog .dialog-content .form-content') !== null;
  }

  /**
   * Drop on the tag
   */
  onDropTag(index) {
    return this.drop(this.tag(index));
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
}
