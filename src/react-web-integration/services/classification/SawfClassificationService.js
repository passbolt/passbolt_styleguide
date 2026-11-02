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
import { SawfToken } from "./KeywordsDictionary";

/**
 * Classifies a data-form-type (SAWF) attribute value into field and form roles.
 */
class SawfClassificationService {
  /**
   * Splits a data-form-type value on commas into a set of lowercased tokens.
   * @param {string} raw The raw attribute value.
   * @returns {Set<string>} The tokens.
   */
  static parseSawf(raw) {
    return new Set(
      (raw == null ? "" : String(raw))
        .split(",")
        .map((token) => token.trim().toLowerCase())
        .filter(Boolean),
    );
  }

  /**
   * Returns the field role declared by a data-form-type value
   * @param {string} raw The raw `data-form-type` value.
   * @returns {string} A FieldRole.
   */
  static sawfFieldRole(raw) {
    const tokens = SawfClassificationService.parseSawf(raw);
    if (tokens.has(SawfToken.OTP)) {
      return FieldRole.TOTP;
    }
    if (tokens.has(SawfToken.USERNAME)) {
      return FieldRole.USERNAME;
    }
    if (tokens.has(SawfToken.EMAIL)) {
      return tokens.has(SawfToken.SECONDARY) ? FieldRole.OTHER : FieldRole.EMAIL;
    }
    if (tokens.has(SawfToken.PASSWORD)) {
      if (tokens.has(SawfToken.CONFIRMATION)) {
        return FieldRole.PASSWORD_CONFIRMATION;
      }
      if (tokens.has(SawfToken.NEW)) {
        return FieldRole.NEW_PASSWORD;
      }
      return FieldRole.PASSWORD;
    }
    return FieldRole.OTHER;
  }

  /**
   * Returns the form role declared by a data-form-type value: LOGIN, SIGNUP, CHANGE_PASSWORD or OTHER.
   * @param {string} raw The raw `data-form-type` value.
   * @returns {string} A FormRole.
   */
  static sawfFormRole(raw) {
    const tokens = SawfClassificationService.parseSawf(raw);
    if (tokens.has(SawfToken.LOGIN)) {
      return FormRole.LOGIN;
    }
    if (tokens.has(SawfToken.REGISTER)) {
      return FormRole.SIGNUP;
    }
    if (tokens.has(SawfToken.CHANGE_PASSWORD)) {
      return FormRole.CHANGE_PASSWORD;
    }
    return FormRole.OTHER;
  }

  /**
   * Returns the form role of an action token or null.
   * @param {string} raw The raw `data-form-type` value.
   * @returns {string|null} A FormRole, or null.
   */
  static sawfActionHint(raw) {
    const tokens = SawfClassificationService.parseSawf(raw);
    if (!tokens.has(SawfToken.ACTION)) {
      return null;
    }
    if (tokens.has(SawfToken.CHANGE_PASSWORD)) {
      return FormRole.CHANGE_PASSWORD;
    }
    if (tokens.has(SawfToken.REGISTER)) {
      return FormRole.SIGNUP;
    }
    if (tokens.has(SawfToken.LOGIN)) {
      return FormRole.LOGIN;
    }
    return null;
  }

  /**
   * Returns true when a data-form-type value has a step or final token.
   * @param {string} raw The raw `data-form-type` value.
   * @returns {boolean} Whether the form is flagged multi-step.
   */
  static sawfMultiStep(raw) {
    const tokens = SawfClassificationService.parseSawf(raw);
    return tokens.has(SawfToken.STEP) || tokens.has(SawfToken.FINAL);
  }
}

export default SawfClassificationService;
