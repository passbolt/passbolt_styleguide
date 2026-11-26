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

/**
 * Returns a DTO object suitable for the PasskeyMetadataEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultPasskeyMetadataDto = (data = {}) => ({
  rp_id: "example.com",
  credential_id: "yuDS1TCepE-VXzAgRc2VJw",
  user_handle: "tgxcV0RS0EwaVt_lsRJB63GS0tUJcLPeJz5o2rlkG8M",
  prf_support: true,
  ...data,
});
