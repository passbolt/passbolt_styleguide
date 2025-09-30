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
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";

/**
 * The DisplayResourcesWorkspaceMainMenuPage component represented as a page
 */
export default class DisplayResourcesWorkspaceMainMenuPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourcesWorkspaceMainMenu {...props}/>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayMenu = new DisplayMainMenuPageObject(this._page.container);
  }

  /**
   * Returns the page object of display comments
   */
  get displayMenu() {
    return this._displayMenu;
  }
}

/**
 * Page object for the main menu element
 */
class DisplayMainMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the menu elements of password workspace menu
   */
  get menu() {
    return this._container.querySelector('.dropdown');
  }

  /**
   * Returns the create menu elements of password workspace menu
   */
  get createMenu() {
    return this._container.querySelector('.dropdown button.create.primary');
  }

  /**
   * Returns true if the create menu is disabled elements of password workspace menu
   */
  hasCreateMenuDisabled() {
    return this.createMenu.hasAttribute("disabled");
  }

  /**
   * Returns the import menu elements of password workspace menu
   */
  get importMenu() {
    return this._container.querySelector('#import_action');
  }

  /**
   * Returns the new password menu elements of password workspace menu
   */
  get newPasswordMenu() {
    return this._container.querySelector('#password_action');
  }

  /**
   * Returns the new folder menu elements of password workspace menu
   */
  get newFolderMenu() {
    return this._container.querySelector('#folder_action');
  }

  /**
   * Returns the new totp menu elements of password workspace menu
   */
  get newTotpMenu() {
    return this._container.querySelector('#totp_action');
  }

  /**
   * Returns the new custom fields menu elements of password workspace menu
   * @return {HTMLElement}
   */
  get newCustomFieldsMenu() {
    return this._container.querySelector('#custom_fields_action');
  }

  /**
   * Returns the new standalone note menu elements of password workspace menu
   * @return {HTMLElement}
   */
  get newStandaloneNoteMenu() {
    return this._container.querySelector('#standalone_note_action');
  }

  /**
   * Returns the new other menu elements of password workspace menu
   */
  get newOtherMenu() {
    return this._container.querySelector('#other_action');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.menu !== null;
  }

  /** Click on the action menu */
  async clickOnMenu(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
