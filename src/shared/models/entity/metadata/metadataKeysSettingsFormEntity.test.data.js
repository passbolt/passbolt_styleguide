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
 * @since         4.11.0
 */

import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

/**
 * Build default metadata keys settings form dto.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const defaultMetadataKeysSettingsFormDto = (data = {}) => {
  const defaultData = {
    allow_usage_of_personal_keys: true,
    zero_knowledge_key_share: false,
  };
  return Object.assign(defaultData, data);
};

/**
 * Build metadata keys settings form dto when user generate a key.
 * @param {object} [data={}] Data to override
 * @returns {object}
 */
export const metadataKeysSettingsFormWithGeneratedKeyDto = (data = {}) => {
  const defaultData = {
    allow_usage_of_personal_keys: true,
    zero_knowledge_key_share: false,
    armored_metadata_private_key: pgpKeys.eddsa_ed25519.private,
    armored_metadata_public_key: pgpKeys.eddsa_ed25519.public,
  };
  return Object.assign(defaultData, data);
};
