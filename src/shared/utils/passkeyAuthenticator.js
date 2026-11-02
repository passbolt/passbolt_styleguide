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
 * @since         5.17.0
 */
import { PASSKEY_AUTHENTICATOR_NAMES } from "../models/passkey/aaguidNames.data";

const HEX_AAGUID_REGEXP = /^[0-9a-f]{32}$/;
const AAGUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * Normalize an AAGUID to its lowercase RFC 4122 form.
 * Accepts the dashed form and the 32 hex characters form (as derived from raw authenticator data).
 * @param {string} aaguid
 * @returns {string|null} null when the value is not a valid AAGUID
 */
export const normalizePasskeyAaguid = (aaguid) => {
  if (typeof aaguid !== "string") {
    return null;
  }
  let normalized = aaguid.trim().toLowerCase();
  if (HEX_AAGUID_REGEXP.test(normalized)) {
    normalized = normalized.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  }
  return AAGUID_REGEXP.test(normalized) ? normalized : null;
};

/**
 * Returns the name of the known authenticator for the given AAGUID.
 * @param {string} aaguid
 * @returns {string|null} null when unknown
 */
export const getPasskeyAuthenticatorName = (aaguid) =>
  PASSKEY_AUTHENTICATOR_NAMES[normalizePasskeyAaguid(aaguid)] ?? null;
