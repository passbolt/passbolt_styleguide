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
 * @since         5.7.0
 */

import SecretRevisionsSettingsEntity from "../../../models/entity/secretRevision/secretRevisionsSettingsEntity";

export const SECRET_REVISIONS_FIND_SETTINGS = "passbolt.secret-revisions.find-settings";
export const SECRET_REVISIONS_SAVE_SETTINGS = "passbolt.secret-revisions.save-settings";

export default class SecretRevisionsSettingsServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the current secret revisions settings from the API.
   * @returns {Promise<SecretRevisionsSettingsEntity>}
   */
  async findSettings() {
    const settings = await this.port.request(SECRET_REVISIONS_FIND_SETTINGS);
    return new SecretRevisionsSettingsEntity(settings);
  }

  /**
   * Save the secret revision settings on the API.
   * @param {SecretRevisionsSettingsEntity} secretRevisionSettingsEntity
   */
  async saveSettings(secretRevisionSettingsEntity) {
    if (!(secretRevisionSettingsEntity instanceof SecretRevisionsSettingsEntity)) {
      throw new TypeError("The parameter `secretRevisionSettingsEntity` should be of type SecretRevisionsSettingsEntity.");
    }
    await this.port.request(SECRET_REVISIONS_SAVE_SETTINGS, secretRevisionSettingsEntity);
  }
}
