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
import { fireEvent, render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import { ApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import DisplayMfaVerifyError from "./DisplayMfaVerifyError";

/**
 * The DisplayMfaVerifyError component represented as a page
 */
export default class DisplayMfaVerifyErrorPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiMfaVerifyContext.Provider value={props.apiMfaVerifyContext}>
          <DisplayMfaVerifyError {...props} />
        </ApiMfaVerifyContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".mfa-verify-error h1");
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector(".mfa-verify-error p");
  }

  /**
   * Returns the try again button
   */
  get tryAgainButton() {
    return this._page.container.querySelector(".form-actions button.button.primary");
  }

  /**
   * Returns the link to the next provider
   */
  get anotherProviderLink() {
    return this._page.container.querySelector(".form-actions a:not(.return-to-application)");
  }

  /**
   * Returns the link to return to the application
   */
  get returnToApplicationLink() {
    return this._page.container.querySelector(".form-actions a.return-to-application");
  }

  /**
   * Returns the logs button
   */
  get logsButton() {
    return this._page.container.querySelector(".accordion-header button");
  }

  /**
   * Returns the logs textarea
   */
  get logs() {
    return this._page.container.querySelector(".accordion-content textarea");
  }

  /**
   * Click on the try again button
   */
  tryAgain() {
    fireEvent.click(this.tryAgainButton);
  }

  /**
   * Click on the logs button
   */
  toggleLogs() {
    fireEvent.click(this.logsButton);
  }
}
