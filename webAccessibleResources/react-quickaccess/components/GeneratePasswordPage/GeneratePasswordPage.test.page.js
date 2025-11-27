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
 * @since         3.3.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import GeneratePasswordPage from "./GeneratePasswordPage";
import {waitForTrue} from "../../../../test/utils/waitFor";

/**
 * The GeneratePasswordPage component represented as a page
 */
export default class GeneratePasswordTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <Router>
        <MockTranslationProvider>
          <GeneratePasswordPage.WrappedComponent {...props}/>
        </MockTranslationProvider>
      </Router>,
      {legacyRoot: true}
    );
  }

  /**
   * Get the title
   */
  get title() {
    return this._page.container.querySelector('.primary-action-title').textContent;
  }

  /**
   * Returns the password value
   */
  get password() {
    return this._page.container.querySelector('.input.password input').value;
  }

  /**
   * Returns the generate password button
   */
  get generatePasswordButton() {
    return this._page.container.querySelector('a.password-generate');
  }

  /**
   * Returns the copy password button
   */
  get copyPasswordButton() {
    return this._page.container.querySelector('a.copy-to-clipboard');
  }

  /**
   * Returns the complexity of a password
   */
  get complexityText() {
    return this._page.container.querySelector('.complexity-text').textContent;
  }

  /**
   * Returns the active tab
   */
  get activeTab() {
    return this._page.container.querySelector('.tab.active button').textContent;
  }

  /**
   * Returns the tab
   * @param index
   * @returns {*}
   */
  tab(index) {
    return this._page.container.querySelectorAll('.tab')[index - 1].querySelector('.tab-link');
  }

  /**
   * Returns true it one can submit the apply operation
   */
  get canSubmit() {
    return this._page.container.querySelector('button[type="submit"]').getAttribute('disabled') !== '';
  }

  /**
   * Returns the apply button element
   */
  get applyButton() {
    return this._page.container.querySelector('button[type=\"submit\"]');
  }

  /**
   * Returns all the mask buttons.
   */
  get maskButtons() {
    return this._page.container.querySelectorAll('label[for="configure-password-generator-form-masks"] + div .button-toggle');
  }

  /**
   * Returns the button corresponding the upper mask.
   */
  get maskUpper() {
    return this.maskButtons[0];
  }

  /**
   * Returns the button corresponding the emoji mask.
   */
  get maskEmoji() {
    return this.maskButtons[9];
  }

  /**
   * Returns the password length input HTMLElement
   * @returns {HTMLElement}
   */
  get passwordLengthInput() {
    return this._page.container.querySelector('#configure-password-generator-form-length');
  }

  /**
   * Returns the passphrase words count input HTMLElement
   * @returns {HTMLElement}
   */
  get passphraseLengthInput() {
    return this._page.container.querySelector('#configure-passphrase-generator-form-word-count');
  }

  /**
   * Returns the exclude look alike checkbox HTMLElement
   * @returns {HTMLElement}
   */
  get excludeLookAlikeChars() {
    return this._page.container.querySelector("#configure-password-generator-form-exclude-look-alike");
  }

  /**
   * Returns the passphrase words separator input HTMLElement
   * @returns {HTMLElement}
   */
  get passphraseWordsSeparatorInput() {
    return this._page.container.querySelector("#configure-passphrase-generator-form-words-separator");
  }

  /**
   * Returns the Select input HTLMElement
   * @returns {HTMLElement}
   */
  get wordCaseSelectInput() {
    return this._page.container.querySelector("#configure-passphrase-generator-form-words-case .value");
  }

  /**
   * Returns the options from the word case input
   * @returns {NodeList}
   */
  get wordCaseOptions() {
    return this._page.container.querySelectorAll("#configure-passphrase-generator-form-words-case .select-items .items li");
  }

  /**
   * Simulates a click on the given element.
   * @param {HTMLElement} element
   */
  async clickOn(element, inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    return waitFor(inProgressFn);
  }

  /**
   * Generate a new password
   */
  async generatePassword() {
    await this.clickOn(this.generatePasswordButton);
  }

  /**
   * Copy password
   */
  async copyPassword() {
    await this.clickOn(this.copyPasswordButton);
  }

  /**
   * use password generator
   */
  async usePasswordGenerator() {
    await this.clickOn(this.tab(1));
  }

  /**
   * use password generator
   */
  async usePassphraseGenerator() {
    await this.clickOn(this.tab(2));
  }

  /**
   * Apply generate password
   * @param inProgressFn Function called while we wait for React stability
   */
  async applyGeneratePassword(inProgressFn = () => {}) {
    await this.clickOn(this.applyButton, inProgressFn);
  }

  /**
   * Set password length input with the given value
   * @param {number} passwordLength
   * @returns {Promise<void>}
   */
  async setPasswordLength(passwordLength) {
    const element = this.passwordLengthInput;
    fireEvent.input(element, {target: {value: passwordLength}});
    await waitForTrue(() => element.value.toString() === passwordLength.toString());
  }

  /**
   * Set the masks buttons options
   * @param {object} masksOptions a key value pair (similar to a Map<string, boolean)
   * @returns {Promise<void>}
   */
  async setMasks(masksOptions) {
    const fieldNames = Object.keys(masksOptions);
    for (let i = 0; i < fieldNames.length; i++) {
      const field = this[fieldNames[i]];
      const targetState = masksOptions[fieldNames[i]];
      if (targetState !== field.classList.contains('selected')) {
        fireEvent.click(field, {button: 0});
        await waitForTrue(() => targetState === field.classList.contains('selected'));
      }
    }
  }

  /**
   * Clicks on the exclude look alike chars checkbox
   * @returns {Promise<void>}
   */
  async clickOnExcludeLookAlikeChars() {
    await this.clickOn(this.excludeLookAlikeChars);
  }

  /**
   * Set passphrase words count input with the given value
   * @param {number} wordsCounts
   * @returns {Promise<void>}
   */
  async setPassphraseLength(wordsCounts) {
    const element = this.passphraseLengthInput;
    fireEvent.input(element, {target: {value: wordsCounts}});
    await waitForTrue(() => element.value.toString() === wordsCounts.toString());
  }

  /**
   * Set passphrase words separator input with the given value
   * @param {number} wordsCounts
   * @returns {Promise<void>}
   */
  async setWordSeparator(wordsSeparator) {
    const element = this.passphraseWordsSeparatorInput;
    fireEvent.input(element, {target: {value: wordsSeparator}});
    await waitForTrue(() => element.value === wordsSeparator);
  }

  /**
   * Sets the word case in the form with the given option
   * @param {string} wordCaseOption the text content that match the desired option
   */
  async setWordCase(wordCaseOption) {
    this.clickOn(this.wordCaseSelectInput);
    await waitForTrue(() => this.wordCaseOptions.length > 0);

    const options = this.wordCaseOptions;
    for (let i = 0; i < options.length; i++) {
      if (options[i].textContent !== wordCaseOption) {
        continue;
      }
      await this.clickOn(options[i]);
      return waitForTrue(() => this.wordCaseSelectInput.textContent === wordCaseOption);
    }
  }
}
