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

import {fireEvent, render, waitFor} from "@testing-library/react";
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
        <ProvideAccountRecoveryOrganizationKey {...props}/>
      </MockTranslationProvider>
    );

    this.bindFunctions();
  }

  bindFunctions() {
    this.checkFieldIsNotEmpty = this.checkFieldIsNotEmpty.bind(this);
    this.checkPageIsProcessing = this.checkPageIsProcessing.bind(this);
    this.checkOrkFieldErrorIsPresent = this.checkOrkFieldErrorIsPresent.bind(this);
    this.checkPasswordFieldErrorPresent = this.checkPasswordFieldErrorPresent.bind(this);
  }

  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  get title() {
    return this.selector('.dialog .dialog-header .dialog-header-title');
  }

  get orkField() {
    return this.selector('#organization-recover-form-key');
  }

  get passwordField() {
    return this.selector('#generate-organization-key-form-password');
  }

  get fileUploadField() {
    return this.selector('.input-file-inline input');
  }

  get browseInput() {
    return this.selector('.provide-organization-recover-key-dialog .input.file input');
  }

  get submitButton() {
    return this.selector('.dialog .submit-wrapper [type="submit"]');
  }

  get orkFieldError() {
    return this.selector('.provide-organization-recover-key-dialog .key.error-message');
  }

  get passwordFieldError() {
    return this.selector('.provide-organization-recover-key-dialog .password.error-message');
  }

  async chooseFile(fileData) {
    const file =  new File([fileData.content], fileData.fileName, {type: fileData.contentType});
    fireEvent.change(this.browseInput, {
      target: {
        files: [file]
      }
    });
    await waitFor(() => this.checkFieldIsNotEmpty(this.orkField));
  }

  async setPassword(password) {
    fireEvent.change(this.passwordField, {target: {value: password}});
    await waitFor(() => this.checkFieldIsNotEmpty(this.passwordField));
  }

  async submitForm(waitForCallback) {
    fireEvent.click(this.submitButton, {button: 0});
    await waitFor(() => waitForCallback());
  }

  async checkFieldIsNotEmpty(field) {
    if (!field || field.value === "") {
      throw new Error("Field is not ready");
    }
  }

  checkPageIsProcessing() {
    if (!this.orkField || this.orkField.getAttribute("disabled") !== null) {
      throw new Error("Page is not processing");
    }
  }

  checkOrkFieldErrorIsPresent() {
    if (!this.orkFieldError) {
      throw new Error("Ork field error is not present");
    }
  }

  checkPasswordFieldErrorPresent() {
    if (!this.passwordFieldError) {
      throw new Error("password field error is not present");
    }
  }
}
