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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayMfaAdministration from "./DisplayMfaAdministration";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AdminMfaContextProvider} from "../../../contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import DisplayAdministrationMfaActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationMfaActions/DisplayAdministrationMfaActions";

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
          <AdminMfaContextProvider  {...props}>
            <DisplayAdministrationMfaActions />
            <DisplayMfaAdministration {...props}/>
          </AdminMfaContextProvider>
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
   * Returns the duo client id input element
   */
  get duoClientId() {
    return this._page.container.querySelector('#duoClientId');
  }

  /**
   * Returns the duo client secret input element
   */
  get duoClientSecret() {
    return this._page.container.querySelector('#duoClientSecret');
  }


  /**
   * Returns the eye button for duoClientSecret
   */
  get duoClientSecretButton() {
    return this._page.container.querySelectorAll('.password-view .svg-icon')[1];
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
   * Returns the eye button for yubikeySecretKey
   */
  get yubikeySecretKeyButton() {
    return this._page.container.querySelectorAll('.password-view .svg-icon')[0];
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
  get duoClientIdErrorMessage() {
    return this._page.container.querySelector('.duo_client_id.error-message').textContent;
  }

  /**
   * Returns the duo secret key error mesage input element
   */
  get duoClientSecretErrorMessage() {
    return this._page.container.querySelector('.duo_client_secret.error-message').textContent;
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Save Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSaveButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[0];
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


  /** fill the duo hostname element with data */
  fillDuoHostname(data) {
    this.fillInput(this.duoHostname, data);
  }

  /** fill the duo client id with data */
  fillClientId(data) {
    this.fillInput(this.duoClientId, data);
  }

  /** fill the duo client secret with data */
  fillClientSecret(data) {
    this.fillInput(this.duoClientSecret, data);
  }

  /** Click on the duo element */
  async checkDuo() {
    await this.click(this.duo);
  }

  /** Click on the yubikey element */
  async checkYubikey() {
    await this.click(this.yubikey);
  }
  /**
   * Toggle the obfuscate mode
   */
  async toggleObfuscate(component) {
    await this.click(component);
  }

  /**
   * Returns true if the component is in an obfuscated mode
   */
  isObfuscated(component) {
    return component.getAttribute('type') === "password";
  }

  /**
   * Returns true if the save button in the toolbar is enabled.
   * @returns {boolean}
   */
  isSaveButtonEnabled() {
    return !this.toolbarActionsSaveButton.hasAttribute("disabled");
  }

  /**
   * Simulates a click on the "Save settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async saveSettings() {
    await this.click(this.toolbarActionsSaveButton);
  }
}
