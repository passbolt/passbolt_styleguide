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
 * @since         4.11.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayContentTypesMetadataKeyAdministration from "./DisplayContentTypesMetadataKeyAdministration";

export default class DisplayContentTypesMetadataKeyAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayContentTypesMetadataKeyAdministration {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the page title element
   * @returns {HTMLElement}
   */
  get title() {
    return this.select("#content-types-metadata-key-settings h3");
  }

  /**
   * Returns the form banner element
   * @returns {HTMLElement}
   */
  get formBanner() {
    return this.select(".form-banner");
  }

  /**
   * Returns the count of displayed error messages
   * @returns {integer}
   */
  get errorMessagesCount() {
    return this._page.container.querySelectorAll(".error-message").length;
  }

  /**
   * Returns the allow usage of personal keys radio button element
   * @returns {HTMLElement}
   */
  get allowUsageOfPersonalKeysInput() {
    return this.select("#allowUsageOfPersonalKeysInput");
  }

  /**
   * Returns the enforce usage of shared key radio button element
   * @returns {HTMLElement}
   */
  get disallowUsageOfPersonalKeysInput() {
    return this.select("#disallowUsageOfPersonalKeysInput");
  }

  /**
   * Returns the disable zero knowledge key share radio button
   * @returns {HTMLElement}
   */
  get disableZeroKnowledgeKeyShareInput() {
    return this.select("#disableZeroKnowledgeKeyShareInput");
  }

  /**
   * Returns the enable zero knowledge key share radio button
   * @returns {HTMLElement}
   */
  get enableZeroKnowledgeKeyShareInput() {
    return this.select("#enableZeroKnowledgeKeyShareInput");
  }

  /**
   * Returns the metadata active keys wrapper element
   * @returns {HTMLElement}
   */
  get metadataActiveKeysWrapper() {
    return this.select("#metadata-active-keys");
  }

  /**
   * Returns the no metadata active keys wrapper element
   * @returns {HTMLElement}
   */
  get noMetadataActiveKeysWrapper() {
    return this.select("#no-metadata-active-keys");
  }

  /**
   * Returns the required shared metadata key error element
   * @returns {HTMLElement}
   */
  get requiredSharedMetadataKeyError() {
    return this.noMetadataActiveKeysWrapper.querySelector("div .error-message");
  }

  /**
   * Returns the metadata expired keys wrapper element
   * @returns {HTMLElement}
   */
  get metadataExpiredKeysWrapper() {
    return this.select("#metadata-expired-keys");
  }

  /**
   * Returns the generate a key button
   * @returns {HTMLElement}
   */
  get generateKeyButton() {
    return this.noMetadataActiveKeysWrapper.querySelector("button");
  }

  /**
   * Allow or disallow v4 resources creation
   * @returns {Promise<void>}
   */
  async clickOnDisallowUsageOfPersonalKeysInput() {
    const leftClick = {button: 0};
    fireEvent.click(this.disallowUsageOfPersonalKeysInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Allow zero knowledge
   * @returns {Promise<void>}
   */
  async clickOnAllowZeroKnowledgeInput() {
    const leftClick = {button: 0};
    fireEvent.click(this.enableZeroKnowledgeKeyShareInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Generate a new shared metadata key
   * @returns {Promise<void>}
   */
  async clickOnGenerateKeyButton() {
    const leftClick = {button: 0};
    fireEvent.click(this.generateKeyButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns the form element
   * @returns {HTMLElement}
   */
  get form() {
    return this.select("form");
  }

  /**
   * Submit the form.
   * @returns {Promise<void>}
   */
  async submitForm() {
    fireEvent.submit(this.form);
    await waitFor(() => {});
  }
}
