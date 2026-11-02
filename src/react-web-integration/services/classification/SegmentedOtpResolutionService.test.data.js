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
 * Build a single-character OTP box field. Defaults make an unadorned `<input maxlength=1 type=text>`;
 * a `maxLength` other than 1 turns it into a non-box separator.
 * @param {string} id The field id.
 * @param {object} [overrides] Attribute/type overrides.
 * @returns {object} The value-free field record.
 */
export const defaultBox = (id, overrides = {}) => {
  const {
    type = "text",
    maxLength = 1,
    name = "",
    autoComplete = "",
    inputMode = "",
    pattern = "",
    placeholder = "",
    ariaLabel = "",
    labelText = "",
  } = overrides;
  return {
    fieldId: id,
    type,
    autoComplete,
    attributes: { maxLength, name, inputMode, pattern },
    label: { text: labelText },
    inputDescription: { placeholder, ariaLabel },
  };
};

/**
 * Build a resolution scope in DOM order with an empty roles map and optional ancestor headings.
 * @param {object[]} fields The ordered fields.
 * @param {string[]} [headings] The form ancestor headings.
 * @returns {{fields: object[], roles: Map<string, string>, form: object}} The scope.
 */
export const defaultScope = (fields, headings = []) => ({
  fields,
  roles: new Map(),
  form: { ancestorHeadings: headings },
});
