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
import PasskeyAuthenticatorIcon from "./PasskeyAuthenticatorIcon";

/**
 * The PasskeyAuthenticatorIcon component represented as a page
 */
export default class PasskeyAuthenticatorIconPage {
  /**
   * @constructor
   * @param {object} props Props to attach
   */
  constructor(props) {
    this._page = render(<PasskeyAuthenticatorIcon {...props} />);
  }

  /**
   * Returns the icon wrapper element
   * @returns {HTMLElement}
   */
  get icon() {
    return this._page.container.querySelector(".passkey-authenticator-icon");
  }

  /**
   * Returns the light variant element
   * @returns {HTMLElement}
   */
  get lightIcon() {
    return this._page.container.querySelector(".passkey-authenticator-icon svg.light");
  }

  /**
   * Returns the dark variant element
   * @returns {HTMLElement}
   */
  get darkIcon() {
    return this._page.container.querySelector(".passkey-authenticator-icon svg.dark");
  }

  /**
   * Returns all the svg elements rendered in the wrapper
   * @returns {NodeList}
   */
  get svgs() {
    return this._page.container.querySelectorAll(".passkey-authenticator-icon svg");
  }

  /**
   * Returns true if the icon is displayed
   * @returns {boolean}
   */
  get exists() {
    return this.icon !== null;
  }
}
