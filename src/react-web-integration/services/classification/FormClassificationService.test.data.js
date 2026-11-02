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
 * Build a classification scope from a list of field roles and optional form headings.
 * @param {object} [options] The scope options.
 * @param {string[]} [options.roles] One FieldRole per field.
 * @param {string[]} [options.headings] The form ancestor headings.
 * @param {string} [options.buttonText] The form submit button text.
 * @returns {{roles: Map<string, string>, form: object, fields: object[]}} The scope.
 */
export const defaultScope = ({ roles = [], headings = [], buttonText = "" } = {}) => {
  const fields = roles.map((role, index) => ({ fieldId: `f${index}` }));
  const roleMap = new Map(fields.map((field, index) => [field.fieldId, roles[index]]));
  return { roles: roleMap, fields, form: { ancestorHeadings: headings, buttonText } };
};
