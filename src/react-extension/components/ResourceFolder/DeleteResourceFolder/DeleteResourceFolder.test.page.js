
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
import AppContext from "../../../contexts/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DeleteResourceFolder from "./DeleteResourceFolder";

/**
 * The DeleteResourceFolderPage component represented as a page
 */
export default class DeleteResourceFolderPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider  value={appContext}>
          <DeleteResourceFolder {...props}></DeleteResourceFolder>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }


  /**
   * Returns true it one can cancel the operation
   */
  get canCancel() {
    return !Boolean(this._page.container.querySelector('.cancel.disabled')).valueOf();
  }

  /**
   * Returns true it one can close the dialog
   */
  get canClose() {
    return !Boolean(this._page.container.querySelector('.dialog-close.disabled')).valueOf();
  }

  /**
   * Returns true it one can submit the create operation
   */
  get canSubmit() {
    return !Boolean(this._page.container.querySelector('button[type="submit"].disabled')).valueOf();
  }

  /**
   * Returns true it one can change the data
   */
  get canChangeData() {
    return !this._page.container.querySelector('#delete-cascade').hasAttribute('disabled');
  }

  /**
   * Set the flag that determines whether the subfolders must be deleted
   * @param value
   */
  set mustDeleteSubfolders(value) {
    const input = this._page.container.querySelector('#delete-cascade');
    const leftClick = {button: 0};
    fireEvent.click(input, leftClick);
  }
  /**
   * Returns the delete button element
   */
  get deleteButton() {
    return this._page.container.querySelector('button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the close button element
   */
  get closeButton() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Delete the folder
   * @param mustDeleteSubfolders True if one wants to delete the subfolders
   * @param inProgressFn Function called while we wait for React stability
   */
  async delete(mustDeleteSubfolders, inProgressFn = () => {}) {
    if (mustDeleteSubfolders) {
      this.mustDeleteSubfolders = mustDeleteSubfolders;
      await waitFor(() => {});
    }
    const leftClick = {button: 0};
    fireEvent.click(this.deleteButton, leftClick);
    await waitFor(inProgressFn);
  }


  /**
   * Cancels the create operation
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }


  /**
   * Close the create operation
   */
  async close() {
    const leftClick = {button: 0};
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }
}
