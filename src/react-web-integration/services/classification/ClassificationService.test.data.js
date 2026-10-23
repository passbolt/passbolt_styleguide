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
 * Build a value-free field record for the classification pipeline.
 * @param {string} fieldId The field id.
 * @param {object} [overrides] Field overrides (formId/type/dataFormType/autoComplete/name/id/labelText/ariaLabel/placeholder/maxLength/inputMode/pattern/tagName).
 * @returns {object} The field record.
 */
export const defaultField = (fieldId, overrides = {}) => {
  const {
    formId = "form",
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
    fieldId,
    formId,
    tagName,
    type,
    dataFormType,
    autoComplete,
    attributes: { name, id, maxLength, inputMode, pattern },
    label: { text: labelText },
    inputDescription: { ariaLabel, placeholder },
  };
};

/**
 * Build a form scraping record.
 * @param {object} [overrides] Form overrides (dataFormType/ancestorHeadings/buttonText).
 * @returns {object} The form record.
 */
export const defaultForm = (overrides = {}) => {
  const { dataFormType = "", ancestorHeadings = [], buttonText = "" } = overrides;
  return { dataFormType, ancestorHeadings, buttonText };
};

/**
 * Build a page scraping payload.
 * @param {object[]} [fields] The ordered fields.
 * @param {Object<string, object>} [forms] The forms keyed by formId.
 * @returns {{fields: object[], forms: Object<string, object>}} The page.
 */
export const defaultPage = (fields = [], forms = {}) => ({ fields, forms });
