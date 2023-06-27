
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
 * @since         3.1.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import EnterNewPassphrase from "./EnterNewPassphrase";

/**
 * The EnterNewPassphrase component represented as a page
 */
export default class EnterNewPassphrasePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <EnterNewPassphrase {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the user confirm passphrase element
   */
  get enterNewPassphrase() {
    return this._page.container.querySelector('.profile-passphrase');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.profile-passphrase h3').textContent;
  }

  /**
   * Returns the passphrase input element
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
   * Returns the passphrase error message element
   */
  get passphraseErrorMessage() {
    return this._page.container.querySelector('.error-message').innerHTML;
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
   * Returns true if the current passphrase is empty
   */
  get isEmptyPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Quality'));
  }

  /**
   * Returns true if the current passphrase is very strong
   */
  get isVeryStrongPassphrase() {
    return Boolean(this._page.container.querySelector('.complexity-text').textContent.startsWith('Very strong'));
  }

  /**
   * Returns the update button element
   */
  get updateButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"button\"]');
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.updateButton.classList.contains('processing');
  }

  /**
   * Returns true if one can go to the next step
   */
  get canUpdate() {
    return !this.updateButton.classList.contains('disabled');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.passphraseInput.hasAttribute('disabled');
  }

  /**
   * Returns the list item concerning the 'not in dictionnary" hints
   */
  get notInDictionaryHint() {
    return this._page.container.querySelectorAll(".password-hints li")[4];
  }

  /**
   * Returns the tooltip for service unavailable for powned password
   */
  get tootltip() {
    return this._page.container.querySelector(".password-hints .unavailable .tooltip .tooltip-text");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.enterNewPassphrase !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  clickWithoutWaitFor(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the passphrase input element with data */
  async insertPassphrase(data)  {
    this.fillInput(this.passphraseInput, data);
    jest.runAllTimers();
    await waitFor(() => {});
  }

  /** click update */
  async update(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.updateButton, leftClick);
    await waitFor(inProgressFn);
  }

  /** click cancel */
  async cancel() {
    await this.click(this.cancelButton);
  }

  /**
   * Toggle the obfuscate mode
   */
  async toggleObfuscate() {
    await this.click(this.obfuscateButton);
  }
}





