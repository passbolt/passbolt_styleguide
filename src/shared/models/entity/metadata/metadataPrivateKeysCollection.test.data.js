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
import { v4 as uuidv4 } from "uuid";
import { defaultMetadataPrivateKeyDto, minimalMetadataPrivateKeyDto } from "./metadataPrivateKeyEntity.test.data";
import { defaultMetadataPrivateKeyDataDto } from "./metadataPrivateKeyDataEntity.test.data";

export const defaultMetadataPrivateKeysDtos = (count = 2, data = {}) => {
  const metadata_key_id = uuidv4();

  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = defaultMetadataPrivateKeyDto({ metadata_key_id, ...data });
    const dto2 = defaultMetadataPrivateKeyDto({ metadata_key_id, data: defaultMetadataPrivateKeyDataDto(), ...data });
    dtos.push(dto1, dto2);
  }

  return dtos;
};

export const defaultMinimalMetadataPrivateKeysDtos = (count = 2, data = {}) => {
  const metadata_key_id = uuidv4();

  const dtos = [];
  for (let i = 0; i < count; i += 2) {
    const dto1 = minimalMetadataPrivateKeyDto({ metadata_key_id, ...data });
    const dto2 = minimalMetadataPrivateKeyDto({ metadata_key_id, data: defaultMetadataPrivateKeyDataDto(), ...data });
    dtos.push(dto1, dto2);
  }

  return dtos;
};
