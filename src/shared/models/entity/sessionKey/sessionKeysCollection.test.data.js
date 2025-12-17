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
 * @since         4.10.1
 */
import { defaultSessionKeyDto } from "./sessionKeyEntity.test.data";
import { metadata } from "../../../../../test/fixture/encryptedMetadata/metadata";

/**
 * Build session keys dtos used to encrypt shared resources.
 * @param {object} data The data to override the default dto.
 * @param {object} options Options to pass to the entity dto factory.
 * @param {integer} [options.count=10] The number of items to create
 * @returns {object}
 */
export const sharedResourcesSessionKeys = (data = {}, options = {}) => {
  const dtos = [];
  const count = options?.count || 2;
  const fixtureCount = metadata.withSharedKey.sessionKeys.length;
  for (let i = 0; i < count; i++) {
    const defaultData = {
      session_key: metadata.withSharedKey.sessionKeys[i % fixtureCount],
      ...(Array.isArray(data) ? data[i] : data),
    };
    const dto = defaultSessionKeyDto(defaultData);
    dtos.push(dto);
  }
  return dtos;
};

/**
 * Build session keys dtos used to encrypt private resources.
 * @param {object} data The data to override the default dto.
 * @param {object} options Options to pass to the entity dto factory.
 * @param {integer} [options.count=10] The number of items to create
 * @returns {object}
 */
export const privateResourcesSessionKeys = (data = {}, options = {}) => {
  const dtos = [];
  const count = options?.count || 2;
  const fixtureCount = metadata.withAdaKey.sessionKeys.length;
  for (let i = 0; i < count; i++) {
    const defaultData = {
      session_key: metadata.withAdaKey.sessionKeys[i % fixtureCount],
      ...data,
    };
    const dto = defaultSessionKeyDto(defaultData);
    dtos.push(dto);
  }
  return dtos;
};
