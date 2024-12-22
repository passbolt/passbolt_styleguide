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
import MetadataTypesSettingsEntity from "../../models/entity/metadata/metadataTypesSettingsEntity";

export const METADATA_GET_OR_FIND_SETTINGS_EVENT = "passbolt.metadata.get-or-find-metadata-types-settings";
export const METADATA_SAVE_TYPES_SETTINGS_EVENT = "passbolt.metadata.save-metadata-types-settings";

class MetadataSettingsServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get or find the metadata types settings.
   * @returns {Promise<object>}
   */
  async getOrFindTypesSettings() {
    return this.port.request(METADATA_GET_OR_FIND_SETTINGS_EVENT);
  }

  /**
   * Get or find the metadata types settings.
   * @param {MetadataTypesSettingsEntity} settings The metadata types settings to save.
   * @return {Promise<object>}
   */
  async saveTypesSettings(settings) {
    if (!(settings instanceof MetadataTypesSettingsEntity)) {
      throw new TypeError("The 'settings' property should be of type 'MetadataTypesSettingsEntity'.");
    }
    return this.port.request(METADATA_SAVE_TYPES_SETTINGS_EVENT, settings.toDto());
  }
}

export default MetadataSettingsServiceWorkerService;
