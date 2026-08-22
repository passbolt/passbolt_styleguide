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

import { FieldRole, FormRole } from "./Taxonomy";
import { USERNAME_CANDIDATE_TYPES } from "../../lib/InForm/ScrapingDictionary";

/**
 * Final rationalization pass: fixes role inconsistencies across the WHOLE scope (after the per-field
 * Phase 1 and the cascade/form Phase 2). Deterministic, value-free and DOM-free. Stateless service
 * exposing static methods only. Mutates and returns scope.roles.
 */
class FieldsRationalizationService {
  /**
   * @param {{form: FormScraping, formRole: string, fields: FieldScraping[], roles: Map<string, string>}} scope
   * @returns {Map<string, string>} The corrected roles.
   */
  static rationalize(scope) {
    const roles = scope.roles;
    // Order matters
    FieldsRationalizationService.rescueLoginPassword(scope, roles);
    FieldsRationalizationService.rescueUsername(scope, roles);
    FieldsRationalizationService.dedupeKeepFirst(scope, roles, FieldRole.USERNAME);
    FieldsRationalizationService.fixOrphanConfirmation(scope, roles);
    FieldsRationalizationService.enforceLoginConsistency(scope, roles);
    FieldsRationalizationService.defaultGenericPasswords(scope, roles);
    FieldsRationalizationService.dedupeKeepFirst(scope, roles, FieldRole.CURRENT_PASSWORD);
    return roles;
  }

  /**
   * Returns true as soon as a field carrying one of the wanted roles is found (short-circuits).
   * @param {string[]} wantedRoles The roles to look for.
   * @param {FieldScraping[]} fields The fields to scan.
   * @param {Map<string, string>} roles The role map.
   * @returns {boolean}
   */
  static hasRolesField(wantedRoles, fields, roles) {
    return fields.some((field) => wantedRoles.includes(roles.get(field.fieldId)));
  }

  /**
   * Keeps the first field (DOM order) with the given role and demotes the rest to OTHER.
   * @param {{fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   * @param {string} role The role to deduplicate.
   */
  static dedupeKeepFirst(scope, roles, role) {
    const hits = scope.fields.filter((field) => roles.get(field.fieldId) === role);
    hits.slice(1).forEach((field) => roles.set(field.fieldId, FieldRole.OTHER));
  }

  /**
   * On a login form with no resolved password, promotes the first type=password field to
   * CURRENT_PASSWORD (rescues a password missed by an earlier veto).
   * @param {{formRole: string, fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   */
  static rescueLoginPassword(scope, roles) {
    if (
      scope.formRole !== FormRole.LOGIN ||
      FieldsRationalizationService.hasRolesField([FieldRole.CURRENT_PASSWORD, FieldRole.PASSWORD], scope.fields, roles)
    ) {
      return;
    }
    const candidate = scope.fields.find((field) => field.type === "password");
    if (candidate) {
      roles.set(candidate.fieldId, FieldRole.CURRENT_PASSWORD);
    }
  }

  /**
   * On a login form with a password but no username/email, promotes the text/email field preceding
   * the first password (positional back-scan), skipping segmented OTP boxes.
   * @param {{formRole: string, fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   */
  static rescueUsername(scope, roles) {
    // No password guard needed: findIndex below returns -1 when no password exists, so the back-scan
    // never runs and the method is a no-op.
    if (
      scope.formRole !== FormRole.LOGIN ||
      FieldsRationalizationService.hasRolesField([FieldRole.USERNAME, FieldRole.EMAIL], scope.fields, roles)
    ) {
      return;
    }

    const firstPasswordIndex = scope.fields.findIndex(
      (field) =>
        roles.get(field.fieldId) === FieldRole.CURRENT_PASSWORD || roles.get(field.fieldId) === FieldRole.PASSWORD,
    );
    for (let index = firstPasswordIndex - 1; index >= 0; index--) {
      const field = scope.fields[index];
      // Never grab a segmented OTP box (role TOTP, often type=text maxlength=1).
      if (roles.get(field.fieldId) === FieldRole.TOTP) {
        continue;
      }
      if (USERNAME_CANDIDATE_TYPES.includes(field.type) && field.tagName !== "BUTTON") {
        roles.set(field.fieldId, field.type === "email" ? FieldRole.EMAIL : FieldRole.USERNAME);
        break;
      }
    }
  }

  /**
   * Rewrites a password-confirmation with no matching new-password back to a generic PASSWORD.
   * @param {{fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   */
  static fixOrphanConfirmation(scope, roles) {
    const confirmations = scope.fields.filter((field) => roles.get(field.fieldId) === FieldRole.PASSWORD_CONFIRMATION);
    if (
      confirmations.length &&
      !FieldsRationalizationService.hasRolesField([FieldRole.NEW_PASSWORD], scope.fields, roles)
    ) {
      confirmations.forEach((field) => roles.set(field.fieldId, FieldRole.PASSWORD));
    }
  }

  /**
   * On a login form, rewrites any inferred new-password/confirmation to CURRENT_PASSWORD, unless it
   * was set by an author-declared token (`_byDeclared`, authoritative).
   * @param {{formRole: string, fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   */
  static enforceLoginConsistency(scope, roles) {
    if (scope.formRole !== FormRole.LOGIN) {
      return;
    }
    scope.fields.forEach((field) => {
      const role = roles.get(field.fieldId);
      if ((role === FieldRole.NEW_PASSWORD || role === FieldRole.PASSWORD_CONFIRMATION) && !field._byDeclared) {
        roles.set(field.fieldId, FieldRole.CURRENT_PASSWORD);
      }
    });
  }

  /**
   * Defaults any still-generic PASSWORD to CURRENT_PASSWORD (a password manager prefers to offer
   * filling the existing password).
   * @param {{fields: FieldScraping[]}} scope The scope.
   * @param {Map<string, string>} roles The role map to update in place.
   */
  static defaultGenericPasswords(scope, roles) {
    scope.fields.forEach((field) => {
      const role = roles.get(field.fieldId);
      if (role === FieldRole.PASSWORD) {
        roles.set(field.fieldId, FieldRole.CURRENT_PASSWORD);
      }
    });
  }
}

export default FieldsRationalizationService;
