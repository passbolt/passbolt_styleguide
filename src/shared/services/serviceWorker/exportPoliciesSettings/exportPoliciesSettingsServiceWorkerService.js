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
 * @since         5.10.0
 */

import ExportPoliciesSettingsEntity from "../../../models/entity/exportSettings/ExportPoliciesSettingsEntity";

export const EXPORT_POLICIES_GET_SETTINGS = "passbolt.export-policies.get";

export default class ExportPoliciesSettingsServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Get the export policies settings.
   * @returns {Promise<ExportPoliciesSettingsEntity>}
   */
  async getSettings() {
    const settingsDto = await this.port.request(EXPORT_POLICIES_GET_SETTINGS);
    return new ExportPoliciesSettingsEntity(settingsDto);
  }
}
