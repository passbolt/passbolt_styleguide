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
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /*
   * ==================================================
   * Dialog elements
   * ==================================================
   */

  /**
   * Returns the dialog title
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
   * Returns the dialog close button element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type="submit"]');
  }

  /*
   * ==================================================
   * Sections detection
   * ==================================================
   */

  /**
   * Returns true if the resources section exists
   */
  get hasResourcesSection() {
    return this._page.container.querySelector('.resources-section') !== null;
  }

  /**
   * Returns true if the folders section exists
   */
  get hasFoldersSection() {
    return this._page.container.querySelector('.folder-section') !== null;
  }

  /*
   * ==================================================
   * Base section getters
   * ==================================================
   */

  /**
   * Returns the warning resources section element
   */
  get warningResourcesSection() {
    return this._page.container.querySelector('.resources-section .warning-state')?.closest('.accordion-section');
  }

  /**
   * Returns the error resources section element
   */
  get errorResourcesSection() {
    return this._page.container.querySelector('.resources-section .fail-state')?.closest('.accordion-section');
  }

  /**
   * Returns the error folders section element
   */
  get errorFoldersSection() {
    return this._page.container.querySelector('.folder-section .fail-state')?.closest('.accordion-section');
  }

  /*
   * ==================================================
   * Resources warnings
   * ==================================================
   */

  /**
   * Returns true if warnings resources section exists
   */
  get hasWarningsResourcesSection() {
    return Boolean(this.warningResourcesSection);
  }

  /**
   * Returns the warning resources details accordion button
   */
  get warningResourcesDetailsButton() {
    return this.warningResourcesSection?.querySelector('.accordion-header button');
  }

  /**
   * Returns the warning resources debug textarea value
   */
  get warningResourcesDebug() {
    return this.warningResourcesSection?.querySelector('#js_field_debug')?.value;
  }

  /*
   * ==================================================
   * Resources errors
   * ==================================================
   */

  /**
   * Returns true if errors resources section exists
   */
  get hasErrorsResourcesSection() {
    return Boolean(this.errorResourcesSection);
  }

  /**
   * Returns the error resources details accordion button
   */
  get errorResourcesDetailsButton() {
    return this.errorResourcesSection?.querySelector('.accordion-header button');
  }

  /**
   * Returns the error resources debug textarea value
   */
  get errorResourcesDebug() {
    return this.errorResourcesSection?.querySelector('#js_field_debug')?.value;
  }

  /*
   * ==================================================
   * Folders errors
   * ==================================================
   */

  /**
   * Returns true if errors folders section exists
   */
  get hasErrorsFoldersSection() {
    return Boolean(this.errorFoldersSection);
  }

  /**
   * Returns the error folders details accordion button
   */
  get errorFoldersDetailsButton() {
    return this.errorFoldersSection?.querySelector('.accordion-header button');
  }

  /**
   * Returns the error folders debug textarea value
   */
  get errorFoldersDebug() {
    return this.errorFoldersSection?.querySelector('#js_field_folders_debug')?.value;
  }

  /*
   * ==================================================
   * Other elements
   * ==================================================
   */

  /**
   * Returns the result for the index one
   */
  result(index) {
    return this._page.container.querySelectorAll('p strong')[index - 1].textContent;
  }

  /**
   * Returns the reference for the index one
   */
  reference(index) {
    return this._page.container.querySelectorAll('p button')[index - 1];
  }

  /*
   * ==================================================
   * Utility methods
   * ==================================================
   */

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /*
   * ==================================================
   * Interaction methods
   * ==================================================
   */

  /**
   * Click on the element
   * @param {HTMLElement} element The element to click
   */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Trigger escape key on the form
   */
  escapeKey()  {
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.form, escapeKeyDown);
  }

  /**
   * Click on warning resources details accordion button
   */
  async openWarningResourcesDetails() {
    await this.click(this.warningResourcesDetailsButton);
  }

  /**
   * Click on error resources details accordion button
   */
  async openErrorResourcesDetails() {
    await this.click(this.errorResourcesDetailsButton);
  }

  /**
   * Click on error folders details accordion button
   */
  async openErrorFoldersDetails() {
    await this.click(this.errorFoldersDetailsButton);
  }

  /**
   * Filter by reference (tag or folder)
   */
  async filterByReference() {
    await this.click(this.reference(1));
  }

  /**
   * Click on ok button
   */
  async acceptResult() {
    await this.click(this.saveButton);
  }

  /**
   * Click on close dialog button
   */
  async closeDialog() {
    await this.click(this.dialogClose);
  }
}
