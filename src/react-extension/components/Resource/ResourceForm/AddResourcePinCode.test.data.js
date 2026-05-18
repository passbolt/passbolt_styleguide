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
 * @since         5.12.0
 */

import EntityValidationError from "../../../../shared/models/entity/abstract/entityValidationError";

/**
 * Default props for AddResourcePinCode tests.
 * @param {object} data overrides to merge in
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    onChange: jest.fn(),
    resource: { secret: { pin_code: "" } },
    errors: null,
    warnings: null,
    disabled: false,
    ...data,
  };
}

/**
 * Default props with value for AddResourcePinCode tests.
 * @param {object} value Pin code value
 * @param {object} data other overrides to merge in
 * @returns {object}
 */
export function defaultPropsWithValue(value, data = {}) {
  return {
    onChange: jest.fn(),
    resource: { secret: { pin_code: value } },
    errors: null,
    warnings: null,
    disabled: false,
    ...data,
  };
}

/**
 * Build errors prop with a single `pin_code` rule violation under `secret`.
 * @param {string} rule one of "pattern" | "minLength" | "maxLength" | "required" | "type"
 * @returns {EntityValidationError}
 */
export function pinCodeErrors(rule) {
  const errors = new EntityValidationError();
  const secretErrors = new EntityValidationError();

  secretErrors.addError("pin_code", rule, `pin_code ${rule} error`);
  errors.addAssociationError("secret", secretErrors);

  return errors;
}

/**
 * Build warnings prop with a single `secret.pin_code` rule violation.
 * @param {string} rule e.g. "maxLength"
 * @returns {EntityValidationError}
 */
export function pinCodeWarnings(rule) {
  const warnings = new EntityValidationError();
  warnings.addError("secret.pin_code", rule, `pin_code ${rule} warning`);
  return warnings;
}
