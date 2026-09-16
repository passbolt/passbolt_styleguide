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
 * Groups a one-time code split into single-character boxes into one TOTP group.
 */
class SegmentedOtpResolutionService {
  /**
   * Marks each sequence of boxes which looks like a one-time code as TOTP and returns the groups.
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
   * Returns true when the ancestor headings have a TOTP keyword.
   * @param {{form: FormScraping}} scope The scope.
   * @returns {boolean} Whether an OTP heading is present.
   */
  static hasOtpHeading(scope) {
    const headings = TextNormalizer.normalizeForMatch((scope.form?.ancestorHeadings || []).join(" "));
    return KeywordMatchingService.matchesAny(headings, Keywords.TOTP);
  }

  /**
   * Returns the index just after the sequence of boxes with the same type.
   * @param {FieldScraping[]} fields The scope fields (DOM order).
   * @param {number} start The index of the sequence first box.
   * @returns {number} The index after the last box of the sequence.
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
   * Returns true when the sequence length is in bounds and a box or the heading confirms a one-time code.
   * @param {FieldScraping[]} run The contiguous box run.
   * @param {boolean} headingCorroborates Whether the scope carries an OTP heading.
   * @returns {boolean} Whether the run is an OTP group.
   */
  static isOtpRun(run, headingCorroborates) {
    const plausibleLength = run.length >= MIN_OTP_SEGMENTS && run.length <= MAX_OTP_SEGMENTS;
    return plausibleLength && (headingCorroborates || run.some(SegmentedOtpResolutionService.corroboratesOtp));
  }

  /**
   * Returns true when the field is a single-character box.
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
   * Returns true when the field has a one-time-code signal.
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
