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
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import CreateStandaloneTotp from "./CreateStandaloneTotp";
/**
 * The CreateStandaloneTotp component represented as a page
 */
export default class CreateStandaloneTotpPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <CreateStandaloneTotp.WrappedComponent {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get header() {
    return this._page.container.querySelector(".dialog-header-title");
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.create-standalone-totp-dialog');
  }
  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the name input element
   */
  get name() {
    return this._page.container.querySelector('#create-standalone-totp-form-name');
  }

  /**
   * Returns the name error message input element
   */
  get nameErrorMessage() {
    return this._page.container.querySelector('.name.error-message');
  }

  /**
   * Returns the name warning message input element
   */
  get nameWarningMessage() {
    return this._page.container.querySelector('.name.warning-message');
  }

  /**
   * Returns the uri input element
   */
  get uri() {
    return this._page.container.querySelector('#create-standalone-totp-form-uri');
  }

  /**
   * Returns the uri warning message input element
   */
  get uriWarningMessage() {
    return this._page.container.querySelector('.uri.warning-message');
  }

  /**
   * Returns the key input element
   */
  get key() {
    return this._page.container.querySelector('#create-standalone-totp-form-key');
  }

  /**
   * Returns the key error message input element
   */
  get keyErrorMessage() {
    return this._page.container.querySelector('.key.error-message');
  }

  /**
   * Returns the key warning message input element
   */
  get keyWarningMessage() {
    return this._page.container.querySelector('.key.warning-message');
  }

  /**
   * Return the advanced settings button element
   * @return {Element}
   */
  get advancedSettings() {
    return this._page.container.querySelector('.accordion-header button');
  }

  /**
   * Return the period input element
   * @return {Element}
   */
  get period() {
    return this._page.container.querySelector('#create-standalone-totp-form-period');
  }

  /**
   * Returns the period error message input element
   */
  get periodErrorMessage() {
    return this._page.container.querySelector('.period.error-message');
  }

  /**
   * Return the digits input element
   * @return {Element}
   */
  get digits() {
    return this._page.container.querySelector('#create-standalone-totp-form-digits');
  }

  /**
   * Returns the digits error message input element
   */
  get digitsErrorMessage() {
    return this._page.container.querySelector('.digits.error-message');
  }

  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get algorithm() {
    return this._page.container.querySelector('#create-standalone-totp-form-algorithm .selected-value .value');
  }

  /**
   * Return the algorithm input element
   * @return {Element}
   */
  get firstItemOption() {
    return this._page.container.querySelector('#create-standalone-totp-form-algorithm .select-items .option');
  }

  /**
   * Returns the upload QR code button element
   */
  get uploadQrCodeButton() {
    return this._page.container.querySelector('.button-icon .svg-icon');
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
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

  /** Click without wait for on the element */
  escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** on keypup element */
  keyUpInput(component)  {
    fireEvent.keyUp(component, {keyCode: 38});
  }

  /**
   * Select first item in the list of algorithms
   * @return {Promise<void>}
   */
  async selectFirstAlgorithm() {
    await this.click(this.algorithm);
    await this.click(this.firstItemOption);
  }
}
