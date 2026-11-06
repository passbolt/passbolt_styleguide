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

import SessionTimestampsEntity from "../../../models/entity/sessionTimestamps/sessionTimestampsEntity";

export const SESSION_TIMESTAMPS_GET_EVENT = "passbolt.session-timestamps.get";

class SessionTimestampsServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the session timestamps.
   * @returns {Promise<SessionTimestampsEntity|null>} null if none are stored.
   */
  async get() {
    const dto = await this.port.request(SESSION_TIMESTAMPS_GET_EVENT);
    if (dto) {
      return new SessionTimestampsEntity(dto);
    }

    return null;
  }
}

export default SessionTimestampsServiceWorkerService;
