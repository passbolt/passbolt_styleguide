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
 * @since         3.12.0
 */

import XRegExp from "xregexp";

const REGEX_HOSTNAME = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
const REGEX_EMAIL = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${REGEX_HOSTNAME}$`;

export default class IsEmailValidator {
  /**
   * Validate an email.
   *
   * @see CakePHP email validation regex.
   * @param {string} value The value to validate.
   * @returns {boolean}
   */
  static validate(value) {
    if (typeof value !== 'string') {
      return false;
    }

    return XRegExp(REGEX_EMAIL, 'i').test(value);
  }
}
