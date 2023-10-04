/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

/**
 * Awaits for the given promise and returns its result in a transparent way like a normal awaited promise.
 * However, for development purpose only, this method helps to trace the origin of the call in case an error happens in the promise.
 * By adding an error instanciated at the call and putting it in the cause of the thrown error in the promise
 * we can have a second stack trace in the error logs to find to origin of the call of the promise.
 * @param {Promise} promise the promise to await for and that can potentially crash
 * @param {error} [error] an instance of an error where to get the stack trace from in case of error
 * @returns {Promise<*>}
 */
export const tracePromise = async(promise, error = new Error()) => {
  try {
    return await promise;
  } catch (e) {
    e.cause = error;
    throw e;
  }
};
