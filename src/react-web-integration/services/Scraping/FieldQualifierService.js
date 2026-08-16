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

import ScrapingCacheService from "./ScrapingCacheService";
import ScrapingIdentityService from "./ScrapingIdentityService";
import {
  USERNAME_CANDIDATE_TYPES,
  USERNAME_AUTOCOMPLETE,
  USERNAME_KEYWORD_TOKENS,
} from "../../lib/InForm/ScrapingDictionary";

/**
 * Two-layer field qualification. Layer 1 answers "what is this field?" from local signals (the field's
 * own `type`/`autoComplete` plus its cached qualification tokens). Layer 2 answers "does the page hold a
 * simple login?" from page-wide counts. Autonomous from the classification module — it shares only the
 * scraping vocabulary (cached keywords, `field.type`/`field.autoComplete`) and does no DOM reads or
 * mutations of its own: token analysis reuses {@link ScrapingCacheService} and element resolution goes
 * through {@link ScrapingIdentityService}.
 */
class FieldQualifierService {
  /**
   * Layer 1 — a field is a password when its native type is `password` or its cached tokens include
   * "password".
   * @param {FieldScraping} field The scraped field payload.
   * @param {Element} element The live field element.
   * @returns {boolean} true when the field qualifies as a password.
   */
  static isPassword(field, element) {
    return field.type === "password" || ScrapingCacheService.keywords(element).has("password");
  }

  /**
   * Layer 1 — a field is a username candidate when its type is `email`, or it is a candidate type
   * ({@link USERNAME_CANDIDATE_TYPES}) whose `autoComplete` is whitelisted ({@link USERNAME_AUTOCOMPLETE})
   * or whose cached tokens intersect {@link USERNAME_KEYWORD_TOKENS}.
   * @param {FieldScraping} field The scraped field payload.
   * @param {Element} element The live field element.
   * @returns {boolean} true when the field qualifies as a username candidate.
   */
  static isUsername(field, element) {
    if (field.type === "email") {
      return true;
    }
    if (!USERNAME_CANDIDATE_TYPES.includes(field.type)) {
      return false;
    }
    if (USERNAME_AUTOCOMPLETE.includes(field.autoComplete || "")) {
      return true;
    }
    const keywords = ScrapingCacheService.keywords(element);
    return USERNAME_KEYWORD_TOKENS.some((token) => keywords.has(token));
  }

  /**
   * Layer 2 — qualify a simple login from the page-wide payload. Strict heuristic: exactly one password
   * field on the page, paired with the first username candidate found (the password field excluded).
   * @param {PageScraping} pageScraping The page-wide scraping payload.
   * @returns {{passwordFieldId: string, usernameFieldId: (string|null)}|null} The credential mapping, or
   *   `null` when the page holds 0 or more than 1 password field.
   */
  static qualifyLogin(pageScraping) {
    const passwords = pageScraping.fields.filter((field) => {
      const element = ScrapingIdentityService.elementFor(field.fieldId);
      return element && FieldQualifierService.isPassword(field, element);
    });

    if (passwords.length !== 1) {
      return null;
    }

    const passwordField = passwords[0];
    const usernameField = pageScraping.fields.find((field) => {
      if (field === passwordField) {
        return false;
      }
      const element = ScrapingIdentityService.elementFor(field.fieldId);
      return element && FieldQualifierService.isUsername(field, element);
    });

    return { passwordFieldId: passwordField.fieldId, usernameFieldId: usernameField?.fieldId ?? null };
  }
}

export default FieldQualifierService;
