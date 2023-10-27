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
 * @since         4.4.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import UploadQrCode from "./UploadQrCode";

/**
 * The ImportResources component represented as a page
 */
export default class UploadQrCodePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <UploadQrCode {...props}/>
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
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.upload-qr-code-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the input file element
   */
  get inputFile() {
    return this._page.container.querySelector('input[type=\"file\"]');
  }

  /**
   * Returns the import folder input element
   */
  get importFile() {
    return this._page.container.querySelector('.input-file-inline button.button');
  }

  /**
   * Returns the error mesage input element
   */
  get errorMessage() {
    return this._page.container.querySelector('.error-message').textContent;
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

  /** Click to import file */
  async selectImportFile(file) {
    await this.click(this.importFile);
    const data = {target: {files: [file]}};
    fireEvent.change(this.inputFile, data);
    await waitFor(() => {});
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
