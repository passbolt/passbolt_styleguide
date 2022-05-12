
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
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import ConfigurePassphraseGenerator from "./ConfigurePassphraseGenerator";

/**
 * The ConfigurePassphraseGenerator component represented as a page
 */
export default class ConfigurePassphraseGeneratorPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfigurePassphraseGenerator {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Get the range word count input
   */
  get rangeWordCount() {
    return this._page.container.querySelector('.slider input[type="range"]');
  }

  /**
   * Get the number word count input
   */
  get numberWordCount() {
    return this._page.container.querySelector('.slider input[type="number"]');
  }

  /**
   * Get the separator
   */
  get separator() {
    return this._page.container.querySelector('#configure-passphrase-generator-form-words-separator');
  }

  /**
   * Get the word case
   */
  get wordCase() {
    return this._page.container.querySelector('#configure-passphrase-generator-form-words-case .selected-value .value');
  }

  /**
   * Get the first item word case select
   */
  get firstWordCaseItem() {
    return this._page.container.querySelector('#configure-passphrase-generator-form-words-case .option');
  }

  /**
   * Change range word count
   * @param data
   * @returns {Promise<void>}
   */
  async changeRangeWordCount(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.rangeWordCount, dataInputEvent);
    await waitFor(() => {});
  }

  /**
   * Change number word count
   * @param data
   * @returns {Promise<void>}
   */
  async changeNumberWordCount(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.numberWordCount, dataInputEvent);
    await waitFor(() => {});
  }

  /**
   * Change separator
   * @param data
   * @returns {Promise<void>}
   */
  async changeSeparator(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.separator, dataInputEvent);
    await waitFor(() => {});
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Change word case
   * @returns {Promise<void>}
   */
  async changeWordCase() {
    await this.click(this.wordCase);
    await this.click(this.firstWordCaseItem);
  }
}
