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
/** Organisation policy letting each user choose how passkey requests requiring user verification are verified */
export const PASSKEY_USER_VERIFICATION_POLICY_USER_CHOICE = "user_choice";
/** Passkey verification preferences: a prompt every time, or the unlocked session counts */
export const PASSKEY_VERIFICATION_STRICT = "strict";
export const PASSKEY_VERIFICATION_NON_STRICT = "non_strict";
/** Purposes of the passkey passphrase prompt */
export const PASSKEY_PROMPT_PURPOSE_VERIFY = "verify";
export const PASSKEY_PROMPT_PURPOSE_VERIFY_ORGANISATION = "verify-organisation";
export const PASSKEY_PROMPT_PURPOSE_UNLOCK = "unlock";
/** WebAuthn ceremonies */
export const PASSKEY_CEREMONY_CREATE = "create";
export const PASSKEY_CEREMONY_GET = "get";
