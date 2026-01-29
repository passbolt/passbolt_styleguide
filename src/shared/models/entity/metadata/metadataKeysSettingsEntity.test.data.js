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

import { defaultMetadataPrivateKeyDto } from "./metadataPrivateKeyEntity.test.data";
import { v4 as uuidv4 } from "uuid";

/**
 * Build default metadata types settings.
 * @param {object} [data={}] Data to override
 * @param {object} options
 * @param {object} [options.withMetadataPrivateKeys = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const defaultMetadataKeysSettingsDto = (data = {}, options = {}) => {
  const defaultData = {
    allow_usage_of_personal_keys: true,
    zero_knowledge_key_share: false,
  };

  if (!defaultData.metadata_private_keys && options?.withMetadataPrivateKeys) {
    defaultData.metadata_private_keys = [
      defaultMetadataPrivateKeyDto({ metadata_key_id: uuidv4() }, options?.withMetadataPrivateKeys),
    ];
  }

  return Object.assign(defaultData, data);
};
