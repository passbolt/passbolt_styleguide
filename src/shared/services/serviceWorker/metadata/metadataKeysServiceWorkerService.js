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
import MetadataKeyEntity from "../../../models/entity/metadata/metadataKeyEntity";

export const METADATA_KEYS_CREATE_EVENT = "passbolt.metadata.create-key";
export const METADATA_KEYS_GENERATE_EVENT = "passbolt.metadata.generate-metadata-key";
export const METADATA_KEYS_FIND_ALL_EVENT = "passbolt.metadata.find-all-non-deleted-metadata-keys";
export const METADATA_SHARE_METADATA_PRIVATE_KEYS_EVENT = "passbolt.metadata.share-metadata-private-keys";

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

  /**
   * Create a metadata key.
   * @param {ExternalGpgKeyPairEntity} metadataKeyPair The metadata key pair.
   * @returns {Promise<MetadataKeyEntity>}
   */
  async createKey(metadataKeyPair) {
    if (!(metadataKeyPair instanceof ExternalGpgKeyPairEntity)) {
      throw new TypeError("The parameter `metadataKeyPair` should be of type ExternalGpgKeyPairEntity.");
    }
    const contains = {public_key: true, private_key: true};
    const metadataKeyDto = await this.port.request(METADATA_KEYS_CREATE_EVENT, metadataKeyPair.toDto(contains));
    return new MetadataKeyEntity(metadataKeyDto);
  }

  /**
   * Share a missing metadata keys with an expected user.
   * @param {string} userId The user id which does not have all keys.
   * @returns {Promise<void>}
   */
  async share(userId) {
    await this.port.request(METADATA_SHARE_METADATA_PRIVATE_KEYS_EVENT, userId);
  }
}

export default MetadataKeysServiceWorkerService;
