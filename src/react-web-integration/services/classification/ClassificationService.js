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

import FieldClassificationService from "./FieldClassificationService";
import PasswordRoleResolutionService from "./PasswordRoleResolutionService";
import SegmentedOtpResolutionService from "./SegmentedOtpResolutionService";
import FormClassificationService from "./FormClassificationService";
import SawfClassificationService from "./SawfClassificationService";
import FieldsRationalizationService from "./FieldsRationalizationService";
import { Tier, FormRole } from "./Taxonomy";
import { MAX_CLASSIFIED_FIELDS } from "./KeywordsDictionary";

// Fixed deterministic tie-break: change_password > register > login (forgot/logout/null ignored).
const ACTION_PRIORITY = [FormRole.CHANGE_PASSWORD, FormRole.SIGNUP, FormRole.LOGIN];

/**
 * PUBLIC entry point of the module. PURE function: serializable payload -> role mapping. No DOM, no
 * `value` access, no clock, no network -> snapshot-testable. Stateless service exposing static methods.
 */
class ClassificationService {
  /**
   * Consolidates the author-declared form role (reads the already-scraped raw `data-form-type`,
   * value-free). Two levels: (1) a form-level slot (a real <form> or a pseudo-form LCA container);
   * (2) otherwise the aggregate of the fields' `sawfActionHint`, with the fixed tie-break.
   * @param {{form: FormScraping|null, fields: FieldScraping[]}} scope The scope.
   * @returns {string} A FormRole.
   */
  static consolidateDeclaredFormRole(scope) {
    const declared = SawfClassificationService.sawfFormRole(scope.form?.dataFormType);
    if (declared !== FormRole.OTHER) {
      return declared;
    }
    const hints = new Set(
      scope.fields.map((field) => SawfClassificationService.sawfActionHint(field.dataFormType)).filter(Boolean),
    );
    return ACTION_PRIORITY.find((role) => hints.has(role)) || FormRole.OTHER;
  }

  /**
   * Groups fields by `formId` (scopeKey), preserving DOM order (both of the `fields` and of the scopes'
   * first appearance). Pure, DOM-free: the field-to-form association was already made at extraction.
   * @param {FieldScraping[]} fields The fields.
   * @param {Object<string, FormScraping>} forms The forms keyed by formId.
   * @returns {Array<{scopeKey: string, form: FormScraping|null, fields: FieldScraping[]}>} The scopes.
   */
  static groupByScope(fields, forms) {
    const byKey = new Map();
    for (const field of fields) {
      const scopeKey = field.formId;
      let scope = byKey.get(scopeKey);
      if (!scope) {
        scope = { scopeKey, form: (forms && forms[scopeKey]) || null, fields: [] };
        byKey.set(scopeKey, scope);
      }
      scope.fields.push(field);
    }
    return Array.from(byKey.values());
  }

  /**
   * @param {PageScraping} page The tab payload (scraping phase 5).
   * @returns {{fields: Object<string, string>, forms: Object<string, {role: string, multiStep: boolean, otpSegments: Array<Array<string>>}>}}
   *   The field roles and per-form roles.
   */
  static classify(page) {
    const fields = (page.fields || []).slice(0, MAX_CLASSIFIED_FIELDS);
    const perField = ClassificationService.classifyFields(fields);
    const scopes = ClassificationService.groupByScope(fields, page.forms);

    const forms = {};
    for (const scope of scopes) {
      scope.roles = new Map(scope.fields.map((field) => [field.fieldId, perField.get(field.fieldId)]));
      forms[scope.scopeKey] = ClassificationService.resolveScope(scope);
    }
    return { fields: ClassificationService.flattenRoles(scopes), forms };
  }

  /**
   * Runs the per-field cascade over every field, flags author-declared fields (`_byDeclared`, exempt
   * from the login veto) and returns their roles keyed by fieldId.
   * @param {FieldScraping[]} fields The fields.
   * @returns {Map<string, string>} The per-field roles.
   */
  static classifyFields(fields) {
    const perField = new Map();
    for (const field of fields) {
      const { role, tier } = FieldClassificationService.classify(field);
      field._byDeclared = tier === Tier.SAWF || tier === Tier.AUTOCOMPLETE;
      perField.set(field.fieldId, role);
    }
    return perField;
  }

  /**
   * Resolves a single scope: form role, password cascade, segmented OTP, then rationalization.
   * @param {{scopeKey: string, form: FormScraping|null, fields: FieldScraping[], roles: Map<string, string>}} scope The scope.
   * @returns {{role: string, multiStep: boolean, otpSegments: Array<Array<string>>}} The form descriptor.
   */
  static resolveScope(scope) {
    const declaredFormRole = ClassificationService.consolidateDeclaredFormRole(scope);
    const formRole = ClassificationService.resolveFormRole(scope, declaredFormRole);
    const ctx = {
      formIsSignup: formRole === FormRole.SIGNUP,
      formIsChange: formRole === FormRole.CHANGE_PASSWORD,
      declaredFormRole,
    };

    ClassificationService.applyPasswordCascade(scope, ctx);
    const otpSegments = SegmentedOtpResolutionService.resolve(scope);
    scope.formRole = ClassificationService.resolveFormRole(scope, declaredFormRole);
    scope.multiStep = SawfClassificationService.sawfMultiStep(scope.form?.dataFormType);
    FieldsRationalizationService.rationalize(scope);

    return { role: scope.formRole, multiStep: scope.multiStep, otpSegments };
  }

  /**
   * The author-declared form role when present (it always wins), otherwise the inferred form role.
   * @param {{form: FormScraping|null, fields: FieldScraping[], roles: Map<string, string>}} scope The scope.
   * @param {string} declaredFormRole The consolidated author-declared role.
   * @returns {string} A FormRole.
   */
  static resolveFormRole(scope, declaredFormRole) {
    return declaredFormRole !== FormRole.OTHER ? declaredFormRole : FormClassificationService.classify(scope);
  }

  /**
   * Applies the password cascade to a scope, writing the rewritten password roles into scope.roles.
   * @param {{fields: FieldScraping[], roles: Map<string, string>}} scope The scope.
   * @param {{formIsSignup: boolean, formIsChange: boolean, declaredFormRole: string}} ctx The form context.
   */
  static applyPasswordCascade(scope, ctx) {
    const entries = scope.fields.map((field) => ({ field, role: scope.roles.get(field.fieldId) }));
    for (const [id, role] of PasswordRoleResolutionService.resolve(entries, ctx)) {
      scope.roles.set(id, role);
    }
  }

  /**
   * Flattens the scopes' role maps into a single fieldId -> role object.
   * @param {Array<{roles: Map<string, string>}>} scopes The scopes.
   * @returns {Object<string, string>} The field roles.
   */
  static flattenRoles(scopes) {
    const fieldRoles = {};
    for (const scope of scopes) {
      for (const [id, role] of scope.roles) {
        fieldRoles[id] = role;
      }
    }
    return fieldRoles;
  }
}

export default ClassificationService;
