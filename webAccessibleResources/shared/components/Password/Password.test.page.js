
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
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import Password from "./Password";

/**
 * The Password component represented as a page
 */
export default class PasswordPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Password {...props}/>
      </MockTranslationProvider>
    );
  }

  rerender(props) {
    this._page.rerender(
      <MockTranslationProvider>
        <Password {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the password wrapper element
   */
  get passwordWrapper() {
    return this._page.container.querySelector('.input.password');
  }

  /**
   * Returns the password input element
   */
  get passwordInput() {
    return this._page.container.querySelector('input');
  }

  /**
   * Returns the eye button
   */
  get eyeButton() {
    return this._page.container.querySelector('.password-view .svg-icon');
  }

  /**
   * Returns the security token
   */
  get securityToken() {
    return this._page.container.querySelector('.security-token');
  }

  /**
   * Returns the current value of the passphrase
   */
  get password() {
    return this.passwordInput.value;
  }

  /**
   * Returns true if the component is in an obfuscated mode
   */
  get isObfuscated() {
    return this.passwordInput.getAttribute('type') === "password";
  }

  /**
   * Returns true if fields are disabled
   */
  get isDisabled() {
    return this.passphraseInput.hasAttribute('disabled');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.passwordWrapper !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the passphrase input element with data */
  insertPassword(data)  {
    this.fillInput(this.passwordInput, data);
  }

  /**
   * Toggle the obfuscate mode
   */
  async toggleObfuscate() {
    await this.click(this.eyeButton);
  }
}





