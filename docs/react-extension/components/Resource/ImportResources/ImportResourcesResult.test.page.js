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
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ImportResourcesResult from "./ImportResourcesResult";

/**
 * The ImportResources component represented as a page
 */
export default class ImportResourcesResultPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={appContext}>
            <ImportResourcesResult.WrappedComponent {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title").textContent;
  }

  /**
   * Returns the form element
   */
  get form() {
    return this._page.container.querySelector(".form-content");
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the result for the index one
   */
  result(index) {
    return this._page.container.querySelectorAll('p strong')[index - 1].textContent;
  }

  /**
   * Returns the reference got the index one
   */
  reference(index) {
    return this._page.container.querySelectorAll('p button')[index - 1];
  }

  /**
   * Returns the error mesage for the index one
   */
  errorMessage(index) {
    return this._page.container.querySelectorAll('.error.inline-error')[index - 1].textContent;
  }

  /**
   * Returns the error details element
   */
  get errorDetails() {
    return this._page.container.querySelector('.accordion-header button');
  }

  /**
   * Returns the error debug textarea element
   */
  get errorDebug() {
    return this._page.container.querySelector('#js_field_debug').value;
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
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
    fireEvent.keyDown(this.form, escapeKeyDown);
  }

  /** Click on close dialog button */
  async openErrorDetails() {
    await this.click(this.errorDetails);
  }

  /** filter by reference (tag or folder) */
  async filterByReference() {
    await this.click(this.reference(1));
  }

  /** Click on ok button */
  async acceptResult() {
    await this.click(this.saveButton);
  }

  /** Click on close dialog button */
  async closeDialog() {
    await this.click(this.dialogClose);
  }
}
