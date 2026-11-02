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
 * Build a rationalization scope from a form role and an ordered (DOM order) list of field specs.
 * @param {string} formRole The FormRole.
 * @param {Array<{id: string, role: string, type?: string, tagName?: string, byDeclared?: boolean}>} specs The ordered field specs.
 * @returns {{formRole: string, fields: object[], roles: Map<string, string>}} The scope.
 */
export const defaultScope = (formRole, specs) => {
  const fields = specs.map((spec) => ({
    fieldId: spec.id,
    type: spec.type ?? "text",
    tagName: spec.tagName ?? "INPUT",
    _byDeclared: spec.byDeclared ?? false,
  }));
  const roles = new Map(specs.map((spec) => [spec.id, spec.role]));
  return { formRole, fields, roles };
};
