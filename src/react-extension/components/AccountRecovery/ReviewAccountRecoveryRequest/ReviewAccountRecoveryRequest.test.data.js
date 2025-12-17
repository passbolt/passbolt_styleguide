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
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultRoleContext} from "../../../contexts/RoleContext.test.data";

export function defaultProps(data = {}) {
  const roleContext = defaultRoleContext(data.roleContext);
  const roles = data.roles || roleContext.getAllRoles();
  return {
    context: defaultAdministratorAppContext(),
    accountRecoveryRequest: {
      id: "54c6278e-f824-5fda-91ff-3e946b18d996",
      status: "pending",
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      created: "2022-01-13T15:27:26.301Z",
      creator: users.betty,
    },
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    onError: jest.fn(),
    ...data,
    roleContext: roleContext,
    roles: roles
  };
}
