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
 * @since         5.4.0
 */
import MetadataGettingStartedSettingsEntity from "../../../models/entity/metadata/metadataGettingStartedSettingsEntity";

const METADATA_ENABLE_ENCRYPTED_METADATA_FOR_EXISTING_INSTANCE = "passbolt.metadata.enable-encrypted-metadata-for-existing-instance";
const METADATA_KEEP_LEGACY_CLEARTEXT_METADATA_FOR_EXISTING_INSTANCE = "passbolt.metadata.keep-cleartext-metadata-for-existing-instance";
const METADATA_FIND_GETTING_STARTED_SETTINGS = "passbolt.metadata.find-getting-started-settings";

export default class GettingStartedWithEncryptedMetadataServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Enable the encryption of metadata for existing instances.
   * @returns {Promise<void>}
   */
  async enableEncryptedMetadata() {
    await this.port.request(METADATA_ENABLE_ENCRYPTED_METADATA_FOR_EXISTING_INSTANCE);
  }

  /**
   * Keep legacy cleartext metadata.
   * @returns {Promise<void>}
   */
  async keepLegacyClearTextMetadata() {
    await this.port.request(METADATA_KEEP_LEGACY_CLEARTEXT_METADATA_FOR_EXISTING_INSTANCE);
  }

  /**
   * Find the metadata getting started settings.
   * @returns {Promise<MetadataGettingStartedSettingsEntity>}
   */
  async findGettingStartedSettings() {
    const result = await this.port.request(METADATA_FIND_GETTING_STARTED_SETTINGS);
    return new MetadataGettingStartedSettingsEntity(result);
  }
}
