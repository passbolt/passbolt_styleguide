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
 * @since         6.0.0
 */
import UserActiveSessionEntity from "../../../models/entity/session/userActiveSessionEntity";

export const AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT = "passbolt.auth.find-and-update-authentication-status";

class ActiveSessionServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the active user session.
   * @returns {Promise<UserActiveSessionEntity|null>}
   */
  async findAndUpdateAuthenticationStatus() {
    const dto = await this.port.request(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
    if (dto) {
      return new UserActiveSessionEntity(dto);
    }

    return null;
  }
}
export default ActiveSessionServiceWorkerService;
