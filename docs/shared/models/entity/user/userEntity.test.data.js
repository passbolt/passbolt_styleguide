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

import {v4 as uuidv4} from 'uuid';
import {defaultProfileDto} from "../profile/ProfileEntity.test.data";
import {adminRoleDto, userRoleDto} from "../role/role.test.data";

/**
 * Default user dto.
 * @param {Object} data The data to override
 * @returns {object}
 */
export const defaultUserDto = (data = {}) => {
  const id = uuidv4();
  const role = data?.role || userRoleDto(data?.role);
  const profile = data?.profile || defaultProfileDto({
    user_id: id,
    ...data?.profile
  });

  return {
    "id": id,
    "role_id": role.id,
    "username": "ada@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2020-04-20T11:32:16+00:00",
    "modified": "2020-04-20T11:32:16+00:00",
    "last_logged_in": "2022-07-04T13:39:25+00:00",
    "is_mfa_enabled": false,
    ...data,
    "profile": profile,
    "role": role,
  };
};

/**
 * Default administrator dto.
 * @param {object} data The data to override
 * @returns {object}
 */
export const defaultAdminUserDto = (data = {}) => {
  const role = adminRoleDto();
  return defaultUserDto({
    role,
    ...data
  });
};

export const users = {
  ada: defaultUserDto({
    username: "ada@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Ada",
      last_name: "Lovelace"
    })
  }),
  admin: defaultAdminUserDto({
    username: "admin@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Admin",
      last_name: "User"
    })
  }),
  betty: defaultUserDto({
    username: "betty@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Betty",
      last_name: "Holberton"
    })
  }),
};
