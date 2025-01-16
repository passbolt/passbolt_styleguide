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
 * @since         4.11.0
 */
import ExternalGpgKeyEntity from "../../../models/entity/gpgkey/externalGpgKeyEntity";
import ExternalGpgKeyCollection from "../../../models/entity/gpgkey/externalGpgKeyCollection";

export const GPG_KEY_INFO_EVENT = "passbolt.keyring.get-key-info";

class GpgServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get a gpg key info.
   * @param {string} armoredKey The armored gpg key.
   * @returns {Promise<ExternalGpgKeyEntity>}
   */
  async keyInfo(armoredKey) {
    const keyInfoDto = await this.port.request(GPG_KEY_INFO_EVENT, armoredKey);
    return new ExternalGpgKeyEntity(keyInfoDto);
  }

  /**
   * Get multiple gpg keys info.
   * @param {array} armoredKeys The armored gpg keys.
   * @returns {Promise<ExternalGpgKeyCollection>}
   */
  async keysInfo(armoredKeys = []) {
    const keysInfoDto = [];
    for (const armoredKey of armoredKeys) {
      const keyInfo = await this.keyInfo(armoredKey);
      keysInfoDto.push(keyInfo);
    }
    return new ExternalGpgKeyCollection(keysInfoDto);
  }
}

export default GpgServiceWorkerService;
