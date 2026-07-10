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

import PermissionsCollection from "../../../models/entity/permission/permissionsCollection";

export const PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY = "passbolt.permissions.find-aco-permissions-for-display";

export default class PermissionServiceWorkerService {
  /**
   * @constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find the permissions for a given ACO (Access Control Object).
   * @param {string} acoId The UUID of the ACO (e.g. resource or folder id).
   * @param {string} acoType The type of the ACO (e.g. "Resource" or "Folder").
   * @returns {Promise<PermissionsCollection>}
   */
  async findPermissions(acoId, acoType) {
    const dtos = await this.port.request(PERMISSIONS_FIND_ACO_PERMISSIONS_FOR_DISPLAY, acoId, acoType);
    return new PermissionsCollection(dtos, { assertAtLeastOneOwner: false });
  }
}
