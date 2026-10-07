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

import { FormRole } from "./Taxonomy";

/**
 * Build a scope entry (a field with its Phase-1 role).
 * @param {string} id The field id.
 * @param {string} role The Phase-1 FieldRole.
 * @param {object} [attributes] The field DOM attributes (name/id keyword text).
 * @returns {{field: object, role: string}} The entry.
 */
export const defaultEntry = (id, role, attributes = {}) => ({
  field: { fieldId: id, attributes, label: {}, inputDescription: {} },
  role,
});

/**
 * Build a form context with sensible defaults.
 * @param {object} [overrides] The context overrides.
 * @returns {{formIsSignup: boolean, formIsChange: boolean, declaredFormRole: string}} The context.
 */
export const defaultContext = (overrides = {}) => ({
  formIsSignup: false,
  formIsChange: false,
  declaredFormRole: FormRole.OTHER,
  ...overrides,
});
