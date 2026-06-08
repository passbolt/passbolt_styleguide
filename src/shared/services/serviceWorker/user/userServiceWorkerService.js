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
 * @since         5.13.0
 */
import UsersCollection from "../../../models/entity/user/usersCollection";

export const USERS_GET_BY_IDS = "passbolt.users.get-by-ids";

export default class UserServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the users matching the given ids. The list comes from the service-worker local-storage cache
   * when initialised, otherwise it is fetched from the API.
   * @param {Array<string>} userIds The ids of the users to retrieve.
   * @returns {Promise<UsersCollection>}
   */
  async getByIds(userIds) {
    const usersDto = await this.port.request(USERS_GET_BY_IDS, userIds);
    return new UsersCollection(usersDto);
  }
}
