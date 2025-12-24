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
 * @since         5.0.0
 */

/**
 * Convert a snake case string to camelCase
 * @param {string} text
 * @return {string}
 */
export const snakeCaseToCamelCase = (text) => text?.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

/**
 * Uppercase the first letter of a string
 * @param text
 * @return {string|null}
 */
export const capitalizeFirstLetter = (text) => {
  // Handle empty string
  if (!text) {
    return text;
  }
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
};
