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
 * @since         5.18.0
 */

import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

import DisplayResourceDetailsPasskey from "./DisplayResourceDetailsPasskey";

/**
 * The DisplayResourceDetailsPasskey component represented as a page
 */
export default class DisplayResourceDetailsPasskeyPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsPasskey {...props} />
      </MockTranslationProvider>,
    );
    this.userEvent = userEvent.setup();
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".accordion-header h4 button");
  }

  /**
   * Returns the area of the content
   */
  get content() {
    return this._page.container.querySelector(".accordion-content");
  }

  /**
   * Returns the website label
   */
  get websiteLabel() {
    return this._page.container.querySelector(".information-label .website.label").textContent;
  }

  /**
   * Returns the website button
   */
  get website() {
    return this._page.container.querySelector(".information-value .website.value button");
  }

  /**
   * Returns the username label
   */
  get usernameLabel() {
    return this._page.container.querySelector(".information-label .username.label").textContent;
  }

  /**
   * Returns the username button
   */
  get username() {
    return this._page.container.querySelector(".information-value .username.value button");
  }

  /**
   * Returns true if the page exists and the section is open in the container
   */
  exists() {
    return this.content !== null;
  }

  /** Click on the component */
  async click(component) {
    await this.userEvent.click(component);
  }
}
