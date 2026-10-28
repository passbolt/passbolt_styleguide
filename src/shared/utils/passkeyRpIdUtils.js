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
 * Relying party id of a passkey: a lowercase domain name, labels of 1 to 63 characters from a-z, 0-9, "-" and "_",
 * without a hyphen at either end; "_" is allowed except in the last label, which starts with a letter (excludes IP
 * addresses). Same pattern as the API resource type definition (RE2 compatible).
 */
const PASSKEY_RP_ID_HOST_PATTERN = "(?:[a-z0-9_](?:[a-z0-9_-]{0,61}[a-z0-9_])?\\.)*[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?";
export const PASSKEY_RP_ID_MAX_LENGTH = 253;
export const PASSKEY_RP_ID_REGEXP = new RegExp(`^${PASSKEY_RP_ID_HOST_PATTERN}$`);
export const PASSKEY_URI_REGEXP = new RegExp(`^https://(${PASSKEY_RP_ID_HOST_PATTERN})$`);

/**
 * Check that a relying party id can be stored in a passkey resource.
 * @param {string} rpId
 * @returns {boolean}
 */
export const isValidPasskeyRpId = (rpId) =>
  typeof rpId === "string" && rpId.length <= PASSKEY_RP_ID_MAX_LENGTH && PASSKEY_RP_ID_REGEXP.test(rpId);

/**
 * Get the relying party id of a passkey resource from its metadata uris, which must be exactly ["https://<rp id>"]:
 * no port, path, query, fragment or user info.
 * @param {Array<string>} uris The metadata uris.
 * @returns {string|null} null when the uris do not name a relying party id.
 */
export const parseRpIdFromUris = (uris) => {
  if (!Array.isArray(uris) || uris.length !== 1 || typeof uris[0] !== "string") {
    return null;
  }
  const match = PASSKEY_URI_REGEXP.exec(uris[0]);
  return match && isValidPasskeyRpId(match[1]) ? match[1] : null;
};
