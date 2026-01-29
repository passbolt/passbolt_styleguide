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
 * @since         4.3.0
 */

import React from "react";
import { render } from "@testing-library/react";
import OrchestrateAccountKitImportation from "./OrchestrateAccountKitImportation";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The OrchestrateAccountKitImportation component represented as a page
 */
export default class OrchestrateAccountKitImportationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <OrchestrateAccountKitImportation {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the get started page
   */
  get getStartedPage() {
    return this._page.container.querySelector(".get-started-desktop");
  }

  /**
   * Returns the import account kit page
   */
  get importAccountKitPage() {
    return this._page.container.querySelector(".import-account-kit");
  }

  /**
   * Returns the account kit details page
   */
  get importAccountKitDetailsPage() {
    return this._page.container.querySelector(".import-account-kit-details");
  }

  /**
   * Returns the display unexpected error page
   */
  get displayUnexpectedErrorPage() {
    return this._page.container.querySelector(".setup-error");
  }

  /**
   * Returns the loading processing title
   */
  get loadingTitle() {
    return this._page.container.querySelector(".login-processing h1").textContent;
  }
}
