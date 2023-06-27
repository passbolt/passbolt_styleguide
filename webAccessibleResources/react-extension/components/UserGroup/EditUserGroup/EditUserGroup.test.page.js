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
import EditUserGroup from "./EditUserGroup";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The EsitUserGroupTestPage component represented as a page
 */
export default class EditUserGroupTestPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <Router>
        <MockTranslationProvider>
          <AppContext.Provider value={appContext}>
            <DialogContextProvider>
              <ManageDialogs/>
              <EditUserGroup {...props}/>
            </DialogContextProvider>
          </AppContext.Provider>
        </MockTranslationProvider>
      </Router>
    );
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._page.container.querySelector('#group-name-input');
  }

  /**
   * Return the group name input
   */
  get groupName() {
    return this.name.value;
  }

  /**
   * Set a value to the group name input
   * @param value The new group name
   */
  set groupName(value) {
    const element = this._page.container.querySelector('#group-name-input');
    const inputEvent = {target: {value: value}};
    fireEvent.change(element, inputEvent);
  }

  /**
   * Returns the group name error message if exists
   */
  get groupNameErrorMessage() {
    return this._page.container.querySelector('.name.error-message').textContent;
  }

  get hasNoManager() {
    return this._page.container.querySelector('.at-least-one-manager');
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the confirm button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns the close button
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the number of group members
   */
  get groupMembersCount() {
    return this._page.container.querySelectorAll('.permissions.groups_users .row').length;
  }

  /**
   * Returns true if one can add a new user to the group
   */
  get canAdd() {
    return ! this._page.container.querySelector('.cannot-add-user');
  }

  /**
   * Returns the name warning mesage input element
   */
  get nameWarningMessage() {
    return this._page.container.querySelector('.name.warning-message');
  }

  /**
   * Returns the username input
   */
  get usernameInput() {
    return this._page.container.querySelector('#user-name-input');
  }

  /**
   * Returns the nth items in the autocomplete list
   * @param {integer} index
   * @returns {HTMLElement}
   */
  getAutocompleteItem(index) {
    const autocompleteItems = this._page.container.querySelectorAll('#autocomplete-item .row.selected .main-cell-wrapper .main-cell button');
    return autocompleteItems[index];
  }

  /**
   * Returns the i-th group member
   * @param index The rank of the group member
   */
  groupMember(index) {
    const element = this._page.container.querySelectorAll('.permissions.groups_users .row')[index - 1];
    return {
      get role() {
        const value =  element.querySelector('.select .value').textContent;
        return value ? "Group Manager" : "Member";
      },
      set role(index) {
        const roleElement = element.querySelector('.select .value');
        fireEvent.click(roleElement);
        const roleItem = element.querySelectorAll('.select .option')[index - 1];
        fireEvent.click(roleItem);
      },
      get name() {
        return element.querySelector('.aro-name span').innerHTML;
      }
    };
  }

  /**
   * Removes the index-th member from the group
   */
  async removeGroupMember(index) {
    const element = this._page.container.querySelectorAll('.permissions.groups_users .row')[index - 1].querySelector('.remove-item');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Saves the change on the group
   */
  async save() {
    const leftClick = {button: 0};
    fireEvent.click(this.saveButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Saves the change on the group without waiting for React stability
   */
  saveWithoutWaitFor() {
    const leftClick = {button: 0};
    fireEvent.click(this.saveButton, leftClick);
  }

  /**
   * Cancels the user's MFA disable
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Close the dialog
   */
  async close() {
    const leftClick = {button: 0};
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }

  async type(text, element) {
    fireEvent.input(element, {
      target: {
        value: text
      }
    });

    await waitFor(() => {
      if (element.value !== text) {
        throw new Error("The field has not changed yet.");
      }
    });
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

  async click(element) {
    const event = {button: 0};
    fireEvent.click(element, event);
    await waitFor(() => {});
  }
}
