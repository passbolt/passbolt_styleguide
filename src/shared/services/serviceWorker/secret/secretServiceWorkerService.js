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
import assertString from "validator/es/lib/util/assertString";

export const SECRET_FIND_BY_RESOURCE_ID = "passbolt.secret.find-by-resource-id";
export const SECRET_OFFLINE_FIND_BY_RESOURCE_ID = "passbolt.offline.find-secret-by-resource-id";

export default class SecretServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   * @param {UserActiveSessionEntity} activeSession The user active session
   */
  constructor(port, activeSession) {
    this.port = port;
    this.activeSession = activeSession;
  }

  /**
   * Get or Find the site settings.
   * @returns {Promise<Object>}
   */
  async findByResourceId(resourceId) {
    assertString(resourceId);
    // TODO: use an entity to validate the secret
    return this.activeSession.isSessionOnline
      ? await this.port.request(SECRET_FIND_BY_RESOURCE_ID, resourceId)
      : await this.port.request(SECRET_OFFLINE_FIND_BY_RESOURCE_ID, resourceId);
  }
}
