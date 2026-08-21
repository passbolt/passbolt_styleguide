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
 * An `inputMode` hinting at a numeric keyboard. Case-insensitive: HTML enumerated attributes are, and
 * the scraped `inputMode` is not lowercased upstream (unlike `autoComplete`).
 * @type {RegExp}
 */
const NUMERIC_INPUT_MODE = /^\s*(?:numeric|tel|decimal)\s*$/i;

/**
 * A `pattern` that constrains input to digits — the `\d` escape or the `[0-9]` character class. Matches
 * the regex CONSTRUCTS in the pattern string, NOT any stray digit: a bare `\d` here would match the
 * digit inside quantifiers like `{3}` and flag alphabetic patterns (e.g. `[A-Za-z]{3}`) as numeric.
 * @type {RegExp}
 */
const DIGIT_CONSTRAINED_PATTERN = /\\d|\[0-9\]/;

/**
 * Feature extraction for a scraped field (aggregated keyword text, OTP signals) — pure, value-free and
 * DOM-free. Stateless service exposing static methods only. Shared by the scope passes (password
 * cascade, segmented OTP).
 */
class FieldFeatureService {
  /**
   * Aggregated, normalized keyword text of a field (name + id + elected label + aria-label +
   * placeholder). `aria-labelledby` is deliberately excluded: it holds element IDREFs, not text, and
   * its resolved label text is already captured in `label.text` by LabelScraperService.
   * @param {FieldScraping} field The value-free field record.
   * @returns {string} The match-ready keyword text.
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
   * Does the field's autocomplete attribute carry the `one-time-code` token?
   * @param {FieldScraping} field The value-free field record.
   * @returns {boolean} Whether the OTP autocomplete token is present.
   */
  static autoCompleteHasOtp(field) {
    return (field.autoComplete || "").toLowerCase().split(/\s+/).includes(AUTOCOMPLETE_OTP_TOKEN);
  }

  /**
   * Whether `inputMode`/`pattern` denote digits (soft OTP corroboration).
   * @param {FieldScraping} field The value-free field record.
   * @returns {boolean} Whether the field looks numeric.
   */
  static looksNumeric(field) {
    return (
      NUMERIC_INPUT_MODE.test(field.attributes?.inputMode || "") ||
      DIGIT_CONSTRAINED_PATTERN.test(field.attributes?.pattern || "")
    );
  }

  /**
   * Whether the field can be filled — a separate concern from its classified role. A field is fillable
   * unless it is natively `disabled` or `readonly`.
   *
   * Only these two attributes matter: classified fields are always visible (visibility is enforced
   * earlier, during extraction), so nothing else can rule out filling here. `aria-disabled` is treated
   * as a soft signal elsewhere and does not block, so an `<input type=password disabled>` keeps its
   * PASSWORD role but is not fillable.
   * @param {FieldScraping} field The value-free field record.
   * @returns {boolean} Whether the field can be filled.
   */
  static isFillable(field) {
    return !field.attributes?.disabled && !field.attributes?.readonly;
  }
}

export default FieldFeatureService;
