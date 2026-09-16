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
import SawfClassificationService from "./SawfClassificationService";
import FieldFeatureService from "./FieldFeatureService";
import { FieldRole, Tier } from "./Taxonomy";
import { Keywords, NON_CREDENTIAL_INPUT_TYPES, MIN_OTP_SEGMENTS, MAX_OTP_SEGMENTS } from "./KeywordsDictionary";

/**
 * A rough e-mail shape, used to detect an email field from its placeholder text.
 * @type {RegExp}
 */
const EMAIL_PLACEHOLDER = /[^\s@]+@[^\s@]+\.[^\s@]+/;

/**
 * Field classification: maps a field to a role and the tier which decided it, from its declared attributes, input type and keywords.
 */
class FieldClassificationService {
  /**
   * Runs the classification steps in order and returns the first matching one.
   * @param {FieldScraping} field The value-free field record.
   * @returns {{role: string, tier: number}} The role and the deciding Tier.
   */
  static classify(field) {
    const signals = FieldClassificationService.signals(field);
    const ladder = [
      FieldClassificationService.hardExclude,
      FieldClassificationService.recoveryVeto,
      FieldClassificationService.totp,
      FieldClassificationService.declaredBySawf,
      FieldClassificationService.declaredByAutocomplete,
      FieldClassificationService.byInputType,
      FieldClassificationService.byExplicitLabel,
      FieldClassificationService.byAttributeKeyword,
    ];
    for (const step of ladder) {
      const decided = step(field, signals);
      if (decided) {
        return decided;
      }
    }
    return { role: FieldRole.OTHER, tier: Tier.NONE };
  }

  /**
   * Normalizes the texts and declared roles.
   * @param {FieldScraping} field The field.
   * @returns {{strongText: string, weakText: string, sawfRole: string, acRole: string|null}} The signals.
   */
  static signals(field) {
    return {
      strongText: TextNormalizer.normalizeForMatch(
        [field.label?.text, field.inputDescription?.ariaLabel].filter(Boolean).join(" "),
      ),
      weakText: TextNormalizer.normalizeForMatch(
        [field.attributes?.name, field.attributes?.id, field.inputDescription?.placeholder].filter(Boolean).join(" "),
      ),
      sawfRole: SawfClassificationService.sawfFieldRole(field.dataFormType),
      acRole: KeywordMatchingService.roleFromAutocomplete(field.autoComplete),
    };
  }

  /**
   * Returns OTHER tier for input types which can never be a credential (checkbox, submit, ...).
   * @param {FieldScraping} field The field.
   * @returns {{role: string, tier: number}|null} OTHER or null.
   */
  static hardExclude(field) {
    if (field.tagName === "INPUT" && NON_CREDENTIAL_INPUT_TYPES.has(field.type)) {
      return { role: FieldRole.OTHER, tier: Tier.NONE };
    }
    return null;
  }

  /**
   * Returns OTHER when a recovery or backup keyword is found.
   * @param {FieldScraping} field The field.
   * @param {{strongText: string, weakText: string}} signals The signals.
   * @returns {{role: string, tier: number}|null} OTHER or null.
   */
  static recoveryVeto(field, { strongText, weakText }) {
    if (
      KeywordMatchingService.matchesAny(strongText, Keywords.RECOVERY) ||
      KeywordMatchingService.matchesAny(weakText, Keywords.RECOVERY)
    ) {
      return { role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    return null;
  }

  /**
   * Returns TOTP when declared by data-form-type or autocomplete, or when a TOTP keyword is found.
   * @param {FieldScraping} field The field.
   * @param {{strongText: string, weakText: string, sawfRole: string, acRole: string|null}} signals The signals.
   * @returns {{role: string, tier: number}|null} A TOTP decision, or null.
   */
  static totp(field, { strongText, weakText, sawfRole, acRole }) {
    if (sawfRole === FieldRole.TOTP) {
      return { role: FieldRole.TOTP, tier: Tier.SAWF };
    }
    if (acRole === FieldRole.TOTP) {
      return { role: FieldRole.TOTP, tier: Tier.AUTOCOMPLETE };
    }
    if (
      KeywordMatchingService.matchesAny(strongText, Keywords.TOTP) ||
      KeywordMatchingService.matchesAny(weakText, Keywords.TOTP)
    ) {
      return { role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    // An ambiguous token (code, pin) only counts as TOTP when the maxLength or a numeric input hint confirms it.
    if (
      (KeywordMatchingService.matchesAny(strongText, Keywords.TOTP_AMBIGUOUS) ||
        KeywordMatchingService.matchesAny(weakText, Keywords.TOTP_AMBIGUOUS)) &&
      FieldClassificationService.corroboratesSingleOtp(field)
    ) {
      return { role: FieldRole.TOTP, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    return null;
  }

  /**
   * Returns true when the maxLength is in the one-time-code range or the input looks numeric.
   * @param {FieldScraping} field The field.
   * @returns {boolean} `true` when the field looks like a one-time-code field.
   */
  static corroboratesSingleOtp(field) {
    const maxLength = field.attributes?.maxLength;
    const plausibleLength = maxLength >= MIN_OTP_SEGMENTS && maxLength <= MAX_OTP_SEGMENTS;
    return plausibleLength || FieldFeatureService.looksNumeric(field);
  }

  /**
   * Returns the role declared by data-form-type when present.
   * @param {FieldScraping} field The field.
   * @param {{sawfRole: string}} signals The signals.
   * @returns {{role: string, tier: number}|null} A SAWF decision, or null.
   */
  static declaredBySawf(field, { sawfRole }) {
    if (SawfClassificationService.parseSawf(field.dataFormType).size > 0) {
      return { role: sawfRole, tier: Tier.SAWF };
    }
    return null;
  }

  /**
   * Returns the role mapped from the autocomplete attribute when there is one.
   * @param {FieldScraping} field The field.
   * @param {{acRole: string|null}} signals The signals.
   * @returns {{role: string, tier: number}|null} An autocomplete decision, or null.
   */
  static declaredByAutocomplete(field, { acRole }) {
    if (acRole) {
      return { role: acRole, tier: Tier.AUTOCOMPLETE };
    }
    return null;
  }

  /**
   * Returns the role given by the input type (password or email).
   * @param {FieldScraping} field The field.
   * @returns {{role: string, tier: number}|null} An input-type decision, or null.
   */
  static byInputType(field) {
    if (field.type === "password") {
      return { role: FieldRole.PASSWORD, tier: Tier.INPUT_TYPE };
    }
    if (field.type === "email") {
      return { role: FieldRole.EMAIL, tier: Tier.INPUT_TYPE };
    }
    return null;
  }

  /**
   * A non-credential keyword (search / query / find / captcha / forgot …) vetoes the field to OTHER,
   * catching page utilities that carry an incidental identifier token before the keyword tiers misread
   * them as a username. Runs after the declared (SAWF / autocomplete) and native `type=email|password`
   * tiers, so real credentials still win, and ignores `class` so widget class names never trigger it.
   * @param {FieldScraping} field The field.
   * @param {{strongText: string, weakText: string}} signals The signals.
   * @returns {({role: string, tier: number}|null)} OTHER, or null to continue.
   */
  static ignoreVeto(field, { strongText, weakText }) {
    if (
      KeywordMatchingService.matchesAny(strongText, Keywords.FIELD_IGNORE) ||
      KeywordMatchingService.matchesAny(weakText, Keywords.FIELD_IGNORE)
    ) {
      return { role: FieldRole.OTHER, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    return null;
  }

  /**
   * Returns the role found in the label and aria text.
   * The placeholder is only evaluated for EMAIL.
   * @param {FieldScraping} field The field.
   * @param {{strongText: string}} signals The signals.
   * @returns {{role: string, tier: number}|null} A label decision, or null.
   */
  static byExplicitLabel(field, { strongText }) {
    if (
      KeywordMatchingService.matchesAny(strongText, Keywords.EMAIL) ||
      EMAIL_PLACEHOLDER.test(field.inputDescription?.placeholder || "")
    ) {
      return { role: FieldRole.EMAIL, tier: Tier.EXPLICIT_LABEL };
    }
    if (
      KeywordMatchingService.matchesAny(strongText, Keywords.PASSWORD) &&
      !KeywordMatchingService.matchesAny(strongText, Keywords.PASSWORD_EXCLUDE)
    ) {
      return { role: FieldRole.PASSWORD, tier: Tier.EXPLICIT_LABEL };
    }
    if (KeywordMatchingService.matchesAny(strongText, Keywords.IDENTIFIER)) {
      return { role: FieldRole.USERNAME, tier: Tier.EXPLICIT_LABEL };
    }
    return null;
  }

  /**
   * Returns the role found in the name, id and placeholder keywords.
   * @param {FieldScraping} field The field.
   * @param {{weakText: string}} signals The signals.
   * @returns {{role: string, tier: number}|null} A keyword decision, or null.
   */
  static byAttributeKeyword(field, { weakText }) {
    if (KeywordMatchingService.matchesAny(weakText, Keywords.EMAIL)) {
      return { role: FieldRole.EMAIL, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    if (
      field.type === "text" &&
      KeywordMatchingService.matchesAny(weakText, Keywords.PASSWORD) &&
      !KeywordMatchingService.matchesAny(weakText, Keywords.PASSWORD_EXCLUDE)
    ) {
      return { role: FieldRole.PASSWORD, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    if (KeywordMatchingService.matchesAny(weakText, Keywords.IDENTIFIER)) {
      return { role: FieldRole.USERNAME, tier: Tier.ATTRIBUTE_KEYWORD };
    }
    return null;
  }
}

export default FieldClassificationService;
