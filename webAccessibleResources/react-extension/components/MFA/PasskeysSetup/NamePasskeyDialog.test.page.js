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
 * @since         5.17.0
 */
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import NamePasskeyDialog from "./NamePasskeyDialog";

/**
 * The NamePasskeyDialog component represented as a page
 */
export default class NamePasskeyDialogPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <NamePasskeyDialog {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector(".name-passkey-dialog");
  }

  /**
   * Returns the dialog title
   */
  get title() {
    return this._page.container.querySelector(".dialog-header h2 span");
  }

  /**
   * Returns the name input
   */
  get nameInput() {
    return this._page.container.querySelector("#passkey-name-input");
  }

  /**
   * Returns the name error message
   */
  get nameError() {
    return this._page.container.querySelector(".name.error-message");
  }

  /**
   * Returns the authenticator icon
   */
  get icon() {
    return this._page.container.querySelector(".passkey-name-row .passkey-icon");
  }

  /**
   * Returns the close button
   */
  get closeButton() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper [type="submit"]');
  }

  /**
   * Returns the save button in processing state
   */
  get saveButtonProcessing() {
    return this._page.container.querySelector('.submit-wrapper [type="submit"].processing');
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /**
   * Fill the name input
   * @param {string} value
   */
  async fillName(value) {
    fireEvent.change(this.nameInput, { target: { value } });
    await waitFor(() => {});
  }

  /**
   * Save the passkey
   */
  async save() {
    this.saveWithoutWaitFor();
    await waitFor(() => {});
  }

  /**
   * Save the passkey without waiting
   */
  saveWithoutWaitFor() {
    const leftClick = { button: 0 };
    fireEvent.click(this.saveButton, leftClick);
  }

  /**
   * Close the dialog
   */
  async close() {
    const leftClick = { button: 0 };
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Cancel the dialog
   */
  async cancel() {
    const leftClick = { button: 0 };
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }
}
