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
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_TOTP
} from "../resourceType/resourceTypeEntity.test.data";
import {defaultUserDto} from "../user/userEntity.test.data";
import {defaultPermissionsDtos} from "../permission/permissionCollection.test.data";
import {defaultTagsDtos} from "../tag/tagCollection.test.data";
import {defaultResourceMetadataDto} from "../resourceMetadata/resourceMetadataEntity.test.data";

/**
 * Build default resource dto.
 * @param {object} data The data to override the default dto.
 * @param {Object} [options]
 * @param {boolean} [options.withModifier=false] Add modifier default dto.
 * @param {boolean} [options.withCreator=false] Add creator default dto.
 * @param {boolean|integer} [options.withPermissions=0] Add permission default dtos.
 * @param {boolean|integer} [options.withFavorite=false] Add favorite default dto.
 * @param {boolean|integer} [options.withTags=false] Add favorite default dto.
 * @returns {object}
 */
export const defaultResourceDto = (data = {}, options = {}) => {
  const id = data?.id || uuidv4();
  const defaultData = {
    id: id,
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
    expired: null,
    deleted: false,
    created: "2022-03-04T13:59:11+00:00",
    modified: "2022-03-04T13:59:11+00:00",
    created_by: uuidv4(),
    modified_by: uuidv4(),
    folder_parent_id: null,
    personal: false,
    favorite: null,
    metadata: defaultResourceMetadataDto({resource_type_id: data?.metadata?.resource_type_id
        || data?.resource_type_id || TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION}),
    permission: ownerPermissionDto({aco_foreign_key: id}),
    ...data
  };

  if (!data.permissions && options.withPermissions) {
    defaultData.permissions = defaultPermissionsDtos(options.withPermissions, {aco_foreign_key: id});
  }

  if (!data.creator && options?.withCreator) {
    defaultData.creator = defaultUserDto();
  }

  if (!data.modifier && options?.withModifier) {
    defaultData.modifier = defaultUserDto();
  }

  if (!data.favorite && options?.withFavorite) {
    defaultData.favorite = defaultFavoriteDto({foreign_key: id});
  }

  if (!data.tags && options?.withTags) {
    defaultData.tags = defaultTagsDtos();
  }

  return defaultData;
};

export const defaultResourceV4Dto = (options = {}) => {
  const defaultData = defaultResourceDto(
    {
      name: "Passbolt",
      username: "admin@passbolt.com",
      uri: "https://passbolt.com",
      description: "",
    },
    options
  );
  //Remove metadata to match v4 format
  delete defaultData.metadata;

  return defaultData;
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

export const resourceWithTotpDto = (data = {}) => defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  ...data
});

export const resourceStandaloneTotpDto = (data = {}) => defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_TOTP,
  metadata: defaultResourceMetadataDto({username: null, resource_type_id: TEST_RESOURCE_TYPE_TOTP}),
  ...data
});

export const resourceExpiredDto = (data = {}) => defaultResourceDto({
  expired: "2022-03-04T13:59:11+00:00",
  ...data
});
