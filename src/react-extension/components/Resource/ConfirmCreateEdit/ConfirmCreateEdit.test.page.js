/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.9.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ConfirmCreateEdit from "./ConfirmCreateEdit";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
/**
 * The ConfirmCreateEditPage component represented as a page
 */
export default class ConfirmCreateEditPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmCreateEdit {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title").textContent;
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.confirm-create-edit-password-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the rule element
   */
  get rule() {
    return this._page.container.querySelectorAll('.form-content p')[0].textContent;
  }

  /**
   * Returns the operation element
   */
  get operation() {
    return this._page.container.querySelectorAll('.confirm-create-edit-password-dialog .form-content p')[1].textContent;
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
  get exists() {
    return this.dialog !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }

  /** Click on save button */
  async save() {
    await this.click(this.saveButton);
  }

  /** Click on save button */
  saveWithoutWaiting() {
    const leftClick = {button: 0};
    fireEvent.click(this.saveButton, leftClick);
  }

  /** Click on cancel button */
  async cancel() {
    await this.click(this.cancelButton);
  }

  /** Click on close dialog button */
  async closeDialog() {
    await this.click(this.dialogClose);
  }
}
