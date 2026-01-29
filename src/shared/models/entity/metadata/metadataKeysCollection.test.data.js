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
import { defaultMetadataKeyDto, minimalMetadataKeyDto } from "./metadataKeyEntity.test.data";
import { v4 as uuidv4 } from "uuid";
import { decryptedMetadataPrivateKeyDto } from "./metadataPrivateKeyEntity.test.data";

export const defaultMetadataKeysDtos = (count = 2, data = {}, options = {}) => {
  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = defaultMetadataKeyDto({ fingerprint: generateFingerprint(i), ...data }, options);
    const dto2 = defaultMetadataKeyDto({ fingerprint: generateFingerprint(i + 1), ...data }, options);
    dtos.push(dto1, dto2);
  }

  return dtos;
};

export const defaultDecryptedSharedMetadataKeysDtos = (data = {}, options = {}) => {
  const id = uuidv4();
  const sharedMetadataPrivateKey = decryptedMetadataPrivateKeyDto({
    metadata_key_id: id,
  });

  return [
    defaultMetadataKeyDto(
      {
        id: id,
        metadata_private_keys: [sharedMetadataPrivateKey],
        ...data,
      },
      options,
    ),
  ];
};

export const defaultMinimalMetadataKeysDtos = (count = 2, data = {}, options = {}) => {
  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = minimalMetadataKeyDto({ fingerprint: generateFingerprint(i), ...data }, options);
    const dto2 = minimalMetadataKeyDto({ fingerprint: generateFingerprint(i + 1), ...data }, options);
    dtos.push(dto1, dto2);
  }

  return dtos;
};

/**
 * Given an index, generates a string that is matching the fingerprint regular expression
 * @param {number} index
 * @returns {string}
 */
function generateFingerprint(index) {
  return index.toString().padStart(40, "0");
}
