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
import {adminRoleDto, TEST_ROLE_USER_ID, userRoleDto} from "../role/role.test.data";
import {defaultGroupsUser} from "./groupUserEntity.test.data";
import {defaultGpgkeyDto} from "../gpgkey/gpgkeyEntity.test.data";
import {
  createAcceptedAccountRecoveryUserSettingDto
} from "../accountRecovery/accountRecoveryUserSettingEntity.test.data";
import {pendingAccountRecoveryRequestDto} from "../accountRecovery/pendingAccountRecoveryRequestEntity.test.data";

/**
 * Default user dto.
 * @param {Object} data The data to override
 * @param {Object} [options]
 * @param {Object} [options.withGroupsUsers=false] Add groups users default dto.
 * @param {Object} [options.withRole=false] Add role default dto.
 * @param {Object} [options.withGpgkey=false] Add gpg key default dto.
 * @param {Object} [options.withAccountRecoveryUserSetting=false] Add account recover user settings default dto.
 * @param {Object} [options.withPendingAccountRecoveryUserRequest=false] Add pending account recover user request default dto.
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

  if (!data.role) {
    defaultData.role = userRoleDto();
  }

  const profile = data?.profile || defaultProfileDto({
    user_id: defaultData.id,
    ...data?.profile
  });
  defaultData.profile =  profile;

  if (!data.groups_users && options?.withGroupsUsers) {
    defaultData.groups_users = [defaultGroupsUser({user_id: defaultData.id})];
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
