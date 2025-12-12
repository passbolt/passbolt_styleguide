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

import {v4 as uuid} from "uuid";
import {defaultProfileDto} from "../profile/ProfileEntity.test.data";
import {adminRoleDto, TEST_ROLE_USER_ID, userRoleDto} from "../role/roleEntity.test.data";
import {defaultGroupUser} from "../groupUser/groupUserEntity.test.data";
import {defaultGpgkeyDto} from "../gpgkey/gpgkeyEntity.test.data";
import {
  createAcceptedAccountRecoveryUserSettingDto
} from "../accountRecovery/accountRecoveryUserSettingEntity.test.data";
import {pendingAccountRecoveryRequestDto} from "../accountRecovery/pendingAccountRecoveryRequestEntity.test.data";

/**
 * Default user dto.
 * @param {Object} data The data to override
 * @param {Object} [options]
 * @param {boolean|integer} [options.withGroupsUsers=false] Add groups users default dto.
 * @param {boolean} [options.withRole=false] Add role default dto.
 * @param {boolean} [options.withGpgkey=false] Add gpg key default dto.
 * @param {boolean} [options.withAccountRecoveryUserSetting=false] Add account recover user settings default dto.
 * @param {boolean} [options.withPendingAccountRecoveryUserRequest=false] Add pending account recover user request default dto.
 * @returns {object}
 */
export const defaultUserDto = (data = {}, options = {}) => {
  const defaultData = {
    "id": uuid(),
    "role_id": TEST_ROLE_USER_ID,
    "username": "ada@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2020-04-20T11:32:16+00:00",
    "modified": "2020-04-20T11:32:16+00:00",
    "last_logged_in": "2022-07-04T13:39:25+00:00",
    "is_mfa_enabled": false,
    ...data
  };

  if (!data.role && options?.withRole) {
    defaultData.role = userRoleDto({id: defaultData.role_id});
  }

  const profile = data?.profile || defaultProfileDto({
    user_id: defaultData.id,
    ...data?.profile
  });
  defaultData.profile =  profile;

  if (!data.groups_users && options?.withGroupsUsers) {
    const groupsUsersCount = typeof options?.withGroupsUsers === "number" ? options?.withGroupsUsers : 1;
    defaultData.groups_users = [];
    for (let i = 0; i < groupsUsersCount; i++) {
      const groupUserDto = defaultGroupUser({user_id: defaultData.id});
      defaultData.groups_users.push(groupUserDto);
    }
  }

  if (!data.gpgkey && options?.withGpgkey) {
    defaultData.gpgkey = defaultGpgkeyDto();
  }

  if (!data.account_recovery_user_setting && options?.withAccountRecoveryUserSetting) {
    defaultData.account_recovery_user_setting = createAcceptedAccountRecoveryUserSettingDto();
  }

  if (!data.pending_account_recovery_request && options?.withPendingAccountRecoveryUserRequest) {
    defaultData.pending_account_recovery_request = pendingAccountRecoveryRequestDto();
  }

  return defaultData;
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
    id: "f848277c-5398-58f8-a82a-72397af2d450",
    username: "ada@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Ada",
      last_name: "Lovelace"
    })
  }),
  admin: defaultAdminUserDto({
    id: "f642271d-bbb1-401e-bbd1-7ec370f8e19b",
    username: "admin@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Admin",
      last_name: "User"
    })
  }),
  betty: defaultUserDto({
    id: "e97b14ba-8957-57c9-a357-f78a6e1e1a46",
    username: "betty@passbolt.com",
    profile: defaultProfileDto({
      first_name: "Betty",
      last_name: "Holberton"
    })
  }),
};
