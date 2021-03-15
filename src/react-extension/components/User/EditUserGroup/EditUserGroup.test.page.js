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
import ManageDialogs from "../../../../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../../react/contexts/Common/DialogContext";
import EditUserGroup from "./EditUserGroup";
import {BrowserRouter as Router} from "react-router-dom";

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
        <AppContext.Provider value={appContext}>
          <DialogContextProvider>
            <ManageDialogs/>
            <EditUserGroup {...props}/>
          </DialogContextProvider>
        </AppContext.Provider>
      </Router>
    );
  }

  /**
   * Return the group name input
   */
  get groupName() {
    return this._page.container.querySelector('#group-name-input').value;
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
    return this._page.container.querySelector('.name.error.message').textContent;
  }

  get hasNoManager() {
    return this._page.container.querySelector('.at-least-one-manager');
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper input[type=\"submit\"]');
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
   * Returns the i-th group member
   * @param index The rank of the group member
   */
  groupMember(index) {
    const element = this._page.container.querySelectorAll('.permissions.groups_users .row')[index - 1];
    return {
      get role() {
        const value =  element.querySelector('.select.rights select').value;
        return value ? "Group Manager" : "Member";
      },
      set role(value) {
        const roleElement = element.querySelector('.select.rights select');
        const inputEvent = {target: {value: value === "Group Manager" ? "true" : "false"}};
        fireEvent.change(roleElement, inputEvent);
      },
      get name() {
        return element.querySelector('.aro-name span').innerHTML;
      }
    };
  }

  /**
   * Add an user to the group
   */
  async addGroupMember(username) {
    const element = this._page.container.querySelector('#user-name-input');
    const inputEvent = {target: {value: username}};
    fireEvent.change(element, inputEvent);
    await waitFor(() => {});
    const autocompleteElement = this._page.container.querySelector('#autocomplete-item .row.selected .main-cell-wrapper .main-cell a');
    const leftClick = {button: 0};
    fireEvent.click(autocompleteElement, leftClick);
    await waitFor(() => {});
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
}
