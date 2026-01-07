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
 * @since         5.2.0
 */

import { v4 as uuidv4 } from "uuid";
import { minimalMetadataPrivateKeyDto, defaultMetadataPrivateKeyDto } from "./metadataPrivateKeyEntity.test.data";
import { defaultMetadataPrivateKeyDataDto } from "./metadataPrivateKeyDataEntity.test.data";
import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";

export const defaultShareMetadataPrivateKeysDtos = (count = 2, data = {}) => {
  const user_id = uuidv4();

  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = defaultMetadataPrivateKeyDto({ user_id, ...data });
    const dto2 = defaultMetadataPrivateKeyDto({ user_id: user_id, data: defaultMetadataPrivateKeyDataDto(), ...data });
    dtos.push(dto1, dto2);
  }

  return dtos;
};

export const defaultMinimalShareMetadataPrivateKeysDtos = (count = 2, data = {}) => {
  const dtos = [];
  const user_id = uuidv4();

  for (let i = 0; i < count; i += 2) {
    const dto1 = minimalMetadataPrivateKeyDto({ user_id, ...data });
    const dto2 = minimalMetadataPrivateKeyDto({ user_id: user_id, data: defaultMetadataPrivateKeyDataDto(), ...data });
    dtos.push(dto1, dto2);
  }

  return dtos;
};

export const shareMetadataPrivateKeysWithSameMetadataKeyIdUserIdDtos = () => {
  const metadataKeyId = uuidv4();
  const userId = uuidv4();
  return defaultShareMetadataPrivateKeysDtos(2, {
    metadata_key_id: metadataKeyId,
    user_id: userId,
  });
};

export const shareMetadataPrivateKeysWithDecryptedKeyDtos = () => {
  const user_id = uuidv4();
  const data = defaultMetadataPrivateKeyDataDto();
  return [defaultMetadataPrivateKeyDto({ user_id, data }), defaultMetadataPrivateKeyDto({ user_id, data })];
};

export const shareMetadataPrivateKeysWithEncryptedKeyDtos = () => {
  const user_id = uuidv4();
  const data = pgpKeys.metadataKey.encryptedMetadataPrivateKeyDataMessage;
  return [defaultMetadataPrivateKeyDto({ user_id }), defaultMetadataPrivateKeyDto({ user_id, data })];
};
