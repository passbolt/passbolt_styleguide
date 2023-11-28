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
 * @since         4.1.0
 */

import { defaultGroupsUser } from "../../models/entity/user/groupUserEntity.test.data";
import {defaultAdminUserDto, defaultUserDto} from "../../models/entity/user/userEntity.test.data";

/**
 * Returns the default administrator rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function defaultAdministratorRbacContext(data = {}) {
  return {
    canIUseUiAction: () => true,
    ...data
  };
}

/**
 * Returns the default user rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function defaultUserRbacContext(data = {}) {
  return {
    canIUseUiAction: () => true,
    ...data
  };
}

/**
 * Returns the full deny rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function denyRbacContext(data = {}) {
  return {
    canIUseUiAction: () => false,
    ...data
  };
}

export function defaultLoggedInUser(data = {}) {
  const user = defaultUserDto({
    groups_users: [
      defaultGroupsUser({
        is_admin: true
      })
    ]
  });
  return Object.assign(user, data);
}
