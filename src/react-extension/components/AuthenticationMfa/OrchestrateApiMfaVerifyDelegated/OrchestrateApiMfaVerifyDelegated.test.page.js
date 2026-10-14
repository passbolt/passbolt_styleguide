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
import OrchestrateApiMfaVerifyDelegated from "./OrchestrateApiMfaVerifyDelegated";

/**
 * The OrchestrateApiMfaVerifyDelegated component represented as a page
 */
export default class OrchestrateApiMfaVerifyDelegatedPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiMfaVerifyContext.Provider value={props.apiMfaVerifyContext}>
          <OrchestrateApiMfaVerifyDelegated {...props} />
        </ApiMfaVerifyContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the loading spinner screen
   */
  get loadingSpinner() {
    return this._page.container.querySelector(".login-processing");
  }

  /**
   * Returns the passkey verification screen
   */
  get verifyWithPasskey() {
    return this._page.container.querySelector("h1.login-title");
  }

  /**
   * Returns the success screen
   */
  get success() {
    return this._page.container.querySelector(".mfa-verify-delegated-success");
  }

  /**
   * Returns the expired screen
   */
  get expired() {
    return this._page.container.querySelector(".mfa-verify-delegated-expired");
  }

  /**
   * Returns the unsupported browser screen
   */
  get unsupported() {
    return this._page.container.querySelector(".mfa-verify-delegated-unsupported");
  }

  /**
   * Returns the error screen
   */
  get error() {
    return this._page.container.querySelector(".mfa-verify-error");
  }
}
