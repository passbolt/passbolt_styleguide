
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

import React from "react";
import {render} from "@testing-library/react";
import ResourceIcon from "./ResourceIcon";

/**
 * The Resource Icon component represented as a page
 */
export default class ResourceIconPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <ResourceIcon {...props} />
    );
  }

  /**
   * Returns true if the page is rendered
   * @returns {boolean}
   */
  exists() {
    return this.image !== null;
  }

  /**
   * Returns the main container of the component
   * @returns {ReactDOM}
   */
  get image() {
    return this._page.container.querySelector(".teaser-image");
  }
}
