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
 * @since         4.10.0
 */
import {v4 as uuidv4} from "uuid";
import {defaultArmoredPublicKey} from "../../../../../test/assert/assertEntityProperty.test.data";
import {defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";

/**
 * Returns a minimal DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withMetadataPrivateKeys = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const minimalMetadataKeyDto = (data = {}, options = {}) => {
  const defaultData = {
    fingerprint: Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join(''),
    armored_key: defaultArmoredPublicKey(),
    ...data
  };

  if (!defaultData.metadata_private_keys && options?.withMetadataPrivateKeys) {
    defaultData.metadata_private_keys = [defaultMetadataPrivateKeyDto({metadata_key_id: defaultData.id})];
  }

  return defaultData;
};

/**
 * Returns a DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withMetadataPrivateKeys = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const defaultMetadataKeyDto = (data = {}, options = {}) => {
  const id = data.id || uuidv4();
  const defaultData = {
    id: id,
    modified: "2022-10-11T08:09:00+00:00",
    created_by: uuidv4(),
    created: "2022-10-11T08:09:00+00:00",
    modified_by: uuidv4(),
    deleted: null,
    expired: null,
    ...data,
  };

  return minimalMetadataKeyDto(defaultData, options);
};
