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
import { FieldRole, FormRole } from "./Taxonomy";
import { Keywords } from "./KeywordsDictionary";

/**
 * Form classification: Detect the form role from the field roles, the headings, and button texts.
 */
class FormClassificationService {
  /**
   * Returns the form role based on the field role counts and the heading keywords.
   * @param {{roles: Map<string, string>, form: FormScraping, fields: FieldScraping[]}} scope The scope.
   * @returns {string} A FormRole (login, signup, change-password or other).
   */
  static classify(scope) {
    const headings = TextNormalizer.normalizeForMatch(
      [...(scope.form?.ancestorHeadings || []), scope.form?.buttonText].filter(Boolean).join(" "),
    );

    // Count the fields by role
    const countByRole = new Map();
    for (const field of scope.fields) {
      const role = scope.roles.get(field.fieldId);
      countByRole.set(role, (countByRole.get(role) ?? 0) + 1);
    }

    const getRoleCount = (role) => countByRole.get(role) ?? 0;
    const has = (role) => getRoleCount(role) > 0;
    const headingMatches = (tokens) => KeywordMatchingService.matchesAny(headings, tokens);

    const identifierCount = getRoleCount(FieldRole.USERNAME) + getRoleCount(FieldRole.EMAIL);
    const passwordCount =
      getRoleCount(FieldRole.PASSWORD) +
      getRoleCount(FieldRole.CURRENT_PASSWORD) +
      getRoleCount(FieldRole.NEW_PASSWORD) +
      getRoleCount(FieldRole.PASSWORD_CONFIRMATION);

    if (headingMatches(Keywords.HEADING_EXCLUDE)) {
      return FormRole.OTHER;
    }
    if (
      (has(FieldRole.CURRENT_PASSWORD) && has(FieldRole.NEW_PASSWORD)) ||
      headingMatches(Keywords.HEADING_CHANGE_PASSWORD)
    ) {
      return FormRole.CHANGE_PASSWORD;
    }
    if (has(FieldRole.NEW_PASSWORD) && !has(FieldRole.CURRENT_PASSWORD)) {
      if (
        headingMatches(Keywords.HEADING_LOGIN) &&
        !headingMatches(Keywords.HEADING_SIGNUP) &&
        passwordCount <= 1 &&
        identifierCount <= 1
      ) {
        return FormRole.LOGIN;
      }
      return FormRole.SIGNUP;
    }
    if (headingMatches(Keywords.HEADING_SIGNUP) || passwordCount >= 2 || identifierCount >= 2) {
      return FormRole.SIGNUP;
    }
    if (passwordCount === 1 || headingMatches(Keywords.HEADING_LOGIN)) {
      return FormRole.LOGIN;
    }
    return FormRole.OTHER;
  }
}

export default FormClassificationService;
