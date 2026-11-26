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
import EntityV2 from "../abstract/entityV2";
import { PASSKEY_VERIFICATION_NON_STRICT, PASSKEY_VERIFICATION_STRICT } from "../../../constants/passkey.const";

/**
 * The user's choice for passkey requests requiring user verification: a passphrase prompt every time (strict), or the
 * unlocked session counts (non strict).
 */
class PasskeyVerificationPreferenceEntity extends EntityV2 {
  /**
   * @inheritDoc
   */
  static getSchema() {
    return {
      type: "object",
      required: ["value"],
      properties: {
        value: {
          type: "string",
          enum: [PASSKEY_VERIFICATION_STRICT, PASSKEY_VERIFICATION_NON_STRICT],
        },
      },
    };
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get the preference value
   * @returns {string}
   */
  get value() {
    return this._props.value;
  }

  /**
   * Whether every request requiring user verification prompts for the passphrase.
   * @returns {boolean}
   */
  get isStrict() {
    return this._props.value === PASSKEY_VERIFICATION_STRICT;
  }
}

export default PasskeyVerificationPreferenceEntity;
