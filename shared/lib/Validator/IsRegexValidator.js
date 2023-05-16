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

export default class IsRegexValidator {
  /**
   * Construct the regex validator.
   * @param {string} regex The regex;
   */
  constructor(regex) {
    if (typeof regex !== 'string') {
      throw Error('The regex should be a string.');
    }
    this.regex = new XRegExp(regex);
  }

  /**
   * Validate a value against a regex.
   * @param {*} value The value to test
   * @returns {boolean}
   */
  validate(value) {
    if (typeof value !== 'string') {
      return false;
    }

    return this.regex.test(value);
  }
}
