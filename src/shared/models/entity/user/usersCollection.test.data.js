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
 * @since         4.8.0
 */

import { defaultUserDto } from "./userEntity.test.data";

/**
 * Build groups dtos.
 * @param {number} [groupsCount=10] The number of groups.
 * @param {Object} [options]
 * @param {Object} [options.withRole=false] Add role default dto.
 * @param {Object} [options.withGpgkey=false] Add gpg key default dto.
 * @param {Object} [options.withAccountRecoveryUserSetting=false] Add account recover user settings default dto.
 * @param {Object} [options.withPendingAccountRecoveryUserRequest=false] Add pending account recover user request default dto.
 * @param {Object} [options.withGroupsUsers=0] Add groups users default dto.
 * @returns {object}
 */
export const defaultUsersDtos = (groupsCount = 10, options = {}) => {
  const dtos = [];
  for (let i = 0; i < groupsCount; i++) {
    const dto = defaultUserDto({ username: `user${i}@domain.test` }, options);
    dtos.push(dto);
  }
  return dtos;
};
