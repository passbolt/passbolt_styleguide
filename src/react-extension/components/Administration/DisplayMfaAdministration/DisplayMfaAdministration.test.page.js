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
 * @since         2.11.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import React from "react";
import DisplayMfaAdministration from "./DisplayMfaAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayMfaAdministration component represented as a page
 */
export default class DisplayMfaAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayMfaAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  rerender(appContext, props) {
    this._page.rerender(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayMfaAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the totp input element
   */
  get mfaSettings() {
    return this._page.container.querySelector('.mfa-settings');
  }

  /**
   * Returns the totp input element
   */
  get totp() {
    return this._page.container.querySelector('#totp-provider-toggle-button');
  }

  /**
   * Returns the yubikey input element
   */
  get yubikey() {
    return this._page.container.querySelector('#yubikey-provider-toggle-button');
  }

  /**
   * Returns the yubikey client identifier input element
   */
  get yubikeyClientIdentifier() {
    return this._page.container.querySelector('#yubikeyClientIdentifier');
  }

  /**
   * Returns the yubikey client identifier input element
   */
  get yubikeySecretKey() {
    return this._page.container.querySelector('#yubikeySecretKey');
  }

  /**
   * Returns the duo input element
   */
  get duo() {
    return this._page.container.querySelector('#duo-provider-toggle-button');
  }

  /**
   * Returns the duo hostname input element
   */
  get duoHostname() {
    return this._page.container.querySelector('#duoHostname');
  }

  /**
   * Returns the duo integration key input element
   */
  get duoIntegrationKey() {
    return this._page.container.querySelector('#duoIntegrationKey');
  }

  /**
   * Returns the duo salt input element
   */
  get duoSalt() {
    return this._page.container.querySelector('#duoSalt');
  }

  /**
   * Returns the duo secret key input element
   */
  get duoSecretKey() {
    return this._page.container.querySelector('#duoSecretKey');
  }

  /**
   * Returns the yubikey client identifier error mesage input element
   */
  get yubikeyClientIdentifierErrorMessage() {
    return this._page.container.querySelector('.yubikey_client_identifier.error-message').textContent;
  }

  /**
   * Returns the yubikey client identifier error mesage input element
   */
  get yubikeySecretKeyErrorMessage() {
    return this._page.container.querySelector('.yubikey_secret_key.error-message').textContent;
  }

  /**
   * Returns the duo hostname error mesage input element
   */
  get duoHostnameErrorMessage() {
    return this._page.container.querySelector('.duo_hostname.error-message').textContent;
  }

  /**
   * Returns the duo integration key error mesage input element
   */
  get duoIntegrationKeyErrorMessage() {
    return this._page.container.querySelector('.duo_integration_key.error-message').textContent;
  }

  /**
   * Returns the duo salt error mesage input element
   */
  get duoSaltErrorMessage() {
    return this._page.container.querySelector('.duo_salt.error-message').textContent;
  }

  /**
   * Returns the duo secret key error mesage input element
   */
  get duoSecretKeyErrorMessage() {
    return this._page.container.querySelector('.duo_secret_key.error-message').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.mfaSettings !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** fill the input element with data */
  fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the yubikey client identifier element with data */
  fillYubikeyClientIdentifier(data) {
    this.fillInput(this.yubikeyClientIdentifier, data);
  }

  /** fill the yubikey secret element with data */
  fillYubikeySecret(data) {
    this.fillInput(this.yubikeySecretKey, data);
  }

  /** Click on the duo element */
  async checkDuo() {
    await this.click(this.duo);
  }

  /** Click on the yubikey element */
  async checkYubikey() {
    await this.click(this.yubikey);
  }
}
