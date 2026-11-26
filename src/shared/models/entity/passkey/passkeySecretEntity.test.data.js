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
 * @since         5.18.0
 */
import { defaultPasskeyHmacCredentialsDto } from "./passkeyHmacCredentialsEntity.test.data";

/**
 * Returns a DTO object suitable for the PasskeySecretEntity.
 * The key was generated for tests and is used nowhere else.
 * @param {object} data
 * @returns {object}
 */
export const defaultPasskeySecretDto = (data = {}) => ({
  rp_id: "example.com",
  credential_id: "yuDS1TCepE-VXzAgRc2VJw",
  algorithm: -7,
  private_key:
    "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQguHI-5zZwXwevH0ygppdhTAlk2cjtLF2zE9iRjEyvGaChRANCAAS4os8mjfeCHpB4oL_F6b8lnsXVAiM1BhAm2ZszurCdU01PVaKuCZlUzgueiIk6bDLl60K03ykfhnHfcqiwSWsz",
  user_display_name: "Alice Martin",
  hmac_credentials: defaultPasskeyHmacCredentialsDto(),
  ...data,
});
