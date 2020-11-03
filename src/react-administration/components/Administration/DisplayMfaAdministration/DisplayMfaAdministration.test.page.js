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
import ManageDialogs from "../../../../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../../../../react/contexts/Common/DialogContext";
import DisplayMfaAdministration from "./DisplayMfaAdministration";

/**
 * The CreateUserDialog component represented as a page
 */
export default class DisplayMfaAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <DisplayMfaAdministration {...props}/>
      </AppContext.Provider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._displayMfaAdministration = new DisplayMfaAdministrationPageObject(this._page.container);
  }

  /**
   * Returns the page object of create user
   */
  get displayMfaAdministration() {
    return this._displayMfaAdministration;
  }
}

class DisplayMfaAdministrationPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the totp input element
   */
  get mfaSettings() {
    return this._container.querySelector('.mfa-settings');
  }

  /**
   * Returns the totp input element
   */
  get totp() {
    return this._container.querySelector('#totp-provider-toggle-button');
  }

  /**
   * Returns the yubikey input element
   */
  get yubikey() {
    return this._container.querySelector('#yubikey-provider-toggle-button');
  }

  /**
   * Returns the yubikey client identifier input element
   */
  get yubikeyClientIdentifier() {
    return this._container.querySelector('#yubikeyClientIdentifier');
  }

  /**
   * Returns the yubikey client identifier input element
   */
  get yubikeySecretKey() {
    return this._container.querySelector('#yubikeySecretKey');
  }

  /**
   * Returns the duo input element
   */
  get duo() {
    return this._container.querySelector('#duo-provider-toggle-button');
  }

  /**
   * Returns the duo hostname input element
   */
  get duoHostname() {
    return this._container.querySelector('#duoHostname');
  }

  /**
   * Returns the duo integration key input element
   */
  get duoIntegrationKey() {
    return this._container.querySelector('#duoIntegrationKey');
  }

  /**
   * Returns the duo salt input element
   */
  get duoSalt() {
    return this._container.querySelector('#duoSalt');
  }

  /**
   * Returns the duo secret key input element
   */
  get duoSecretKey() {
    return this._container.querySelector('#duoSecretKey');
  }

  /**
   * Returns the yubikey client identifier error mesage input element
   */
  get yubikeyClientIdentifierErrorMessage() {
    return this._container.querySelector('.yubikey_client_identifier.error.message');
  }

  /**
   * Returns the yubikey client identifier error mesage input element
   */
  get yubikeySecretKeyErrorMessage() {
    return this._container.querySelector('.yubikey_secret_key.error.message');
  }

  /**
   * Returns the duo hostname error mesage input element
   */
  get duoHostnameErrorMessage() {
    return this._container.querySelector('.duo_hostname.error.message');
  }

  /**
   * Returns the duo integration key error mesage input element
   */
  get duoIntegrationKeyErrorMessage() {
    return this._container.querySelector('.duo_integration_key.error.message');
  }

  /**
   * Returns the duo salt error mesage input element
   */
  get duoSaltErrorMessage() {
    return this._container.querySelector('.duo_salt.error.message');
  }

  /**
   * Returns the duo secret key error mesage input element
   */
  get duoSecretKeyErrorMessage() {
    return this._container.querySelector('.duo_secret_key.error.message');
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

  /** Click without wait for on the element */
  clickWithoutWaitFor(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /** fill the input element with data */
  fillInput(element, data) {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }
}
