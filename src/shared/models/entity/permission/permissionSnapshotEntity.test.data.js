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

import { defaultPermissionsDtos } from "./permissionCollection.test.data";
import { defaultGroupsDtos } from "../group/groupsCollection.test.data";
import { defaultUsersDtos } from "../user/usersCollection.test.data";

/**
 * Build a default permission snapshot dto.
 * @param {object} [data] The data to override the default dto.
 * @returns {object}
 */
export const defaultPermissionSnapshotDto = (data = {}) => ({
  permissions: defaultPermissionsDtos({}, { count: 3 }),
  groups: defaultGroupsDtos(2),
  users: defaultUsersDtos(3),
  created: "2026-04-21T12:24:00+00:00",
  ...data,
});
