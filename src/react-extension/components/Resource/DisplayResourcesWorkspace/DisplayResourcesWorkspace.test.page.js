
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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesWorkspace from "./DisplayResourcesWorkspace";

/**
 * The DisplayResourcesWorkspacePage component represented as a page
 */
export default class DisplayResourcesWorkspacePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayResourcesWorkspace {...props}/>
        </Router>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayResourceWorkspacePageObject = new DisplayResourceWorkspacePageObject(this._page.container);
  }

  /**
   * Returns the page object of display PasswordWorkspace
   * @returns {DisplayResourceWorkspacePageObject}
   */
  get displayResourceWorkspacePageObject() {
    return this._displayResourceWorkspacePageObject;
  }
}

/**
 * Page object for the Password Workspace element
 */
class DisplayResourceWorkspacePageObject {
  /**
   * Default constructor
   * @param container The container which includes the PasswordWorkspace Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the panel main element of password workspace
   * @returns {HTMLElement}
   */
  get panelMain() {
    return this._container.querySelector('.panel.main');
  }

  /**
   * Returns the panel left element of password workspace
   * @returns {HTMLElement}
   */
  get panelLeft() {
    return this._container.querySelector('.panel.left');
  }

  /**
   * Returns the panel middle element of password workspace
   * @returns {HTMLElement}
   */
  get panelMiddle() {
    return this._container.querySelector('.panel.middle');
  }

  /**
   * Returns true if the empty sidebar of the password workspace is present
   * @returns {HTMLElement}
   */
  get hasSidebarEmpty() {
    return Boolean(this._container.querySelector('.sidebar.empty'));
  }

  /**
   * Returns true if the multiple resources sidebar of the password workspace is present
   * @returns {HTMLElement}
   */
  get hasSidebarMultipleResources() {
    return Boolean(this._container.querySelector('.sidebar.multiple-resources-selected'));
  }

  /**
   * Returns true if the sidebar resource of the password workspace is present
   * @returns {HTMLElement}
   */
  get hasSidebarResource() {
    return Boolean(this._container.querySelector('.sidebar.resource'));
  }

  /**
   * Returns true if the sidebar folder of the password workspace is present
   * @returns {HTMLElement}
   */
  get hasSidebarFolder() {
    return Boolean(this._container.querySelector('.sidebar.folder'));
  }

  /**
   * Returns the folder tree elements of password workspace
   * @returns {HTMLElement}
   */
  get folderTree() {
    return Boolean(this._container.querySelector('.folder_tree'));
  }

  /**
   * Returns the tag elements of password workspace
   * @returns {HTMLElement}
   */
  get tag() {
    return Boolean(this._container.querySelector('.tag'));
  }

  /**
   * Returns the footer elements of password workspace
   * @returns {HTMLElement}
   */
  get footer() {
    return Boolean(this._container.querySelector('.footer'));
  }

  /**
   * Returns the filter button of password workspace
   * @returns {HTMLElement}
   */
  get filterButton() {
    return Boolean(this._container.querySelector('.actions-filter'));
  }

  /**
   * Returns the info button of password workspace
   * @returns {HTMLElement}
   */
  get infoButton() {
    return this._container.querySelector('.actions-secondary button.info');
  }

  /**
   * Returns the column view button menu elements of password workspace menu
   * @returns {HTMLElement}
   */
  get menuColumnView() {
    return this._container.querySelector('.actions-secondary .dropdown button');
  }

  /**
   * Returns the column view item checkbox elements of password workspace menu
   * @returns {HTMLElement}
   */
  menuColumnViewItem(index) {
    return this._container.querySelectorAll('.actions-secondary .dropdown-content li')[index - 1].querySelector('input[type=\"checkbox\"]');
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.panelMain !== null
      && this.panelLeft !== null && this.panelMiddle !== null;
  }

  /**
   * Simulates a click on the given element.
   * @param {HTMLElement} element
   * @returns {Promise<void>}
   */
  async clickOn(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
