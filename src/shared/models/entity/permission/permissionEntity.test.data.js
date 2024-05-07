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
import {v4 as uuidv4} from "uuid";
import {defaultUserDto} from "../user/userEntity.test.data";
import {defaultGroupDto} from "../group/groupEntity.test.data";

export const minimumPermissionDto = (data = {}) => ({
  aco: "Resource",
  aco_foreign_key: uuidv4(),
  aro: "User",
  aro_foreign_key: uuidv4(),
  type: 15,
  ...data
});

/**
 * Build default permissiondto.
 * @param {object} data The data to override the default dto.
 * @param {Object} [options]
 * @param {Object} [options.withUser=false] Add user default dto.
 * @param {Object} [options.withGroup=false] Add group default dto.
 * @returns {object}
 */
export const defaultPermissionDto = (data = {}, options = {}) => {
  const defaultData = {
    id: uuidv4(),
    aco: "Resource",
    aco_foreign_key: uuidv4(),
    aro: "User",
    aro_foreign_key: uuidv4(),
    created: "2022-03-04T13:59:11+00:00",
    modified: "2022-03-04T13:59:11+00:00",
    type: 15,
    ...data
  };

  if (!data.user && options?.withUser) {
    defaultData.user = defaultUserDto({id: defaultData.aro_foreign_key});
  }

  if (!data.group && options?.withGroup) {
    defaultData.group = defaultGroupDto({id: defaultData.aro_foreign_key});
  }

  return defaultData;
};

export const ownerPermissionDto = (data = {}) => defaultPermissionDto({
  type: 15,
  ...data
});

export const updatePermissionDto = (data = {}) => defaultPermissionDto({
  type: 7,
  ...data
});

export const readPermissionDto = (data = {}) => defaultPermissionDto({
  type: 1,
  ...data
});

export const ownerFolderPermissionDto = (data = {}) => ownerPermissionDto({
  aco: "Folder",
  ...data
});

export const updateFolderPermissionDto = (data = {}) => updatePermissionDto({
  aco: "Folder",
  ...data
});

export const readFolderPermissionDto = (data = {}) => readPermissionDto({
  aco: "Folder",
  ...data
});
