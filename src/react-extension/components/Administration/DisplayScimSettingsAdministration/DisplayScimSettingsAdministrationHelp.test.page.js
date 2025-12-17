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
 * @since         5.7.0
 */

import React from "react";
import { render } from "@testing-library/react";
import DisplayScimSettingsAdministrationHelp from "./DisplayScimSettingsAdministrationHelp";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayScimSettingsAdministrationHelp component represented as a page
 */
export default class DisplayScimSettingsAdministrationHelpPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayScimSettingsAdministrationHelp {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.helpBox !== null;
  }

  /*
   * ==================================================
   * Help section elements
   * ==================================================
   */

  /**
   * Returns the warning banner section
   * @returns {HTMLElement}
   */
  get warningSection() {
    return this._page.container.querySelector(".sidebar-help-section.warning.message");
  }

  /**
   * Returns the warning banner
   * @returns {HTMLElement}
   */
  get warningBanner() {
    return this._page.container.querySelector(".sidebar-help-section.warning.message .form-banner");
  }

  /**
   * Returns true if warning banner is displayed
   * @returns {boolean}
   */
  get hasWarningBanner() {
    return this.warningBanner !== null;
  }

  /**
   * Returns the help box
   * @returns {HTMLElement}
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help-section:not(.warning)");
  }

  /**
   * Returns the help box title
   * @returns {HTMLElement}
   */
  get helpBoxTitle() {
    return this._page.container.querySelector(".sidebar-help-section:not(.warning) h3");
  }

  /**
   * Returns the help box description
   * @returns {NodeList}
   */
  get helpBoxDescription() {
    return this._page.container.querySelectorAll(".sidebar-help-section:not(.warning) p");
  }

  /**
   * Returns the help box button
   * @returns {HTMLElement}
   */
  get helpBoxButton() {
    return this._page.container.querySelector(".sidebar-help-section:not(.warning) .button");
  }
}
