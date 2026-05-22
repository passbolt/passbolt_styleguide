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
import ExternalGpgKeyEntity from "../../../models/entity/gpgkey/externalGpgKeyEntity";

export const KEYRING_SYNC_EVENT = "passbolt.keyring.sync";
export const KEYRING_GET_PUBLIC_KEY_INFO_BY_USER_EVENT = "passbolt.keyring.get-public-key-info-by-user";

class KeyringServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Synchronise the keyring with the API.
   * @returns {Promise<void>}
   */
  async synchroniseKeyring() {
    await this.port.request(KEYRING_SYNC_EVENT);
  }

  /**
   * Get the public key information for a user.
   * @param {string} userId The user identifier.
   * @returns {Promise<ExternalGpgKeyEntity>}
   */
  async getPublicKeyInformation(userId) {
    const keyInfoDto = await this.port.request(KEYRING_GET_PUBLIC_KEY_INFO_BY_USER_EVENT, userId);
    return new ExternalGpgKeyEntity(keyInfoDto);
  }
}

export default KeyringServiceWorkerService;
