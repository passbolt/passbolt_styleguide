/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import {users} from "../../../../shared/models/entity/user/userEntity.test.data";
import {defaultAccountRecoveryUserContext} from "../../../contexts/AccountRecoveryUserContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultRoleContext} from "../../../contexts/RoleContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultProps(data = {}) {
  const roleContext = data.roleContext || defaultRoleContext();
  const roles = data.roles || roleContext.getAllRoles();
  const defaultPolicy = defaultAccountRecoveryPolicyDto(data.accountRecoveryContext);
  return {
    context: defaultAppContext(data?.context),
    dialogContext: {
      open: jest.fn()
    },
    ...data,
    roleContext: roleContext,
    roles: roles,
    accountRecoveryContext: defaultAccountRecoveryUserContext({
      status: "pending",
      getRequestor: () => defaultPolicy.creator,
      getOrganizationPolicy: () => defaultPolicy.policy,
      isReady: () => true,
      getPolicy: () => defaultPolicy.policy.policy,
      getRequestedDate: () => defaultPolicy.modified,
      ...data.accountRecoveryContext,
    }),
  };
}

export const defaultAccountRecoveryPolicyDto = data => ({
  policy: {
    policy: "opt-out"
  },
  creator: {
    ...users.ada,
    gpgkey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
    },
  },
  modified: "2022-01-13T15:27:26.301Z",
  ...data
});

export function getAccountRecoveryUserService(mockedData) {
  return {
    getOrganizationAccountRecoverySettings: async() => mockedData
  };
}
