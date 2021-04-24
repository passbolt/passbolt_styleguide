
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import InstallExtension from "./InstallExtension";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The InstallExtension component represented as a page
 */
export default class InstallExtensionTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <InstallExtension {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.install-extension h1').textContent;
  }

  /**
   * Returns the browser image
   */
  get browser() {
    return this._page.container.querySelector('.install-extension a');
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector('.install-extension p').textContent;
  }

  /**
   * Returns the download button
   */
  get download() {
    return this._page.container.querySelector('.install-extension .form-actions .button.primary.big').textContent;
  }

  /**
   * Returns the link to refresh
   */
  get link() {
    return this._page.container.querySelectorAll('.install-extension .form-actions a')[1];
  }

  /**
   * Returns the link refresh content
   */
  get linkContent() {
    return this._page.container.querySelectorAll('.install-extension .form-actions a')[1].textContent;
  }

  /**
   * refresh the page
   */
  async refresh() {
    const leftClick = {button: 0};
    fireEvent.click(this.link, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }
}
