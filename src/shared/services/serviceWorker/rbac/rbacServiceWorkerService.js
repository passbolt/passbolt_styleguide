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
 * @since         5.8.0
 */
import RbacsCollection from "../../../models/entity/rbac/rbacsCollection";

export const RBAC_FIND_ME = "passbolt.rbacs.find-me";

export default class RbacServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find me.
   * @returns {Promise<RbacsCollection>}
   */
  async findMe() {
    const rbacsCollection = await this.port.request(RBAC_FIND_ME);
    return new RbacsCollection(rbacsCollection);
  }
}
