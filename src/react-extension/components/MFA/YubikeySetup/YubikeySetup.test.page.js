/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import YubikeySetup from "./YubikeySetup";

/**
 * The YubikeySetup component represented as a page
 */
export default class YubikeySetupPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <YubikeySetup {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the yubikey setup parent element
   */
  get yubikeySetup() {
    return this._page.container.querySelector('.yubikey-setup');
  }

  /**
   * Returns page title
   */
  get title() {
    return this._page.container.querySelector('h3');
  }

  /**
   * Returns the input label otp label
   */
  get inputLabelOtp() {
    return this._page.container.querySelector('.input label');
  }

  /**
   * Returns the input otp
   */
  get inputOtp() {
    return this._page.container.querySelector('.input input');
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector('.error-message');
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector('.button.cancel');
  }

  /**
   * Returns the validate button
   */
  get validateButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the help text
   */
  get helpText() {
    return this._page.container.querySelector('.helptext');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.yubikeySetup !== null;
  }

  /**
   * Click on the cancel button
   */
  async clickOnCancelButton() {
    await this.click(this.cancelButton);
  }

  /**
   * Click on the validate button
   */
  async clickOnValidateButton() {
    await this.click(this.validateButton);
  }

  /**
   * Fill the otp input with the given value
   * @param code A otp code
   */
  async fillOtpInput(code) {
    fireEvent.change(this.inputOtp, {target: {value: code}});
    await waitFor(() => {});
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
