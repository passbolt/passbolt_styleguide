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
 * @since         5.2.0
 */

/**
 * Returns a contrasted color computed from the given color in hex format.
 * @param {string} color
 * @returns {string}
 */
export const getContrastedColor = (color) => {
  const c = color.substring(1).match(/(\S{2})/g);
  const r = parseInt(c[0], 16);
  const g = parseInt(c[1], 16);
  const b = parseInt(c[2], 16);
  const l = (r * 299 + g * 587 + b * 114) / 1000;
  return l > 125 ? "#000000" : "#ffffff";
};
