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
import MetadataKeysCollection from "../../../models/entity/metadata/metadataKeysCollection";
import ExternalGpgKeyPairEntity from "../../../models/entity/gpgkey/external/externalGpgKeyPairEntity";

export const METADATA_KEYS_GENERATE_EVENT = "passbolt.metadata.generate-metadata-key";
export const METADATA_KEYS_FIND_ALL_EVENT = "passbolt.metadata.find-all-non-deleted-metadata-keys";

class MetadataKeysServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the metadata keys.
   * @returns {Promise<MetadataKeysCollection>}
   */
  async findAll() {
    const metadataKeysDto = await this.port.request(METADATA_KEYS_FIND_ALL_EVENT);
    return new MetadataKeysCollection(metadataKeysDto);
  }

  /**
   * Generate a metadata key pair.
   * @returns {Promise<ExternalGpgKeyPairEntity>}
   */
  async generateKeyPair() {
    const externalGpgKeyPairDto = await this.port.request(METADATA_KEYS_GENERATE_EVENT);
    return new ExternalGpgKeyPairEntity(externalGpgKeyPairDto);
  }
}

export default MetadataKeysServiceWorkerService;
