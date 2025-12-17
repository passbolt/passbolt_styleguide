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
import { v4 as uuidv4 } from "uuid";
import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";
import { defaultSessionKeysBundleDataDto } from "./sessionKeysBundleDataEntity.test.data";

/**
 * Returns a minimal DTO object suitable for the SessionKeysBundleEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withDecryptedSessionKeysBundle = false] if true, set the data with `defaultSessionKeysBundleDataDto()`
 * @returns {object}
 */
export const minimalSessionKeysBundleDto = (data = {}, options = {}) => {
  const defaultData = {
    user_id: uuidv4(),
    data: pgpKeys.metadataKey.encryptedSessionKeysDataMessage,
    ...data,
  };

  if (options?.withDecryptedSessionKeysBundle) {
    defaultData.data = defaultSessionKeysBundleDataDto();
  }

  return defaultData;
};

/**
 * Returns a DTO object suitable for the SessionKeysBundleEntity
 * @param {object} data
 * @param {object} options
 * @returns {object}
 */
export const defaultSessionKeysBundleDto = (data = {}, options = {}) =>
  minimalSessionKeysBundleDto(
    {
      id: uuidv4(),
      modified: "2022-10-11T08:09:00+00:00",
      created_by: uuidv4(),
      created: "2022-10-11T08:09:00+00:00",
      ...data,
    },
    options,
  );

/**
 * Returns a DTO object suitable for the SessionKeysBundleEntity with decrypted data field
 * @param {object} data
 * @param {object} options
 * @returns {object}
 */
export const decryptedSessionKeysBundleDto = (data = {}, options = {}) =>
  defaultSessionKeysBundleDto(
    {
      data: defaultSessionKeysBundleDataDto(),
      ...data,
    },
    options,
  );
