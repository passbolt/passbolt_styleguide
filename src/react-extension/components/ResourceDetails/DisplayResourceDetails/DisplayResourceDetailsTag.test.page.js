
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
import EditResourceTagsItemViewerPageObject from "../../ResourceTag/EditResourceTags/EditResourceTagsItemViewer.test.page";
import EditResourceTagsPageObject from "../../ResourceTag/EditResourceTags/EditResourceTags.test.page";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";

/**
 * The PasswordSidebarTagSection component represented as a page
 */
export default class PasswordSidebarTagSectionPage {
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
            <DisplayResourceDetailsTag  {...props}/>
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
    this._passwordSidebarTagSection = new PasswordSidebarTagSectionPageObject(this._page.container);
    this._tagEditor = new EditResourceTagsPageObject(this._page.container);
    this._tagItemViewer = new EditResourceTagsItemViewerPageObject(this._page.container);
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
  get passwordSidebarTagSection() {
    return this._passwordSidebarTagSection;
  }

  /**
   * Returns the page object of display groups filter contextual menu
   */
  get tagEditor() {
    return this._tagEditor;
  }

  /**
   * Returns the page object of display groups contextual menu
   */
  get tagItemViewer() {
    return this._tagItemViewer;
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
    return this._container.querySelector(".accordion-header h4 a");
  }

  /** Click on the title */
  async click()  {
    const leftClick = {button: 0};
    fireEvent.click(this.hyperlink, leftClick);
    await waitFor(() => {});
  }
}

class PasswordSidebarTagSectionPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the content elements of tags
   */
  get content() {
    return this._container.querySelector('.accordion-content');
  }

  /**
   * Returns the loading element
   */
  get editIcon() {
    return this._container.querySelector('.section-action span');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.content !== null;
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

  /** Click without wait for on the component */
  clickWithoutWaitFor(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
  }

  /** change input value on the component */
  async input(component, data)  {
    const options = {target: {textContent: data}};
    fireEvent.input(component, options);
    await waitFor(() => {});
  }

  /** enter key pressed on the component */
  async enterKeyPressed(component)  {
    const enterKeyPressed = {keyCode: 13};
    fireEvent.keyPress(component, enterKeyPressed);
    await waitFor(() => {});
  }

  /** comma key pressed on the component */
  async commaKeyPressed(component)  {
    const commaKeyPressed = {charCode: 44};
    fireEvent.keyPress(component, commaKeyPressed);
    await waitFor(() => {});
  }

  /** backspace key down on the component */
  async backspaceKeyDown(component)  {
    const backspaceKeyDown = {keyCode: 8};
    fireEvent.keyDown(component, backspaceKeyDown);
    await waitFor(() => {});
  }

  /** escape key down on the component */
  async escapeKeyDown(component)  {
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(component, escapeKeyDown);
    await waitFor(() => {});
  }

  /** up arrow key down on the component */
  async upArrowKeyDown(component)  {
    const upArrowPressed = {keyCode: 38};
    fireEvent.keyDown(component, upArrowPressed);
    await waitFor(() => {});
  }

  /** down arrow key down on the component */
  async downArrowKeyDown(component)  {
    const downArrowPressed = {keyCode: 40};
    fireEvent.keyDown(component, downArrowPressed);
    await waitFor(() => {});
  }
}
