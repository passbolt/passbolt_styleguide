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
import ManageSsoSettings from "./ManageSsoSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AdminSsoContextProvider from "../../../contexts/AdminSsoContext";
import DisplayAdministrationSsoSettingsActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSsoActions/DisplayAdministrationSsoActions";
import DialogContextProvider from "../../../contexts/DialogContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";

/**
 * The ManageSsoSettings component represented as a page
 */
export default class ManageSsoSettingsPage {
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
      <DialogContextProvider>
        <AdminSsoContextProvider {...props}>
          <ManageDialogs/>
          <ManageSsoSettings {...props}/>
          <DisplayAdministrationSsoSettingsActions/>
        </AdminSsoContextProvider>
      </DialogContextProvider>
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
   * Shortcut method for the container querySelectorAll.
   * @param {string} stringSelector
   * @returns {NodeList}
   */
  selectAll(stringSelector) {
    return this._page.container.querySelectorAll(stringSelector);
  }

  /**
   * Returns true if the page exists.
   * This means that it's loaded and the title text content is non empty.
   * @returns {boolean}
   */
  exists() {
    const title = this.title;
    return title && title.textContent !== "";
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
   * Set the current form with the given data.
   * It can set the input from text value.
   * It can also set value for Select elements, but due to React internal stuff, the label needs to be passed as value.
   * @param {object} formData a key value pairs object that contains the field name as a key (must match a getter method on this page) and the desired value
   * @returns {Promise<void>}
   */
  async setFormWith(formData) {
    let key;
    for (key in formData) {
      const element = this[key];
      const value = formData[key];
      await (this.isSelectElement(element)
        ? this.setSelectField(element, value)
        : this.setInputField(element, value));
    }
  }

  /**
   * Set the current select field value with the given data.
   * It requires the select the element by the label and not the key as `key` is internal to React.
   * @param {HTMLElement} element the select element on which to set the value
   * @param {string} value the value to set
   * @returns {Promise<void>}
   */
  async setSelectField(element, value) {
    const currentValue = element.querySelector('.value').textContent;
    if (currentValue === value) {
      return;
    }

    await this.clickOn(element, () => element.querySelectorAll('.option').length > 0);
    const availableValues = Array.from(element.querySelectorAll('.option'));
    const targetOptionElement = availableValues.find(el => el.textContent === value);
    await this.clickOn(targetOptionElement, () => value === element.querySelector('.value').textContent);
  }

  /**
   * Set the current input field value with the given data
   * @param {HTMLElement} element the input element on which to set the value
   * @param {string} value the value to set
   * @returns {Promise<void>}
   */
  async setInputField(element, value) {
    fireEvent.input(element, {target: {value: value}});
    await waitFor(() => {
      if (element.value !== value) {
        throw new Error("The value is not set yet");
      }
    });
  }

  /**
   * Returns true if the given element is a <Select> component element
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  isSelectElement(element) {
    return element?.nodeName === 'DIV'
      && element?.classList.contains('select')
      && element.parentElement.classList.contains('select-container');
  }

  /**
   * Clicks on the Save Settings button and wait for the given callback to return true before continuing.
   * @param {function} readyCheckCallback a callback to tell the caller when the action is considered to be done
   */
  async saveSettings(readyCheckCallback) {
    await this.clickOn(this.toolbarActionsSaveSettingsButton, readyCheckCallback);
  }

  /**
   * Clicks on SSO Settings feature toggle.
   * @returns {Promise<void>}
   */
  async toggleSsoSettings() {
    const currentState = this.toggleButton.checked;
    await this.clickOn(this.toggleButton, () => this.toggleButton.checked !== currentState);
  }

  /**
   * Clicks on advanced settings toggle.
   * @returns {Promise<void>}
   */
  async toggleAdvancedSettings() {
    const currentState = Boolean(this.prompt);
    await this.clickOn(this.advancedSettingsButton, () => Boolean(this.prompt) !== currentState);
  }

  /**
   * Simulates a click on the "Delete Settings" button from the dialog
   * @returns {Promise<void>}
   */
  async confirmDelete() {
    await this.clickOn(this.deleteSettingsButton, () => this.deleteConfirmationDialog === null);
  }

  /**
   * Returns the title page HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select(".sso-settings h3");
  }

  /**
   * Returns all the provider buttons from the first screen.
   * @returns {NodeList}
   */
  get providerButtons() {
    return this.selectAll(".sso-settings .provider-list .provider");
  }

  /**
   * Returns the url input HTML element
   * @returns {HTMLElement}
   */
  get url() {
    return this.select(".sso-settings #sso-azure-url-input");
  }

  /**
   * Returns the redirect_url input HTML element
   * @returns {HTMLElement}
   */
  get redirect_url() {
    return this.select(".sso-settings #sso-redirect-url-input");
  }

  /**
   * Returns the tenant_id input HTML element
   * @returns {HTMLElement}
   */
  get tenant_id() {
    return this.select(".sso-settings #sso-azure-tenant-id-input");
  }

  /**
   * Returns the client_id input HTML element
   * @returns {HTMLElement}
   */
  get client_id() {
    return this.select(".sso-settings #sso-azure-client-id-input");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get client_secret() {
    return this.select(".sso-settings #sso-azure-secret-input");
  }

  /**
   * Returns the client_id input HTML element
   * @returns {HTMLElement}
   */
  get google_client_id() {
    return this.select(".sso-settings #sso-google-client-id-input");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get google_client_secret() {
    return this.select(".sso-settings #sso-google-secret-input");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get client_secret_expiry() {
    return this.select(".sso-settings #sso-azure-secret-expiry-input");
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Save settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSaveSettingsButton() {
    return this.selectAll(".actions-wrapper .actions button")[0];
  }

  /**
   * Returns the SSO Settings toggle button HTML element
   * @returns {HTMLElement}
   */
  get toggleButton() {
    return this.select(".sso-settings .toggle-switch input");
  }

  /**
   * Returns the advanced settings toggle button HTML element
   * @returns {HTMLElement}
   */
  get advancedSettingsButton() {
    return this.select("#advanced-settings-panel-button");
  }

  /**
   * Returns the delete SSO Settings dialog HTML element
   * @returns {HTMLElement}
   */
  get deleteConfirmationDialog() {
    return this.select(".delete-sso-settings-dialog");
  }

  /**
   * Returns the delete SSO Settings dialog HTML element
   * @returns {HTMLElement}
   */
  get deleteSettingsButton() {
    return this.select(".delete-sso-settings-dialog button[type='submit']");
  }

  /**
   * Returns the delete SSO Settings dialog HTML element
   * @returns {HTMLElement}
   */
  get prompt() {
    return this.select("#prompt-input");
  }

  /**
   * Returns the delete SSO Settings dialog HTML element
   * @returns {HTMLElement}
   */
  get email_claim() {
    return this.select("#email-claim-input");
  }
}
