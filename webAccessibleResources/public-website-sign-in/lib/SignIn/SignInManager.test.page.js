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
 * @since         3.7.0
 */

/**
 * The SignInManager component represented as a page
 */

import SignInManager from "./SignInManager";
import {fireEvent, waitFor} from "@testing-library/react";

export default class SignInManagerPage {
  /**
   * Default constructor
   */
  constructor() {
    SignInManager.initialize();
  }

  destroy() {
    SignInManager.destroy();
  }

  /**
   * Returns the sign in extension element
   */
  get signIn() {
    return document.querySelector("#extension-sign-in");
  }

  /**
   * Returns the sign in extension element
   */
  get otherButton() {
    return document.querySelector("#other-button");
  }

  /**
   * Click on sign in button
   * @returns {Promise<void>}
   */
  async clickOnSignIn() {
    const leftClick = {button: 0};
    fireEvent.click(this.signIn, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on other button
   * @returns {Promise<void>}
   */
  async clickOnOtherButton() {
    const leftClick = {button: 0};
    fireEvent.click(this.otherButton, leftClick);
    await waitFor(() => {});
  }
}
