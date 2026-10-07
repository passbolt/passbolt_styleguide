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
 * Build a value-free field record for classification.
 * @param {object} [overrides] Field overrides (flat: tagName/type/dataFormType/autoComplete/name/id/labelText/ariaLabel/placeholder/maxLength/inputMode/pattern).
 * @returns {object} The field record.
 */
export const defaultField = (overrides = {}) => {
  const {
    tagName = "INPUT",
    type = "text",
    dataFormType = "",
    autoComplete = "",
    name = "",
    id = "",
    labelText = "",
    ariaLabel = "",
    placeholder = "",
    maxLength = null,
    inputMode = "",
    pattern = "",
  } = overrides;
  return {
    fieldId: "field",
    tagName,
    type,
    dataFormType,
    autoComplete,
    attributes: { name, id, maxLength, inputMode, pattern },
    label: { text: labelText },
    inputDescription: { ariaLabel, placeholder },
  };
};
