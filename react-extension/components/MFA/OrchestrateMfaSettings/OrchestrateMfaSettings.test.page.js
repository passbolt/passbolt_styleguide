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
 * @since         5.18.0
 */

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import OrchestrateMfaSettings from "./OrchestrateMfaSettings";

/**
 * The OrchestrateMfaSettings component represented as a page
 */
export default class OrchestrateMfaSettingsPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   * @param {string} initialEntry The current location (pathname and search)
   */
  constructor(props, initialEntry) {
    this._page = render(
      <MockTranslationProvider>
        <MemoryRouter initialEntries={[initialEntry]}>
          <Route path={["/app/settings/mfa/:provider", "/app/settings/mfa"]}>
            <OrchestrateMfaSettings {...props} />
          </Route>
        </MemoryRouter>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the class name of the displayed view, null if none
   */
  get displayedView() {
    return this._page.container.firstElementChild?.className ?? null;
  }

  /**
   * Returns the error code given to the Duo setup error view
   */
  get duoSetupErrorCode() {
    return this._page.container.querySelector(".duo-setup-error").textContent;
  }
}
