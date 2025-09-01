/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * The InformManager component represented as a page
 */

import InFormManager from "./InFormManager";
import {fireEvent, waitFor} from "@testing-library/react";
import InFormFieldSelector from "./InFormFieldSelector";

export default class InformManagerPage {
  /**
   * Default constructor
   */
  constructor() {
    InFormManager.initialize();
  }

  /**
   * Destroy by port message
   */
  async destroy() {
    await port.emit('passbolt.content-script.destroy');
  }

  /**
   * Returns the username element
   */
  get username() {
    const username = InFormManager.callToActionFields.find(field => field.fieldType === "username");
    return username?.field;
  }

  /**
   * Returns the username in iframe element
   */
  get usernameIframe() {
    return document.querySelector('iframe').contentDocument.querySelector(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
  }


  /**
   * Returns the usernames element
   */
  get usernames() {
    const isUsername = informCallToActionField => informCallToActionField.fieldType === "username";
    const getField = informCallToActionField => informCallToActionField.field;
    return InFormManager.callToActionFields.filter(isUsername).map(getField);
  }

  /**
   * Returns the password element
   */
  get password() {
    const password = InFormManager.callToActionFields.find(field => field.fieldType === "password");
    return password?.field;
  }

  /**
   * Returns the password in iframe element
   */
  get passwordIframe() {
    return document.querySelector('iframe').contentDocument.querySelector(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
  }

  /**
   * Returns the passwords element
   */
  get passwords() {
    const isPassword = informCallToActionField => informCallToActionField.fieldType === "password";
    const getField = informCallToActionField => informCallToActionField.field;
    return InFormManager.callToActionFields.filter(isPassword).map(getField);
  }

  /**
   * Returns the search element
   */
  get search() {
    return document.querySelector('#search');
  }

  /**
   * Returns the save button processing elements
   */
  get submitButton() {
    return document.querySelector('[type=\"submit\"]');
  }

  /**
   * Returns the iframe length
   */
  get iframesLength() {
    return InFormManager.shadowRoot.querySelectorAll('iframe').length;
  }

  /** Blur on the username element */
  async blurOnUsername()  {
    fireEvent.blur(this.username);
    await waitFor(() => {});
  }

  /** Blur on the username iframe element */
  async blurOnUsernameIframe()  {
    fireEvent.blur(this.usernameIframe);
    await waitFor(() => {});
  }

  /** Blur on the password element */
  async blurOnPassword()  {
    fireEvent.blur(this.password);
    await waitFor(() => {});
  }

  /** Blur on the password iframe element */
  async blurOnPasswordIframe()  {
    fireEvent.blur(this.passwordIframe);
    await waitFor(() => {});
  }

  /** Focus on the username element */
  async focusOnUsername()  {
    fireEvent.focus(this.username);
    await waitFor(() => {});
  }

  /** Focus on the username iframe element */
  async focusOnUsernameIframe()  {
    fireEvent.focus(this.usernameIframe);
    await waitFor(() => {});
  }

  /** Focus on the password element */
  async focusOnPassword()  {
    fireEvent.focus(this.password);
    await waitFor(() => {});
  }

  /** Focus on the password iframe element */
  async focusOnPasswordIframe()  {
    fireEvent.focus(this.passwordIframe);
    await waitFor(() => {});
  }

  /** Focus on the search element */
  async focusOnSearch()  {
    fireEvent.focus(this.search);
    await waitFor(() => {});
  }

  /** Mouse over on the username element */
  async mouseOverOnUsername()  {
    fireEvent.mouseOver(this.username);
    await waitFor(() => {});
  }

  /** Mouse over on the password element */
  async mouseOverOnPassword()  {
    fireEvent.mouseOver(this.password);
    await waitFor(() => {});
  }

  /**
   * Save
   */
  async save() {
    const leftClick = {button: 0};
    fireEvent.click(this.submitButton, leftClick);
    await waitFor(() => {});
  }

  async clickOnInformCallToAction(index = 1) {
    InFormManager.lastCallToActionFieldClicked = InFormManager.callToActionFields[index - 1];
    await waitFor(() => {});
  }

  /**
   * Autofill credentials
   * @param username
   * @param password
   */
  async autofillCredentials(username, password) {
    await port.emit('passbolt.web-integration.fill-credentials', {username, password});
  }

  /**
   * Autofill password
   * @param password
   */
  async autofillPassword(password) {
    InFormManager.menuField = {
      removeMenuIframe: () => {},
      destroy: () => {}
    };
    await port.emit('passbolt.web-integration.fill-password', password);
  }
}
