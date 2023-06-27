
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
import ConfigurePasswordGenerator from "./ConfigurePasswordGenerator";

/**
 * The ConfigurePasswordGenerator component represented as a page
 */
export default class ConfigurePasswordGeneratorPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfigurePasswordGenerator {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Get the range length input
   */
  get rangeLength() {
    return this._page.container.querySelector('.slider input[type="range"]');
  }

  /**
   * Get the length input
   */
  get length() {
    return this._page.container.querySelector('.slider input[type="number"]');
  }

  /**
   * Get the mask button following the index
   */
  maskButton(index) {
    return this._page.container.querySelectorAll('.button-group .button')[index - 1];
  }

  /**
   * Get the look alike
   */
  get lookAlike() {
    return this._page.container.querySelector('#configure-password-generator-form-exclude-look-alike');
  }

  /**
   * Get the look alike
   */
  get isCheckedLookAlike() {
    return this._page.container.querySelector('#configure-password-generator-form-exclude-look-alike').checked;
  }

  /**
   * Get the number of active mask
   */
  get numberOfActiveMask() {
    return this._page.container.querySelectorAll('.button-group .button.selected').length;
  }

  /**
   * Change range length
   * @param data
   * @returns {Promise<void>}
   */
  async changeRangeLength(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.rangeLength, dataInputEvent);
    await waitFor(() => {});
  }

  /**
   * Change length
   * @param data
   * @returns {Promise<void>}
   */
  async changeLength(data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.length, dataInputEvent);
    await waitFor(() => {});
  }

  /**
   * Change mask
   * @returns {Promise<void>}
   */
  async selectMask(index) {
    const leftClick = {button: 0};
    fireEvent.click(this.maskButton(index), leftClick);
    await waitFor(() => {});
  }

  /**
   * Change look alike
   * @returns {Promise<void>}
   */
  async changeLookAlike() {
    const leftClick = {button: 0};
    fireEvent.click(this.lookAlike, leftClick);
    await waitFor(() => {});
  }
}
