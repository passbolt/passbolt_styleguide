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
   * @returns {TOTP}
   */
  static createTotpObject(totpDto) {
    return new OTPAuth.TOTP({
      algorithm: totpDto.algorithm,
      digits: totpDto.digits,
      period: totpDto.period,
      // Remove all special characters and whitespace from secret_key (including spaces, tabs and newline characters)
      secret: totpDto.secret_key.replace(/(\W|_|\s)/g, ""),
      issuer: totpDto.issuer,
      label: totpDto.label,
      timestamp: Date.now(),
    });
  }

  /**
   * Generate a TOTP code based on a TOTP DTO
   * @param {object} totpDto The totp DTO
   * @returns {string}
   */
  static generate(totpDto) {
    const totp = this.createTotpObject(totpDto);
    return totp.generate();
  }

  /**
   * Generate a TOTP code based on a TOTP DTO
   * @param {object} totpDto The totp DTO
   * @returns {string}
   */
  static generateUri(totpDto) {
    const totp = this.createTotpObject(totpDto);
    // Convert to Google Authenticator key URI
    return totp.toString();
  }
}
