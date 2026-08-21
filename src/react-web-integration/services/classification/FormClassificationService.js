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
 * INFERRED form role (field-role counts + headings/buttonText). Does NOT read `dataFormType`: the
 * author-DECLARED role is consolidated upstream by ClassificationService.classify (P3) and
 * short-circuits this service. Value-free and DOM-free. Stateless service exposing a static method.
 */
class FormClassificationService {
  /**
   * @param {{roles: Map<string, string>, form: FormScraping, fields: FieldScraping[]}} scope
   * @returns {string} A FormRole (login | signup | change-password | other).
   */
  static classify(scope) {
    const headings = TextNormalizer.normalizeForMatch(
      [(scope.form?.ancestorHeadings || []).join(" "), scope.form?.buttonText].filter(Boolean).join(" "),
    );
    const has = (role) => scope.fields.some((field) => scope.roles.get(field.fieldId) === role);
    const count = (role) => scope.fields.filter((field) => scope.roles.get(field.fieldId) === role).length;
    const heading = (tokens) => KeywordMatchingService.matchesAny(headings, tokens);

    const identifierCount = count(FieldRole.USERNAME) + count(FieldRole.EMAIL);
    const passwordCount =
      count(FieldRole.PASSWORD) +
      count(FieldRole.CURRENT_PASSWORD) +
      count(FieldRole.NEW_PASSWORD) +
      count(FieldRole.PASSWORD_CONFIRMATION);

    if (heading(Keywords.HEADING_EXCLUDE)) {
      return FormRole.OTHER;
    }
    if ((has(FieldRole.CURRENT_PASSWORD) && has(FieldRole.NEW_PASSWORD)) || heading(Keywords.HEADING_CHANGE_PASSWORD)) {
      return FormRole.CHANGE_PASSWORD;
    }
    if (
      (has(FieldRole.NEW_PASSWORD) && !has(FieldRole.CURRENT_PASSWORD)) ||
      passwordCount >= 2 ||
      identifierCount >= 2 ||
      heading(Keywords.HEADING_SIGNUP)
    ) {
      if (heading(Keywords.HEADING_LOGIN) && passwordCount <= 1 && identifierCount <= 1) {
        return FormRole.LOGIN;
      }
      return FormRole.SIGNUP;
    }
    if (passwordCount === 1 || heading(Keywords.HEADING_LOGIN)) {
      return FormRole.LOGIN;
    }
    return FormRole.OTHER;
  }
}

export default FormClassificationService;
