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
import {defaultMetadataKeyDto, minimalMetadataKeyDto} from "./metadataKeyEntity.test.data";

export const defaultMetadataKeysDtos = (count = 2, data = {}) => {
  const metadata_key_id = uuidv4();

  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = defaultMetadataKeyDto({metadata_key_id, fingerprint: generateFingerprint(i), ...data});
    const dto2 = defaultMetadataKeyDto({metadata_key_id, fingerprint: generateFingerprint(i + 1), ...data});
    dtos.push(dto1, dto2);
  }

  return dtos;
};

export const defaultMinimalMetadataKeysDtos = (count = 2, data = {}) => {
  const metadata_key_id = uuidv4();

  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = minimalMetadataKeyDto({metadata_key_id, fingerprint: generateFingerprint(i), ...data});
    const dto2 = minimalMetadataKeyDto({metadata_key_id, fingerprint: generateFingerprint(i + 1), ...data});
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
