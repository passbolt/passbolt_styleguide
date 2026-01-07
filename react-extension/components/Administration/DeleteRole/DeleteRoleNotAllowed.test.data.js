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

import RoleEntity from "../../../../shared/models/entity/role/roleEntity";
import { customRoleDto } from "../../../../shared/models/entity/role/roleEntity.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  return {
    onClose: jest.fn(),
    usersCount: 12,
    role: new RoleEntity(customRoleDto()),
    ...data,
  };
}
