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
import { fireEvent, render, waitFor } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import ExportResources from "./ExportResources";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import { ExportPoliciesSettingsContext } from "../../../contexts/ExportPoliciesSettingsContext";

/**
 * The ExportResources component represented as a page
 */
export default class ExportResourcesPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <ExportPoliciesSettingsContext.Provider value={props.exportPoliciesSettingsContext}>
            <ExportResources {...props} />
          </ExportPoliciesSettingsContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>,
      { legacyRoot: true },
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
  get form() {
    return this._page.container.querySelector(".form-content");
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Returns the input file element
   */
  get select() {
    return this._page.container.querySelector("#export-format .selected-value");
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
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the CSV warning checkbox element
   */
  get csvWarningCheckbox() {
    return this._page.container.querySelector("#csv-warning-accept");
  }

  /**
   * Returns the CSV warning label element
   */
  get csvWarningLabel() {
    return this._page.container.querySelector('label[for="csv-warning-accept"]');
  }

  /**
   * Returns the CSV warning checkbox container element
   */
  get csvWarningContainer() {
    return this._page.container.querySelector(".form-content .input.checkbox");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /**
   * Returns the export format label text
   */
  get exportFormatLabel() {
    return this._page.container.querySelector('label[for="export-format"]')?.textContent;
  }

  /**
   * Returns the list of all export format items (selected + dropdown options)
   */
  get exportFormatItems() {
    const selectedValue = this._page.container.querySelector("#export-format .selected-value")?.textContent;
    const optionValues = Array.from(this._page.container.querySelectorAll("#export-format .option")).map(
      (el) => el.textContent,
    );
    return [selectedValue, ...optionValues].filter(Boolean);
  }

  /**
   * Returns the export format element
   */
  getLocaleList(index) {
    return this._page.container.querySelectorAll("#export-format .option")[index - 1];
  }

  /** Click on the element */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  escapeKey() {
    // Escape key down event
    const escapeKeyDown = { keyCode: 27 };
    fireEvent.keyDown(this.form, escapeKeyDown);
  }

  /** Click on save button */
  async submitExport() {
    await this.click(this.exportButton);
  }

  /** Click on save button */
  submitExportWithoutWaiting() {
    const leftClick = { button: 0 };
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

  /** Click on select item for the index one */
  async selectFormat(index) {
    await this.click(this.select);
    await this.click(this.getLocaleList(index));
  }

  /** Click on CSV warning checkbox */
  async clickCsvWarningCheckbox() {
    await this.click(this.csvWarningCheckbox);
  }
}
