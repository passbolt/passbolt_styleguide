/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */
import { defaultResourceDto } from "./resourceEntity.test.data";
import {
  ownerPermissionDto,
  readPermissionDto,
  updatePermissionDto,
} from "../permission/permissionEntity.test.data.js";
import { readSecret } from "../secret/secretEntity.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP,
} from "../resourceType/resourceTypeEntity.test.data";
import { v4 as uuidv4 } from "uuid";
import { metadata } from "../../../../../test/fixture/encryptedMetadata/metadata.js";

export const defaultResourceDtosCollection = () => {
  const resource1 = defaultResourceDto({ name: "Resource1" });
  resource1.secrets = [readSecret({ resource_id: resource1.id })];
  resource1.permission = ownerPermissionDto({ aco_foreign_key: resource1.id });
  resource1.permissions = [resource1.permission];
  const resource2 = defaultResourceDto({ name: "Resource2" });
  resource2.secrets = [readSecret({ resource_id: resource2.id })];
  resource2.permission = ownerPermissionDto({ aco_foreign_key: resource2.id });
  resource2.permissions = [resource2.permission];
  const resource3 = defaultResourceDto({ name: "Resource3" });
  resource3.secrets = [readSecret({ resource_id: resource3.id })];
  resource3.permission = ownerPermissionDto({ aco_foreign_key: resource3.id });
  resource3.permissions = [resource3.permission];
  const resource4 = defaultResourceDto({ name: "Resource4" });
  resource4.secrets = [readSecret({ resource_id: resource4.id })];
  resource4.permission = ownerPermissionDto({ aco_foreign_key: resource4.id });
  resource4.permissions = [resource4.permission];
  return [resource1, resource2, resource3, resource4];
};

export const resourceAllTypesDtosCollection = () => {
  const resource1 = defaultResourceDto({
    name: "Resource password string",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  });
  resource1.secrets = [readSecret({ resource_id: resource1.id })];
  resource1.permission = ownerPermissionDto({ aco_foreign_key: resource1.id });
  resource1.permissions = [resource1.permission];
  const resource2 = defaultResourceDto({
    name: "Resource password with encrypted description",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  });
  resource2.secrets = [readSecret({ resource_id: resource2.id })];
  resource2.permission = ownerPermissionDto({ aco_foreign_key: resource2.id });
  resource2.permissions = [resource2.permission];
  const resource3 = defaultResourceDto({
    name: "Resource password with encrypted description and totp",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  });
  resource3.secrets = [readSecret({ resource_id: resource3.id })];
  resource3.permission = ownerPermissionDto({ aco_foreign_key: resource3.id });
  resource3.permissions = [resource3.permission];
  const resource4 = defaultResourceDto({ name: "Resource totp", resource_type_id: TEST_RESOURCE_TYPE_TOTP });
  resource4.secrets = [readSecret({ resource_id: resource4.id })];
  resource4.permission = ownerPermissionDto({ aco_foreign_key: resource4.id });
  resource4.permissions = [resource4.permission];
  const resource5 = defaultResourceDto({ name: "Resource type unknown", resource_type_id: uuidv4() });
  resource5.secrets = [readSecret({ resource_id: resource5.id })];
  resource5.permission = ownerPermissionDto({ aco_foreign_key: resource5.id });
  resource5.permissions = [resource5.permission];
  return [resource1, resource2, resource3, resource4, resource5];
};

export const resourceAllTypesDtosCollectionAndVariousPermission = () => {
  const resource1 = defaultResourceDto({
    name: "Resource password string",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  });
  resource1.secrets = [readSecret({ resource_id: resource1.id })];
  resource1.permission = ownerPermissionDto({ aco_foreign_key: resource1.id });
  resource1.permissions = [resource1.permission];
  const resource2 = defaultResourceDto({
    name: "Resource password with encrypted description",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  });
  resource2.secrets = [readSecret({ resource_id: resource2.id })];
  resource2.permission = updatePermissionDto({ aco_foreign_key: resource2.id });
  resource2.permissions = [resource2.permission];
  const resource3 = defaultResourceDto({
    name: "Resource password with encrypted description and totp",
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  });
  resource3.secrets = [readSecret({ resource_id: resource3.id })];
  resource3.permission = readPermissionDto({ aco_foreign_key: resource3.id });
  resource3.permissions = [resource3.permission];
  return [resource1, resource2, resource3];
};

/**
 * Build dtos.
 * @param {number} [count=10] The number of dtos.
 * @param {object} data The data to override the default dto.
 * @param {object} options Options to pass to the resource dto factory.
 * @returns {object}
 */
export const defaultResourcesDtos = (count = 10, data = {}, options = {}) => {
  const dtos = [];
  for (let i = 0; i < count; i++) {
    const dto = defaultResourceDto(data, options);
    dtos.push(dto);
  }
  return dtos;
};

/**
 * Returns a collection of dtos where entities' metadata is encrypted with the test shared key (from pgpKeys.metadata.private).
 * @param {number} [count = 10]
 * @param {object} [data = {}]
 * @param {object} [options = {}]
 * @returns {Array<Object>}
 */
export const defaultSharedResourcesWithEncryptedMetadataDtos = (count = 10, data = {}, options = {}) => {
  const dtos = [];
  const fixtureCount = metadata.withSharedKey.encryptedMetadata.length;
  const metadata_key_id = data.metadata_key_id || uuidv4();
  for (let i = 0; i < count; i++) {
    const encryptedMetadata = metadata.withSharedKey.encryptedMetadata[i % fixtureCount];
    const defaultData = {
      ...data,
      metadata_key_id: metadata_key_id,
      metadata: encryptedMetadata,
      metadata_key_type: "shared_key",
    };
    const dto = defaultResourceDto(defaultData, options);
    dtos.push(dto);
  }
  return dtos;
};

/**
 * Returns a collection of dtos where entities' metadata is encrypted with Ada's key (frompgpKeys.ada.private).
 * @param {number} [count = 10]
 * @param {object} [data = {}]
 * @param {object} [options = {}]
 * @returns {Array<Object>}
 */
export const defaultPrivateResourcesWithEncryptedMetadataDtos = (count = 10, data = {}, options = {}) => {
  const dtos = [];
  const fixtureCount = metadata.withAdaKey.encryptedMetadata.length;
  for (let i = 0; i < count; i++) {
    const encryptedMetadata = metadata.withAdaKey.encryptedMetadata[i % fixtureCount];
    const defaultData = {
      ...data,
      metadata_key_id: null,
      metadata: encryptedMetadata,
      metadata_key_type: "user_key",
    };
    const dto = defaultResourceDto(defaultData, options);
    dtos.push(dto);
  }
  return dtos;
};
