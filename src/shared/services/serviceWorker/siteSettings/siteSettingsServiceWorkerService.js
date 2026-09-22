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
 * @since         6.0.0
 */
import SiteSettingsEntity from "../../../models/entity/siteSettings/siteSettingsEntity";

export const SITE_SETTINGS_GET_OR_FIND = "passbolt.site-settings.get-or-find";
export const SITE_SETTINGS_FIND_AND_UPDATE = "passbolt.site-settings.find-and-update";

export default class SiteSettingsServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get or Find the site settings.
   * @returns {Promise<SiteSettingsEntity>}
   */
  async getOrFind() {
    const siteSettingsDto = await this.port.request(SITE_SETTINGS_GET_OR_FIND);
    if (!siteSettingsDto) {
      return null;
    }
    return new SiteSettingsEntity(siteSettingsDto);
  }

  /**
   * Find and update the site settings.
   * @returns {Promise<SiteSettingsEntity>}
   */
  async findAndUpdate() {
    const siteSettingsDto = await this.port.request(SITE_SETTINGS_FIND_AND_UPDATE);
    return new SiteSettingsEntity(siteSettingsDto);
  }
}
