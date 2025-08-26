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
 * @since         5.5.0
 */

import React from "react";
import {fireEvent, render} from '@testing-library/react';
import DisplayScimSettingsAdministration from './DisplayScimSettingsAdministration';
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

export default class DisplayScimSettingsAdministrationPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayScimSettingsAdministration {...props}/>
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
    return this.select("h3.title").textContent;
  }

  /**
   * Returns the page description element
   * @returns {HTMLElement}
   */
  get description() {
    return this.select("p.description").textContent;
  }

  /**
   * Returns the SCIM settings toggle element
   * @returns {HTMLElement}
   */
  get scimSettingsToggle() {
    return this.select("input#scimSettingsToggle");
  }

  /**
   * Returns the SCIM URL input element
   * @returns {HTMLElement}
   */
  get scimUrlInput() {
    return this.select("input#scim-url-input");
  }

  /**
   * Return the disabled state of scim url
   * @returns {HTMLElement}
   */
  get isScimUrlInputDisabled() {
    return this.scimUrlInput.hasAttribute("disabled");
  }

  /**
   * Returns the SCIM secret token input element
   * @returns {HTMLElement}
   */
  get scimSecretTokenInput() {
    return this.select("input#scim-secret-token-input");
  }

  /**
   * Return the disabled state of scim secret token
   * @returns {HTMLElement}
   */
  get isScimSecretTokenInputDisabled() {
    return this.scimSecretTokenInput.hasAttribute("disabled");
  }

  /**
   * Returns the SCIM user select element
   * @returns {HTMLElement}
   */
  get scimUserSelect() {
    return this.select("select[name='scim_user_id']");
  }

  /**
   * Returns the copy SCIM URL button element
   * @returns {HTMLElement}
   */
  get copyScimUrlButton() {
    return this.select("button.copy-to-clipboard");
  }

  /**
   * Returns the copy secret token button element
   * @returns {HTMLElement}
   */
  get copySecretTokenButton() {
    return this.selectAll("button.copy-to-clipboard")[1];
  }

  /**
   * Return the disabled state of the copy secret token
   * @returns {HTMLElement}
   */
  get isCopySecretTokenButtonDisabled() {
    return this.copySecretTokenButton.hasAttribute("disabled");
  }

  /**
   * Returns the regenerate secret token button element
   * @returns {HTMLElement}
   */
  get regenerateSecretTokenButton() {
    return this.selectAll("button.copy-to-clipboard")[2];
  }

  /**
   * Returns the save button element
   * @returns {HTMLElement}
   */
  get saveButton() {
    return this.select("button.primary");
  }

  /**
   * return the warning message
   */
  get warning() {
    return this.select(".warning.message");
  }

  /**
   * Selects all elements matching the CSS selector
   * @param {string} cssSelector
   * @returns {NodeList}
   */
  selectAll(cssSelector) {
    return this._page.container.querySelectorAll(cssSelector);
  }

  /** Click on the element */
  click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /**
   * Toggles the SCIM settings
   */
  toggleScimSettings() {
    this.click(this.scimSettingsToggle);
  }

  /**
   * Clicks the copy SCIM URL button
   */
  clickCopyScimUrlButton() {
    this.click(this.copyScimUrlButton);
  }

  /**
   * Clicks the copy secret token button
   */
  clickCopySecretTokenButton() {
    this.click(this.copySecretTokenButton);
  }

  /**
   * Clicks the regenerate secret token button
   */
  clickRegenerateSecretTokenButton() {
    this.click(this.regenerateSecretTokenButton);
  }

  /**
   * Clicks the save button
   * @returns {Promise<void>}
   */
  clickSaveButton() {
    this.click(this.saveButton);
  }
}

