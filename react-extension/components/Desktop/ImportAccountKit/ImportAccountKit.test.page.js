/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ImportAccountKit from "./ImportAccountKit";

/**
 * The ImportAccountKit component represented as a page
 */
export default class ImportAccountKitPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ImportAccountKit {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the import account kit parent class
   */
  get importAccountKit() {
    return this._page.container.querySelector(".import-account-kit");
  }

  /**
   * Returns the upload input parent
   */
  get uploadParent() {
    return this._page.container.querySelector(".input");
  }

  /**
   * Returns the upload label
   */
  get uploadLabel() {
    return this.uploadParent.querySelector("label");
  }

  /**
   * Returns the browse input
   */
  get browseInput() {
    return this.uploadParent.querySelector("#dialog-upload-account-kit-input");
  }

  /**
   * Returns the upload accept file type
   */
  get uploadAcceptFile() {
    return this.browseInput.getAttribute("accept");
  }

  /**
   * Returns the filename
   */
  get uploadFilename() {
    return this._page.container.querySelector("#upload-account-kit-input");
  }

  /**
   * Returns the upload button
   */
  get uploadButton() {
    return this._page.container.querySelector(".input-file-inline button");
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector(".error-message");
  }

  /**
   * Returns true if a error appears
   */
  get hasError() {
    return Boolean(this.errorMessage);
  }

  /**
   * Returns the help message
   */
  get getHelpMessage() {
    return this._page.container.querySelector(".link");
  }

  /**
   * Returns the save button element
   */
  get importButton() {
    return this._page.container.querySelector('.form-actions button[type=\"submit\"]');
  }

  /**
   * Choose file to upload
   * @param {*} fileData
   */
  async chooseFile(fileData) {
    const file = new File([fileData.content], fileData.name, { type: fileData.contentType });
    fireEvent.change(this.browseInput, {
      target: {
        files: [file],
      },
    });
    await waitFor(() => this.checkFieldIsNotEmpty(this.uploadFilename));
  }

  /**
   * Check if field is populated
   * @param {*} field
   */
  async checkFieldIsNotEmpty(field) {
    if (!field || field.value === "") {
      throw new Error("Field is not ready");
    }
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.importAccountKit !== null;
  }
  /**
   * Click on the element
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
