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
 * @since         5.0.0
 */

import React from "react";
import DisplayMfaSettingsHelp from "./DisplayMfaSettingsHelp";
import { render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayMfaSettingsHelp component represented as a page
 */
export default class DisplayMfaSettingsHelpPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayMfaSettingsHelp {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help-section");
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this._page.container.querySelector(".sidebar-help-section h3");
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this._page.container.querySelector(".sidebar-help-section p");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector(".sidebar-help-section .button");
  }
}
