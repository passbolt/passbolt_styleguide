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
 * @since         5.11.0
 */

import { TotpCodeGeneratorService } from "../../shared/services/otp/TotpCodeGeneratorService";
import { Autofill } from "./Autofill";

export default class AutofillPage {
  /**
   * Triggers the form filling
   */
  fillForm(formData) {
    Autofill.fillForm(formData);
  }

  /**
   * Generates a TOTP
   */
  generateTOTP(totpDto) {
    return TotpCodeGeneratorService.generate(totpDto);
  }

  /**
   * Returns the first matching username element
   */
  get username() {
    return document.querySelector('input[type="text"]');
  }

  /**
   * Returns the first matching password element
   */
  get password() {
    return document.querySelector('input[type="password"]');
  }

  /**
   * Returns the first matching otp element
   */
  get otp() {
    return document.querySelector('[data-testid="otp"]');
  }

  /**
   * Returns all the username elements
   */
  get usernames() {
    return Array.from(document.querySelectorAll('input[type="text"]'));
  }

  /**
   * Returns all the password elements
   */
  get passwords() {
    return Array.from(document.querySelectorAll('input[type="password"]'));
  }

  /**
   * Returns all the otp elements
   */
  get otps() {
    return Array.from(document.querySelectorAll('[data-testid="otp"]'));
  }
}
