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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplaySynchronizeUserDirectoryAdministration from "./DisplaySynchronizeUserDirectoryAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AdminUserDirectoryContextProvider} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";

/**
 * The DisplaySynchronizeUserDirectoryAdministration component represented as a page
 */
export default class DisplaySynchronizeUserDirectoryAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminUserDirectoryContextProvider {...props}>
            <DisplaySynchronizeUserDirectoryAdministration {...props}/>
          </AdminUserDirectoryContextProvider>
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
    this._displaySynchronizeUserDirectoryAdministrationDialog = new DisplaySynchronizeUserDirectoryAdministrationDialogPageObject(this._page.container);
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
  get displaySynchronizeUserDirectoryAdministrationDialog() {
    return this._displaySynchronizeUserDirectoryAdministrationDialog;
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

class DisplaySynchronizeUserDirectoryAdministrationDialogPageObject {
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
    return this._container.querySelector('.ldap-simulate-synchronize-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the respurce synchronize report element
   */
  get resourceSynchronize() {
    return this._container.querySelector('#resources-synchronize').textContent;
  }

  /**
   * Returns the no resource element
   */
  get noResource() {
    return this._container.querySelector('#no-resources');
  }

  /**
   * Returns the error element
   */
  get error() {
    return this._container.querySelector('.error.inline-error').textContent;
  }

  /**
   * Returns the full report element
   */
  get fullReport() {
    return this._container.querySelector('.accordion.operation-details .accordion-header');
  }

  /**
   * Returns the errors test report element
   */
  get textareaReport() {
    return this._container.querySelector('.accordion-content .input.text textarea');
  }

  /**
   * Returns the synchronize button element
   */
  get synchronize() {
    return this._container.querySelector('.submit-wrapper button.primary');
  }

  /**
   * Returns the users list element
   */
  get cancel() {
    return this._container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }
}
