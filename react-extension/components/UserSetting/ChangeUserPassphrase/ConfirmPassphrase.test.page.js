
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
import ConfirmPassphrase from "./ConfirmPassphrase";

/**
 * The ConfirmPassphrase component represented as a page
 */
export default class ConfirmPassphrasePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmPassphrase {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the user confirm passphrase element
   */
  get confirmPassphrase() {
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
  get passphrase() {
    return this._page.container.querySelector('#passphrase-input');
  }

  /**
   * Returns the passphrase error message element
   */
  get passphraseErrorMessage() {
    return this._page.container.querySelector('.error-message').innerHTML;
  }

  /**
   * Returns the verify button element
   */
  get verifyButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"button\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.confirmPassphrase !== null;
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
  insertPassphrase(data)  {
    this.fillInput(this.passphrase, data);
  }

  /** click verify */
  async verify() {
    await this.click(this.verifyButton);
  }

  /** click cancel */
  async cancel() {
    await this.click(this.cancelButton);
  }

  /** click next without wait for */
  verifyWithoutWaitFor() {
    this.clickWithoutWaitFor(this.verifyButton);
  }
}





