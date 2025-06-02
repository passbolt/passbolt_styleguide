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
 * @since         5.10.0
 */

import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ApiConfigureSafariExtension from "./ApiConfigureSafariExtension";

/**
 * The ApiConfigureSafariExtension component represented as a page
 */
export default class ApiConfigureSafariExtensionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ApiConfigureSafariExtension {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".install-extension h1").textContent;
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector(".install-extension p").textContent;
  }

  /**
   * Returns the secondary message
   */
  get secondaryMessage() {
    return this._page.container.querySelector(".install-extension .form-actions p").textContent;
  }

  /**
   * Returns the download button
   */
  get notDownloaded() {
    return this._page.container.querySelector(".install-extension .form-actions button.link");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }
}
