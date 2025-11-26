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
import RolesCollection from "../../../models/entity/role/rolesCollection";

export const ROLE_FIND_ALL = "passbolt.role.get-all";

export default class RoleServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find all roles.
   * @returns {Promise<RolesCollection>}
   */
  async findAll() {
    const rolesCollection = await this.port.request(ROLE_FIND_ALL);
    return new RolesCollection(rolesCollection);
  }
}
