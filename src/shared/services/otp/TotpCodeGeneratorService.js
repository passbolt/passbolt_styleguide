/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */
import * as OTPAuth from "otpauth";

export class TotpCodeGeneratorService {
  /**
   * Generate a TOTP code based on a TOTP DTO
   * @param {object} totpDto The totp DTO
   * @returns {string}
   */
  static generate(totpDto) {
    const totp = new OTPAuth.TOTP({
      algorithm:  totpDto.algorithm,
      digits: totpDto.digits,
      period: totpDto.period,
      secret: totpDto.secret_key,
      timestamp: Date.now()
    });

    return totp.generate();
  }
}
