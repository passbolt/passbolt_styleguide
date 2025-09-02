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
 * @since         5.5.0
 */

import ScimSettingsEntity from "../../../models/entity/scimSettings/scimSettingsEntity";



export const SCIM_FIND_SETTINGS_EVENT = "passbolt.scim.find-settings";
export const SCIM_CREATE_SETTINGS_EVENT = "passbolt.scim.create-settings";
export const SCIM_UPDATE_SETTINGS_EVENT = "passbolt.scim.update-settings";
export const SCIM_DISABLE_SETTINGS_EVENT = "passbolt.scim.disable-settings";

class ScimSettingsServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the SCIM settings.
   * @returns {Promise<ScimSettingsEntity|null>}
   */
  async findSettings() {
    const settingsDto = await this.port.request(SCIM_FIND_SETTINGS_EVENT);
    if (settingsDto) {
      return new ScimSettingsEntity(settingsDto);
    }

    return null;
  }

  /**
   * Create the SCIM settings.
   * @param {ScimSettingsEntity} formSettings The SCIM settings to save.
   * @return {Promise<ScimSettingsEntity>}
   * @throws {TypeError} If the settings property is not of type ScimSettingsEntity.
   * @throws {EntityValidationError} If the data returned by the browser extension is not a valid ScimSettings entity.
   */
  async createSettings(formSettings) {
    if (!(formSettings instanceof ScimSettingsEntity)) {
      throw new TypeError("The 'settings' property should be of type 'ScimSettingsEntity'.");
    }
    const savedSettingsDto = await this.port.request(SCIM_CREATE_SETTINGS_EVENT, formSettings.toDto());
    return new ScimSettingsEntity(savedSettingsDto);
  }

  /**
   * Update the SCIM settings.
   * @param {ScimSettingsEntity} formSettings The SCIM settings to save.
   * @param {string} id The SCIM settings id.
   * @throws {TypeError} If the settings property is not of type ScimSettingsEntity.
   * @throws {EntityValidationError} If the data returned by the browser extension is not a valid ScimSettings entity.
   */
  async updateSettings(formSettings, id) {
    if (!(formSettings instanceof ScimSettingsEntity)) {
      throw new TypeError("The 'settings' property should be of type 'ScimSettingsEntity'.");
    }
    const updated = formSettings.toDto();
    const savedSettingsDto = await this.port.request('passbolt.scim.update-settings', id, updated);
    return new ScimSettingsEntity(savedSettingsDto);
  }

  /**
   * Disable the SCIM settings.
   * @param {string} id The SCIM settings id.
   * @return {Promise<void>}
   */
  async disableSettings(id) {
    await this.port.request(SCIM_DISABLE_SETTINGS_EVENT, id);
  }
}

export default ScimSettingsServiceWorkerService;
