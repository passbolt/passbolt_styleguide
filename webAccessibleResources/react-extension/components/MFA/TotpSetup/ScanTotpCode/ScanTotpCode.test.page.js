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
import ScanTotpCode from "./ScanTotpCode";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ScanTotpCode component represented as a page
 */
export default class ScanTotpCodePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ScanTotpCode {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the totp scan code parent element
   */
  get totpScanCodeList() {
    return this._page.container.querySelector('.totp-scan-code');
  }

  /**
   * Returns page title
   */
  get title() {
    return this._page.container.querySelector('h3');
  }

  /**
   * Returns the subtitle page
   */
  get subtitle() {
    return this._page.container.querySelector('h4.no-border');
  }

  /**
   * Returns the page qr code
   */
  get qrcode() {
    return this._page.container.querySelector('.qrcode');
  }

  /**
   * Returns the input label otp label
   */
  get inputLabelOtp() {
    return this._page.container.querySelector('.input label');
  }

  /**
   * Returns the input otp card
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
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector('.sidebar-help');
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this._page.container.querySelector('.sidebar-help h3');
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this._page.container.querySelector('.sidebar-help p');
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector('.sidebar-help .button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.totpScanCodeList !== null;
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
