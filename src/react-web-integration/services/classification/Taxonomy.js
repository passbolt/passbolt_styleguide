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

/**
 * Field roles — narrow, credential-only. "other" = not relevant for filling.
 * @type {Readonly<Object<string, string>>}
 */
export const FieldRole = Object.freeze({
  USERNAME: "username",
  EMAIL: "email",
  PASSWORD: "password", // generic, before disambiguation (Phase 2)
  CURRENT_PASSWORD: "current-password",
  NEW_PASSWORD: "new-password",
  PASSWORD_CONFIRMATION: "password-confirmation",
  TOTP: "totp",
  OTHER: "other",
});

/**
 * Ladder tier that made the decision — carried for traceability (tests + debug).
 * SAWF = most specific author-declared tier, AT THE TOP (data-form-type is dedicated to PMs and
 * natively expresses current/new/confirmation). Inferred tiers shift down one notch.
 * @type {Readonly<Object<string, number>>}
 */
export const Tier = Object.freeze({
  SAWF: 1,
  AUTOCOMPLETE: 2,
  INPUT_TYPE: 3,
  EXPLICIT_LABEL: 4,
  ATTRIBUTE_KEYWORD: 5,
  STRUCTURAL: 6,
  COUNT: 7,
  NONE: 0,
});

/**
 * FORM role — DOM-less taxon, consumed in P2 (FormClassificationService) and P3
 * (consolidateDeclaredFormRole). Single source: this module.
 * @type {Readonly<Object<string, string>>}
 */
export const FormRole = Object.freeze({
  LOGIN: "login",
  SIGNUP: "signup",
  CHANGE_PASSWORD: "change-password",
  OTHER: "other",
});
