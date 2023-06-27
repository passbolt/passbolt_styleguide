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
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../contexts/DialogContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import CreateUserGroup from "./CreateUserGroup";

/**
 * The CreateUserGroup component represented as a page
 */
export default class CreateUserGroupPage {
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
            <CreateUserGroup {...props}/>
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
    this._createGroup = new CreateGroupPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of create group
   */
  get createGroup() {
    return this._createGroup;
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

class CreateGroupPageObject {
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
    return this._container.querySelector('.edit-group-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._container.querySelector('.dialog-close');
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._container.querySelector('#group-name-input');
  }

  /**
   * Returns the name error mesage input element
   */
  get nameErrorMessage() {
    return this._container.querySelector('.name.error-message');
  }

  /**
   * Returns the autocomplete user name input element
   */
  get usernameInput() {
    return this._container.querySelector('#user-name-input');
  }

  /**
   * Returns the warning message element
   */
  get warningMessage() {
    return this._container.querySelector('.message.warning').textContent;
  }

  /**
   * Returns the error message element
   */
  get errorMessage() {
    return this._container.querySelector('.error-message').textContent;
  }

  /**
   * Get user autocomplete
   * @returns {Element}
   */
  get userAutocomplete() {
    return this._container.querySelector('#autocomplete-item .row.selected .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the number of displayed users belong to the group
   */
  count() {
    return this._container.querySelectorAll('.permissions.groups_users .row').length;
  }

  /**
   * Returns the user first name and last name for the 'index' one
   * @param index the display of the user
   */
  userFirstNameLastName(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.ellipsis').textContent;
  }

  /**
   * Returns the user email for the 'index' one
   * @param index the display of the user email
   */
  userEmail(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.email').textContent;
  }

  /**
   * Returns the user fingerprint for the 'index' one
   * @param index the display of the user fingerprint
   */
  userFingerprint(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.fingerprint').textContent;
  }

  /**
   * Returns the select rights for the 'index' one
   * @param index the display of the permission
   */
  selectRights(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.rights .select .selected-value');
  }

  /**
   * Returns the select rights item for the 'index' one
   * @param index the display of the item permission
   */
  selectItem(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.rights .select .option');
  }

  /**
   * Returns the close button to remove user for the 'index' one
   * @param index the display close button to remove user
   */
  removeUser(index) {
    return this._container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.remove-item');
  }

  /**
   * Returns true if the close button is disabled to remove user for the 'index' one
   * @param index the display close button disabled to remove user
   */
  hasRemoveUserDisabled(index) {
    return this.removeUser(index).hasAttribute("disabled");
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

  /**
   * Returns error dialog
   */
  get errorDialog() {
    return this._container.querySelector('.error-dialog');
  }

  /**
   * Returns error dialog message
   */
  get errorDialogMessage() {
    return this._container.querySelector('.error-dialog .dialog .dialog-content .form-content');
  }

  /**
   * Returns the name warning mesage input element
   */
  get nameWarningMessage() {
    return this._container.querySelector('.name.warning-message');
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
  fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** on keypup element */
  keyUpInput(component)  {
    fireEvent.keyUp(component, {keyCode: 38});
  }

  /** select item */
  async selectFirstItem(index)  {
    await this.click(this.selectRights(index));
    await this.click(this.selectItem(index));
  }
}





