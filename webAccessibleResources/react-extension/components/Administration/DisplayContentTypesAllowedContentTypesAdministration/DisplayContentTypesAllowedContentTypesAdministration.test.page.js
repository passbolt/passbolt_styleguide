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
 * @since         4.12.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayContentTypesAllowedContentTypesAdministration from "./DisplayContentTypesAllowedContentTypesAdministration";
import userEvent from "@testing-library/user-event";

export default class DisplayContentTypesEncryptedMetadataAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayContentTypesAllowedContentTypesAdministration {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );

    this.user = userEvent.setup();
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
    return this.select("#allow-content-types h3");
  }

  /**
   * Returns the form banner element
   * @returns {HTMLElement}
   */
  get formBanner() {
    return this.select(".warning.message");
  }

  /**
   * Returns the form element
   * @returns {HTMLElement}
   */
  get form() {
    return this.select("form");
  }

  /**
   * Returns the password v4 warning element
   * @returns {HTMLElement}
   */
  get passwordV4Warning() {
    return this.select("#passwordV4Input + label .warning-message");
  }

  /**
   * Returns the totp v4 warning element
   * @returns {HTMLElement}
   */
  get totpV4Warning() {
    return this.select("#totpV4Input + label .warning-message");
  }

  /**
   * Returns the password v5 warning element
   * @returns {HTMLElement}
   */
  get passwordV5Warning() {
    return this.select("#passwordV5Input + label .warning-message");
  }

  /**
   * Returns the totp v5 warning element
   * @returns {HTMLElement}
   */
  get totpV5Warning() {
    return this.select("#totpV5Input + label .warning-message");
  }

  /**
   * Returns the custom fields v5 warning element
   * @returns {HTMLElement}
   */
  get customFieldsV5Warning() {
    return this.select("#customFieldsV5Input + label .warning-message");
  }

  /**
   * Returns the note v5 warning element
   * @returns {HTMLElement}
   */
  get noteV5Warning() {
    return this.select("#noteV5Input + label .warning-message");
  }

  /**
   * Returns the password v4 error element
   * @returns {HTMLElement}
   */
  get passwordV4Error() {
    return this.select("#passwordV4Input + label .error-message");
  }

  /**
   * Returns the totp v4 error element
   * @returns {HTMLElement}
   */
  get totpV4Error() {
    return this.select("#totpV4Input + label .error-message");
  }

  /**
   * Returns the password v5 error element
   * @returns {HTMLElement}
   */
  get passwordV5Error() {
    return this.select("#passwordV5Input + label .error-message");
  }

  /**
   * Returns the totp v5 error element
   * @returns {HTMLElement}
   */
  get totpV5Error() {
    return this.select("#totpV5Input + label .error-message");
  }

  /**
   * Returns the custom fields v5 error element
   * @returns {HTMLElement}
   */
  get customFieldsV5Error() {
    return this.select("#customFieldsV5Input + label .error-message");
  }

  /**
   * Returns the note v5 error element
   * @returns {HTMLElement}
   */
  get noteV5Error() {
    return this.select("#noteV5Input + label .error-message");
  }

  /**
   * Returns the password v4 checkbox element
   * @returns {HTMLElement}
   */
  get passwordV4Checkbox() {
    return this.select("#passwordV4Input");
  }

  /**
   * Returns the totp v5 checkbox element
   * @returns {HTMLElement}
   */
  get totpV4Checkbox() {
    return this.select("#totpV4Input");
  }

  /**
   * Returns the password v4 checkbox element
   * @returns {HTMLElement}
   */
  get passwordV5Checkbox() {
    return this.select("#passwordV5Input");
  }

  /**
   * Returns the totp v5 checkbox element
   * @returns {HTMLElement}
   */
  get totpV5Checkbox() {
    return this.select("#totpV5Input");
  }

  /**
   * Returns the custom fields v5 checkbox element
   * @returns {HTMLElement}
   */
  get customFieldsV5Checkbox() {
    return this.select("#customFieldsV5Input");
  }

  /**
   * Returns the note v5 checkbox element
   * @returns {HTMLElement}
   */
  get noteV5Checkbox() {
    return this.select("#noteV5Input");
  }

  /**
   * Simulates a click on the given HTML element.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @returns {Promise<void>}
   */
  async clickOn(element) {
    await this.user.click(element);
  }

  /**
   * Submit the form.
   * @returns {Promise<void>}
   */
  async save() {
    fireEvent.submit(this.form);
    await waitFor(() => {});
  }
}
