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

/** Unpadded base64url whose length decodes */
export const PASSKEY_BASE64URL_REGEXP = /^(?:[\w-]{4})*(?:[\w-]{2,3})?$/;
/** WebAuthn credential ids: at least 16 random bytes, at most 1023 bytes, in unpadded base64url */
export const PASSKEY_CREDENTIAL_ID_MIN_LENGTH = 22;
export const PASSKEY_CREDENTIAL_ID_MAX_LENGTH = 1364;
/** COSE algorithm of the passkey key pair: ES256 */
export const PASSKEY_ES256_ALGORITHM = -7;
/** Algorithm of the PRF secrets */
export const PASSKEY_HMAC_ALGORITHM = "hmac-sha256";
