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
 * @since         5.12.0
 */

import { randomNumberRange } from "./PasswordGenerator";

export const PIN_CODE_LENGTH_CONSTRAINTS = {
  MIN: 4,
  MAX: 12,
  DEFAULT: 4,
};

/**
 * Generate a random PIN code of the given length.
 * Length is clamped between PIN_CODE_LENGTH_CONSTRAINTS.MIN and PIN_CODE_LENGTH_CONSTRAINTS.MAX.
 * @param {number} length desired PIN length
 * @return {string}
 */
function generate(length = PIN_CODE_LENGTH_CONSTRAINTS.DEFAULT) {
  const clampedLength = Math.max(PIN_CODE_LENGTH_CONSTRAINTS.MIN, Math.min(PIN_CODE_LENGTH_CONSTRAINTS.MAX, length));

  let pinCode = "";
  do {
    pinCode += String(randomNumberRange(0, 9));
  } while (pinCode.length < clampedLength);

  return pinCode;
}

export const PinCodeGenerator = { generate };
