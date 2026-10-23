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
 * @since         5.16.0
 */
import {
  ownerMinimalPermissionDto,
  updateMinimalPermissionDto,
} from "../../../models/entity/permission/permissionEntity.test.data";

/**
 * Build the permissions the operator confirms for an item moved into a folder they own and share
 * with a recipient who can update it: the operator stays owner and the recipient gets update.
 * @param {object} item
 * @param {string} item.aco The item's aco, Resource or Folder.
 * @param {string} item.aco_foreign_key The item's id.
 * @param {object} aros
 * @param {string} aros.operatorId The operator's user id.
 * @param {string} aros.recipientId The destination's recipient user id.
 * @returns {Array<object>}
 */
export const movedIntoSharedFolderPermissionsDtos = ({ aco, aco_foreign_key }, { operatorId, recipientId }) => [
  ownerMinimalPermissionDto({ aco, aco_foreign_key, aro_foreign_key: operatorId }),
  updateMinimalPermissionDto({ aco, aco_foreign_key, aro_foreign_key: recipientId }),
];
