/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplaySsoProviderMismatchError from "./DisplaySsoProviderMismatchError";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplaySsoProviderMismatchError component represented as a page
 */
export default class DisplaySsoProviderMismatchErrorPage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   */
  constructor(props = {}) {
    this._page = render(
      <MockTranslationProvider>
        <DisplaySsoProviderMismatchError {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.sso-provider-mismatch-error h1');
  }

  /**
   * Returns paragraph containing the error message
   */
  get message() {
    return this._page.container.querySelector('.sso-provider-mismatch-error p');
  }

  /**
   * Returns the confirmation checkbox element
   */
  get confirmationCheckbox() {
    return this._page.container.querySelector(".sso-provider-mismatch-error input[type='checkbox']");
  }

  /**
   * Returns the "Accept the new SSO provider" button
   */
  get acceptNewProviderButton() {
    return this._page.container.querySelector(".sso-provider-mismatch-error .button.primary");
  }

  /**
   * Simulates a click on the confirmation checkbox
   */
  async clickOnConfirmationCheckbox() {
    const leftClick = {button: 0};
    fireEvent.click(this.confirmationCheckbox, leftClick);
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the "Sign in with passphrase" button
   */
  async clickOnAcceptNewProviderButton() {
    const leftClick = {button: 0};
    fireEvent.click(this.acceptNewProviderButton, leftClick);
    await waitFor(() => {});
  }
}
