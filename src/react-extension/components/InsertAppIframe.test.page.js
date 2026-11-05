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
import { MemoryRouter } from "react-router-dom";
import InsertAppIframe from "./InsertAppIframe";

/**
 * The InsertAppIframe component represented as a page
 */
export default class InsertAppIframePage {
  /**
   * Default constructor
   * @param {object} props Props to attach
   * @param {string} initialEntry The current location (pathname and search)
   */
  constructor(props, initialEntry) {
    this._page = render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <InsertAppIframe {...props} />
      </MemoryRouter>,
    );

    // Replace the iframe window with a stub to capture the location set by the component.
    Object.defineProperty(this.iframe, "contentWindow", { value: { location: null } });
  }

  /**
   * Returns the iframe element
   */
  get iframe() {
    return this._page.container.querySelector("#passbolt-iframe-app");
  }

  /**
   * Returns true if the component has set the iframe location
   */
  get isIframeLoaded() {
    return this.iframe.contentWindow.location !== null;
  }

  /**
   * Returns the url set as the iframe location
   */
  get iframeUrl() {
    return new URL(this.iframe.contentWindow.location);
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.iframe !== null;
  }
}
