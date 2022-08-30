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
 * @since         2.11.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayBrowserNotSupported from "./DisplayBrowserNotSupported";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The PasswordSidebarCommentSection component represented as a page
 */
export default class DisplayBrowserNotSupportedPage {
  /**
   * Default constructor
   */
  constructor() {
    this._page = render(
      <MockTranslationProvider>
        <DisplayBrowserNotSupported/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.browser-not-supported h1').textContent;
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector('.browser-not-supported p').textContent;
  }

  /**
   * Returns the download button
   */
  get downloadButton() {
    return this._page.container.querySelector('.browser-not-supported .form-actions .button.primary.big').textContent;
  }

  /**
   * Returns the current link on the download button
   */
  get downloadLink() {
    return this._page.container.querySelector('.browser-not-supported .form-actions .button.primary.big').getAttribute('href');
  }

  /**
   * Simulate a click on the desired button from the browser button list.
   * @param {number} buttonIndex
   */
  async clickOnBrowserButton(buttonIndex) {
    const button = this._page.container.querySelectorAll('.browser-not-supported .browser-button-list button')[buttonIndex];
    fireEvent.click(button, {button: 0});
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }
}
