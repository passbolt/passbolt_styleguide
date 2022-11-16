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
import DisplayAdministrationSmtpSettingsActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSmtpSettingsActions/DisplayAdministrationSmtpSettingsActions";
import DialogContextProvider from "../../../contexts/DialogContext";
import SendTestMailDialog from "../SendTestMailDialog/SendTestMailDialog";

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
          <ManageSsoSettings {...props}/>
          <SendTestMailDialog {...props}/>
          <DisplayAdministrationSmtpSettingsActions/>
        </AdminSsoContextProvider>
      </DialogContextProvider>
    </MockTranslationProvider>);
  }

  /**
   * Launch another rendering of the page without the ManageSsoSettings component (causes a call to unmount of the component)
   */
  unmountManagerComponent() {
    this.render(this.props, false);
  }

  /**
   * Launch another rendering of the page with the ManageSsoSettings component
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
}
