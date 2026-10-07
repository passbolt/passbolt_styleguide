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
 * @since         5.18.0
 */

/**
 * The default state of a secret row: masked, idle, not copied.
 * @param {object} state Override the default state.
 * @returns {object}
 */
export function defaultSecretRowState(state = {}) {
  return {
    revealed: false,
    value: null,
    decrypting: false,
    copyStatus: "default",
    showTimer: false,
    onCopy: jest.fn(),
    onPreview: jest.fn(),
    ...state,
  };
}
