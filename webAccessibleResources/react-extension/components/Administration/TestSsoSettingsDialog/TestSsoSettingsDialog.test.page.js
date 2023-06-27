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
 * @since         3.9.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AdminSsoContextProvider from "../../../contexts/AdminSsoContext";
import TestSsoSettingsDialog from "./TestSsoSettingsDialog";

/**
 * The TestSsoSettingsDialogPage component represented as a page
 */
export default class TestSsoSettingsDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this.props = props;
    this.render(props);
  }

  /**
   * Do a rendering of the page.
   * If the page already exists, do a rerender instead
   * @param {object} props the props of the components
   */
  render(props) {
    this._page = render(<MockTranslationProvider>
      <AdminSsoContextProvider {...props}>
        <TestSsoSettingsDialog {...props}/>
      </AdminSsoContextProvider>
    </MockTranslationProvider>);
  }

  /**
   * Shortcut method for the container querySelector.
   * @param {string} stringSelector
   * @returns {HTMLElement}
   */
  select(stringSelector) {
    return this._page.container.querySelector(stringSelector);
  }

  /**
   * Simulates a click on the given HTML element.
   * The clicks is consider done when the callback returns {true}.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @param {function} callback The callback to be used in the waitFor method to ensure the click is done (returns true when it's done)
   * @returns {Promise<void>}
   */
  async clickOn(element, callback) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
      if (!callback()) {
        throw new Error("Page didn't react yet on the event.");
      }
    });
  }

  /**
   * Simulates a click on the login with SSO provider button
   * @returns {Promise<void>}
   */
  async clickOnLogin() {
    await this.clickOn(this.ssoLoginButton, this.isSaveButtonProcessing.bind(this));
  }

  /**
   * Simulates a click on the save button in the dialog
   * @returns {Promise<void>}
   */
  async saveSettings() {
    await this.clickOn(this.saveButton, () => true);
  }

  /**
   * Returns true if the submit button is in processing state.
   * @returns {boolean}
   */
  isSaveButtonProcessing() {
    return Boolean(this.select(".test-sso-settings-dialog button[type='submit'] .svg-icon.spinner"));
  }

  /**
   * Returns the title page HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select(".dialog-title-wrapper h2");
  }

  /**
   * Returns the SSO login button HTMLElemnt.
   * @returns {HTMLElement}
   */
  get ssoLoginButton() {
    return this.select(".test-sso-settings-dialog button.sso-login-button");
  }

  /**
   * Returns the save button HTMLElemnt.
   * @returns {HTMLElement}
   */
  get saveButton() {
    return this.select(".test-sso-settings-dialog button[type='submit']");
  }
}
