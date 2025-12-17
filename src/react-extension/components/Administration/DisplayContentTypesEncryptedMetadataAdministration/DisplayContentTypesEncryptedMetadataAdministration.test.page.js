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
import { fireEvent, render, waitFor } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayContentTypesEncryptedMetadataAdministration from "./DisplayContentTypesEncryptedMetadataAdministration";

export default class DisplayContentTypesEncryptedMetadataAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DisplayContentTypesEncryptedMetadataAdministration {...props} />
        </AppContext.Provider>
      </MockTranslationProvider>,
      { legacyRoot: true },
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
    return this.select("#content-types-encrypted-metadata-settings h3");
  }

  /**
   * Returns the form banner element
   * @returns {HTMLElement}
   */
  get formBanner() {
    return this.select(".form-banner");
  }

  /**
   * Returns the count of displayed warning messages
   * @returns {integer}
   */
  get warningMessagesCount() {
    return this._page.container.querySelectorAll(".warning-message").length;
  }

  /**
   * Returns the count of displayed error messages
   * @returns {integer}
   */
  get errorMessagesCount() {
    return this._page.container.querySelectorAll(".error-message").length;
  }

  /**
   * Returns the allow creation of v5 resources toggle element
   * @returns {HTMLElement}
   */
  get allowCreationOfV5ResourcesInput() {
    return this.select("#allowCreationOfV5ResourcesInput");
  }

  /**
   * Returns the allow creation of v5 resources associated error element
   * @returns {HTMLElement}
   */
  get allowCreationOfV5ResourcesError() {
    return this.allowCreationOfV5ResourcesInput.parentElement.querySelector(".error-message");
  }

  /**
   * Returns the allow creation of v5 resources associated warning element
   * @returns {HTMLElement}
   */
  get allowCreationOfV5ResourcesWarning() {
    return this.allowCreationOfV5ResourcesInput.parentElement.querySelector(".warning-message");
  }

  /**
   * Returns the allow creation of v4 resources toggle element
   * @returns {HTMLElement}
   */
  get allowCreationOfV4ResourcesInput() {
    return this.select("#allowCreationOfV4ResourcesInput");
  }

  /**
   * Returns the allow creation of v4 resources associated error element
   * @returns {HTMLElement}
   */
  get allowCreationOfV4ResourcesError() {
    return this.allowCreationOfV4ResourcesInput.parentElement.querySelector("div .error-message");
  }

  /**
   * Returns the allow creation of v4 resources associated warning element
   * @returns {HTMLElement}
   */
  get allowCreationOfV4ResourcesWarning() {
    return this.allowCreationOfV4ResourcesInput.parentElement.querySelector("div .warning-message");
  }

  /**
   * Returns the default resource v5 type resource creation radio button
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV5Input() {
    return this.select("#defaultResourceTypesV5Input");
  }

  /**
   * Returns the default resource v5 type resource creation associated error element
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV5Error() {
    return this.defaultResourceTypesV5Input.parentElement.querySelector("div .error-message");
  }

  /**
   * Returns the default resource v5 type resource creation associated warning element
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV5Warning() {
    return this.defaultResourceTypesV5Input.parentElement.querySelector("div .warning-message");
  }

  /**
   * Returns the default resource v4 type resource creation radio button
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV4Input() {
    return this.select("#defaultResourceTypesV4Input");
  }

  /**
   * Returns the default resource v4 type resource creation associated error element
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV4Error() {
    return this.defaultResourceTypesV4Input.parentElement.querySelector("div .error-message");
  }

  /**
   * Returns the default resource v4 type resource creation associated warning element
   * @returns {HTMLElement}
   */
  get defaultResourceTypesV4Warning() {
    return this.defaultResourceTypesV4Input.parentElement.querySelector("div .warning-message");
  }

  /**
   * Returns the allow v4 to v5 upgrade toggle element
   * @returns {HTMLElement}
   */
  get allowV4V5UpgradeInput() {
    return this.select("#allowV4V5UpgradeInput");
  }

  /**
   * Returns the allow v4 to v5 upgrade associated error element
   * @returns {HTMLElement}
   */
  get allowV4V5UpgradeError() {
    return this.allowV4V5UpgradeInput.parentElement.querySelector("div .error-message");
  }

  /**
   * Returns the allow v4 to v5 upgrade associated warning element
   * @returns {HTMLElement}
   */
  get allowV4V5UpgradeWarning() {
    return this.allowV4V5UpgradeInput.parentElement.querySelector("div .warning-message");
  }

  /**
   * Returns the allow v5 to v4 downgrade toggle element
   * @returns {HTMLElement}
   */
  get allowV5V4DowngradeInput() {
    return this.select("#allowV5V4DowngradeInput");
  }

  /**
   * Returns the allow v5 to v4 downgrade associated error element
   * @returns {HTMLElement}
   */
  get allowV5V4DowngradeError() {
    return this.allowV5V4DowngradeInput.parentElement.querySelector("div .error-message");
  }

  /**
   * Returns the allow v5 to v4 downgrade associated warning element
   * @returns {HTMLElement}
   */
  get allowV5V4DowngradeWarning() {
    return this.allowV5V4DowngradeInput.parentElement.querySelector("div .warning-message");
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

  /**
   * Allow or disallow v4 resources creation
   * @returns {Promise<void>}
   */
  async clickOnAllowCreationOfV4ResourcesInput() {
    const leftClick = { button: 0 };
    fireEvent.click(this.allowCreationOfV4ResourcesInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Allow or disallow v5 resources creation
   * @returns {Promise<void>}
   */
  async clickOnAllowCreationOfV5ResourcesInput() {
    const leftClick = { button: 0 };
    fireEvent.click(this.allowCreationOfV5ResourcesInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Select v5 as default resource type.
   * @returns {Promise<void>}
   */
  async clickOnDefaultResourceTypesV5Input() {
    const leftClick = { button: 0 };
    fireEvent.click(this.defaultResourceTypesV5Input, leftClick);
    await waitFor(() => {});
  }
}
