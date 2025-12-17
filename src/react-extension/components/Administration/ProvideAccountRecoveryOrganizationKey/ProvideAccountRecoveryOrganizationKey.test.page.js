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
 * @since         3.6.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ProvideAccountRecoveryOrganizationKey from "./ProvideAccountRecoveryOrganizationKey";

/**
 * The ProvideAccountRecoveryOrganizationKeyPage component represented as a page
 */
export default class ProvideAccountRecoveryOrganizationKeyPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ProvideAccountRecoveryOrganizationKey {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );

    this.bindFunctions();
  }

  bindFunctions() {
    this.checkFieldIsNotEmpty = this.checkFieldIsNotEmpty.bind(this);
    this.checkPageIsProcessing = this.checkPageIsProcessing.bind(this);
    this.checkOrkFieldErrorIsPresent = this.checkOrkFieldErrorIsPresent.bind(this);
    this.checkPasswordFieldErrorPresent = this.checkPasswordFieldErrorPresent.bind(this);
  }

  /**
   * Runs the the current page's querySelector and return its result;
   * @param {string} selection
   * @returns {object}
   */
  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  /**
   * Returns the dialog's title HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.selector(".dialog .dialog-header .dialog-header-title");
  }

  /**
   * Returns the ORK field
   * @returns {HTMLElement}
   */
  get orkField() {
    return this.selector("#organization-recover-form-key");
  }

  /**
   * Returns the password field
   * @returns {HTMLElement}
   */
  get passwordField() {
    return this.selector("#generate-organization-key-form-password");
  }

  /**
   * Returns the file input button
   * @returns {HTMLElement}
   */
  get fileUploadField() {
    return this.selector(".input-file-inline input");
  }

  /**
   * Returns the file browse input
   * @returns {HTMLElement}
   */
  get browseInput() {
    return this.selector(".provide-organization-recover-key-dialog .input.file input");
  }

  /**
   * Returns the form's submit button
   * @returns {HTMLElement}
   */
  get submitButton() {
    return this.selector('.dialog .submit-wrapper [type="submit"]');
  }

  /**
   * Returns the ORK error HTML element
   * @returns {HTMLElement}
   */
  get orkFieldError() {
    return this.selector(".provide-organization-recover-key-dialog .key.error-message");
  }

  /**
   * Returns the password field error HTML Element
   * @returns {HTMLElement}
   */
  get passwordFieldError() {
    return this.selector(".provide-organization-recover-key-dialog .password.error-message");
  }

  /**
   * Simulates a file input on the browser input
   * @returns {Promise<void>}
   */
  async chooseFile(fileData) {
    const file = new File([fileData.content], fileData.fileName, { type: fileData.contentType });
    fireEvent.change(this.browseInput, {
      target: {
        files: [file],
      },
    });
    await waitFor(() => this.checkFieldIsNotEmpty(this.orkField));
  }

  /**
   * Simulates an input on the password field
   * @returns {Promise<void>}
   */
  async setPassword(password) {
    fireEvent.change(this.passwordField, { target: { value: password } });
    await waitFor(() => this.checkFieldIsNotEmpty(this.passwordField));
  }

  /**
   * Simulates a click on the submit button
   * @returns {Promise<void>}
   */
  async submitForm(waitForCallback) {
    fireEvent.click(this.submitButton, { button: 0 });
    await waitFor(() => waitForCallback());
  }

  /**
   * Throw an error if the given field is empty
   * @throws {Error}
   * @returns {undefined}
   * @private
   */
  checkFieldIsNotEmpty(field) {
    if (!field || field.value === "") {
      throw new Error("Field is not ready");
    }
  }

  /**
   * Throw an error if the page is not processing
   * @throws {Error}
   * @returns {undefined}
   * @private
   */
  checkPageIsProcessing() {
    if (!this.orkField || this.orkField.getAttribute("disabled") !== null) {
      throw new Error("Page is not processing");
    }
  }

  /**
   * Throw an error if the ORK error message is not present
   * @throws {Error}
   * @returns {undefined}
   * @private
   */
  checkOrkFieldErrorIsPresent() {
    if (!this.orkFieldError) {
      throw new Error("Ork field error is not present");
    }
  }

  /**
   * Throw an error if the password error message is not present
   * @throws {Error}
   * @returns {undefined}
   * @private
   */
  checkPasswordFieldErrorPresent() {
    if (!this.passwordFieldError) {
      throw new Error("password field error is not present");
    }
  }
}
