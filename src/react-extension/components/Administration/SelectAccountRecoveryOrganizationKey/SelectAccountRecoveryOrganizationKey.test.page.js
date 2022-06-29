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
import SelectAccountRecoveryOrganizationKey from "./SelectAccountRecoveryOrganizationKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

const GENERATE_TAB_INDEX = 1;

/**
 * The SelectAccountRecoveryOrganizationKeyPage component represented as a page
 */
export default class SelectAccountRecoveryOrganizationKeyPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <SelectAccountRecoveryOrganizationKey {...props} />
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the Select Account Recovery Organization Key Dialog
   */
  get selectAccountRecoveryOrganizationKeyDialog() {
    return this._page.container.querySelector('.organization-recover-key-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .dialog-header-title');
  }

  /**
   * Returns all the available tabs
   */
  get tabs() {
    return this._page.container.querySelectorAll('.organization-recover-key-dialog.dialog-wrapper .tab');
  }

  /**
   * Get the title in the tab "Import"
   */
  get imoprtKeyTitle() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key label[for="organization-recover-form-key"]');
  }

  /**
   * Get the textarea in the tab "Import"
   */
  get importKeyTextArea() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key #organization-recover-form-key');
  }

  /**
   * Get the file input in the tab "Import"
   */
  get browseInput() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key input[type="file"]');
  }

  /**
   * Get the text in the pro tip box
   */
  get proTipDescription() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .message.notice').textContent;
  }

  /**
   * Get the link found in the pro tip box
   */
  get proTipLink() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .message.notice a[href]');
  }

  /**
   * Get the "Apply" button
   */
  get applyButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .submit-wrapper button[type="submit"]');
  }

  /**
   * Get the HTML element that holds the error message of the "Import" form
   */
  get importErrorMessage() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key .error-message');
  }

  get nameField() {
    return this._page.container.querySelector('#generate-organization-key-form-name');
  }

  get emailField() {
    return this._page.container.querySelector('#generate-organization-key-form-email');
  }

  get algorithmField() {
    return this._page.container.querySelector('#generate-organization-key-form-algorithm');
  }

  get keySizeField() {
    return this._page.container.querySelector('#generate-organization-key-form-key-size');
  }

  get passphraseField() {
    return this._page.container.querySelector('#generate-organization-key-form-password');
  }

  get showPassphraseButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password-view');
  }

  get securityToken() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .security-token');
  }

  get passphraseStrength() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password-complexity');
  }

  get warningImportInstead() {
    return this._page.container.querySelector('#generate-organization-key-setting-overridden-banner');
  }

  get cancelButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .cancel');
  }

  get generateButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .submit-wrapper button[type="submit"]');
  }

  get generateTab() {
    return this._page.container.querySelectorAll('.organization-recover-key-dialog.dialog-wrapper .tabs .tab a')[GENERATE_TAB_INDEX];
  }

  get algorithmTooltip() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key [for="generate-organization-key-form-algorithm"] .tooltip .tooltip-text');
  }

  get keySizeTooltip() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key [for="generate-organization-key-form-keySize"] .tooltip .tooltip-text');
  }

  get nameFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .name.error-message');
  }

  get emailFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .email.error-message');
  }

  get passphraseFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password.error-message');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.selectAccountRecoveryOrganizationKeyDialog !== null;
  }

  /**
   * Returns true if the current selected tab is the "Import" one
   * @returns bool
   */
  isImportKeyTabSelected() {
    return this._page.container.querySelector(".organization-recover-key-dialog.dialog-wrapper .tabs-active-content form .import-organization-key") !== null;
  }

  /**
   * Returns true if the current selected tab is the "Generate" one
   * @returns bool
   */
  isGenerateTabSeletect() {
    return this._page.container.querySelector(".organization-recover-key-dialog.dialog-wrapper .tabs-active-content .generate-organization-key") !== null;
  }

  /**
   * Return true if the given field is marked as required
   * @return bool
   */
  isFieldRequired(field) {
    return field.className.indexOf("required") !== -1;
  }

  /**
   * Simulates a user having selected a file from the OS.
   *
   * @param {string} fileContent
   * @param {function} waitForCallback
   */
  async userHasSelectedAFile(fileContent, waitForCallback) {
    fireEvent.change(this.browseInput, {
      target: {
        files: [new File([fileContent], 'file.txt', {type: 'plain/text'})],
      },
    });

    await waitFor(waitForCallback);
  }

  /**
   * Simulates a click on the "Apply" button
   * @param {function} waitForCallback
   */
  async applyChanges(waitForCallback) {
    const leftClick = {button: 0};
    fireEvent.click(this.applyButton, leftClick);

    await waitFor(waitForCallback);
  }

  async clickOnGenerateTab(waitForCallback) {
    const leftClick = {button: 0};
    fireEvent.click(this.generateTab, leftClick);

    await waitFor(waitForCallback);
  }

  async toggleShowPassword(waitForCallback) {
    const leftClick = {button: 0};
    fireEvent.click(this.showPassphraseButton, leftClick);

    await waitFor(waitForCallback);
  }

  async clickOnGenerateButton(waitForCallback) {
    const leftClick = {button: 0};
    fireEvent.click(this.generateButton, leftClick);

    await waitFor(waitForCallback);
  }

  async type(text, element) {
    fireEvent.input(element, {
      target: {
        value: text
      }
    });

    await waitFor(() => {
      if (element.value !== text) {
        throw new Error("The field has not changed yet.");
      }
    });
  }
}
