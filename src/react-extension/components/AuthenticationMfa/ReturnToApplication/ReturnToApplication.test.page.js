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
 * @since         5.17.0
 */
import React from "react";
import { render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import { ApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import ReturnToApplication from "./ReturnToApplication";

/**
 * The ReturnToApplication component represented as a page
 */
export default class ReturnToApplicationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiMfaVerifyContext.Provider value={props.apiMfaVerifyContext}>
          <ReturnToApplication {...props} />
        </ApiMfaVerifyContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the link to the application
   */
  get link() {
    return this._page.container.querySelector("a.return-to-application");
  }
}
