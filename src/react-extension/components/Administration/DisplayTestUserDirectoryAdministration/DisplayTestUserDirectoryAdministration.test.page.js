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
import DisplayTestUserDirectoryAdministration from "./DisplayTestUserDirectoryAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayTestUserDirectoryAdministration component represented as a page
 */
export default class DisplayTestUserDirectoryAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayTestUserDirectoryAdministration {...props}/>
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
    this._displayTestUserDirectoryAdministrationDialog = new DisplayTestUserDirectoryAdministrationDialogPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of create user
   */
  get displayTestUserDirectoryAdministrationDialog() {
    return this._displayTestUserDirectoryAdministrationDialog;
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
    return this._container.querySelector(".dialog-header-title");
  }
}

class DisplayTestUserDirectoryAdministrationDialogPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._container.querySelector('.ldap-test-settings-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the test settings report element
   */
  get testSettingsReport() {
    return this._container.querySelector('.ldap-test-settings-report');
  }

  /**
   * Returns the users and groups found element
   */
  get usersAndGroupsFound() {
    return this._container.querySelector('.ldap-test-settings-report p').textContent;
  }

  /**
   * Returns the list test report element
   */
  get list() {
    return this._container.querySelector('.accordion.directory-list .accordion-header');
  }

  /**
   * Returns the structure test report element
   */
  get structure() {
    return this._container.querySelector('.accordion.accordion-directory-structure .accordion-header');
  }

  /**
   * Returns the errors test report element
   */
  get errorsList() {
    return this._container.querySelector('.accordion.accordion-directory-errors .accordion-header');
  }

  /**
   * Returns the groups list element
   */
  get groupsList() {
    return this._container.querySelectorAll('.accordion.directory-list .accordion-content table tbody tr')[1].querySelectorAll('td')[0].querySelectorAll('div');
  }

  /**
   * Returns the users list element
   */
  get usersList() {
    return this._container.querySelectorAll('.accordion.directory-list .accordion-content table tbody tr')[1].querySelectorAll('td')[1].querySelectorAll('div');
  }

  /**
   * Returns the structure groups element
   */
  get structureGroups() {
    return this._container.querySelectorAll('.accordion.accordion-directory-structure .accordion-content .directory-structure ul li.group ul li.group');
  }

  /**
   * Returns the structure users element
   */
  get structureUsers() {
    return this._container.querySelectorAll('.accordion.accordion-directory-structure .accordion-content .directory-structure ul li.group ul li.user');
  }

  /**
   * Returns the number of errors element
   */
  get errors() {
    return this._container.querySelector('.directory-errors.error').textContent;
  }

  /**
   * Returns the error textarea element
   */
  get errorsTextarea() {
    return this._container.querySelector('.accordion.accordion-directory-errors .accordion-content .directory-errors textarea');
  }

  /**
   * Returns the error textarea element
   */
  get buttonOk() {
    return this._container.querySelector('.button.primary');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.testSettingsReport !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }
}
