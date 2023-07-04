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
 * @since         3.8.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ManageSmtpAdministrationSettings from "./ManageSmtpAdministrationSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AdminSmtpSettingsContextProvider from "../../../contexts/AdminSmtpSettingsContext";
import DisplayAdministrationSmtpSettingsActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSmtpSettingsActions/DisplayAdministrationSmtpSettingsActions";
import DialogContextProvider from "../../../contexts/DialogContext";
import SendTestMailDialog from "../SendTestMailDialog/SendTestMailDialog";

/**
 * The ManageSmtpAdministrationSettings component represented as a page
 */
export default class ManageSmtpAdministrationSettingsPage {
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
   * @param {boolean} withManagePanel should the ManageSmtpAdministrationSettings be rendered
   */
  render(props, withManagePanel = true) {
    const contentToRender = <MockTranslationProvider>
      <DialogContextProvider>
        <AdminSmtpSettingsContextProvider {...props}>
          {withManagePanel && <ManageSmtpAdministrationSettings {...props}/>}
          <SendTestMailDialog {...props}/>
          <DisplayAdministrationSmtpSettingsActions/>
        </AdminSmtpSettingsContextProvider>
      </DialogContextProvider>
    </MockTranslationProvider>;

    if (this._page) {
      this._page.rerender(contentToRender);
    } else {
      this._page = render(contentToRender);
    }
  }

  /**
   * Launch another rendering of the page without the ManageSmtpAdministrationSettings component (causes a call to unmount of the component)
   */
  unmountManagerComponent() {
    this.render(this.props, false);
  }

  /**
   * Launch another rendering of the page with the ManageSmtpAdministrationSettings component
   */
  remountManagerComponent() {
    this.render(this.props, true);
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
    await this.clickOn(this.toolbarActionsSaveButton, () => !this.isSaveButtonEnabled());
  }

  /**
   * Simulates a click on the "Test settings" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async testSettings() {
    await this.clickOn(this.toolbarActionsTestButton, () => Boolean(this.sendTestEmailDialog));
  }

  /**
   * Simulates a click on the dialog submit button.
   * To work properly, the dialog must be visible and the dialog form should validate.
   * @returns {Promise<void>}
   */
  async runTestFromDialog() {
    const currentDialogTitle = this.sendTestEmailDialogTitle.textContent;
    await this.clickOn(this.submitFormDialogButton, () => currentDialogTitle !== this.sendTestEmailDialogTitle.textContent);
  }

  /**
   * Simulates a click on the show "Logs" button.
   * To work properly, the dialog must be visible and the dialog should be in a Success or Error state.
   * @returns {Promise<void>}
   */
  async showLogs() {
    await this.clickOn(this.showLogsButton, () => Boolean(this.logDetails));
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
   * Clicks on the nth provider in the provider list (from the first screen when there is no data).
   * @param {integer} providerIndex
   * @returns {Promise<void>}
   */
  async selectProvider(providerIndex) {
    const providerButton = this.providerButtons[providerIndex];
    await this.clickOn(providerButton, () => this.form !== null);
  }

  /**
   * Opens the provider dropdown and clicks on the nth element in the list (available on the second screen when the provider is already set).
   * @param {integer} providerIndex
   * @returns {Promise<void>}
   */
  async selectProviderInSelectField(providerIndex) {
    const currentProviderValue = this.providerValue;

    await this.clickOn(this.provider, () => true);
    const providerItem = this.providerSelectFieldItems[providerIndex];
    await this.clickOn(providerItem, () => currentProviderValue !== this.providerValue);
  }

  /**
   * Clicks on the nth authentication method in the authentication method list (from the first screen when there is no data).
   * @param {integer} authenticationMethodIndex
   * @returns {Promise<void>}
   */
  async selectAuthenticationMethod(authenticationMethodIndex) {
    const currentAuthenticationMethodValue = this.providerValue;

    await this.clickOn(this.authenticationMethod, () => true);
    const authenticationMethodItem = this.authenticationMethodSelectFieldItems[authenticationMethodIndex];
    await this.clickOn(authenticationMethodItem, () => currentAuthenticationMethodValue !== this.authenticationMethodValue);
  }

  /**
   * Set the current form with the given data (only work with the inputs (not our Select component for instance))
   * @param {object} formData a key value pairs object that contains the field name as a key (must match a getter method on this page) and the desired value
   * @returns {Promise<void>}
   */
  async setFormWith(formData) {
    let key;
    for (key in formData) {
      fireEvent.input(this[key], {target: {value: formData[key]}});
    }
    await waitFor(() => {
      if (this[key].value !== formData[key].toString()) {
        throw new Error("Form is not udpated yet.");
      }
    });
  }

  /**
   * Set the TLS value in the custom Select component
   * @param {boolean} tls the value to choose
   * @returns {Promise<void>}
   */
  async setTls(tls) {
    const textContent = tls ? "Yes" : "No";
    await this.clickOn(this.tls, () => true);
    //There are 2 possible choices and the options are only the non selected items, so elem at index 0 is always what we are looking for in this case
    const tlsItem = this.tlsSelectFieldItems[0];
    await this.clickOn(tlsItem, () => this.tlsValue === textContent);
  }

  /**
   * Display the advanced settings pannel (we must be on the second screen and the advanced settings hidden before using this method).
   * @returns {Promise<void>}
   */
  async showAdvancedSettings() {
    return await this.clickOn(this.select(".smtp-settings .accordion-header button.link"), () => Boolean(this.advancedSettings));
  }

  /**
   * Clicks on the toggle icon of the password in the form
   * @returns {Promise<void>}
   */
  async togglePasswordShow() {
    const passwordToggle = this.select(".smtp-settings .password-view-wrapper button");
    const passwordFiledtype = this.password.getAttribute("type");
    await this.clickOn(passwordToggle, () => passwordFiledtype !== this.password.getAttribute("type"));
  }

  /**
   * Returns the title page HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select(".smtp-settings h3");
  }

  /**
   * Returns all the provider buttons from the first screen.
   * @returns {NodeList}
   */
  get providerButtons() {
    return this.selectAll(".smtp-settings .provider-list .provider");
  }

  /**
   * Returns all the available custom Select options for the providers from the second screen.
   * @returns {NodeList}
   */
  get providerSelectFieldItems() {
    return this.selectAll(".smtp-settings  #smtp-settings-form-provider .items .option");
  }

  /**
   * Returns all the available custom Select options for the authentication methods.
   * @returns {NodeList}
   */
  get authenticationMethodSelectFieldItems() {
    return this.selectAll(".smtp-settings  #smtp-settings-form-authentication-method .items .option");
  }

  /**
   * Returns the username field
   * @returns {HTMLElement}
   */
  get username() {
    return this.select(".smtp-settings #smtp-settings-form-username");
  }

  /**
   * Returns true if the username field is visible
   */
  get isUsernameVisible() {
    return Boolean(this.username);
  }

  /**
   * Returns the username error HTMLElement
   * @returns {HTMLElement}
   */
  get username_error() {
    return this.select(".smtp-settings #smtp-settings-form-username + .error-message");
  }

  /**
   * Returns the password field
   * @returns {HTMLElement}
   */
  get password() {
    return this.select(".smtp-settings #smtp-settings-form-password");
  }

  /**
   * Returns true if the password field is visible
   */
  get isPasswordVisible() {
    return Boolean(this.password);
  }

  /**
   * Returns the password error HTMLElement
   * @returns {HTMLElement}
   */
  get password_error() {
    return this.select(".smtp-settings #smtp-settings-form-password + .error-message");
  }

  /**
   * Returns the sender_name field
   * @returns {HTMLElement}
   */
  get sender_name() {
    return this.select(".smtp-settings #smtp-settings-form-sender-name");
  }

  /**
   * Returns the sender_name error HTMLElement
   * @returns {HTMLElement}
   */
  get sender_name_error() {
    return this.select(".smtp-settings #smtp-settings-form-sender-name + .error-message");
  }

  /**
   * Returns the sender_email field
   * @returns {HTMLElement}
   */
  get sender_email() {
    return this.select(".smtp-settings #smtp-settings-form-sender-email");
  }

  /**
   * Returns the sender_email error HTMLElement
   * @returns {HTMLElement}
   */
  get sender_email_error() {
    return this.select(".smtp-settings #smtp-settings-form-sender-email + .error-message");
  }

  /**
   * Returns the host field
   * @returns {HTMLElement}
   */
  get host() {
    return this.select(".smtp-settings #smtp-settings-form-host");
  }

  /**
   * Returns the host error HTMLElement
   * @returns {HTMLElement}
   */
  get host_error() {
    return this.select(".smtp-settings #smtp-settings-form-host + .error-message");
  }

  /**
   * Returns the tls field
   * @returns {HTMLElement}
   */
  get tls() {
    return this.select(".smtp-settings #smtp-settings-form-tls");
  }

  /**
   * Returns the TLS selected value
   * @returns {string} "Yes" or "No"
   */
  get tlsValue() {
    return this.select(".smtp-settings #smtp-settings-form-tls .value").textContent;
  }

  /**
   * Returns all the TLS options from the custom Select component.
   * @returns {NodeList}
   */
  get tlsSelectFieldItems() {
    return this.selectAll(".smtp-settings #smtp-settings-form-tls .items .option");
  }

  /**
   * Returns the port field
   * @returns {HTMLElement}
   */
  get port() {
    return this.select(".smtp-settings #smtp-settings-form-port");
  }

  /**
   * Returns the port error HTMLElement
   * @returns {HTMLElement}
   */
  get port_error() {
    return this.select(".smtp-settings #smtp-settings-form-port + .error-message");
  }

  /**
   * Returns the client field
   * @returns {HTMLElement}
   */
  get client() {
    return this.select(".smtp-settings #smtp-settings-form-client");
  }

  /**
   * Returns the client error HTMLElement
   * @returns {HTMLElement}
   */
  get client_error() {
    return this.select(".smtp-settings #smtp-settings-form-client + .error-message");
  }

  /**
   * Returns the advanced settings HTMLElements
   * @returns {HTMLElement}
   */
  get advancedSettings() {
    return this.select(".smtp-settings .advanced-settings");
  }

  /**
   * Returns the form HTMLElement
   * @returns {HTMLElement}
   */
  get form() {
    return this.select(".smtp-settings form");
  }

  /**
   * Returns the provider HTMLElement (the custom Select component in the second screen)
   * @returns {HTMLElement}
   */
  get provider() {
    return this.select(".smtp-settings #smtp-settings-form-provider");
  }

  /**
   * Returns the selected value from the provider in the second screen.
   * @returns {string}
   */
  get providerValue() {
    return this.select(".smtp-settings #smtp-settings-form-provider .value").textContent;
  }

  /**
   * Returns the authentication method HTMLElement
   * @returns {HTMLElement}
   */
  get authenticationMethod() {
    return this.select(".smtp-settings #smtp-settings-form-authentication-method");
  }

  /**
   * Returns the selected value from the provider in the second screen.
   * @returns {string}
   */
  get authenticationMethodValue() {
    return this.select(".smtp-settings #smtp-settings-form-authentication-method .value").textContent;
  }

  /**
   * Returns the warning message "settings coming from file" text content if exists
   * @returns {string|undefined}
   */
  get settingsFromFileWarningMessage() {
    return this.select(".smtp-settings .warning.message")?.textContent;
  }

  /**
   * Returns the HTMLElement link of the first help block (the one for the Passbolt's help site)
   * @returns {HTMLElement}
   */
  get passboltHelpPage() {
    return this.selectAll(".sidebar-help a")[0];
  }

  /**
   * Returns the HTMLElement link of the second help block (the one for provider's specific help site)
   * @returns {HTMLElement}
   */
  get smtpProviderHelpPage() {
    return this.selectAll(".sidebar-help a")[1];
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Save Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSaveButton() {
    return this.selectAll(".actions-wrapper .actions button")[0];
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Test Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsTestButton() {
    return this.selectAll(".actions-wrapper .actions button")[1];
  }

  /**
   * Returns the send test email dialog
   * @returns {HTMLElement}
   */
  get sendTestEmailDialog() {
    return this.select(".send-test-email-dialog .dialog");
  }

  /**
   * Returns the send test email dialog title
   * @returns {HTMLElement}
   */
  get sendTestEmailDialogTitle() {
    return this.select(".send-test-email-dialog .dialog h2");
  }

  /**
   * Returns the dialog submit button
   * @returns {HTMLElement}
   */
  get submitFormDialogButton() {
    return this.select(".send-test-email-dialog .dialog button[type='submit']");
  }

  /**
   * Returns the dialog "Logs" toggle button
   * @returns {HTMLElement}
   */
  get showLogsButton() {
    return this.select(".send-test-email-dialog .accordion-header button");
  }

  /**
   * Returns the dialog logs details textarea
   * @returns {HTMLElement}
   */
  get logDetails() {
    return this.select(".send-test-email-dialog textarea");
  }
}
