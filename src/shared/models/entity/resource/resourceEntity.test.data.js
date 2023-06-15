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
import {ownerPermissionDto, readPermissionDto, updatePermissionDto} from "../permission/permissionEntity.test.data";
import {defaultFavoriteDto} from "../favorite/favoriteEntity.test.data";

export const defaultResourceDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return {
    id: id,
    name: "Passbolt",
    uri: "https://passbolt.com",
    username: "admin@passbolt.com",
    folder_parent_id: null,
    created: "2022-03-04T13:59:11+00:00",
    created_by: uuidv4(),
    modified: "2022-03-04T13:59:11+00:00",
    modified_by: uuidv4(),
    deleted: false,
    description: null,
    personal: false,
    resource_type_id: uuidv4(),
    permission: ownerPermissionDto({aco_foreign_key: id}),
    permissions: [],
    favorite: null,
    secrets: [],
    ...data
  };
};

export const resourceWithUpdatePermissionDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return defaultResourceDto({
    id: id,
    permission: updatePermissionDto({aco_foreign_key: id}),
    ...data
  });
};

export const resourceWithReadPermissionDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return defaultResourceDto({
    id: id,
    permission: readPermissionDto({aco_foreign_key: id}),
    ...data
  });
};

export const resourceWithFavoriteDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return defaultResourceDto({
    id: id,
    favorite: defaultFavoriteDto({foreign_key: id}),
    ...data
  });
};
