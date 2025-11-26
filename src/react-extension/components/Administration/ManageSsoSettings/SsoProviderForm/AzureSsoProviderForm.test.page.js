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
 * @since         4.5.0
 */
import {fireEvent, render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {waitForTrue} from "../../../../../../test/utils/waitFor";
import AzureSsoProviderForm from "./AzureSsoProviderForm";

/**
 * The AzureSsoProviderForm component represented as a page
 */
export default class AzureSsoProviderFormPage {
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
    const contentToRender = <MockTranslationProvider>
      <AzureSsoProviderForm {...props}/>
    </MockTranslationProvider>;

    if (this._page) {
      this._page.rerender(contentToRender);
    } else {
      this._page = render(contentToRender,
        {legacyRoot: true});
    }
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
   * Returns true if the page exists.
   * @returns {boolean}
   */
  exists() {
    return Boolean(this.url);
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
    await waitForTrue(() => callback());
  }

  /**
   * Clicks on advanced settings toggle.
   * @returns {Promise<void>}
   */
  async toggleAdvancedSettings() {
    const currentState = this.isAdvancedSettingsVisible;
    await this.clickOn(this.advancedSettingsButton, () => this.isAdvancedSettingsVisible !== currentState);
  }

  /**
   * Returns true if the advanced settings panel is visible, false otherwise
   * @returns {boolean}
   */
  get isAdvancedSettingsVisible() {
    return Boolean(this.prompt);
  }

  /**
   * Returns the url input HTML element
   * @returns {HTMLElement}
   */
  get url() {
    return this.select("#sso-azure-url-input");
  }

  /**
   * Returns the redirect_url input HTML element
   * @returns {HTMLElement}
   */
  get redirect_url() {
    return this.select("#sso-redirect-url-input");
  }

  /**
   * Returns the redirect_url input HTML element
   * @returns {HTMLElement}
   */
  get redirectUrlButton() {
    return this.select("#sso-redirect-url-input + .copy-to-clipboard");
  }

  /**
   * Returns the tenant_id input HTML element
   * @returns {HTMLElement}
   */
  get tenant_id() {
    return this.select("#sso-azure-tenant-id-input");
  }

  /**
   * Returns the tenant_id error HTML element
   * @returns {HTMLElement}
   */
  get tenantIdError() {
    return this.select("#sso-azure-tenant-id-input+ .error-message");
  }

  /**
   * Returns the client_id input HTML element
   * @returns {HTMLElement}
   */
  get client_id() {
    return this.select("#sso-azure-client-id-input");
  }

  /**
   * Returns the client_id error HTML element
   * @returns {HTMLElement}
   */
  get clientIdError() {
    return this.select("#sso-azure-client-id-input + .error-message");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get client_secret() {
    return this.select("#sso-azure-secret-input");
  }

  /**
   * Returns the client_secret error HTML element
   * @returns {HTMLElement}
   */
  get clientSecretError() {
    return this.select(".password + .error-message");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get client_secret_expiry() {
    return this.select("#sso-azure-secret-expiry-input");
  }

  /**
   * Returns the client_secret_expiry error HTML element
   * @returns {HTMLElement}
   */
  get clientSecretExpiryError() {
    return this.select(".date-wrapper .error-message");
  }

  /**
   * Returns the advanced settings toggle button HTML element
   * @returns {HTMLElement}
   */
  get advancedSettingsButton() {
    return this.select("#advanced-settings-panel-button");
  }

  /**
   * Returns the prompt select field
   * @returns {HTMLElement}
   */
  get prompt() {
    return this.select("#prompt-input");
  }

  /**
   * Returns the current element in the page having the focus
   * @returns {HTMLElement}
   */
  get currentActiveElement() {
    return this._page.container.ownerDocument.activeElement;
  }

  /**
   * Returns true if an element in the page has a focus
   * @returns {boolean}
   */
  get hasActiveElement() {
    const body = this._page.container.ownerDocument.body;
    return this.currentActiveElement !== body;
  }
}
