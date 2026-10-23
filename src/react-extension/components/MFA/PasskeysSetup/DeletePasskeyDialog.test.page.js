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
import DeletePasskeyDialog from "./DeletePasskeyDialog";

/**
 * The DeletePasskeyDialog component represented as a page
 */
export default class DeletePasskeyDialogPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DeletePasskeyDialog {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector(".delete-passkey-dialog");
  }

  /**
   * Returns the dialog title
   */
  get title() {
    return this._page.container.querySelector(".dialog-header h2 span");
  }

  /**
   * Returns the passkey name
   */
  get passkeyName() {
    return this._page.container.querySelector(".dialog-variable");
  }

  /**
   * Returns the close button
   */
  get closeButton() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Returns the submit button
   */
  get submitButton() {
    return this._page.container.querySelector('.submit-wrapper [type="submit"]');
  }

  /**
   * Returns the submit button in processing state
   */
  get submitButtonProcessing() {
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
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the element without waiting
   * @param {Element} element
   */
  clickWithoutWaitFor(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
  }

  /**
   * Press the escape key on the dialog
   */
  escapeKey() {
    const escapeKeyDown = { keyCode: 27 };
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }
}
