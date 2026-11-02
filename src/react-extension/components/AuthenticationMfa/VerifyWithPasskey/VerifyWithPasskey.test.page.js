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
import VerifyWithPasskey from "./VerifyWithPasskey";

/**
 * The VerifyWithPasskey component represented as a page
 */
export default class VerifyWithPasskeyPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiMfaVerifyContext.Provider value={props.apiMfaVerifyContext}>
          <VerifyWithPasskey {...props} />
        </ApiMfaVerifyContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the passkey logo
   */
  get logo() {
    return this._page.container.querySelector(".centered-login-provider-icon");
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector("h1.login-title");
  }

  /**
   * Returns the remember checkbox
   */
  get rememberCheckbox() {
    return this._page.container.querySelector(".input.checkbox input#remember");
  }

  /**
   * Returns the verify button
   */
  get verifyButton() {
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
   * Toggle the remember checkbox
   */
  toggleRemember() {
    fireEvent.click(this.rememberCheckbox);
  }

  /**
   * Click on the verify button
   */
  verify() {
    fireEvent.click(this.verifyButton);
  }
}
