
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
import ShareDialog from "./ShareDialog";
import AppContext from "../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ShareDialog component represented as a page
 */
export default class ShareDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <ShareDialog {...props} listMinSize={20}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title").textContent;
  }

  /**
   * Returns the dialog subtitle
   */
  get subtitle() {
    return this._page.container.querySelector(".dialog-header-subtitle").textContent;
  }

  /**
   * Returns the dialog element
   */
  get form() {
    return this._page.container.querySelector('.share-form');
  }
  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the autocomplete share name input element
   */
  get shareNameInput() {
    return this._page.container.querySelector('#share-name-input');
  }

  /**
   * Returns the warning message element
   */
  get warningMessage() {
    return this._page.container.querySelector('.message.warning').textContent;
  }

  /**
   * Returns the error message element
   */
  get errorMessage() {
    return this._page.container.querySelector('.error.message').textContent;
  }

  /**
   * Get user or group autocomplete for the index one
   * @returns {Element}
   */
  userOrGroupAutocomplete(index) {
    return this._page.container.querySelectorAll('#autocomplete-item .row .main-cell-wrapper .main-cell button')[index - 1];
  }

  /**
   * Returns the number of displayed users and groups
   */
  get count() {
    return this._page.container.querySelectorAll('.permissions .row .aro-name').length;
  }

  /**
   * Returns the user first name and last name for the 'index' one
   * @param index the display of the user
   */
  aroName(index) {
    return this._page.container.querySelectorAll('.permissions .row .aro-name')[index - 1].querySelector('.ellipsis').textContent;
  }

  /**
   * Returns the user email for the 'index' one
   * @param index the display of the user email
   */
  aroDetails(index) {
    return this._page.container.querySelectorAll('.permissions .row .aro-details')[index - 1].querySelector('.ellipsis').textContent;
  }

  /**
   * Returns the select rights for the 'index' one
   * @param index the display of the permission
   */
  selectRights(index) {
    return this._page.container.querySelectorAll('.permissions .row')[index - 1].querySelector('.select .selected-value');
  }

  /**
   * Returns the select item rights for the 'index' one
   * @param index the display of the permission
   */
  selectFirstItem(index) {
    return this._page.container.querySelectorAll('.permissions .row')[index - 1].querySelector('.select .option');
  }

  /**
   * Returns the close button to remove user for the 'index' one
   * @param index the display close button to remove user
   */
  removeAro(index) {
    return this._page.container.querySelectorAll('.permissions .row')[index - 1].querySelector('.remove-item');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.form !== null;
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
    fireEvent.keyDown(this.form, escapeKeyDown);
  }

  /** fill the input element with data */
  async fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => {});
  }

  /** fill the search autocomplete input element with data */
  async searchName(data)  {
    await this.fillInput(this.shareNameInput, data);
  }

  /** Select a user or a group in autocmplete for the index one */
  async selectUserOrGroup(index) {
    await this.click(this.userOrGroupAutocomplete(index));
  }

  /** Select is owner rights */
  async selectFirstItemRights(index) {
    await this.click(this.selectRights(index));
    await this.click(this.selectFirstItem(index));
  }

  /** Save permissions */
  async savePermissions() {
    await this.click(this.saveButton);
  }

  /** Save permissions without wait */
  savePermissionsWithoutWait() {
    this.clickWithoutWaitFor(this.saveButton);
  }

  /**remove permission*/
  async selectRemovePermission(index) {
    await this.click(this.removeAro(index));
  }
}
