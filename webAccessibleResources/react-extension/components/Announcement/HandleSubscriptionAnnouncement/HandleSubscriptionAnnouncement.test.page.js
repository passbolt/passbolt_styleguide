/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */
import {render} from "@testing-library/react";
import React from "react";
import HandleSubscriptionAnnouncement from "./HandleSubscriptionAnnouncement";

/**
 * The HandleSubscriptionAnnouncement component represented as a page
 */
export default class HandleSubscriptionAnnouncementPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <HandleSubscriptionAnnouncement {...props}/>
    );
  }
}
