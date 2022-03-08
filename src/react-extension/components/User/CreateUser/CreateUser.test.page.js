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
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/DialogContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import CreateUser from "./CreateUser";

/**
 * The CreateUser component represented as a page
 */
export default class CreateUserPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DialogContextProvider>
            <ManageDialogs/>
            <CreateUser {...props}/>
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
    this._createUser = new CreateUserPageObject(this._page.container);
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
  get createUser() {
    return this._createUser;
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

class CreateUserPageObject {
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
    return this._container.querySelector('.user-create-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the first name input element
   */
  get firstName() {
    return this._container.querySelector('#user-first-name-input');
  }

  /**
   * Returns the first name error mesage input element
   */
  get firstNameErrorMessage() {
    return this._container.querySelector('.first_name.error-message');
  }

  /**
   * Returns the last name input element
   */
  get lastName() {
    return this._container.querySelector('#user-last-name-input');
  }

  /**
   * Returns the last name error mesage input element
   */
  get lastNameErrorMessage() {
    return this._container.querySelector('.last_name.error-message');
  }

  /**
   * Returns the username / email input element
   */
  get username() {
    return this._container.querySelector('#user-username-input');
  }

  /**
   * Returns the email error mesage input element
   */
  get usernameErrorMessage() {
    return this._container.querySelector('.username.error-message');
  }

  /**
   * Returns the is admin checkbox element
   */
  get isAdmin() {
    return this._container.querySelector('#is_admin_checkbox');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the save button processing element
   */
  get saveButtonProcessing() {
    return this._container.querySelector('.submit-wrapper button[type=\"submit\"].processing');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._container.querySelector('.submit-wrapper .cancel');
  }

  get errorDialog() {
    return this._container.querySelector('.error-dialog');
  }

  get errorDialogMessage() {
    return this._container.querySelector('.error-dialog .dialog .dialog-content .form-content');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  clickWithoutWaitFor(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /** Click without wait for on the element */
  escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }
}





