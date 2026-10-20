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

export const GENERIC_URL_PARAMS_REGEX = /^[a-z]+$/i;

/**
 * Validates search parameters according to our rules.
 */
class SearchParamsValidator {
  /**
   * Validate if a string is a valid Passbolt search value.
   * @param {unknown} search The value to evaluate.
   * @returns {boolean}
   */
  static validate(search) {
    if (typeof search !== "string" && !(search instanceof URLSearchParams)) {
      return false;
    }

    const searchParams = new URLSearchParams(search);
    const values = Array.from(searchParams.values());
    return values.every((entry) => GENERIC_URL_PARAMS_REGEX.test(entry));
  }

  /**
   * Get the error code from url parameters.
   * NOTE: We currently support error codes composed only with alphabetical characters.
   *
   * @example ?error=code // would return "code"
   * @param {any} search The search string to extract the error code from.
   * @returns {string|null} The error code if any, null otherwise.
   */
  static getErrorCode(search) {
    if (!SearchParamsValidator.validate(search)) {
      return null;
    }

    const searchParams = new URLSearchParams(search);
    return searchParams.get("error");
  }
}

export default SearchParamsValidator;
