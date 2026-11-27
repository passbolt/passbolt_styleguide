/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayInFormIntegrationSettings from "./DisplayInFormIntegrationSettings";
import userEvent from "@testing-library/user-event";

/**
 * The DisplayInFormIntegrationSettings component represented as a page
 */
export default class DisplayInFormIntegrationSettingsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayInFormIntegrationSettings {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the in-form menu toggle checkbox
   * @returns {HTMLInputElement}
   */
  get inFormMenuCheckbox() {
    return this._page.container.querySelector("input[name='isInFormMenuEnabled']");
  }

  /**
   * Whether the in-form menu toggle is checked
   * @returns {boolean}
   */
  get isInFormMenuChecked() {
    return this.inFormMenuCheckbox.checked;
  }

  /**
   * Toggle the in-form menu checkbox
   * @returns {Promise<void>}
   */
  async toggleInFormMenu() {
    await this.user.click(this.inFormMenuCheckbox);
  }
}
