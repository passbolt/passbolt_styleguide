/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import GridUserSettingEntity from "../../../models/entity/gridUserSetting/gridUserSettingEntity";

export const RESOURCES_GRID_USER_SETTINGS_GET_EVENT = "passbolt.resources.get-grid-setting";
export const RESOURCES_GRID_USER_SETTINGS_SET_EVENT = "passbolt.resources.set-grid-setting";
export const RESOURCES_GRID_USER_SETTINGS_RESET_EVENT = "passbolt.resources.reset-grid-setting";

/**
 * The grid resource service
 */
class GridResourceUserSettingServiceWorkerService {
  /**
   * Constructor
   *
   * @param {Object} port the port
   * @public
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the grid setting
   * @returns {Promise<GridUserSettingEntity> | null}
   */
  async getSetting() {
    try {
      // Get the grid resource setting from the user settings
      const gridSetting = await this.port.request(RESOURCES_GRID_USER_SETTINGS_GET_EVENT);
      if (gridSetting !== null) {
        return new GridUserSettingEntity(gridSetting);
      }
      return null;
    } catch (error) {
      // If an error occurred then return a null settings
      console.debug(error);
      return null;
    }
  }

  /**
   * Set the grid setting
   * @param {GridUserSettingEntity} settings The grid setting entity
   * @returns {Promise<void>}
   */
  async setSetting(settings) {
    if (!(settings instanceof GridUserSettingEntity)) {
      throw new TypeError("The parameter 'setting' should be a GridUserSettingEntity.");
    }
    await this.port.request(RESOURCES_GRID_USER_SETTINGS_SET_EVENT, settings.toJSON());
  }

  /**
   * Reset the grid setting
   * @returns {Promise<void>}
   */
  async resetSettings() {
    await this.port.request(RESOURCES_GRID_USER_SETTINGS_RESET_EVENT);
  }
}

export default GridResourceUserSettingServiceWorkerService;
