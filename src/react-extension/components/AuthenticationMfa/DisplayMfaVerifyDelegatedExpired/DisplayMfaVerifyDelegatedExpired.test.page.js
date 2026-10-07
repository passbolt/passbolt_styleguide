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
import DisplayMfaVerifyDelegatedExpired from "./DisplayMfaVerifyDelegatedExpired";

/**
 * The DisplayMfaVerifyDelegatedExpired component represented as a page
 */
export default class DisplayMfaVerifyDelegatedExpiredPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiMfaVerifyContext.Provider value={props.apiMfaVerifyContext}>
          <DisplayMfaVerifyDelegatedExpired {...props} />
        </ApiMfaVerifyContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the feedback icon
   */
  get icon() {
    return this._page.container.querySelector(".mfa-verify-delegated-result .icon-feedback .attention");
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".mfa-verify-delegated-result h1");
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector(".mfa-verify-delegated-result p");
  }

  /**
   * Returns the button returning to the application
   */
  get returnToApplicationButton() {
    return this._page.container.querySelector(".form-actions a.button.primary");
  }
}
