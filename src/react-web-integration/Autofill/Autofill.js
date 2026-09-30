/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */
import UserEventsService from "../lib/User/UserEventsService";
import PageClassificationService from "../services/PageClassificationService";
import { FieldRole, FormRole } from "../services/classification/Taxonomy";
import { TotpCodeGeneratorService } from "../../shared/services/otp/TotpCodeGeneratorService";

// Password roles a credential secret can be filled into, by preference.
const PASSWORD_ROLES = [FieldRole.CURRENT_PASSWORD, FieldRole.PASSWORD, FieldRole.NEW_PASSWORD];
// Roles that carry the account identifier.
const IDENTIFIER_ROLES = [FieldRole.USERNAME, FieldRole.EMAIL];
// Form roles whose fields are preferred when several scopes carry a fillable password.
const PREFERRED_FORM_ROLES = [FormRole.LOGIN, FormRole.CHANGE_PASSWORD];

/**
 * Fill the login form.
 *
 * @param {Object} formData
 * - {string} username The username to use
 * - {string} secret The password to use
 * - {object} otp The TOTP DTO to generate a code from
 * - {string} url to check same origin
 */
const fillForm = function (formData) {
  try {
    validateData(formData);

    if (!isRequestInitiatedFromSameOrigin(formData.url, document.location.origin)) {
      throw new Error("The request is not initiated from same origin");
    }

    const { fields, forms } = PageClassificationService.classifyPage();
    const passwordField = selectPasswordField(fields, forms);
    const usernameField = selectUsernameField(fields, passwordField);
    const otpField = fields.find((field) => field.role === FieldRole.TOTP) || null;

    if (usernameField && typeof formData.username === "string") {
      UserEventsService.autofill(usernameField.element, formData.username);
    }
    if (passwordField && typeof formData.secret === "string") {
      UserEventsService.autofill(passwordField.element, formData.secret);
      selectPasswordConfirmationFields(fields, passwordField).forEach((field) =>
        UserEventsService.autofill(field.element, formData.secret),
      );
    }
    if (otpField && formData.otp) {
      const otp = TotpCodeGeneratorService.generate(formData.otp);
      if (typeof otp !== "string") {
        throw new TypeError("Error while generating the TOTP.");
      }
      UserEventsService.autofill(otpField.element, otp);
    }

    if (!passwordField && !usernameField && !otpField) {
      throw new Error("Unable to find the input elements on this page.");
    }

    port.emit(formData.requestId, "SUCCESS");
  } catch (error) {
    console.error(error);
    port.emit(formData.requestId, "ERROR", { name: "Error", message: error.message });
  }
};

/**
 * Pick the password field to fill: a field carrying a fillable password role, preferring one that
 * belongs to a login/change-password scope.
 * @param {Array<{formId: string, role: string, element: Element}>} fields The classified fields.
 * @param {Object<string, {role: string}>} forms The per-form roles.
 * @returns {{formId: string, role: string, element: Element}} The chosen password field, or null.
 */
const selectPasswordField = function (fields, forms) {
  const passwords = fields.filter((field) => PASSWORD_ROLES.includes(field.role));
  if (passwords.length === 0) {
    return null;
  }
  /*
   * Rank by preference rather than DOM order: a field in a preferred form scope wins (in
   * PREFERRED_FORM_ROLES order, so LOGIN beats CHANGE_PASSWORD), ties broken by password-role
   * preference (PASSWORD_ROLES order, so CURRENT_PASSWORD beats NEW_PASSWORD). Unknown scopes/roles
   * sort last but stay selectable as a fallback. DOM order breaks any remaining tie (stable sort).
   */
  const formRank = (field) => {
    const index = PREFERRED_FORM_ROLES.indexOf(forms[field.formId]?.role);
    return index === -1 ? PREFERRED_FORM_ROLES.length : index;
  };
  const roleRank = (field) => PASSWORD_ROLES.indexOf(field.role);
  return [...passwords].sort((a, b) => formRank(a) - formRank(b) || roleRank(a) - roleRank(b))[0];
};

/**
 * Pick the confirmation fields which must receive the same secret as the chosen password field.
 *
 * A confirmation always confirms the new password of its scope, so it is only filled when the chosen
 * field is that new password. That is what keeps a change-password form (current + new + confirm)
 * safe: there the chosen field is the current password, and filling the confirmation would write the
 * old secret into the new password's confirmation. A signup or a password reset, where the chosen
 * field is the new password, fills the confirmation as expected.
 *
 * @param {Array<{fieldId: string, formId: string, role: string, element: Element}>} fields The classified fields.
 * @param {{formId: string, role: string}} passwordField The chosen password field.
 * @returns {Array<{formId: string, role: string, element: Element}>} The confirmation fields to fill, possibly empty.
 */
const selectPasswordConfirmationFields = function (fields, passwordField) {
  if (passwordField.role !== FieldRole.NEW_PASSWORD) {
    return [];
  }
  return fields.filter(
    (field) => field.role === FieldRole.PASSWORD_CONFIRMATION && field.formId === passwordField.formId,
  );
};

/**
 * Pick the username field to fill: a field carrying an identifier role, preferring one in the same
 * scope as the chosen password field.
 * @param {Array<{formId: string, role: string, element: Element}>} fields The classified fields.
 * @param {{formId: string}} passwordField The chosen password field.
 * @returns {{formId: string, role: string, element: Element}} The chosen username field, or null.
 */
const selectUsernameField = function (fields, passwordField) {
  const identifiers = fields.filter((field) => IDENTIFIER_ROLES.includes(field.role));
  if (identifiers.length === 0) {
    return null;
  }
  if (passwordField) {
    const sameScope = identifiers.find((field) => field.formId === passwordField.formId);
    if (sameScope) {
      return sameScope;
    }
  }
  return identifiers[0];
};

/**
 * Check the requested document, top document and an iframe form is initiated from same domain.
 *
 * @param {string} requestedUrl The requested document url
 * @param {string} documentUrl The current active document url
 * @return {Boolean} true
 */
const isRequestInitiatedFromSameOrigin = function (requestedUrl, documentUrl) {
  try {
    const parsedRequestedUrl = new URL(requestedUrl);
    const requestedOrigin = parsedRequestedUrl.origin;
    const parsedDocumentUrl = new URL(documentUrl);
    const documentOrigin = parsedDocumentUrl.origin;

    return requestedOrigin === documentOrigin;
  } catch (error) {
    console.error(error);
    // Empty url or about:blank should not block all the process of autofill
    return false;
  }
};

/**
 * Validate the fillForm parameters
 * @param {object} formData
 * - {string} username The autofill request username parameter
 * - {string} secret The autofill request secret parameter
 * - {object} otp The autofill request otp parameter
 * - {string} url The autofill request url parameter
 */
const validateData = function (formData) {
  const { username, secret, url, otp } = formData;

  if (username || secret) {
    if (typeof username !== "string") {
      throw new Error("The parameter username is not valid");
    }

    if (typeof secret !== "string") {
      throw new Error("The parameter secret is not valid");
    }
  }

  if (otp) {
    if (typeof otp !== "object" || typeof otp.secret_key !== "string") {
      throw new Error("The parameter otp is not valid");
    }
  }

  if (typeof url !== "string") {
    throw new Error("The parameter url is not valid");
  }

  if (!username && !secret && !otp) {
    throw new Error("Either otp or username/secret parameters are required");
  }
};

export const Autofill = { fillForm };
