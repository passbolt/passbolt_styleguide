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

/**
 * Check that a relying party id can be stored in a passkey resource.
 * @param {string} rpId
 * @returns {boolean}
 */
export const isValidPasskeyRpId = (rpId) =>
  typeof rpId === "string" && rpId.length <= PASSKEY_RP_ID_MAX_LENGTH && PASSKEY_RP_ID_REGEXP.test(rpId);

/**
 * Check that a passkey of the relying party id belongs to the site of a page: the host of the page is the relying
 * party id or one of its subdomains.
 * @param {string} rpId The relying party id of the passkey.
 * @param {string} url The url of the page.
 * @returns {boolean}
 */
export const isRpIdOfUrl = (rpId, url) => {
  if (typeof rpId !== "string" || !URL.canParse(url)) {
    return false;
  }
  const host = new URL(url).hostname;
  return host === rpId || host.endsWith(`.${rpId}`);
};
