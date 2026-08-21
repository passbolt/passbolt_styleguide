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

import KeywordMatchingService from "./KeywordMatchingService";
import FieldFeatureService from "./FieldFeatureService";
import { FieldRole, FormRole } from "./Taxonomy";
import { Keywords } from "./KeywordsDictionary";

/**
 * Rewrites the generic PASSWORD field roles of a scope into CURRENT_PASSWORD, NEW_PASSWORD or
 * PASSWORD_CONFIRMATION, from the Phase-1 roles, the form context, and the password field
 * count/order/keywords. Value-free and DOM-free. Stateless service exposing a static method.
 */
class PasswordRoleResolutionService {
  /**
   * @param {Array<{field: FieldScraping, role: string}>} entries The scope fields with their Phase-1 role.
   * @param {{formIsSignup: boolean, formIsChange: boolean, declaredFormRole: string}} ctx The form
   *   context. `declaredFormRole` (author-declared, consolidated) takes precedence over
   *   `formIsSignup`/`formIsChange` when it is not OTHER.
   * @returns {Map<string, string>} The rewritten password roles, keyed by fieldId.
   */
  static resolve(entries, ctx) {
    const resolved = new Map();
    PasswordRoleResolutionService.applyDeclaredRoles(entries, resolved);
    const passwordFields = PasswordRoleResolutionService.genericPasswordFields(entries, resolved);
    PasswordRoleResolutionService.resolveGenericPasswords(passwordFields, ctx, resolved);
    PasswordRoleResolutionService.applyUpdateVeto(passwordFields, resolved);
    return resolved;
  }

  /**
   * Two NEW_PASSWORD in a row: the second is the confirmation.
   * @param {Array<{field: FieldScraping, role: string}>} entries The scope fields.
   * @param {Map<string, string>} resolved The role map to write into.
   */
  static applyDeclaredRoles(entries, resolved) {
    entries
      .filter((entry) => entry.role === FieldRole.PASSWORD_CONFIRMATION)
      .forEach((entry) => resolved.set(entry.field.fieldId, FieldRole.PASSWORD_CONFIRMATION));

    const declaredNewEntries = entries.filter((entry) => entry.role === FieldRole.NEW_PASSWORD);
    declaredNewEntries.forEach((entry, index) =>
      resolved.set(entry.field.fieldId, index === 0 ? FieldRole.NEW_PASSWORD : FieldRole.PASSWORD_CONFIRMATION),
    );

    entries
      .filter((entry) => entry.role === FieldRole.CURRENT_PASSWORD)
      .forEach((entry) => resolved.set(entry.field.fieldId, FieldRole.CURRENT_PASSWORD));
  }

  /**
   * The still-undecided bare `password` fields, in DOM order.
   * @param {Array<{field: FieldScraping, role: string}>} entries The scope fields.
   * @param {Map<string, string>} resolved The roles already decided.
   * @returns {FieldScraping[]} The generic password fields.
   */
  static genericPasswordFields(entries, resolved) {
    return entries
      .filter((entry) => entry.role === FieldRole.PASSWORD && !resolved.has(entry.field.fieldId))
      .map((entry) => entry.field);
  }

  /**
   * Assigns roles to the generic password fields from their count.
   * @param {FieldScraping[]} passwordFields The generic password fields (DOM order).
   * @param {{formIsSignup: boolean, formIsChange: boolean, declaredFormRole: string}} ctx The form context.
   * @param {Map<string, string>} resolved The role map to write into.
   */
  static resolveGenericPasswords(passwordFields, ctx, resolved) {
    if (passwordFields.length === 1) {
      PasswordRoleResolutionService.resolveSinglePassword(passwordFields[0], ctx, resolved);
    } else if (passwordFields.length === 2) {
      PasswordRoleResolutionService.resolvePasswordPair(passwordFields, ctx, resolved);
    } else if (passwordFields.length >= 3) {
      PasswordRoleResolutionService.resolveManyPasswords(passwordFields, resolved);
    }
  }

  /**
   * One lone password: current for a login (or once a new one is already declared elsewhere), new for
   * a signup/change context or a creation keyword, current otherwise.
   * @param {FieldScraping} field The password field.
   * @param {{formIsSignup: boolean, declaredFormRole: string}} ctx The form context.
   * @param {Map<string, string>} resolved The role map to write into.
   */
  static resolveSinglePassword(field, ctx, resolved) {
    const newAlreadyPlaced = Array.from(resolved.values()).includes(FieldRole.NEW_PASSWORD);

    if (newAlreadyPlaced || ctx.declaredFormRole === FormRole.LOGIN) {
      resolved.set(field.fieldId, FieldRole.CURRENT_PASSWORD);
    } else if (ctx.declaredFormRole === FormRole.SIGNUP || ctx.declaredFormRole === FormRole.CHANGE_PASSWORD) {
      resolved.set(field.fieldId, FieldRole.NEW_PASSWORD);
    } else {
      const isNew = ctx.formIsSignup || PasswordRoleResolutionService.hasCreationKeyword(field);
      resolved.set(field.fieldId, isNew ? FieldRole.NEW_PASSWORD : FieldRole.CURRENT_PASSWORD);
    }
  }

  /**
   * Two passwords: current + new for a login/change form, new + confirmation for a signup form.
   * Without any signal, defaults to new + confirmation (signup/reset), aligned with
   * FormClassificationService.
   * @param {FieldScraping[]} passwordFields The two password fields (DOM order).
   * @param {{formIsSignup: boolean, formIsChange: boolean, declaredFormRole: string}} ctx The form context.
   * @param {Map<string, string>} resolved The role map to write into.
   */
  static resolvePasswordPair(passwordFields, ctx, resolved) {
    const [first, second] = passwordFields;
    const isSignup =
      ctx.declaredFormRole === FormRole.SIGNUP ||
      ctx.formIsSignup ||
      passwordFields.some(PasswordRoleResolutionService.hasCreationKeyword);
    const isChange = ctx.declaredFormRole === FormRole.CHANGE_PASSWORD || ctx.formIsChange;

    if (ctx.declaredFormRole === FormRole.LOGIN) {
      resolved.set(first.fieldId, FieldRole.CURRENT_PASSWORD);
      resolved.set(second.fieldId, FieldRole.NEW_PASSWORD);
    } else if (isSignup) {
      resolved.set(first.fieldId, FieldRole.NEW_PASSWORD);
      resolved.set(second.fieldId, FieldRole.PASSWORD_CONFIRMATION);
    } else if (isChange) {
      resolved.set(first.fieldId, FieldRole.CURRENT_PASSWORD);
      resolved.set(second.fieldId, FieldRole.NEW_PASSWORD);
    } else {
      // No signal: default to signup/reset (new + confirmation), aligned with FormClassificationService.
      resolved.set(first.fieldId, FieldRole.NEW_PASSWORD);
      resolved.set(second.fieldId, FieldRole.PASSWORD_CONFIRMATION);
    }
  }

  /**
   * Three or more passwords: current + new + confirmation, positionally; any extra is noise.
   * @param {FieldScraping[]} passwordFields The password fields (DOM order).
   * @param {Map<string, string>} resolved The role map to write into.
   */
  static resolveManyPasswords(passwordFields, resolved) {
    resolved.set(passwordFields[0].fieldId, FieldRole.CURRENT_PASSWORD);
    resolved.set(passwordFields[1].fieldId, FieldRole.NEW_PASSWORD);
    resolved.set(passwordFields[2].fieldId, FieldRole.PASSWORD_CONFIRMATION);
    passwordFields.slice(3).forEach((field) => resolved.set(field.fieldId, FieldRole.OTHER));
  }

  /**
   * Turns a field guessed as NEW_PASSWORD back into CURRENT_PASSWORD when its text carries an
   * update/change keyword.
   * @param {FieldScraping[]} passwordFields The generic password fields.
   * @param {Map<string, string>} resolved The role map to update in place.
   */
  static applyUpdateVeto(passwordFields, resolved) {
    passwordFields.filter(PasswordRoleResolutionService.hasUpdateKeyword).forEach((field) => {
      if (resolved.get(field.fieldId) === FieldRole.NEW_PASSWORD) {
        resolved.set(field.fieldId, FieldRole.CURRENT_PASSWORD);
      }
    });
  }

  /**
   * Whether the field's text carries an account-creation keyword.
   * @param {FieldScraping} field The field.
   * @returns {boolean} Whether a creation keyword is present.
   */
  static hasCreationKeyword(field) {
    return KeywordMatchingService.matchesAny(FieldFeatureService.fieldText(field), Keywords.ACCOUNT_CREATION);
  }

  /**
   * Whether the field's text carries a password-update keyword.
   * @param {FieldScraping} field The field.
   * @returns {boolean} Whether an update keyword is present.
   */
  static hasUpdateKeyword(field) {
    return KeywordMatchingService.matchesAny(FieldFeatureService.fieldText(field), Keywords.PASSWORD_UPDATE);
  }
}

export default PasswordRoleResolutionService;
