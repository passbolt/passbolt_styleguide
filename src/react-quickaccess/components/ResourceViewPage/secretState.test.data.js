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
 * The secret state of the page as given to its sections, idle: nothing decrypting, nothing copied.
 * @param {object} state Override the default state.
 * @returns {object}
 */
export function defaultSecretState(state = {}) {
  return {
    decryptingSecret: null,
    copyingSecret: null,
    copyStatus: null,
    copiedProperty: null,
    ...state,
  };
}

/**
 * The secret state while the given row decrypts the secret.
 * @param {string} key The row key
 * @returns {object}
 */
export function decryptingSecretState(key) {
  return defaultSecretState({ decryptingSecret: key });
}

/**
 * The secret state while the given row copies its value.
 * @param {string} key The row key
 * @returns {object}
 */
export function copyingSecretState(key) {
  return defaultSecretState({ copyingSecret: key, copyStatus: "processing" });
}

/**
 * The secret state once the given row copied its value, the clipboard timer runs for it.
 * @param {string} key The row key
 * @returns {object}
 */
export function copiedSecretState(key) {
  return defaultSecretState({ copyingSecret: key, copyStatus: "done", copiedProperty: key });
}
