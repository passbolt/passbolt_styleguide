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
 * Qualifies a field as password or username from its type, autocomplete and cached keywords.
 */
class FieldQualifierService {
  /**
   * Returns true when the field type is `password` or its keywords include "password".
   * @param {FieldScraping} field The scraped field payload.
   * @param {Element} element The live field element.
   * @returns {boolean} true when the field qualifies as a password.
   */
  static isPassword(field, element) {
    return field.type === "password" || ScrapingCacheService.keywords(element).has("password");
  }

  /**
   * Returns true when the field type is `email`, or when its type is a username candidate matched with its autocomplete or its keywords.
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
   * Qualifies a simple login: as exactly one password field on the page, paired with the first username found.
   * @param {PageScraping} pageScraping The scraping payload.
   * @returns {{passwordFieldId: string, usernameFieldId: string|null}|null} The credential mapping, or null when the page has 0 or more than 1 password field.
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
