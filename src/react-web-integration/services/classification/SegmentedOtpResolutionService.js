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
import KeywordMatchingService from "./KeywordMatchingService";
import FieldFeatureService from "./FieldFeatureService";
import { FieldRole } from "./Taxonomy";
import { Keywords, OTP_BOX_INPUT_TYPES, MIN_OTP_SEGMENTS, MAX_OTP_SEGMENTS } from "./KeywordsDictionary";

/**
 * Groups a one-time code split into N single-character boxes (`<input maxlength=1>` × 6) into ONE TOTP
 * group. Structure-first (homogeneity + DOM contiguity + plausible length + one corroboration over
 * the whole run), not a `field count == code length` match. Value-free, deterministic and DOM-free.
 * Stateless service exposing a static method.
 */
class SegmentedOtpResolutionService {
  /**
   * @param {{fields: FieldScraping[], roles: Map<string, string>, form: FormScraping}} scope The scope (DOM order).
   * @returns {Array<Array<string>>} The ordered OTP groups (fieldId), or [] when none.
   */
  static resolve(scope) {
    const groups = [];
    const fields = scope.fields;
    const headingCorroborates = SegmentedOtpResolutionService.hasOtpHeading(scope);

    let index = 0;
    while (index < fields.length) {
      if (!SegmentedOtpResolutionService.isBox(fields[index])) {
        index++;
        continue;
      }
      const runEnd = SegmentedOtpResolutionService.endOfRun(fields, index);
      const run = fields.slice(index, runEnd);
      if (SegmentedOtpResolutionService.isOtpRun(run, headingCorroborates)) {
        run.forEach((field) => scope.roles.set(field.fieldId, FieldRole.TOTP));
        groups.push(run.map((field) => field.fieldId));
      }
      index = runEnd;
    }
    return groups;
  }

  /**
   * Whether the scope's ancestor headings carry a TOTP keyword (the run-wide fallback corroboration).
   * @param {{form: FormScraping}} scope The scope.
   * @returns {boolean} Whether an OTP heading is present.
   */
  static hasOtpHeading(scope) {
    const headings = TextNormalizer.normalizeForMatch((scope.form?.ancestorHeadings || []).join(" "));
    return KeywordMatchingService.matchesAny(headings, Keywords.TOTP);
  }

  /**
   * Exclusive end index of the homogeneous, DOM-contiguous box run starting at `start`.
   * @param {FieldScraping[]} fields The scope fields (DOM order).
   * @param {number} start The index of the run's first box.
   * @returns {number} The index just past the last box of the run.
   */
  static endOfRun(fields, start) {
    const head = fields[start];
    let end = start + 1;
    while (end < fields.length && SegmentedOtpResolutionService.isBox(fields[end]) && fields[end].type === head.type) {
      end++;
    }
    return end;
  }

  /**
   * Whether a box run is a plausible one-time code: a length within bounds and one corroboration over
   * the WHOLE run (never per box), or a scope OTP heading.
   * @param {FieldScraping[]} run The contiguous box run.
   * @param {boolean} headingCorroborates Whether the scope carries an OTP heading.
   * @returns {boolean} Whether the run is an OTP group.
   */
  static isOtpRun(run, headingCorroborates) {
    const plausibleLength = run.length >= MIN_OTP_SEGMENTS && run.length <= MAX_OTP_SEGMENTS;
    return plausibleLength && (headingCorroborates || run.some(SegmentedOtpResolutionService.corroboratesOtp));
  }

  /**
   * Whether a field is a single-character OTP box: maxlength 1, a keyboard-enterable type, and not a
   * recovery field.
   * @param {FieldScraping} field The field.
   * @returns {boolean} Whether the field is a candidate box.
   */
  static isBox(field) {
    return (
      field.attributes?.maxLength === 1 &&
      OTP_BOX_INPUT_TYPES.includes(field.type) &&
      !KeywordMatchingService.matchesAny(FieldFeatureService.fieldText(field), Keywords.RECOVERY)
    );
  }

  /**
   * Whether a field carries a one-time-code signal (autocomplete token, numeric hint or TOTP keyword).
   * @param {FieldScraping} field The field.
   * @returns {boolean} Whether the field corroborates an OTP run.
   */
  static corroboratesOtp(field) {
    return (
      FieldFeatureService.autoCompleteHasOtp(field) ||
      FieldFeatureService.looksNumeric(field) ||
      KeywordMatchingService.matchesAny(FieldFeatureService.fieldText(field), Keywords.TOTP)
    );
  }
}

export default SegmentedOtpResolutionService;
