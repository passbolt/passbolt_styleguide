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
import { FieldRole, Tier } from "./Taxonomy";
import { Keywords, NON_CREDENTIAL_INPUT_TYPES } from "./KeywordsDictionary";

/**
 * A rough e-mail shape, used to detect an email field from its placeholder text.
 * @type {RegExp}
 */
const EMAIL_PLACEHOLDER = /[^\s@]+@[^\s@]+\.[^\s@]+/;

/**
 * Per-field, value-free classification: maps a scraped field to a role and the ladder tier that decided
 * it. Tiers 1-5 resolve here (declared tokens, then input type, then keywords); tiers 6-7 (structural,
 * count) are resolved at scope level. Stateless service exposing static methods only.
 */
class FieldClassificationService {
  /**
   * Runs the ordered classification ladder and returns the first step that decides.
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
   * Pre-computed matching inputs shared by the ladder steps.
   * @param {FieldScraping} field The field.
   * @returns {{strongText: string, weakText: string, sawfRole: string, acRole: (string|null)}} The signals.
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
   * Impossible input types (checkbox, submit, …) can never be a credential.
   * @param {FieldScraping} field The field.
   * @returns {({role: string, tier: number}|null)} OTHER, or null to continue.
   */
  static hardExclude(field) {
    if (field.tagName === "INPUT" && NON_CREDENTIAL_INPUT_TYPES.has(field.type)) {
      return { role: FieldRole.OTHER, tier: Tier.NONE };
    }
    return null;
  }

  /**
   * A recovery/backup keyword vetoes the field to OTHER (never a password or a fillable TOTP).
   * @param {FieldScraping} field The field.
   * @param {{strongText: string, weakText: string}} signals The signals.
   * @returns {({role: string, tier: number}|null)} OTHER, or null to continue.
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
   * A TOTP field declared by SAWF/autocomplete, or corroborated by a TOTP keyword (recovery already
   * vetoed upstream).
   * @param {FieldScraping} field The field.
   * @param {{strongText: string, weakText: string, sawfRole: string, acRole: (string|null)}} signals The signals.
   * @returns {({role: string, tier: number}|null)} A TOTP decision, or null to continue.
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
    return null;
  }

  /**
   * Tier 1 — SAWF `data-form-type`. Once one is declared it decides: credential -> its role,
   * out-of-taxon -> OTHER, with no fallback to inference.
   * @param {FieldScraping} field The field.
   * @param {{sawfRole: string}} signals The signals.
   * @returns {({role: string, tier: number}|null)} A SAWF decision, or null to continue.
   */
  static declaredBySawf(field, { sawfRole }) {
    if (SawfClassificationService.parseSawf(field.dataFormType).size > 0) {
      return { role: sawfRole, tier: Tier.SAWF };
    }
    return null;
  }

  /**
   * Tier 2 — autocomplete. Only a token we actually map ({@link AUTOCOMPLETE_ROLE}) decides here; anything
   * else — an unmapped valid type (`tel`, `cc-number`…), an invalid token, or "off"/"on"/group modifiers —
   * does not stop the cascade and lets the next tier infer the role.
   * @param {FieldScraping} field The field.
   * @param {{acRole: (string|null)}} signals The signals.
   * @returns {({role: string, tier: number}|null)} An autocomplete decision, or null to continue.
   */
  static declaredByAutocomplete(field, { acRole }) {
    if (acRole) {
      return { role: acRole, tier: Tier.AUTOCOMPLETE };
    }
    return null;
  }

  /**
   * Tier 3 — the input type (`password`/`email`).
   * @param {FieldScraping} field The field.
   * @returns {({role: string, tier: number}|null)} An input-type decision, or null to continue.
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
   * Tier 4 — the elected label / aria text (strong keywords), or an email-shaped placeholder.
   * @param {FieldScraping} field The field.
   * @param {{strongText: string}} signals The signals.
   * @returns {({role: string, tier: number}|null)} A label decision, or null to continue.
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
   * Tier 5 — the name/id/placeholder keywords (a password may be rendered as `type=text`).
   * @param {FieldScraping} field The field.
   * @param {{weakText: string}} signals The signals.
   * @returns {({role: string, tier: number}|null)} A keyword decision, or null to continue.
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
