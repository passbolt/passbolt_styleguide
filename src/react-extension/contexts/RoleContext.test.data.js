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
 * @since         5.8.0
 */

import RoleEntity from "../../shared/models/entity/role/roleEntity";
import RolesCollection from "../../shared/models/entity/role/rolesCollection";
import { rolesCollectionDto } from "../../shared/models/entity/role/rolesCollection.test.data";

export const defaultRoleContext = (data = {}) => ({
  refreshRoles: () => {},
  getAllRoles: () => new RolesCollection(rolesCollectionDto),
  getRole: (roleId) =>
    rolesCollectionDto
      .filter((r) => roleId === r.id)
      .map((roleDto) => new RoleEntity(roleDto))
      .at(0) || null,
  ...data,
});
