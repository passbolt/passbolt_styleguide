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
 * @since         3.4.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import SelectAccountRecoveryOrganizationKey from "./SelectAccountRecoveryOrganizationKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ConfirmSaveAccountRecoverySettings component represented as a page
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
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key .input-file-chooser-wrapper input');
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
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .submit-wrapper input[type="submit"]');
  }

  /**
   * Get the HTML element that holds the error message of the "Import" form
   */
  get errorMessage() {
    return this._page.container.querySelector('.organization-recover-key-dialog.dialog-wrapper .form-content.import-organization-key .error-message');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.accountRecoverySettings !== null;
  }

  /**
   * Returns true if the current selected tab is the "Import" one
   * @returns bool
   */
  isImportKeyTabSelected() {
    return this._page.container.querySelector(".organization-recover-key-dialog.dialog-wrapper .tabs-active-content form .import-organization-key") !== null;
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
}
