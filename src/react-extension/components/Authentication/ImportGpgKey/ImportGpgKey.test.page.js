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
 * @since         3.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ImportGpgKey from "./ImportGpgKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The CreateGpgKeyPage component represented as a page
 */
export default class ImportGpgKeyPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ImportGpgKey {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('h1').textContent;
  }

  /**
   * Returns the private key input
   */
  get privateKeyInput() {
    return this._page.container.querySelector('textarea');
  }

  /**
   * Returns the current value of the private key
   */
  get privateKey() {
    return this.privateKeyInput.value;
  }

  /**
   * Returns true if an empty private key error appears
   */
  get hasEmptyPrivateKeyError() {
    return Boolean(this._page.container.querySelector('.empty-private-key'));
  }

  /**
   * Returns true if an invalid private key error appears
   */
  get hasInvalidPrivateKeyError() {
    return Boolean(this._page.container.querySelector('.invalid-private-key'));
  }

  /**
   * Returns true if an invalid private key error appears
   */
  get invalidPrivateKeyErrorMessage() {
    return this._page.container.querySelector('.invalid-private-key').textContent;
  }

  /**
   * Returns the verify button element
   */
  get verifyButton() {
    return this._page.container.querySelector('.form-actions .button.primary');
  }

  /**
   * Returns the secondary action link element
   */
  get secondaryActionLink() {
    return this._page.container.querySelector('.form-actions a');
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.verifyButton.classList.contains('processing');
  }

  /**
   * Returns true if one can go to the next step
   */
  get canGoToNextStep() {
    return !this.verifyButton.classList.contains('disabled');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.privateKeyInput.hasAttribute('disabled');
  }

  get warningMessage() {
    return this._page.container.querySelector('.warning-message').textContent;
  }

  /**
   * Change the private key input value
   * @param privateKey The new passphrase
   */
  async fill(privateKey) {
    fireEvent.change(this.privateKeyInput, {target: {value: privateKey}});
    await waitFor(() => {});
  }

  /**
   * Generate the key
   * @param inProgressFn Function called while the generation
   */
  async verifyKey(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.verifyButton, leftClick);
    await waitFor(inProgressFn);
  }

  /**
   * Click on the secondary action link.
   */
  async clickSecondaryActionLink(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.secondaryActionLink, leftClick);
    await waitFor(inProgressFn);
  }
}
