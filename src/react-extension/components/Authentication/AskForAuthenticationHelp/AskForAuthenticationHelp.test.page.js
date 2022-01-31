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
 * @since         3.6.0
 */
import {fireEvent, render} from "@testing-library/react";
import React from "react";
import AskForAuthenticationHelp from "./AskForAuthenticationHelp";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The AskForAuthenticationHelp component represented as a page
 */
export default class AskForAuthenticationHelpTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AskForAuthenticationHelp {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the request new account element
   */
  get requestNewAccountButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Request new account
   */
  async requestNewAccount() {
    const leftClick = {button: 0};
    fireEvent.click(this.requestNewAccountButton, leftClick);
  }

  /**
   * Returns the try again link element
   */
  get tryAgainLink() {
    return this._page.container.querySelector('.form-actions a:not(.primary)');
  }

  /**
   * Try again
   */
  /**
   * Request new account
   */
  async tryAgain() {
    const leftClick = {button: 0};
    fireEvent.click(this.tryAgainLink, leftClick);
  }
}
