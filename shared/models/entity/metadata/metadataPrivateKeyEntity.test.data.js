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
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

/**
 * Returns a minimal DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @returns {object}
 */
export const minimalMetadataPrivateKeyDto = (data = {}) => ({
  user_id: null,
  data: pgpKeys.metadataKey.encryptedMetadataPrivateKeyDataMessage,
  ...data
});

/**
 * Returns a DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultMetadataPrivateKeyDto = (data = {}) => minimalMetadataPrivateKeyDto({
  id: uuidv4(),
  user_id: uuidv4(),
  metadata_key_id: uuidv4(),
  data_signed_by_current_user: null,
  modified: "2022-10-11T08:09:00+00:00",
  created_by: uuidv4(),
  created: "2022-10-11T08:09:00+00:00",
  modified_by: uuidv4(),
  ...data,
});


/**
 * Returns a DTO object suitable for the MetadataPrivateKeyEntity with decrypted data field
 * @param {object} data
 * @returns {object}
 */
export const decryptedMetadataPrivateKeyDto = (data = {}) => defaultMetadataPrivateKeyDto({
  data: JSON.parse(pgpKeys.metadataKey.decryptedMetadataPrivateKeyData),
  ...data,
});
