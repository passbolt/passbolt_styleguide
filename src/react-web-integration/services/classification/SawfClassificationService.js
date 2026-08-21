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
 * Classifies a `data-form-type` (SAWF) attribute value into field and form roles. Stateless service
 * exposing static methods only.
 */
class SawfClassificationService {
  /**
   * Splits a `data-form-type` value into a set of lowercased tokens, using the comma as the only
   * separator.
   * @param {string} raw The raw attribute value (null-safe).
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
   * Returns the field role declared by a `data-form-type` value, resolving by priority
   * otp (TOTP) > username (USERNAME) > email (EMAIL) > password (PASSWORD). An email marked
   * `secondary` and any unrecognized value resolve to OTHER. A `password` also marked `confirmation`
   * resolves to PASSWORD_CONFIRMATION, or marked `new` to NEW_PASSWORD (confirmation wins over new).
   * @param {string} raw The raw `data-form-type` value (null-safe).
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
   * Returns the form role declared by a `data-form-type` value: LOGIN, SIGNUP or CHANGE_PASSWORD,
   * else OTHER.
   * @param {string} raw The raw `data-form-type` value (null-safe).
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
   * Returns the form role hinted by an `action` token, resolving by priority
   * change_password > register > login. Returns null when there is no `action` token or no matching
   * intent token.
   * @param {string} raw The raw `data-form-type` value (null-safe).
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
   * Returns whether a `data-form-type` value carries a `step` or `final` multi-step token.
   * @param {string} raw The raw `data-form-type` value (null-safe).
   * @returns {boolean} Whether the form is flagged multi-step.
   */
  static sawfMultiStep(raw) {
    const tokens = SawfClassificationService.parseSawf(raw);
    return tokens.has(SawfToken.STEP) || tokens.has(SawfToken.FINAL);
  }
}

export default SawfClassificationService;
