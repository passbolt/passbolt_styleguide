
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
 * @since         5.2.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayResourceUrisBadge from "./DisplayResourceUrisBadge";
/**
 * The Add resource description component represented as a page
 */
export default class DisplayResourceUrisBadgePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <DisplayResourceUrisBadge {...props} />
    );
  }
  /**
   * Returns the badge
   */
  get badge() {
    return this._page.container.querySelector(".badge");
  }
  /**
   * Returns the count element
   */
  get count() {
    return this._page.container.querySelector('.count');
  }

  /**
   * Returns the tooltip which count the number of uris
   */
  get tooltip() {
    return this._page.container.querySelector('.tooltip-portal span');
  }

  /**
   * Returns the uris list element
   */
  get listUris() {
    return document.body.querySelector('.list-uris');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.badge !== null;
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async hover(element) {
    fireEvent.mouseEnter(element);
    await waitFor(() => {});
  }
}
