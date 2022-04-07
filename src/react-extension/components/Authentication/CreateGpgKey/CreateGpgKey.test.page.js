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
 * @since         3.0.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import CreateGpgKey from "./CreateGpgKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The CreateGpgKeyPage component represented as a page
 */
export default class CreateGpgKeyPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(this.jsx(props));
  }

  /**
   * Get the component jsx
   * @param {object} props Props to attach
   */
  jsx(props) {
    return <MockTranslationProvider>
      <CreateGpgKey {...props}/>
    </MockTranslationProvider>;
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('h1').textContent;
  }

  /**
   * Returns the passphrase input
   */
  get passphraseInput() {
    return this._page.container.querySelector('#passphrase-input');
  }

  /**
   * Returns the obfuscate button
   */
  get obfuscateButton() {
    return this._page.container.querySelector('.password-view');
  }

  /**
   * Returns the current value of the passphrase
   */
  get passphrase() {
    return this.passphraseInput.value;
  }

  /**
   * Returns true if the component is in an obfuscated mode
   */
  get isObfuscated() {
    return this.passphraseInput.getAttribute('type') === "password";
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the secondary action link element
   */
  get secondaryActionLink() {
    return this._page.container.querySelector('.form-actions a');
  }

  /**
   * Returns true if the current passphrase is very weak
   */
  get isVeryWeakPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Very weak'));
  }

  /**
   * Returns true if the current passphrase is weak
   */
  get isWeakPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Weak'));
  }

  /**
   * Returns true if the current passphrase is fair
   */
  get isFairPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Fair'));
  }

  /**
   * Returns true if the current passphrase is strong
   */
  get isStrongPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Strong'));
  }

  /**
   * Returns true if the current passphrase is very strong
   */
  get isVeryStrongPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Very strong'));
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.nextButton.classList.contains('processing');
  }

  /**
   * Returns true if one can go to the next step
   */
  get canGoToNextStep() {
    return !this.nextButton.classList.contains('disabled');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.passphraseInput.hasAttribute('disabled');
  }

  /**
   * Returns true if one can access to import
   */
  get canAccesToImport() {
    return Boolean(this._page.container.querySelector('#import-key-link'));
  }

  /**
   * Change the passphrase input value
   * @param passphrase The new passphrase
   */
  async fill(passphrase) {
    fireEvent.change(this.passphraseInput, {target: {value: passphrase}});
    await waitFor(async() => {});
  }

  /**
   * Generate the key
   * @param inProgressFn Function called while the generation
   */
  async generateKey(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(inProgressFn);
  }

  /**
   * Toggle the obfuscate mode
   */
  async toggleObfuscate() {
    const leftClick = {button: 0};
    fireEvent.click(this.obfuscateButton, leftClick);
    await waitFor(() => {});
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
