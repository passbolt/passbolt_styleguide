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
import OfflineSettingsEntity from "../../../models/entity/offline/offlineSettingsEntity";
import { isValidUuid } from "../../../utils/assertions";

export const OFFLINE_FIND_SETTINGS_EVENT = "passbolt.offline.find-settings";
export const OFFLINE_SAVE_SETTINGS_EVENT = "passbolt.offline.save-settings";
export const OFFLINE_DELETE_SETTINGS_EVENT = "passbolt.offline.delete-settings";

class OfflineModeSettingsServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the offline settings.
   * @returns {Promise<OfflineSettingsEntity|null>}
   */
  async findSettings() {
    const settingsDto = await this.port.request(OFFLINE_FIND_SETTINGS_EVENT);
    if (settingsDto) {
      return new OfflineSettingsEntity(settingsDto);
    }

    return null;
  }

  /**
   * Save the Offline settings.
   * @param {ScimSettingsEntity} formSettings The Offline settings to save.
   * @return {Promise<ScimSettingsEntity>}
   * @throws {TypeError} If the settings property is not of type OfflineSettingsEntity.
   * @throws {EntityValidationError} If the data returned by the browser extension is not a valid OfflineSettings entity.
   */
  async saveSettings(formSettings) {
    if (!(formSettings instanceof OfflineSettingsEntity)) {
      throw new TypeError("The 'settings' property should be of type 'OfflineSettingsEntity'.");
    }
    const savedSettingsDto = await this.port.request(OFFLINE_SAVE_SETTINGS_EVENT, formSettings.toDto());
    return new OfflineSettingsEntity(savedSettingsDto);
  }

  /**
   * Disable the Offline settings.
   * @param {string} id The Offline settings id.
   * @return {Promise<void>}
   */
  async disableSettings(id) {
    if (!isValidUuid(id)) {
      return;
    }
    await this.port.request(OFFLINE_DELETE_SETTINGS_EVENT, id);
  }
}
export default OfflineModeSettingsServiceWorkerService;
