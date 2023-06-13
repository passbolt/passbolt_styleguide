
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
import ExportResourcesCredentials from "./ExportResourcesCredentials";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ExportResourcesCredentials component represented as a page
 */
export default class ExportResourcesCredentialsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <ExportResourcesCredentials {...props}/>
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
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.export-password-dialog');
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
    return this._page.container.querySelector('.input.file button.button.primary');
  }


  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#password');
  }

  /**
   * Returns the password view element
   */
  get passwordView() {
    return this._page.container.querySelector('.password-view');
  }

  /**
   * Returns the save button element
   */
  get exportButton() {
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
  async selectKeypassFile(file) {
    await this.click(this.importFile);
    const data = {target: {files: [file]}};
    fireEvent.change(this.inputFile, data);
    await waitFor(() => {});
  }

  /** checked import tag */
  async fillPassword(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.password, dataInputEvent);
    await waitFor(() => {});
  }

  /** Click on continue import button */
  async selectExport() {
    await this.click(this.exportButton);
  }

  /** Click on save button */
  submitExportWithoutWaiting() {
    const leftClick = {button: 0};
    fireEvent.click(this.exportButton, leftClick);
  }

  /** Click on cancel button */
  async cancelExport() {
    await this.click(this.cancelButton);
  }

  /** Click on close dialog button */
  async closeDialog() {
    await this.click(this.dialogClose);
  }

  /** Click on password view button */
  async showPassword() {
    await this.click(this.passwordView);
  }
}
