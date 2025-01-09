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
   * @returns {Promise<MetadataTypesSettingsEntity>}
   */
  async getOrFindTypesSettings() {
    const settingsDto = await this.port.request(METADATA_GET_OR_FIND_SETTINGS_EVENT);
    return new MetadataTypesSettingsEntity(settingsDto);
  }

  /**
   * Get or find the metadata types settings.
   * @param {MetadataTypesSettingsFormEntity} formSettings The metadata types form settings to save.
   * @return {Promise<MetadataTypesSettingsEntity>}
   * @throws {TypeError} If the settings property is not of type MetadataTypesSettingsEntity.
   * @throws {EntityValidationError} If the data returned by the browser extension is not a valid MetadataTypesSettings entity.
   */
  async saveTypesSettings(formSettings) {
    if (!(formSettings instanceof MetadataTypesSettingsEntity)) {
      throw new TypeError("The 'settings' property should be of type 'MetadataTypesSettingsEntity'.");
    }
    const savedSettingsDto = await this.port.request(METADATA_SAVE_TYPES_SETTINGS_EVENT, formSettings.toDto());
    return new MetadataTypesSettingsEntity(savedSettingsDto);
  }
}

export default MetadataSettingsServiceWorkerService;
