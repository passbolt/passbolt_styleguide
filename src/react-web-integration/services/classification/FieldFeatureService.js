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
 * @since         5.15.0
 */

import TextNormalizer from "../../lib/InForm/TextNormalizer";
import { AUTOCOMPLETE_OTP_TOKEN } from "./KeywordsDictionary";

/**
 * An inputMode value asking for a numeric keyboard, case-insensitive.
 * @type {RegExp}
 */
const NUMERIC_INPUT_MODE = /^\s*(?:numeric|tel|decimal)\s*$/i;

/**
 * A pattern attribute restricting the input to digits (`\d` or `[0-9]`).
 * @type {RegExp}
 */
const DIGIT_CONSTRAINED_PATTERN = /\\d|\[0-9\]/;

class FieldFeatureService {
  /**
   * Returns the normalized text of the field's name, id, label, aria-label and placeholder.
   * @param {FieldScraping} field The field record.
   * @returns {string} The normalized text.
   */
  static fieldText(field) {
    return TextNormalizer.normalizeForMatch(
      [
        field.attributes?.name,
        field.attributes?.id,
        field.label?.text,
        field.inputDescription?.ariaLabel,
        field.inputDescription?.placeholder,
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  /**
   * Returns true when the autocomplete attribute contains `one-time-code`.
   * @param {FieldScraping} field The field record.
   * @returns {boolean} Whether the OTP autocomplete value is present.
   */
  static autoCompleteHasOtp(field) {
    return (field.autoComplete || "").toLowerCase().split(/\s+/).includes(AUTOCOMPLETE_OTP_TOKEN);
  }

  /**
   * Returns true when inputMode or pattern restricts the input to digits.
   * @param {FieldScraping} field The field record.
   * @returns {boolean} Whether the field looks numeric.
   */
  static looksNumeric(field) {
    return (
      NUMERIC_INPUT_MODE.test(field.attributes?.inputMode || "") ||
      DIGIT_CONSTRAINED_PATTERN.test(field.attributes?.pattern || "")
    );
  }

  /**
   * Returns true unless the field is disabled or readonly.
   * @param {FieldScraping} field The field record.
   * @returns {boolean} `false` when the field is disabled or readonly, `true` otherwise.
   */
  static isFillable(field) {
    return !field.attributes?.disabled && !field.attributes?.readonly;
  }
}

export default FieldFeatureService;
