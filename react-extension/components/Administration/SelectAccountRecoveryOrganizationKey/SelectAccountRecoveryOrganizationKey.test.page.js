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
import {waitForTrue} from "../../../../../test/utils/waitFor";
import userEvent from "@testing-library/user-event";

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
      </MockTranslationProvider>,
      {legacyRoot: true}
    );

    this.user = userEvent.setup();
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

  /**
   * Get the "name" input field
   */
  get nameField() {
    return this._page.container.querySelector('#generate-organization-key-form-name');
  }

  /**
   * Get the "email" input field
   */
  get emailField() {
    return this._page.container.querySelector('#generate-organization-key-form-email');
  }

  /**
   * Get the "algorithm" input field
   */
  get algorithmField() {
    return this._page.container.querySelector('#generate-organization-key-form-algorithm');
  }

  /**
   * Get the "key size" input field
   */
  get keySizeField() {
    return this._page.container.querySelector('#generate-organization-key-form-key-size');
  }

  /**
   * Get the "passphrase" input field
   */
  get passphraseField() {
    return this._page.container.querySelector('#generate-organization-key-form-password');
  }

  /**
   * Get the "passphrase" input field
   */
  get passphraseConfirmationField() {
    return this._page.container.querySelector('#generate-organization-key-form-password-confirmation');
  }

  /**
   * Get the "hide/show" passphrase button
   */
  get showPassphraseButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password-view');
  }

  /**
   * Get the "hide/show" passphrase button
   */
  get showPassphraseConfirmationButton() {
    return this._page.container.querySelector('#generate-organization-key-form-password-confirmation + .password-view-wrapper .password-view');
  }

  /**
   * Get the passphrase "security token" element
   */
  get securityToken() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .security-token');
  }

  /**
   * Get the passphrase "entropy" text element
   */
  get passphraseStrength() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password-complexity .complexity-text');
  }

  /**
   * Get the "import key instead" warning banner
   */
  get warningImportInstead() {
    return this._page.container.querySelector('#generate-organization-key-setting-overridden-banner');
  }

  /**
   * Get the "cancel" button
   */
  get cancelButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .cancel');
  }

  /**
   * Get the "generate" button
   */
  get generateButton() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .submit-wrapper button[type="submit"]');
  }

  /**
   * Get the "Generate" tab
   */
  get generateTab() {
    return this._page.container.querySelectorAll('.organization-recover-key-dialog.dialog-wrapper .tabs .tab button')[GENERATE_TAB_INDEX];
  }

  /**
   * Get the "algorithm" associated tooltip element
   */
  get algorithmTooltip() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key [for="generate-organization-key-form-algorithm"] .tooltip .tooltip-text');
  }

  /**
   * Get the "key size" associated tooltip element
   */
  get keySizeTooltip() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key [for="generate-organization-key-form-keySize"] .tooltip .tooltip-text');
  }

  /**
   * Get the "name" error message element
   */
  get nameFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .name.error-message');
  }

  /**
   * Get the "email" error message element
   */
  get emailFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .email.error-message');
  }

  /**
   * Get the "passphrase" error message element
   */
  get passphraseFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password.error-message');
  }

  /**
   * Get the "passphrase confirmation" error message element
   */
  get passphraseConfirmationFieldError() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.generate-organization-key .password-confirmation.error-message');
  }

  /**
   * Returns the password warning mesage input element
   */
  get passwordWarningMessage() {
    return this._page.container.querySelector('.password.warning-message');
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
   * Simulates a click on the element passed
   */
  async applyChanges() {
    await this.user.click(this.applyButton);
  }

  async clickOnGenerateTab() {
    await this.user.click(this.generateTab);
  }

  async toggleShowPassword() {
    await this.user.click(this.showPassphraseButton);
  }

  async toggleShowPasswordConfirmation() {
    await this.user.click(this.showPassphraseConfirmationButton);
  }

  async clickOnGenerateButton(waitForCallback) {
    await this.user.click(this.generateButton);
    await waitFor(waitForCallback);
  }

  async type(text, element) {
    fireEvent.input(element, {
      target: {
        value: text
      }
    });

    await waitForTrue(() => element.value === text);
  }
}
